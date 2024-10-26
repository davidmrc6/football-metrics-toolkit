import axios from 'axios';
import { setupCache, buildMemoryStorage } from 'axios-cache-interceptor';
import { leagueToIndex } from './maps.js'

// Cached axios object
const cachedAxios = setupCache(axios, {
    storage: buildMemoryStorage(),
    ttl: 1000 * 60 * 60 * 1, // Cached for 1 hour
});

// Get html of url
async function getHtml(url) {
    const response = await cachedAxios.get(url);
    return response.data; // html
}

// Build league season url
function buildLeagueUrl(params) {
    const index = leagueToIndex[params.league];
    const season = params.season;
    return `https://fbref.com/en/comps/${index}/${season}`;
}

export { getHtml, buildLeagueUrl };
