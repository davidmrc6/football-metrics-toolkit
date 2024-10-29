import { LEAGUE_TO_INDEX } from "./types.js";
import { TableType } from "./types.js";

function validateParams(params) {
    const { league, season, table, tables, cols } = params;

    // Basic required params validation
    if (!league) {
        throw new Error(`The 'league' parameter is required.`);
    }
    if (!season) {
        throw new Error(`The 'season' parameter is required.`);
    }

    // Handle table parameters
    let normalizedTables;
    if (table && tables) {
        throw new Error(`Cannot provide both 'table' and 'tables' parameters. Use either one.`);
    } else if (table) {
        normalizedTables = [table];
    } else if (tables) {
        if (!Array.isArray(tables)) {
            throw new Error(`Invalid input for 'tables'. Must be an array of table types.`);
        }
        normalizedTables = tables;
    } else {
        // If neither table nor tables is provided, get all possible tables
        normalizedTables = getAllTableTypes();
    }

    // Validate tables is not empty (shouldn't happen with getAllTableTypes but good practice)
    if (normalizedTables.length === 0) {
        throw new Error(`No valid table types found.`);
    }

    // Validate each table type is valid
    for (const tableType of normalizedTables) {
        if (!isValidTableType(tableType)) {
            throw new Error(`Invalid table type provided: ${JSON.stringify(tableType)}`);
        }
    }

    // Validate cols parameter
    if (cols && !Array.isArray(cols)) {
        throw new Error(`Invalid input for 'cols'. Must be an array object.`);
    }

    // Validate league
    if (!Object.hasOwn(LEAGUE_TO_INDEX, league)) {
        const leagues = Object.keys(LEAGUE_TO_INDEX);
        throw new Error(
            `Invalid input for 'league', or the league '${league}' is not yet supported.` +
            ` Allowed parameters are: ${leagues.join(', ')}`
        );
    }

    // Validate season
    const seasonRegex = /^(\d{4})-(\d{4})$/;
    if (!seasonRegex.test(season)) {
        throw new Error(`Invalid season format '${season}'. Expected format is 'XXXX-YYYY', with consecutive years.`);
    }
    const [_, startYear, endYear] = season.match(seasonRegex).map(Number);
    if (startYear < 1888) {
        throw new Error(`No data is available before 1888. The provided start year '${startYear}' is too early.`);
    }
    if (endYear !== startYear + 1) {
        throw new Error(`Invalid season '${season}'. The years should be consecutive, like '1999-2000'.`);
    }

    return {
        league,
        leagueIndex: LEAGUE_TO_INDEX[league],
        season,
        tables: normalizedTables,
        cols,
    };
}



// Helper function to validate if a table type is valid
function isValidTableType(tableType) {
    // Recursively check if the table type exists in TableType
    function findInTableType(obj, target) {
        if (!obj || typeof obj !== 'object') return false;

        for (const value of Object.values(obj)) {
            if (value === target) return true;
            if (typeof value === 'object') {
                if (findInTableType(value, target)) return true;
            }
        }
        return false;
    }

    return findInTableType(TableType, tableType);
}

function getAllTableTypes(obj = TableType) {
    const tables = [];

    function extractTables(obj) {
        for (const value of Object.values(obj)) {
            if (value && typeof value === 'object') {
                if (value.selector) {
                    tables.push(value);
                } else {
                    extractTables(value);
                }
            }
        }
    }

    extractTables(obj);
    return tables;
}


export { validateParams };
