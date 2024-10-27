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


    // Private Fetch table method
    async #fetchTable(params, tableType) {
        const validatedParams = validateParams(params);
        return fetchTableData({
            params: validatedParams,
            urlBuilder: buildLeagueUrl,
            parser: (html, params) => this.#parser.parse(html, params, tableType)
        })
    }

    async getLeagueStandings(params) {
        return this.#fetchTable(params, TableType.OVERALL_STANDINGS);
    }

    async getHomeAwayStandings(params) {
        return this.#fetchTable(params, TableType.HOME_AWAY_STANDINGS);
    }

    async getSquadStandardStats(params) {
        return this.#fetchTable(params, TableType.SQUAD_STATS.STANDARD.FOR);
    }

    async getSquadStandardStatsAgainst(params) {
        return this.#fetchTable(params, TableType.SQUAD_STATS.STANDARD.AGAINST);
    }

    async getSquadGoalkeepingStats(params) {
        return this.#fetchTable(params, TableType.SQUAD_STATS.GOALKEEPING.FOR);
    }

    async getSquadGoalkeepingStatsAgainst(params) {
        return this.#fetchTable(params, TableType.SQUAD_STATS.GOALKEEPING.AGAINST);
    }

    // Get Squad Advanced Goalkeeping Stats (for)

    // Get Squad Advanced Goalkeeping Stats (against)

    // Get Squad Shooting Stats (for)

    // Get Squad Shooting Stats (against)

    // Get Squad Passing Stats (for)

    // Get Squad Passing Stats (against)

    // Get Squad Pass Stats (for)

    // Get Squad Pass Stats (against)

    // Get Squad Goal and Shot Creation (for)

    // Get Squad Goal and Shot Creation (against)

    // Get Squad Defensive Actions (for)

    // Get Squad Defensive Actions (against)

    // Get Squad Posession (for)

    // Get Squad Posession (against)

    // Get Squad Playing Time (for)

    // Get Squad Playing Time (agaist)

    // Get Squad Miscellaneous Stats (for)

    // Get Squad Miscellaneous Stats (against)
}

export default FbrefClient;
