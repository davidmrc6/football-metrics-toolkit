import * as cheerio from 'cheerio';
import { statToDataStat } from './maps.js';


function parseLeagueStandings(index, season, html, cols) {
    const $ = cheerio.load(html);
    const table = [];

    const rows = $(`#results${season}${index}1_overall > tbody > tr`)

    rows.each((index, element) => {
        const row = {};

        cols.forEach(col => {
            if (!statToDataStat[col]) {
                throw new Error(`Unknown column mapping for: ${col}`);
            }

            const dataStat = statToDataStat[col];
            const cell = $(element).find(`td[data-stat="${dataStat}"]`);

            if (cell.length === 0) {
                throw new Error(
                    `Could not find column with data stat ${dataStat}` +
                    `for column ${col} in row ${rowIndex + 1}`
                );
            }

            row[col] = cell
                .text()
                .trim();
        });
        if (Object.keys(row).length > 0) {
            table.push(row);
        }
    });

    if (table.length === 0) {
        throw new Error(
            `No data found in table.` +
            `Please check the table selector and season/index values.`
        );
    }

    return table;
}

export { parseLeagueStandings };
