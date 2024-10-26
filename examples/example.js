import FbrefClient from "../src/client/FbrefClient.js";

const client = new FbrefClient();

const table = await client.getLeagueStandings({
    league: 'premier-league',
    season: '2024-2025',
    //cols: ['team', 'played', 'wins', 'draws', 'losses', 'points', 'attendance'],
});
console.log(table);
