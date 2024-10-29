import * as cheerio from 'cheerio';

/**
 * Class representing a TableParser.
 *
 * The TableParser class is responsible for parsing HTML tables using the Cheerio library.
 * It extracts data based on provided parameters and combines the parsed data by the 'team key.
 *
 * @class
 */
class TableParser {

    /**
     * Parses the provided HTML and extracts table data based on the given parameters.
     *
     * @param {string} html - The HTML content to parse.
     * @param {Object} params - The parameters for parsing.
     * @param {Array<string>} params.tables - The table selectors to parse.
     * @param {Array<string>} params.cols - The columns to extract from the tables.
     * @returns {Array<Object>} - An array of combined table data by team.
     */
    parse(html, params) {
        const $ = cheerio.load(html);

        const tables = [];
        const selectors = this.#getSelectors(params.tables, params);
        const availableColumns = this.#getAvailableColumns($, selectors);
        const columnsToParse = this.#validateAndGetColumns(params.cols, availableColumns);

        for (const selector of selectors) {
            const table = this.#parseTable($, selector, columnsToParse);
            this.#validateTableData(table);
            tables.push(table);
        }

        const combinedData = this.#combineTablesByTeam(tables);

        if (params.teams) {
            return this.#filterDataByTeams(combinedData, params.teams);
        }

        return combinedData;
    }


    /**
     * Retrieves an array of selectors based on the provided table definitions and parameters.
     *
     * @param {Array} tableDefs - An array of table definition objects. Each object should have a `selector` property which can be either a function or a string.
     * @param {Object} params - Parameters to be passed to the selector function if the selector is a function.
     * @returns {Array} An array of selectors derived from the table definitions.
     * @private
     */
    #getSelectors(tableDefs, params) {
        return tableDefs.map(tableType => {
            return typeof tableType.selector === 'function'
                ? tableType.selector(params)
                : tableType.selector;
        });
    }

    /**
     * Extracts available columns from the provided selectors.
     *
     * @param {Object} $ - The jQuery-like object used for DOM manipulation.
     * @param {string[]} selectors - An array of CSS selectors to identify the containers.
     * @returns {string[]} - An array of unique column names found within the specified selectors.
     * @throws {Error} - Throws an error if no columns are found in the table.
     * @private
     */
    #getAvailableColumns($, selectors) {
        const columns = new Set();

        for (const selector of selectors) {
            const containerSelector = selector.split('>')[0].trim();
            $(`${containerSelector} [data-stat]`).each((_, element) => {
                const dataStat = $(element).attr('data-stat');
                if (dataStat) columns.add(dataStat);
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
     * Validates the user-provided columns against the available columns and returns the valid columns.
     * Throws an error if any of the user-provided columns are invalid.
     *
     * @param {string[]} userCols - The columns provided by the user.
     * @param {string[]} availableColumns - The list of available columns.
     * @returns {string[]} - The validated columns.
     * @throws {Error} - If any of the user-provided columns are invalid.
     * @private
     */
    #validateAndGetColumns(userCols, availableColumns) {
        if (!userCols) return availableColumns;

        const invalidColumns = userCols.filter(col => !availableColumns.includes(col));
        if (invalidColumns.length) {
            throw new Error(
                `Invalid columns: ${invalidColumns.join(', ')}\n` +
                `Available columns: ${availableColumns.join(', ')}`
            );
        }

        return userCols;
    }

    /**
     * Parses a table from the given selector and columns.
     *
     * @param {Object} $ - The jQuery-like object for DOM manipulation.
     * @param {string} selector - The CSS selector for the table to parse.
     * @param {Array<string>} columns - The columns to extract from the table.
     * @returns {Array<Object>} An array of objects representing the parsed rows.
     * @private
     */
    #parseTable($, selector, columns) {
        const rows = [];
        const isAgainstTable = this.#isAgainstTable(selector);
        const finalColumns = isAgainstTable
            ? columns.map(col => col === 'team' ? col : `against_${col}`)
            : columns;

        $(selector).each((_, element) => {
            const row = this.#parseRow($, element, finalColumns, columns, isAgainstTable);
            if (Object.keys(row).length > 0) {
                rows.push(row);
            }
        });

        return rows;
    }

    /**
     * Parses a row from an HTML table element and maps it to the specified columns.
     *
     * @param {CheerioStatic} $ - The Cheerio instance for DOM manipulation.
     * @param {CheerioElement} element - The HTML element representing the row to be parsed.
     * @param {Array<string>} finalColumns - The array of final column names to map the parsed data to.
     * @param {Array<string>} originalColumns - The array of original column names to find in the HTML element.
     * @param {boolean} isAgainstTable - A flag indicating if the table is an "against" table, which requires special handling for the 'team' column.
     * @returns {Object} An object representing the parsed row, with keys as final column names and values as the corresponding cell text.
     * @private
     */
    #parseRow($, element, finalColumns, originalColumns, isAgainstTable) {
        return finalColumns.reduce((row, col, index) => {
            const originalCol = originalColumns[index];
            const cell = this.#findCell($, element, originalCol);
            if (cell.length > 0) {
                let cellText = cell.text().trim();
                if (isAgainstTable && originalCol === 'team') {
                    cellText = cellText.replace(/^vs\s+/i, '');
                }
                row[col] = cellText;
            }
            return row;
        }, {});
    }

    /**
     * Finds a table cell (either <th> or <td>) within a given element based on the specified column data attribute.
     *
     * @param {function} $ - The jQuery-like selector function.
     * @param {Object} element - The DOM element to search within.
     * @param {string} col - The data attribute value to match (e.g., "data-stat" value).
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
     *
     * @param {Array} table - The table data to validate.
     * @throws {Error} Throws an error if the table is empty.
     * @private
     */
    #validateTableData(table) {
        if (table.length === 0) {
            throw new Error('No data found in table. Please check your parameters.');
        }
    }


    /**
     * Checks if the given selector string contains the word 'against'.
     *
     * @param {string} selector - The selector string to check.
     * @returns {boolean} - Returns true if the selector contains 'against', otherwise false.
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
     * Combines multiple tables of football data by team.
     *
     * @param {Array<Array<Object>>} tables - An array of tables, where each table is an array of row objects.
     * Each row object contains data for a specific team.
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

    /**
     * Filters the combined data by the specified teams.
     *
     * @param {Object} combinedData - The combined data object containing data for all teams.
     * @param {Array<string>} teams - An array of team names to filter the data by.
     * @returns {Object} The filtered data object containing only the specified teams.
     * @throws {Error} If a specified team is not found in the combined data.
     */
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
