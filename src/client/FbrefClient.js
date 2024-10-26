import { buildLeagueUrl } from '../utils/helpers.js';
import {
    DefaultLeagueCols,
    DefaultLeagueHomeAwayCols,
    DefaultStandardStats,
    DefaultGoalkeepingStats,
} from '../utils/types.js';
import {
    parseLeagueStandings,
    parseHomeAwayStandings,
    parseSquadStandardStats,
    parseSquadStandardStatsAgainst,
    parseSquadGoalkeepingStats,
    parseSquadGoalkeepingStatsAgainst,
} from '../utils/parsers.js';
import { fetchTableData } from './fetcher.js';
import { validateParams } from '../utils/validators.js';


class FbrefClient {

    constructor() { };

    // Get league standings table
    async getLeagueStandings(params) {
        const {
            league,
            season,
            cols = DefaultLeagueCols
        } = validateParams(params);

        return fetchTableData({
            params: { league, season, cols },
            urlBuilder: buildLeagueUrl,
            parser: parseLeagueStandings,
        });
    }

    // Get home/away standings
    async getHomeAwayStandings(params) {
        const {
            league,
            season,
            cols = DefaultLeagueHomeAwayCols,
        } = validateParams(params);

        return fetchTableData({
            params: { league, season, cols },
            urlBuilder: buildLeagueUrl,
            parser: parseHomeAwayStandings,
        });
    }

    // Get Squad Standard Stats (for)
    async getSquadStandardStats(params) {
        const {
            league,
            season,
            cols = DefaultStandardStats,
        } = validateParams(params);

        return fetchTableData({
            params: { league, season, cols },
            urlBuilder: buildLeagueUrl,
            parser: parseSquadStandardStats,
        })
    }

    // Get Squad Standard Stats (against)
    async getSquadStandardStatsAgainst(params) {
        const {
            league,
            season,
            cols = DefaultStandardStats,
        } = validateParams(params);

        return fetchTableData({
            params: { league, season, cols },
            urlBuilder: buildLeagueUrl,
            parser: parseSquadStandardStatsAgainst,
        });
    }

    // Get Squad Goalkeeping Stats (for)
    async getSquadGoalkeepingStats(params) {
        const {
            league,
            season,
            cols = DefaultGoalkeepingStats,
        } = validateParams(params);
        return fetchTableData({
            params: { league, season, cols },
            urlBuilder: buildLeagueUrl,
            parser: parseSquadGoalkeepingStats,
        });
    }

    // Get Squad Goalkeeping Stats (against)
    async getSquadGoalkeepingStatsAgainst(params) {
        const {
            league,
            season,
            cols = DefaultGoalkeepingStats,
        } = validateParams(params);
        return fetchTableData({
            params: { league, season, cols },
            urlBuilder: buildLeagueUrl,
            parser: parseSquadGoalkeepingStatsAgainst,
        })
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
