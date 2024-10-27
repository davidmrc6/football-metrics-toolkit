import * as cheerio from 'cheerio';
import { leagueToIndex } from './maps.js';
import {
    squadGoalkeepingStats,
    squadGoalkeepingStatsAgainst,
    squadStandardStats,
    squadStandardStatsAgainst,
} from './constants.js';


function abstractParser(html, params, tableIndex) {
    const $ = cheerio.load(html);
    const rows = $(tableIndex);
    const table = [];

    // Get all available columns from the table headers
    const availableColumns = getAvailableColumns($, tableIndex);

    // If user has specified columns, validate they exist in the table
    if (params.cols) {
        validateUserColumns(params.cols, availableColumns);
    }

    // Use either user-specified columns or all available columns
    const columnsToParse = params.cols || availableColumns;

    rows.each((_, element) => {
        const row = parseRow($, element, columnsToParse);
        if (Object.keys(row).length > 0) {
            table.push(row);
        }
    });

    validateTableData(table);
    return table;
}

function getAvailableColumns($, tableIndex) {
    const columns = new Set();

    const tableContainer = tableIndex.split('>')[0].trim();

    $(`${tableContainer} th[data-stat], ${tableContainer} td[data-stat]`).each((_, element) => {
        const dataStat = $(element).attr('data-stat');
        if (dataStat) {
            columns.add(dataStat);
        }
    });
    return Array.from(columns);
}

function validateUserColumns(userCols, availableColumns) {
    const invalidColumns = userCols.filter(col => !availableColumns.includes(col));
    if (invalidColumns.length > 0) {
        throw new Error(
            `The following columns were requested but don't exist in the table: ${invalidColumns.join(', ')}\n` +
            `Available columns are: ${availableColumns.join(', ')}`
        );
    }
}


function parseRow($, element, cols) {
    const row = {};

    cols.forEach(col => {
        const cell = findCell($, element, col);
        if (cell.length > 0) {
            row[col] = cell.text().trim();
        }
    });

    return row;
}

function findCell($, element, col) {
    // Try finding td first, then th if td doesn't exist
    const tdCell = $(element).find(`td[data-stat="${col}"]`);
    const thCell = $(element).find(`th[data-stat="${col}"]`);

    return tdCell.length > 0 ? tdCell : thCell;
}

function validateTableData(table) {
    if (table.length === 0) {
        throw new Error(
            'No data found in table. ' +
            'Please check the table selector and season/index values.'
        );
    }
}


function buildTableSelector(params, type) {
    const index = leagueToIndex[params.league];
    return `#results${params.season}${index}1_${type} > tbody > tr`;
}

// ======================================================================================
// PARSERS

// Parse league standings
function parseLeagueStandings(html, params) {
    return abstractParser(
        html,
        params,
        buildTableSelector(params, 'overall')
    );
}

// Parse Home/Away standings
function parseHomeAwayStandings(html, params) {
    return abstractParser(
        html,
        params,
        buildTableSelector(params, 'home_away')
    );
}

// Parse Squad Standard Stats
function parseSquadStandardStats(html, params) {
    return abstractParser(
        html,
        params,
        squadStandardStats,
    );
}

// Parse Squad Standard Stats Against
function parseSquadStandardStatsAgainst(html, params) {
    return abstractParser(
        html,
        params,
        squadStandardStatsAgainst,
    )
}

function parseSquadGoalkeepingStats(html, params) {
    return abstractParser(
        html,
        params,
        squadGoalkeepingStats,
    )
}

function parseSquadGoalkeepingStatsAgainst(html, params) {
    return abstractParser(
        html,
        params,
        squadGoalkeepingStatsAgainst,
    )
}



export {
    parseLeagueStandings,
    parseHomeAwayStandings,
    parseSquadStandardStats,
    parseSquadStandardStatsAgainst,
    parseSquadGoalkeepingStats,
    parseSquadGoalkeepingStatsAgainst,
};
