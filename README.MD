# Football Metrics Toolkit
A Node.js library for collecting football statistics data. This tool provides a simple and flexible API to fetch and parse football statistics from Fbref.
\\
This project is still ongoing active development. More features like player data, international competitions, and more are coming soon.

### :warning: Important notice
This package fetches data from FBref (Sports Reference). By using this package, you agree to comply with FBref's terms of service and data usage rules:
- Data is sourced from FBref.com and Sports Reference LLC.
- You must provide attribution to FBref/Sports Reference when using the data
- The tool implements rate limiting to avoid excessive requests
- Not intended for wholesale copying of the FBref database
- Usage must comply with FBref's Terms of Use

## Features
- 📊 Fetch various types of football statistics (standings, squad stats, player stats)
- 🔍 Filter data by specific teams and columns
- 📈 Support for different statistical categories (standard stats, advanced stats, etc.)
- ⚡ Efficient parsing and data combining
- 🛡️ Built-in rate limiting and error handling

## Installation
```bash
npm install football-metrics-toolkit
```

## Quick Start
To import the `FootballMetricsClient` and make a query, follow the example provided below:
```javascript
import { FootballMetricsClient } from 'football-metrics-toolkit';

const client = new FootballMetricsClient();

const data = await client.fetchTable({
    league: 'ligue-1',
    season: '2023-2024',
    tables: [
        TableType.OVERALL_STANDINGS,
        TableType.SQUAD_STATS.STANDARD.FOR,
        TableType.SQUAD_STATS.ADVANCED_GOALKEEPING.FOR
    ],
    teams: ['Paris S-G', 'Lille'],
    cols: ['team', 'wins', 'xg_for', 'gk_psxg_net_per90']
});

console.log(data);
```
Expected response:
```bash
{
  'Paris S-G': { wins: '22', xg_for: '68.8', gk_psxg_net_per90: '+0.24' },
  Lille: { wins: '16', xg_for: '48.6', gk_psxg_net_per90: '+0.16' }
}
```
Whilte the client is fetching data live logs and warnings will be printed on the console. To disable these warnings, pass in the `{ console = false }` parameter when initializing the client, i. e.
```javascript
const client = new FootballMetricsClient({ console: false });
```
When quering for opponent data, the requested statistics must begin with the prefix `against_`:
```javascript
const data = await client.fetchTable({
    league: 'premier-league',
    season: '2020-2021',
    // no `tables` parameter, client defaults to extracting data from all possible tables
    team: 'Arsenal',
    cols: ['gk_psxg_net_per90', 'against_gk_psxg_net_per90']
})
```
Expected response:
``` bash
{
  Arsenal: { gk_psxg_net_per90: '+0.03', against_gk_psxg_net_per90: '-0.14' }
}
```
You can also convert the output to CSV format and save it to a `.csv` file:
```javascript
import { converToCSV, saveToCSV } from 'football-metrics-toolkit';

const csv = convertToCSV(data);
await saveToCSV(csv, 'football.csv');
```

## API Reference



## License
This project is licensed under the MIT License - see the LICENSE file for details.

## Legal Notice
This package is not affiliated with, endorsed by, or in any way officially connected with FBref or Sports Reference LLC. All product and company names are trademarks™ or registered® trademarks of their respective holders. Use of them does not imply any affiliation with or endorsement by them.

## Acknowledgements
Data provided by FBref.com and Sports Reference LLC. All data usage must comply with their Terms of Use.

## Notes
