import { LEAGUE_TO_INDEX } from "./types.js";
import { TableType } from "./types.js";

/**
 * Validates and normalizes the parameters for a football data scraper.
 *
 * @param {Object} params - The parameters to validate.
 * @returns {Object} The validated and normalized parameters.
 */
function validateParams(params) {
    const { league, season, team, teams, table, tables, cols } = params;

    validateRequiredParams(league, season);
    validateLeague(league);
    validateSeason(season);

    const normalizedTables = validateAndNormalizeTables(table, tables);
    const normalizedTeams = validateAndNormalizeTeams(team, teams);
    validateCols(cols);

    return {
        league,
        leagueIndex: LEAGUE_TO_INDEX[league],
        season,
        teams: normalizedTeams,
        tables: normalizedTables,
        cols,
    };
}

/**
 * Validates that the required parameters 'league' and 'season' are provided.
 *
 * @param {string} league - The league identifier.
 * @param {string} season - The season identifier.
 * @throws {Error} Throws an error if 'league' or 'season' is not provided.
 */
function validateRequiredParams(league, season) {
    if (!league) {
        throw new Error(`The 'league' parameter is required.`);
    }
    if (!season) {
        throw new Error(`The 'season' parameter is required.`);
    }
}

/**
 * Validates if the provided league is supported.
 *
 * @param {string} league - The league to validate.
 * @throws {Error} Throws an error if the league is not supported.
 */
function validateLeague(league) {
    if (!Object.hasOwn(LEAGUE_TO_INDEX, league)) {
        const leagues = Object.keys(LEAGUE_TO_INDEX);
        throw new Error(
            `Invalid input for 'league', or the league '${league}' is not yet supported.` +
            ` Allowed parameters are: ${leagues.join(', ')}`
        );
    }
}

/**
 * Validates the format of a football season string.
 * The expected format is 'XXXX-YYYY', where XXXX and YYYY are consecutive years.
 *
 * @param {string} season - The season string to validate.
 * @throws {Error} Throws an error if the season format is invalid.
 */
function validateSeason(season) {
    const seasonRegex = /^(\d{4})-(\d{4})$/;
    if (!seasonRegex.test(season)) {
        throw new Error(`Invalid season format '${season}'. Expected format is 'XXXX-YYYY', with consecutive years.`);
    }

    const [_, startYear, endYear] = season.match(seasonRegex).map(Number);
    validateSeasonYears(startYear, endYear, season);
}

/**
 * Validates the given season years.
 *
 * @param {number} startYear - The starting year of the season.
 * @param {number} endYear - The ending year of the season.
 * @param {string} season - The season string in the format 'YYYY-YYYY'.
 * @throws {Error} If the start year is before 1888.
 * @throws {Error} If the end year is not consecutive to the start year.
 */
function validateSeasonYears(startYear, endYear, season) {
    if (startYear < 1888) {
        throw new Error(`No data is available before 1888. The provided start year '${startYear}' is too early.`);
    }
    if (endYear !== startYear + 1) {
        throw new Error(`Invalid season '${season}'. The years should be consecutive, like '1999-2000'.`);
    }
}

/**
 * Validates and normalizes the provided table or tables.
 *
 * This function ensures that only one of the parameters, `table` or `tables`, is provided.
 * It then normalizes the tables and validates their types.
 *
 * @param {Object} [table] - A single table object to be validated and normalized.
 * @param {Object[]} [tables] - An array of table objects to be validated and normalized.
 * @throws {Error} Throws an error if both `table` and `tables` parameters are provided.
 * @returns {Object[]} The normalized tables.
 */
function validateAndNormalizeTables(table, tables) {
    if (table && tables) {
        throw new Error(`Cannot provide both 'table' and 'tables' parameters. Use either one.`);
    }

    const normalizedTables = getNormalizedTables(table, tables);
    validateTableTypes(normalizedTables);

    return normalizedTables;
}

/**
 * Normalizes the input tables by returning a single table or an array of tables.
 * If a single table is provided, it returns an array containing that table.
 * If an array of tables is provided, it validates the array and returns it.
 * If neither is provided, it returns all table types.
 *
 * @param {Object} [table] - A single table object.
 * @param {Object[]} [tables] - An array of table objects.
 * @returns {Object[]} An array of table objects.
 */
function getNormalizedTables(table, tables) {
    if (table) {
        return [table];
    }
    if (tables) {
        validateTablesArray(tables);
        return tables;
    }
    return getAllTableTypes();
}

/**
 * Validates that the input is an array of table types.
 *
 * @param {Array} tables - The input to validate.
 * @throws {Error} Throws an error if the input is not an array.
 */
function validateTablesArray(tables) {
    if (!Array.isArray(tables)) {
        throw new Error(`Invalid input for 'tables'. Must be an array of table types.`);
    }
}

/**
 * Validates an array of table types.
 *
 * This function checks if the provided array of table types is not empty and
 * if each table type in the array is valid. If the array is empty or contains
 * an invalid table type, an error is thrown.
 *
 * @param {Array} normalizedTables - The array of table types to validate.
 * @throws {Error} If the array is empty or contains an invalid table type.
 */
function validateTableTypes(normalizedTables) {
    if (normalizedTables.length === 0) {
        throw new Error(`No valid table types found.`);
    }

    for (const tableType of normalizedTables) {
        if (!isValidTableType(tableType)) {
            throw new Error(`Invalid table type provided: ${JSON.stringify(tableType)}`);
        }
    }
}

/**
 * Validates and normalizes the input parameters 'team' and 'teams'.
 *
 * This function ensures that only one of 'team' or 'teams' is provided.
 * If both are provided, it throws an error. If 'team' is provided, it
 * returns an array containing the single team. If 'teams' is provided,
 * it validates the array and returns it.
 *
 * @param {string} [team] - A single team name.
 * @param {string[]} [teams] - An array of team names.
 * @returns {string[]|null} - An array containing the team(s) or null if neither is provided.
 * @throws {Error} - Throws an error if both 'team' and 'teams' are provided.
 */
function validateAndNormalizeTeams(team, teams) {
    if (team && teams) {
        throw new Error(`Cannot provide both 'team' and 'teams' parameters. Use either one.`);
    }

    if (team) {
        return [team];
    }
    if (teams) {
        validateTeamsArray(teams);
        return teams;
    }
    return null;
}

/**
 * Validates that the input is an array of team names.
 *
 * @param {Array} teams - The input to validate.
 * @throws {Error} Throws an error if the input is not an array.
 */
function validateTeamsArray(teams) {
    if (!Array.isArray(teams)) {
        throw new Error(`Invalid input for 'teams'. Must be an array of team names.`);
    }
}

/**
 * Validates that the input is an array.
 *
 * @param {Array} cols - The input to validate.
 * @throws {Error} Throws an error if the input is not an array.
 */
function validateCols(cols) {
    if (cols && !Array.isArray(cols)) {
        throw new Error(`Invalid input for 'cols'. Must be an array object.`);
    }
}

/**
 * Checks if the provided table type is valid by searching for it within the TableType object.
 *
 * @param {string} tableType - The table type to validate.
 * @returns {boolean} - Returns true if the table type is found within the TableType object, otherwise false.
 */
function isValidTableType(tableType) {
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

/**
 * Recursively extracts all table types from the given object.
 *
 * @param {Object} [obj=TableType] - The object to extract table types from. Defaults to the global TableType object.
 * @returns {Array} An array of table type objects that contain a `selector` property.
 */
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
