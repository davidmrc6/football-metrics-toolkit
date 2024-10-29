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
        ADVANCED_GOALKEEPING: {
            FOR: {
                selector: '#stats_squads_keeper_adv_for > tbody > tr'
            },
            AGAINST: {
                selector: '#stats_squads_keeper_adv_against > tbody > tr'
            }
        },
        SHOOTING: {
            FOR: {
                selector: '#stats_squads_shooting_for > tbody > tr'
            },
            AGAINST: {
                selector: '#stats_squads_shooting_against > tbody > tr'
            }
        },
        PASSING: {
            FOR: {
                selector: '#stats_squads_passing_for > tbody > tr'
            },
            AGAINST: {
                selector: '#stats_squads_passing_against > tbody > tr'
            }
        },
        PASS_TYPES: {
            FOR: {
                selector: '#stats_squads_passing_types_for > tbody > tr'
            },
            AGAINST: {
                selector: '#stats_squads_passing_types_against > tbody > tr'
            }
        },
        GOAL_AND_SHOT_CREATION: {
            FOR: {
                selector: '#stats_squads_gca_for > tbody > tr'
            },
            AGAINST: {
                selector: '#stats_squads_gca_against > tbody > tr'
            }
        },
        DEFENSIVE_ACTIONS: {
            FOR: {
                selector: '#stats_squads_defense_for > tbody > tr'
            },
            AGAINST: {
                selector: '#stats_squads_defense_against > tbody > tr'
            }
        },
        POSSESSION: {
            FOR: {
                selector: '#stats_squads_possession_for > tbody > tr'
            },
            AGAINST: {
                selector: '#stats_squads_possession_against > tbody > tr'
            }
        },
        PLAYING_TIME: {
            FOR: {
                selector: '#stats_squads_playing_time_for > tbody > tr'
            },
            AGAINST: {
                selector: '#stats_squads_playing_time_against > tbody > tr'
            }
        },
        MISCELLANEOUS: {
            FOR: {
                selector: '#stats_squads_misc_for > tbody > tr'
            },
            AGAINST: {
                selector: '#stats_squads_misc_against > tbody > tr'
            }
        }
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
