const leagueToIndex = {
    'premier-league': '9',
    'la-liga': '12',
    'serie-a': '11',
    'bundesliga': '20',
    'ligue-1': '13',
}

const statToDataStat = {
    team: 'team',
    played: 'games',
    wins: 'wins',
    draws: 'ties',
    losses: 'losses',
    goalsFor: 'goals_for',
    goalsAgainst: 'goals_against',
    goalDifference: 'goal_diff',
    points: 'points',
    pointsPerMatchPlayed: 'points_avg',
    xGoals: 'xg_for',
    xGoalsAgainst: 'xg_against',
    xGoalDifference: 'xg_diff',
    xGoalDifferencePer90: 'xg_diff_per90',
    attendance: 'attendance_per_g',
}

export { leagueToIndex, statToDataStat };
