import FbrefClient from "../src/client/FbrefClient.js";

const client = new FbrefClient();

async function getLeagueStandingsExample() {
    const table = await client.getLeagueStandings({
        league: 'premier-league',
        season: '1888-1889',
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

async function getSquadDefensiveActionsExample() {
    const table = await client.getSquadDefensiveActions({
        league: 'ligue-2',
        season: '2000-2001',
        cols: ['team', 'players_used', 'tackles_won']
    })
        .then((data) => console.log(data))
        .catch((error) => console.error(error));
}

// async function getComprehensiveStatExample() {
//     const table = await client.getComprehensiveStats({
//         league: 'premier-league',
//         season: '2023-2024'
//     })
//         .then((data) => console.log(data))
//         .catch((error) => console.error(error));
// }

// getLeagueStandingsExample();
// getHomeAwayStandingsExample();
// getSquadStandardStatsExample();
// getSquadStandardStatsAgainstExample();
// getSquadGoalkeepingStatsExample();
// getSquadGoalkeepingStatsAgainstExample();
// getSquadDefensiveActionsExample();
// getComprehensiveStatExample();
