import { setupCache, buildMemoryStorage } from 'axios-cache-interceptor';
import axios from 'axios';
import * as cheerio from 'cheerio';

const cachedAxios = setupCache(axios, {
    storage: buildMemoryStorage(),
    ttl: 1000 * 60 * 60 * 2, // Cached for 2 hours
});

async function getHtml(url) {
    const response = await cachedAxios.get(url);
    console.log(response.status);
    return response.data; // html
}

// Scrape Premier League table from @link{https://fbref.com/en/comps/9/Premier-League-Stats}
const html = await getHtml('https://fbref.com/en/comps/9/Premier-League-Stats');
const $ = cheerio.load(html);

const premierLeagueTable = [];

// Get all rows in table
// Logic should be moved to @link{parser.js}
const rows = $("#results2024-202591_overall > tbody > tr");
rows.each((index, element) => {
    const tds = $(element).find('td');
    premierLeagueTable.push({
        team: $(tds[0]).text(),
        played: $(tds[1]).text(),
        wins: $(tds[2]).text(),
        draws: $(tds[3]).text(),
        losses: $(tds[4]).text(),
        goalsFor: $(tds[5]).text(),
        goalsAgainst: $(tds[6]).text(),
        goalDifference: $(tds[7]).text(),
        points: $(tds[8]).text(),
        pointsPerMatchPlayed: $(tds[9]).text(),
        xGoals: $(tds[10]).text(),
        xGoalsAgainst: $(tds[11]).text(),
        xGoalDifference: $(tds[12]).text(),
        xGoalDifferencePer90: $(tds[13]).text(),
        attendance: $(tds[15]).text(),
    });
});

console.log(premierLeagueTable);
