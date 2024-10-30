import axios from 'axios';
import { setupCache, buildMemoryStorage } from 'axios-cache-interceptor';
import Bottleneck from 'bottleneck';

// Rate limiter (20 requests per minute)
const limiter = new Bottleneck({
    maxConcurrent: 1,
    minTime: 3000,
    reservoir: 20,
    reservoirRefreshAmount: 20,
    reservoirRefreshInterval: 60 * 1000
})

// Cached axios object
const cachedAxios = setupCache(axios, {
    storage: buildMemoryStorage(),
    ttl: 1000 * 60 * 60 * 1, // Cached for 1 hour
});

// Wrap requests with limiter
cachedAxios.interceptors.request.use((config) => limiter.schedule(() => config));

// Get html of url
async function getHtml(url) {
    const response = await cachedAxios.get(url);
    return response.data; // html
}

// Build league season url
function buildLeagueUrl(params) {
    return `https://fbref.com/en/comps/${params.leagueIndex}/${params.season}`;
}

export { getHtml, buildLeagueUrl };
