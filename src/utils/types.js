export const TableType = {
    OVERALL_STANDINGS: {
        selector: (params) => `#results${params.season}${params.leagueIndex}1_overall > tbody > tr`
    },
    HOME_AWAY_STANDINGS: {
        selector: (params) => `#results${params.season}${params.leagueIndex}1_home_away > tbody > tr`
    },
    SQUAD_STATS: {
        STANDARD: {
            FOR: {
                selector: '#stats_squads_standard_for > tbody > tr'
            },
            AGAINST: {
                selector: '#stats_squads_standard_against > tbody > tr'
            }
        },
        GOALKEEPING: {
            FOR: {
                selector: '#stats_squads_keeper_for > tbody > tr'
            },
            AGAINST: {
                selector: '#stats_squads_keeper_against > tbody > tr'
            }
        },
    },
};

export const LEAGUE_TO_INDEX = {
    'premier-league': '9',
    'la-liga': '12',
    'serie-a': '11',
    'bundesliga': '20',
    'ligue-1': '13',
    'championship': '10',
    'mls': '22',
    'seria-a-brasil': '24',
    'eredivise': '23',
    'liga-mx': '31',
    'liga-profesional-argentina': '21',
    'primeira-liga': '32',
    'segunda-division': '17',
    'belgian-pro-league': '37',
    '2-bundesliga': '33',
    'serie-b': '18',
    'ligue-2': '60',
    'a-league': '65',
};
