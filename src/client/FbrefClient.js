import { buildLeagueUrl } from '../utils/helpers.js';
import { TableParser } from '../utils/parsers.js'
import { fetchTableData } from './fetcher.js';
import { validateParams } from '../utils/validators.js';
import { TableType } from '../utils/types.js';


class FbrefClient {
    #parser;

    constructor() {
        this.#parser = new TableParser();
    };


    // Private fetch table method
    // Change name to fetchTables() (or something generic like fetchData()?), make the method public, allow the user to
    // pass in either a single table type, or an array of table types (Probably inside of params). then, need
    // to update the validateParams() to account for this.
    // IDEA: if single 'table' param is passed, transform to array of just one table in 'validateParams'
    async #fetchTable(params, tableType) {
        const validatedParams = validateParams(params);
        return fetchTableData({
            params: validatedParams,
            urlBuilder: buildLeagueUrl,
            parser: (html, params) => this.#parser.parse(html, params, tableType)
        })
    }

    // IDEA: To avoid a lot of short methods in FbrefClient, make user run a generic function
    // by passing in a table type (or an array of tables, or an empty cols parameter to parse
    // all available table stats )

    // Get comprehensive stats
    // The user inputs an array of `cols`, and the client parses all tables available.
    // Or, the default is all the data available in all tables.
    async getComprehensiveStats(params) { }

    // Get league standings
    async getLeagueStandings(params) {
        return this.#fetchTable(params, TableType.OVERALL_STANDINGS);
    }

    // Get home/away league standings
    async getHomeAwayStandings(params) {
        return this.#fetchTable(params, TableType.HOME_AWAY_STANDINGS);
    }

    // Get Squad Standard Stats
    async getSquadStandardStats(params) {
        return this.#fetchTable(params, TableType.SQUAD_STATS.STANDARD.FOR);
    }

    // Get Squad Standard Stats Against
    async getSquadStandardStatsAgainst(params) {
        return this.#fetchTable(params, TableType.SQUAD_STATS.STANDARD.AGAINST);
    }

    // Get Squad Goalkeeping Stats
    async getSquadGoalkeepingStats(params) {
        return this.#fetchTable(params, TableType.SQUAD_STATS.GOALKEEPING.FOR);
    }

    // Get Squad Goalkeeping Stats Against
    async getSquadGoalkeepingStatsAgainst(params) {
        return this.#fetchTable(params, TableType.SQUAD_STATS.GOALKEEPING.AGAINST);
    }

    // Get Squad Advanced Goalkeeping Stats (for)
    async getSquadAdvancedGoalkeepingStats(params) {
        return this.#fetchTable(params, TableType.SQUAD_STATS.ADVANCED_GOALKEEPING.FOR);
    }

    // Get Squad Advanced Goalkeeping Stats (against)
    async getSquadAdvancedGoalkeepingStatsAgainst(params) {
        return this.#fetchTable(params, TableType.SQUAD_STATS.ADVANCED_GOALKEEPING.AGAINST);
    }

    // Get Squad Shooting Stats (for)
    async getSquadShootingStats(params) {
        return this.#fetchTable(params, TableType.SQUAD_STATS.SHOOTING.FOR);
    }

    // Get Squad Shooting Stats (against)
    async getSquadShootingStatsAgainst(params) {
        return this.#fetchTable(params, TableType.SQUAD_STATS.SHOOTING.AGAINST);
    }

    // Get Squad Passing Stats (for)
    async getSquadPassingStats(params) {
        return this.#fetchTable(params, TableType.SQUAD_STATS.PASSING.FOR);
    }

    // Get Squad Passing Stats (against)
    async getSquadPassingStatsAgainst(params) {
        return this.#fetchTable(params, TableType.SQUAD_STATS.PASSING.AGAINST);
    }

    // Get Squad Pass Stats (for)
    async getSquadPassStats(params) {
        return this.#fetchTable(params, TableType.SQUAD_STATS.PASS_TYPES.FOR);
    }

    // Get Squad Pass Stats (against)
    async getSquadPassStatsAgainst(params) {
        return this.#fetchTable(params, TableType.SQUAD_STATS.PASS_TYPES.AGAINST);
    }

    // Get Squad Goal and Shot Creation (for)
    async getSquadGoalAndShotCreation(params) {
        return this.#fetchTable(params, TableType.SQUAD_STATS.GOAL_AND_SHOT_CREATION.FOR);
    }

    // Get Squad Goal and Shot Creation (against)
    async getSquadGoalAndShotCreationAgainst(params) {
        return this.#fetchTable(params, TableType.SQUAD_STATS.GOAL_AND_SHOT_CREATION.AGAINST);
    }

    // Get Squad Defensive Actions (for)
    async getSquadDefensiveActions(params) {
        return this.#fetchTable(params, TableType.SQUAD_STATS.DEFENSIVE_ACTIONS.FOR);
    }

    // Get Squad Defensive Actions (against)
    async getSquadDefensiveActionsAgainst(params) {
        return this.#fetchTable(params, TableType.SQUAD_STATS.DEFENSIVE_ACTIONS.AGAINST);
    }

    // Get Squad Posession (for)
    async getSquadPosession(params) {
        return this.#fetchTable(params, TableType.SQUAD_STATS.POSSESSION.FOR);
    }

    // Get Squad Posession (against)
    async getSquadPosessionAgainst(params) {
        return this.#fetchTable(params, TableType.SQUAD_STATS.POSSESSION.AGAINST);
    }

    // Get Squad Playing Time (for)
    async getSquadPlayingTime(params) {
        return this.#fetchTable(params, TableType.SQUAD_STATS.PLAYING_TIME.FOR);
    }

    // Get Squad Playing Time (agaist)
    async getSquadPlayingTimeAgainst(params) {
        return this.#fetchTable(params, TableType.SQUAD_STATS.PLAYING_TIME.AGAINST);
    }

    // Get Squad Miscellaneous Stats (for)
    async getSquadMiscellaneousStats(params) {
        return this.#fetchTable(params, TableType.SQUAD_STATS.MISCELLANEOUS.FOR);
    }

    // Get Squad Miscellaneous Stats (against)
    async getSquadMiscellaneousStatsAgainst(params) {
        return this.#fetchTable(params, TableType.SQUAD_STATS.MISCELLANEOUS.AGAINST);
    }
}

export default FbrefClient;
