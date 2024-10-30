import * as cheerio from 'cheerio';
import { WarningHandler } from '../client/WarningHandler.js';

/**
 * Class responsible for parsing HTML tables using cheerio.
 * It extracts data based on provided parameters and selectors, validates the data,
 * and combines the parsed tables by team. It also supports filtering the combined data by teams.
 */
class TableParser {
    #warningHandler;

    /**
     * Initialize the TableParser with optional warning handler options.
     * @param {*} options - Optional warning handler options.
     */
    constructor(options = {}) {
        this.#warningHandler = new WarningHandler(options);
    }

    /**
     * Parses the provided HTML and extracts table data based on the given parameters.
     *
     * @param {string} html - The HTML content to parse.
     * @param {Object} params - The parameters for parsing.
     * @param {Array<string>} params.tables - The table selectors to parse.
     * @param {Array<string>} [params.cols] - The columns to parse. If not provided, all available columns will be parsed.
     * @param {Array<string>} [params.teams] - The teams to filter the data by. If not provided, data for all teams will be returned.
     * @returns {Object} The combined and optionally filtered table data.
     * @throws {Error} If no valid tables are found to parse or if an error occurs during parsing.
     */
    parse(html, params) {
        const $ = cheerio.load(html);
        const tables = [];
        let selectors;

        try {
            selectors = this.#getSelectors(params.tables, params);
        } catch (error) {
            this.#warningHandler.warn('TableParser', `Failed to initialize selectors: ${error.message}`);
            throw error;
        }

        const availableColumns = this.#getAvailableColumns($, selectors);
        let columnsToParse;
        try {
            columnsToParse = params.cols
                ? this.#validateCols(params.cols, availableColumns)
                : availableColumns;
        } catch (error) {
            this.#warningHandler.warn('TableParser', `Failed to determine columns: ${error.message}`);
        }

        // Track progress
        let processedTables = 0;
        const totalTables = selectors.length;

        for (const selector of selectors) {
            try {
                const table = this.#parseTable($, selector, columnsToParse);
                this.#validateTableData(table);
                tables.push(table);
                processedTables++;

                // Optional progress update
                this.#warningHandler.warn(
                    'TableParser',
                    `Successfully processed table ${processedTables}/${totalTables}`
                );
            } catch (error) {
                this.#warningHandler.warn(
                    'TableParser',
                    `Failed to parse table ${processedTables + 1}/${totalTables} with selector "${selector}": ${error.message}`
                );
            }
        }

        if (tables.length === 0) {
            throw new Error('No valid tables were found to parse');
        }

        const combinedData = this.#combineTablesByTeam(tables);

        if (params.teams) {
            try {
                return this.#filterDataByTeams(combinedData, params.teams);
            } catch (error) {
                this.#warningHandler.warn('TableParser',
                    `Team filtering failed: ${error.message}. Returning all available teams.`);
                return combinedData;
            }
        }

        // Success message
        this.#warningHandler.warn(
            'TableParser',
            `Processing complete. Successfully parsed ${tables.length}/${totalTables} tables.`
        );

        return combinedData;
    }

    /**
     * Retrieves an array of selectors based on the provided table definitions and parameters.
     *
     * @param {Array} tableDefs - An array of table definition objects. Each object should have a `selector` property,
     *                            which can be either a function or a string.
     * @param {Object} params - Parameters to be passed to the selector function if the selector is a function.
     * @returns {Array} An array of selectors.
     * @throws {Error} Throws an error if a selector cannot be retrieved.
     * @private
     */
    #getSelectors(tableDefs, params) {
        const selectors = [];
        for (const tableType of tableDefs) {
            try {
                const selector = typeof tableType.selector === 'function'
                    ? tableType.selector(params)
                    : tableType.selector;
                selectors.push(selector);
            } catch (error) {
                throw new Error(`Failed to get selector: ${error.message}`);
            }
        }
        return selectors;
    }

    /**
     * Checks if the given selector string contains the word 'against'.
     *
     * @param {string} selector - The selector string to check.
     * @returns {boolean} True if the selector contains 'against', false otherwise.
     * @private
     */
    #isAgainstTable(selector) {
        return (
            selector &&
            typeof selector === 'string' &&
            selector.toLowerCase().includes('against')
        );
    }


    /**
     * Extracts available columns from the provided selectors.
     *
     * @param {cheerio} $ - The Cheerio instance for DOM manipulation.
     * @param {string[]} selectors - An array of CSS selectors to identify the containers with data-stat attributes.
     * @returns {string[]} An array of unique column names found within the specified selectors.
     * @throws {Error} Throws an error if no columns are found in the table.
     * @private
     */
    #getAvailableColumns($, selectors) {
        const columns = new Set();

        for (const selector of selectors) {
            const containerSelector = selector.split('>')[0].trim();

            $(`${containerSelector} [data-stat]`).each((_, element) => {
                const dataStat = $(element).attr('data-stat');
                if (dataStat) {
                    this.#isAgainstTable(selector) && !(dataStat === 'team')
                        ? columns.add(`against_${dataStat}`)
                        : columns.add(dataStat);
                }
            });
        }

        if (columns.size === 0) {
            throw new Error(
                'No columns found in table. Please check your parameters.\n' +
                'Or, data is probably not available for the given parameters.'
            );
        }

        return Array.from(columns);
    }

    /**
     * Parses a table from the given selector and columns.
     *
     * @param {cheerio} $ - The Cheerio instance for DOM manipulation.
     * @param {string} selector - The selector for the table to parse.
     * @param {Array<string>} columns - The columns to extract from the table.
     * @returns {Array<Object>} An array of parsed rows, where each row is an object with column names as keys.
     * @private
     */
    #parseTable($, selector, columns) {
        const rows = [];
        const isAgainstTable = this.#isAgainstTable(selector);

        const finalColumns = isAgainstTable
            ? columns
                .filter(col => col === 'team' || col.startsWith('against_'))
                .map(col => col === 'team' ? col : col.replace(/^against_/, ""))
            : columns;

        $(selector).each((_, element) => {
            const row = this.#parseRow($, element, finalColumns, isAgainstTable);
            if (Object.keys(row).length > 0) {
                rows.push(row);
            }
        });

        return rows;
    }

    /**
     * Parses a row of data from an HTML element and returns an object representing the row.
     *
     * @param {cheerio} $ - The Cheerio instance for DOM manipulation.
     * @param {CheerioElement} element - The HTML element representing the row to be parsed.
     * @param {Array<string>} finalColumns - An array of column names to be extracted from the row.
     * @param {boolean} isAgainstTable - A flag indicating if the table is an "against" table.
     * @returns {Object} An object representing the parsed row, with column names as keys and cell texts as values.
     * @private
     */
    #parseRow($, element, finalColumns, isAgainstTable) {
        return finalColumns.reduce((row, col, index) => {
            const column = finalColumns[index];
            const cell = this.#findCell($, element, column);

            if (cell.length > 0) {
                let cellText = cell.text().trim();
                if (isAgainstTable && column === 'team') {
                    cellText = cellText.replace(/^vs\s+/i, '');
                }
                col = col !== 'team' && isAgainstTable
                    ? `against_${col}`
                    : col
                row[col] = cellText;
            }
            return row;
        }, {});
    }

    /**
     * Finds a table cell (either <th> or <td>) within a given element that matches the specified column data attribute.
     *
     * @param {cheerio} $ - The Cheerio instance for DOM manipulation.
     * @param {Object} element - The DOM element to search within.
     * @param {string} col - The value of the data-stat attribute to match.
     * @returns {Object} - The jQuery object containing the matched cell(s), or an empty jQuery object if no match is found.
     * @private
     */
    #findCell($, element, col) {
        const thCell = $(element).find(`th[data-stat="${col}"]`);
        if (thCell.length > 0) return thCell;
        const tdCell = $(element).find(`td[data-stat="${col}"]`);
        if (tdCell.length > 0) return tdCell;
        return $();
    }

    /**
     * Validates the provided table data.
     * Throws an error if the table is empty.
     *
     * @param {Array} table - The table data to validate.
     * @throws {Error} If the table is empty.
     */
    #validateTableData(table) {
        if (table.length === 0) {
            throw new Error('No data found in table. Please check your parameters.');
        }
    }

    /**
     * Validates the user-provided columns against the available columns.
     * Filters out invalid columns and logs a warning if any invalid columns are found.
     *
     * @param {string[]} userColumns - The columns provided by the user.
     * @param {string[]} availableColumns - The columns that are available for validation.
     * @returns {string[]} - The valid columns that are present in the available columns.
     * @private
     */
    #validateCols(userColumns, availableColumns) {
        const validCols = userColumns.filter(col => availableColumns.includes(col));
        const invalidCols = userColumns.filter(col => !availableColumns.includes(col));

        if (invalidCols.length > 0) {
            this.#warningHandler.warn(
                'TableParser',
                `Invalid column(s): ${invalidCols.join(', ')}. ` +
                `Skipping column and continuing execution.`
            );
        }

        return validCols;
    }

    /**
     * Combines multiple tables of football data by team.
     *
     * @param {Array<Array<Object>>} tables - An array of tables, where each table is an array of row objects.
     * Each row object contains data about a football team, including a 'team' property.
     * @returns {Object} An object where each key is a team name and the value is an object containing the combined data for that team.
     * @private
     */
    #combineTablesByTeam(tables) {
        const combinedData = {};

        for (const table of tables) {
            for (const row of table) {
                const teamName = row.team;
                if (teamName) {
                    if (!combinedData[teamName]) combinedData[teamName] = {};
                    for (const [key, value] of Object.entries(row)) {
                        if (key !== 'team') {
                            combinedData[teamName][key] = value;
                        }
                    }
                }
            }
        }

        return combinedData;
    }

    #filterDataByTeams(combinedData, teams) {
        if (!teams || teams.length === 0) {
            return combinedData;
        }

        const filteredData = {};
        for (const team of teams) {
            if (combinedData[team]) {
                filteredData[team] = combinedData[team];
            } else {
                throw new Error(`Team '${team}' not found in the data.`);
            }
        }
        return filteredData;
    }

}


export { TableParser };
