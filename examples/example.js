import FbrefClient from "../src/client/FbrefClient.js";

const client = new FbrefClient();

async function getLeagueStandingsExample() {
    const table = await client.getLeagueStandings({
        league: 'premier-league',
        season: '2024-2025',
        cols: ['team', 'games', 'wins', 'ties', 'losses', 'points', 'attendance_per_g'],
    })
        .then((data) => console.log(data))
        .catch((error) => console.error(error));
}

async function getHomeAwayStandingsExample() {
    const table = await client.getHomeAwayStandings({
        league: 'serie-a',
        season: '2020-2021',
    })
        .then((data) => console.log(data))
        .catch((error) => console.error(error));
}

async function getSquadStandardStatsExample() {
    const table = await client.getSquadStandardStats({
        league: 'serie-a',
        season: '2020-2021',
    })
        .then((data) => console.log(data))
        .catch((error) => console.error(error));
}

async function getSquadStandardStatsAgainstExample() {
    const table = await client.getSquadStandardStatsAgainst({
        league: 'serie-a',
        season: '2021-2022',
    })
        .then((data) => console.log(data))
        .catch((error) => console.error(error));
}

async function getSquadGoalkeepingStatsExample() {
    const table = await client.getSquadGoalkeepingStats({
        league: 'ligue-1',
        season: '2023-2024',
    })
        .then((data) => console.log(data))
        .catch((error) => console.error(error));
}

async function getSquadGoalkeepingStatsAgainstExample() {
    const table = await client.getSquadGoalkeepingStatsAgainst({
        league: 'ligue-1',
        season: '2023-2024',
        //cols: ['team', 'gk_saves']
    })
        .then((data) => console.log(data))
        .catch((error) => console.error(error));
}



getLeagueStandingsExample();
// getHomeAwayStandingsExample();
// getSquadStandardStatsExample();
// getSquadStandardStatsAgainstExample();
// getSquadGoalkeepingStatsExample();
//getSquadGoalkeepingStatsAgainstExample();
