import { validateFootballParams } from '../utils/validators.js';
import { buildLeagueSeasonUrl, getHtml } from '../utils/helpers.js';
import { DefaultLeagueCols } from '../utils/types.js';
import { parseLeagueStandings } from '../utils/parser.js';
import { leagueToIndex } from '../utils/maps.js';
// import * as cheerio from 'cheerio';

// note: rename FbCLient (facebook client??)
class FbrefClient {

    constructor() { };

    async getLeagueStandings({
        league,
        season,
        cols = DefaultLeagueCols,
    }) {
        const leagueIndex = leagueToIndex[league];

        const url = buildLeagueSeasonUrl(leagueIndex, season);
        const html = await getHtml(url);

        const response = parseLeagueStandings(leagueIndex, season, html, cols);
        return response;
    }
}

export default FbrefClient;
