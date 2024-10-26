# Fbref Scraper for Football Data
Simple web scraper which scrapes and parses football data from the website fbref.com.

## Installation

## Usage
First, instantiate the client:
```javascript
const client = new FbrefClient();
```
Now, you can call one of the many methods that `FbrefClient` offers in order to extract football data. For example, to extract the 2024-2025 Premier League Standings
```javascript
const table = await client.getLeagueStandings({
    league: 'premier-league',
    season: '2024-2025',
    // here, you can set a `cols` field to specify which particular columns you want to parse. the default parses all columns of the table
})
```
The output will be a JSON object with fields containing data about the teams in the respective league, for example:
```bash
{
    team: 'Tottenham',
    played: '8',
    wins: '4',
    draws: '1',
    losses: '3',
    goalsFor: '18',
    goalsAgainst: '9',
    goalDifference: '+9',
    points: '13',
    pointsPerMatchPlayed: '1.63',
    xGoals: '16.7',
    xGoalsAgainst: '8.8',
    xGoalDifference: '+7.8',
    xGoalDifferencePer90: '+0.98',
    attendance: '61,407'
  },
```

## Notes
