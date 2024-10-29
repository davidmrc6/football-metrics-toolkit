import * as cheerio from 'cheerio';

export class TableParser {
    parse(html, params) {
        const $ = cheerio.load(html);

        const tables = [];

        const selectors = []; // Array of selectors
        for (const tableType of params.tables) {

            const selector = this.#getSelector(tableType, params);
            selectors.push(selector);
        }

        const availableColumns = [];

        for (const selector of selectors) {
            availableColumns.push(...this.#getAvailableColumns($, selector));
        }

        for (const selector of selectors) {
            const columnsToParse = this.#validateAndGetColumns(params.cols, availableColumns);
            const table = this.#parseTable($, selector, columnsToParse);

            this.#validateTableData(table);

            tables.push(table);
        }

        const combinedData = this.#combineTablesByTeam(tables);
        return combinedData;
    }

    #getSelector(tableType, params) {
        return typeof tableType.selector === 'function'
            ? tableType.selector(params)
            : tableType.selector;
    }

    #getAvailableColumns($, selector) {
        const columns = new Set();
        const containerSelector = selector.split('>')[0].trim();

        $(`${containerSelector} [data-stat]`).each((_, element) => {
            const dataStat = $(element).attr('data-stat');
            if (dataStat) columns.add(dataStat);
        });


        if (columns.size === 0) {
            throw new Error(
                'No columns found in table. Please check your parameters.\n' +
                'Or, data is probably not available for the given parameters.'
            );
        }

        return Array.from(columns);
    }

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

    #parseTable($, selector, columns) {
        const rows = [];
        const isAgainstTable = this.#isAgainstTable(selector);

        // If it's an "AGAINST" table, modify column names
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

    #parseRow($, element, finalColumns, originalColumns, isAgainstTable) {
        return finalColumns.reduce((row, col, index) => {
            const originalCol = originalColumns[index];
            const cell = this.#findCell($, element, originalCol);

            if (cell.length > 0) {
                let cellText = cell.text().trim();

                if (isAgainstTable && originalCol === 'team') {
                    // Remove "vs " prefix
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

    #isAgainstTable(selector) {
        return (
            selector &&
            typeof selector === 'string' &&
            selector.toLowerCase().includes('against')
        );
    }

    #combineTablesByTeam(tables) {
        const combinedData = {};

        tables.forEach(table => {
            table.forEach(row => {
                const teamName = row.team;

                if (!teamName) return;

                if (!combinedData[teamName]) combinedData[teamName] = {};

                Object.entries(row).forEach(([key, value]) => {
                    if (key !== 'team') {
                        combinedData[teamName][key] = value;
                    }
                });
            });
        });

        return combinedData;
    }
}
