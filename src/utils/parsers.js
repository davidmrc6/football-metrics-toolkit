import * as cheerio from 'cheerio';
import { WarningHandler } from '../client/WarningHandler.js';

class TableParser {
    #warningHandler;

    constructor(options = {}) {
        this.#warningHandler = new WarningHandler(options);
    }

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

    #isAgainstTable(selector) {
        return (
            selector &&
            typeof selector === 'string' &&
            selector.toLowerCase().includes('against')
        );
    }

    #getAvailableColumns($, selectors) {
        const columns = new Set();

        for (const selector of selectors) {
            const containerSelector = selector.split('>')[0].trim();
            $(`${containerSelector} [data-stat]`).each((_, element) => {
                const dataStat = $(element).attr('data-stat');
                if (dataStat) {
                    this.#isAgainstTable(selector)
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

    #findCell($, element, col) {
        const thCell = $(element).find(`th[data-stat="${col}"]`);
        if (thCell.length > 0) return thCell;
        const tdCell = $(element).find(`td[data-stat="${col}"]`);
        if (tdCell.length > 0) return tdCell;
        return $();
    }

    #validateTableData(table) {
        if (table.length === 0) {
            throw new Error('No data found in table. Please check your parameters.');
        }
    }

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
