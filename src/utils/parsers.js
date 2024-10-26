import * as cheerio from 'cheerio';
import { leagueToIndex } from './maps.js';
import {
    DefaultGoalkeepingStats,
    DefaultLeagueCols,
    DefaultLeagueHomeAwayCols,
    DefaultStandardStats
} from './types.js';
import {
    squadGoalkeepingStats,
    squadGoalkeepingStatsAgainst,
    squadStandardStats,
    squadStandardStatsAgainst,
} from './constants.js';


function abstractParser(html, params, defaultCols, tableIndex) {
    const $ = cheerio.load(html);
    const rows = $(tableIndex);
    const table = [];

    rows.each((_, element) => {
        const row = parseRow($, element, params.cols, defaultCols);
        if (Object.keys(row).length > 0) {
            table.push(row);
        }
    });

    validateTableData(table);
    return table;
}


function parseRow($, element, cols, defaultCols) {
    const row = {};

    cols.forEach(col => {
        validateColumn(col, defaultCols);
        const cell = findCell($, element, col);
        validateCell(cell, col);
        row[col] = cell.text().trim();
    });

    return row;
}

function findCell($, element, col) {
    // Try finding td first, then th if td doesn't exist
    const tdCell = $(element).find(`td[data-stat="${col}"]`);
    const thCell = $(element).find(`th[data-stat="${col}"]`);

    return tdCell.length > 0 ? tdCell : thCell;
}


function validateColumn(col, defaultCols) {
    if (!defaultCols.includes(col)) {
        throw new Error(`Unknown column mapping for: ${col}`);
    }
}


function validateCell(cell, col) {
    if (cell.length === 0) {
        throw new Error(
            `Could not find column with data stat ${col}. ` +
            'Please verify the column exists in the table.'
        );
    }
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
        DefaultLeagueCols,
        buildTableSelector(params, 'overall')
    );
}

// Parse Home/Away standings
function parseHomeAwayStandings(html, params) {
    return abstractParser(
        html,
        params,
        DefaultLeagueHomeAwayCols,
        buildTableSelector(params, 'home_away')
    );
}

// Parse Squad Standard Stats
function parseSquadStandardStats(html, params) {
    return abstractParser(
        html,
        params,
        DefaultStandardStats,
        squadStandardStats
    );
}

// Parse Squad Standard Stats Against
function parseSquadStandardStatsAgainst(html, params) {
    return abstractParser(
        html,
        params,
        DefaultStandardStats,
        squadStandardStatsAgainst,
    )
}

function parseSquadGoalkeepingStats(html, params) {
    return abstractParser(
        html,
        params,
        DefaultGoalkeepingStats,
        squadGoalkeepingStats,
    )
}

function parseSquadGoalkeepingStatsAgainst(html, params) {
    return abstractParser(
        html,
        params,
        DefaultGoalkeepingStats,
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
