import * as cheerio from 'cheerio';

export class TableParser {
    parse(html, params, tableType) {
        const $ = cheerio.load(html);
        const selector = this.#getSelector(tableType, params);

        const availableColumns = this.#getAvailableColumns($, selector);
        const columnsToParse = this.#validateAndGetColumns(params.cols, availableColumns);
        const table = this.#parseTable($, selector, columnsToParse);

        this.#validateTableData(table);
        return table;
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

        // If columns object is empty, throw an error
        if (columns.size === 0) {
            throw new Error('No columns found in table. Please check your parameters.\n' +
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
        $(selector).each((_, element) => {
            const row = this.#parseRow($, element, columns);
            if (Object.keys(row).length > 0) {
                rows.push(row);
            }
        });
        return rows;
    }

    #parseRow($, element, columns) {
        return columns.reduce((row, col) => {
            const cell = this.#findCell($, element, col);
            if (cell.length > 0) {
                row[col] = cell.text().trim();
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
}
