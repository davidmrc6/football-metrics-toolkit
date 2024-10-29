import * as cheerio from 'cheerio';

class TableParser {

    constructor() {
        this.warnings = [];
    }

    #addWarning(message) {
        this.warnings.push(message);
        console.warn(`[TableParser] ${message}`);
    }

    getWarnings() {
        return this.warnings;
    }

    clearWarnings() {
        this.warnings = [];
    }





    parse(html, params) {
        this.clearWarnings(); // Move warning handler to a different file?

        const $ = cheerio.load(html);
        const tables = [];
        const selectors = this.#getSelectors(params.tables, params);

        const columnsToParse = params.cols ? params.cols : this.#getAvailableColumns($, selectors);

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

    #getSelectors(tableDefs, params) {
        const selectors = [];
        for (const tableType of tableDefs) {
            try {
                const selector = typeof tableType.selector === 'function'
                    ? tableType.selector(params)
                    : tableType.selector;
                selectors.push(selector);
            } catch (error) {
                this.#addWarning(`Failed to get selector: ${error.message}`);
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
        const isAgainstTable = this.#isAgainstTable;
        const finalColumns = isAgainstTable
            ? columns.map(col => col === 'team' ? col : col.replace(/^against_/, ""))
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
                if (isAgainstTable && originalCol === 'team') {
                    cellText = cellText.replace(/^vs\s+/i, '');
                }
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
