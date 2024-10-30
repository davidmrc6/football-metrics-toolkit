# Table Types
The `TableType` object defines the different types of tables that can be fetched from FBref. Each table type has a corresponding selector that is used to identify the table in the HTML content. The selector stores the FBref ID of the respective table. The columns each table type returns can be passed into the `options.cols` argument of `fetchTable(options)`.

### `OVERALL_STANDINGS`
Selector: `#results{params.season}{params.leagueIndex}1_overall > tbody > tr`
Fetches data of the following columns: `rank`, `team`, `games`, `wins`, `ties`, `losses`, `goals_for`, `goals_against`, `goal_diff`, `points`, `points_avg`, `xg_for`, `xg_against`, `xg_diff`, `xg_diff_per90`, `attendance_per_g`, `top_team_scorers`, `top_keeper`,`notes`.

### `HOME_AWAY_STANDINGS`
Selector: `#results{params.season}{params.leagueIndex}1_home_away > tbody > tr`
Fetches data of the following columns: `rank`, `team`, `home_games`, `home_wins`, `home_ties`, `home_losses`, `home_goals_for`, `home_goals_against`, `home_goal_diff`, `home_points`, `home_points_avg`, `home_xg_for`, `home_xg_against`, `home_xg_diff`, `home_xg_diff_per90`, `away_games`, `away_wins`, `away_ties`, `away_losses`, `away_goals_for`, `away_goals_against`, `away_goal_diff`, `away_points`, `away_points_avg`, `away_xg_for`, `away_xg_against`, `away_xg_diff`, `away_xg_diff_per90`.

### `SQUAD_STATS`
#### `SQUAD_STATS.STANDARD.FOR`
Selector: #stats_squads_standard_for > tbody > tr
Fetches data of the following columns: `header_playing`, `header_performance`, `header_expected`, `header_progression`, `header_per90`, `team`, `players_used`, `avg_age`, `possession`, `games`, `games_starts`, `minutes`, `minutes_90s`, `goals`, `assists`, `goals_assists`, `goals_pens`, `pens_made`, `pens_att`, `cards_yellow`, `cards_red`, `xg`, `npxg`, `xg_assist`, `npxg_xg_assist`, `progressive_carries`, `progressive_passes`, `goals_per90`, `assists_per90`, `goals_assists_per90`, `goals_pens_per90`, `goals_assists_pens_per90`, `xg_per90`, `xg_assist_per90`, `xg_xg_assist_per90`, `npxg_per90`, `npxg_xg_assist_per90`.

#### `SQUAD_STATS.STANDARD.AGAINST`
Selector: #stats_squads_standard_against > tbody > tr
Fetches data of the following columns: `against_header_playing`, `against_header_performance`, `against_header_expected`, `against_header_progression`, `against_header_per90`, `team`, `against_players_used`, `against_avg_age`, `against_possession`, `against_games`, `against_games_starts`, `against_minutes`, `against_minutes_90s`, `against_goals`, `against_assists`, `against_goals_assists`, `against_goals_pens`, `against_pens_made`, `against_pens_att`, `against_cards_yellow`, `against_cards_red`, `against_xg`, `against_npxg`, `against_xg_assist`, `against_npxg_xg_assist`, `against_progressive_carries`, `against_progressive_passes`, `against_goals_per90`, `against_assists_per90`, `against_goals_assists_per90`, `against_goals_pens_per90`, `against_goals_assists_pens_per90`, `against_xg_per90`, `against_xg_assist_per90`, `against_xg_xg_assist_per90`, `against_npxg_per90`, `against_npxg_xg_assist_per90`.

#### `SQUAD_STATS.GOALKEEPING.FOR`
Selector: #stats_squads_keeper_for > tbody > tr
Fetches data of the following columns: `header_playing`, `header_performance`, `header_pk`, `team`, `players_used`, `gk_games`, `gk_games_starts`, `gk_minutes`, `minutes_90s`, `gk_goals_against`, `gk_goals_against_per90`, `gk_shots_on_target_against`, `gk_saves`, `gk_save_pct`, `gk_wins`, `gk_ties`, `gk_losses`, `gk_clean_sheets`, `gk_clean_sheets_pct`, `gk_pens_att`, `gk_pens_allowed`, `gk_pens_saved`, `gk_pens_missed`, `gk_pens_save_pct`.

#### `SQUAD_STATS.GOALKEEPING.AGAINST`
Selector: #stats_squads_keeper_against > tbody > tr
Fetches data of the following columns: `against_header_playing`, `against_header_performance`, `against_header_pk`, `team`, `against_players_used`, `against_gk_games`, `against_gk_games_starts`, `against_gk_minutes`, `against_minutes_90s`, `against_gk_goals_against`, `against_gk_goals_against_per90`, `against_gk_shots_on_target_against`, `against_gk_saves`, `against_gk_save_pct`, `against_gk_wins`, `against_gk_ties`, `against_gk_losses`, `against_gk_clean_sheets`, `against_gk_clean_sheets_pct`, `against_gk_pens_att`, `against_gk_pens_allowed`, `against_gk_pens_saved`, `against_gk_pens_missed`, `against_gk_pens_save_pct`.

#### `SQUAD_STATS.ADVANCED_GOALKEEPING.FOR`
Selector: #stats_squads_keeper_adv_for > tbody > tr
Fetches data of the following columns: `header_goals`, `header_expected`, `header_passes_launched`, `header_passes`, `header_goal_kicks`, `header_crosses_gk`, `header_sweeper`, `team`, `players_used`, `minutes_90s`, `gk_goals_against`, `gk_pens_allowed`, `gk_free_kick_goals_against`, `gk_corner_kick_goals_against`, `gk_own_goals_against`, `gk_psxg`, `gk_psnpxg_per_shot_on_target_against`, `gk_psxg_net`, `gk_psxg_net_per90`, `gk_passes_completed_launched`, `gk_passes_launched`, `gk_passes_pct_launched`, `gk_passes`, `gk_passes_throws`, `gk_pct_passes_launched`, `gk_passes_length_avg`, `gk_goal_kicks`, `gk_pct_goal_kicks_launched`, `gk_goal_kick_length_avg`, `gk_crosses`, `gk_crosses_stopped`, `gk_crosses_stopped_pct`, `gk_def_actions_outside_pen_area`, `gk_def_actions_outside_pen_area_per90`, `gk_avg_distance_def_actions`.

#### `SQUAD_STATS.ADVANCED_GOALKEEPING.AGAINST`
Selector: #stats_squads_keeper_adv_against > tbody > tr
Fetches data of the following columns: `against_header_goals`, `against_header_expected`, `against_header_passes_launched`, `against_header_passes`, `against_header_goal_kicks`, `against_header_crosses_gk`, `against_header_sweeper`, `team`, `against_players_used`, `against_minutes_90s`, `against_gk_goals_against`, `against_gk_pens_allowed`, `against_gk_free_kick_goals_against`, `against_gk_corner_kick_goals_against`, `against_gk_own_goals_against`, `against_gk_psxg`, `against_gk_psnpxg_per_shot_on_target_against`, `against_gk_psxg_net`, `against_gk_psxg_net_per90`, `against_gk_passes_completed_launched`, `against_gk_passes_launched`, `against_gk_passes_pct_launched`, `against_gk_passes`, `against_gk_passes_throws`, `against_gk_pct_passes_launched`, `against_gk_passes_length_avg`, `against_gk_goal_kicks`, `against_gk_pct_goal_kicks_launched`, `against_gk_goal_kick_length_avg`, `against_gk_crosses`, `against_gk_crosses_stopped`, `against_gk_crosses_stopped_pct`, `against_gk_def_actions_outside_pen_area`, `against_gk_def_actions_outside_pen_area_per90`, `against_gk_avg_distance_def_actions`.

#### `SQUAD_STATS.SHOOTING.FOR`
Selector: #stats_squads_shooting_for > tbody > tr
Fetches data of the following columns: `header_standard`, `header_expected`, `team`, `players_used`, `minutes_90s`, `goals`, `shots`, `shots_on_target`, `shots_on_target_pct`, `shots_per90`, `shots_on_target_per90`, `goals_per_shot`, `goals_per_shot_on_target`, `average_shot_distance`, `shots_free_kicks`, `pens_made`, `pens_att`, `xg`, `npxg`, `npxg_per_shot`, `xg_net`, `npxg_net`.

#### `SQUAD_STATS.SHOOTING.AGAINST`
Selector: #stats_squads_shooting_against > tbody > tr
Fetches data of the following columns: `against_header_standard`, `against_header_expected`, `team`, `against_players_used`, `against_minutes_90s`, `against_goals`, `against_shots`, `against_shots_on_target`, `against_shots_on_target_pct`, `against_shots_per90`, `against_shots_on_target_per90`, `against_goals_per_shot`, `against_goals_per_shot_on_target`, `against_average_shot_distance`, `against_shots_free_kicks`, `against_pens_made`, `against_pens_att`, `against_xg`, `against_npxg`, `against_npxg_per_shot`, `against_xg_net`, `against_npxg_net`.

#### `SQUAD_STATS.PASSING.FOR`
Selector: #stats_squads_passing_for > tbody > tr
Fetches data of the following columns: `header_passes_total`, `header_passes_short`, `header_passes_medium`, `header_passes_long`, `header_expected`, `team`, `players_used`, `minutes_90s`, `passes_completed`, `passes`, `passes_pct`, `passes_total_distance`, `passes_progressive_distance`, `passes_completed_short`, `passes_short`, `passes_pct_short`, `passes_completed_medium`, `passes_medium`, `passes_pct_medium`, `passes_completed_long`, `passes_long`, `passes_pct_long`, `assists`, `xg_assist`, `pass_xa`, `xg_assist_net`, `assisted_shots`, `passes_into_final_third`, `passes_into_penalty_area`, `crosses_into_penalty_area`, `progressive_passes`.

#### `SQUAD_STATS.PASSING.AGAINST`
Selector: #stats_squads_passing_against > tbody > tr
Fetches data of the following columns: `against_header_passes_total`, `against_header_passes_short`, `against_header_passes_medium`, `against_header_passes_long`, `against_header_expected`, `team`, `against_players_used`, `against_minutes_90s`, `against_passes_completed`, `against_passes`, `against_passes_pct`, `against_passes_total_distance`, `against_passes_progressive_distance`, `against_passes_completed_short`, `against_passes_short`, `against_passes_pct_short`, `against_passes_completed_medium`, `against_passes_medium`, `against_passes_pct_medium`, `against_passes_completed_long`, `against_passes_long`, `against_passes_pct_long`, `against_assists`, `against_xg_assist`, `against_pass_xa`, `against_xg_assist_net`, `against_assisted_shots`, `against_passes_into_final_third`, `against_passes_into_penalty_area`, `against_crosses_into_penalty_area`, `against_progressive_passes`.

#### `SQUAD_STATS.PASS_TYPES.FOR`
Selector: #stats_squads_passing_types_for > tbody > tr
Fetches data of the following columns: `header_pass_types`, `header_corner_kicks`, `header_pass_outcomes`, `team`, `players_used`, `minutes_90s`, `passes`, `passes_live`, `passes_dead`, `passes_free_kicks`, `through_balls`, `passes_switches`, `crosses`, `throw_ins`, `corner_kicks`, `corner_kicks_in`, `corner_kicks_out`, `corner_kicks_straight`, `passes_completed`, `passes_offsides`, `passes_blocked`.

#### `SQUAD_STATS.PASS_TYPES.AGAINST`
Selector: #stats_squads_passing_types_against > tbody > tr
Fetches data of the following columns: `against_header_pass_types`, `against_header_corner_kicks`, `against_header_pass_outcomes`, `team`, `against_players_used`, `against_minutes_90s`, `against_passes`, `against_passes_live`, `against_passes_dead`, `against_passes_free_kicks`, `against_through_balls`, `against_passes_switches`, `against_crosses`, `against_throw_ins`, `against_corner_kicks`, `against_corner_kicks_in`, `against_corner_kicks_out`, `against_corner_kicks_straight`, `against_passes_completed`, `against_passes_offsides`, `against_passes_blocked`.

#### `SQUAD_STATS.GOAL_AND_SHOT_CREATION.FOR`
Selector: #stats_squads_gca_for > tbody > tr
Fetches data of the following columns: `header_sca`, `header_sca_types`, `header_gca`, `header_gca_types`, `team`, `players_used`, `minutes_90s`, `sca`, `sca_per90`, `sca_passes_live`, `sca_passes_dead`, `sca_take_ons`, `sca_shots`, `sca_fouled`, `sca_defense`, `gca`, `gca_per90`, `gca_passes_live`, `gca_passes_dead`, `gca_take_ons`, `gca_shots`, `gca_fouled`, `gca_defense`.

#### `SQUAD_STATS.GOAL_AND_SHOT_CREATION.AGAINST`
Selector: #stats_squads_gca_against > tbody > tr
Fetches data of the following columns: `against_header_sca`, `against_header_sca_types`, `against_header_gca`, `against_header_gca_types`, `team`, `against_players_used`, `against_minutes_90s`, `against_sca`, `against_sca_per90`, `against_sca_passes_live`, `against_sca_passes_dead`, `against_sca_take_ons`, `against_sca_shots`, `against_sca_fouled`, `against_sca_defense`, `against_gca`, `against_gca_per90`, `against_gca_passes_live`, `against_gca_passes_dead`, `against_gca_take_ons`, `against_gca_shots`, `against_gca_fouled`, `against_gca_defense`.

#### `SQUAD_STATS.DEFENSIVE_ACTIONS.FOR`
Selector: #stats_squads_defense_for > tbody > tr
Fetches data of the following columns: `header_tackles`, `header_challenges`, `header_blocks`, `team`, `players_used`, `minutes_90s`, `tackles`, `tackles_won`, `tackles_def_3rd`, `tackles_mid_3rd`, `tackles_att_3rd`, `challenge_tackles`, `challenges`, `challenge_tackles_pct`, `challenges_lost`, `blocks`, `blocked_shots`, `blocked_passes`, `interceptions`, `tackles_interceptions`, `clearances`, `errors`.

#### `SQUAD_STATS.DEFENSIVE_ACTIONS.AGAINST`
Selector: #stats_squads_defense_against > tbody > tr
Fetches data of the following columns: `against_header_tackles`, `against_header_challenges`, `against_header_blocks`, `team`, `against_players_used`, `against_minutes_90s`, `against_tackles`, `against_tackles_won`, `against_tackles_def_3rd`, `against_tackles_mid_3rd`, `against_tackles_att_3rd`, `against_challenge_tackles`, `against_challenges`, `against_challenge_tackles_pct`, `against_challenges_lost`, `against_blocks`, `against_blocked_shots`, `against_blocked_passes`, `against_interceptions`, `against_tackles_interceptions`, `against_clearances`, `against_errors`.

#### `SQUAD_STATS.POSSESSION.FOR`
Selector: #stats_squads_possession_for > tbody > tr
Fetches data of the following columns: `header_touches`, `header_take_ons`, `header_carries`, `header_receiving`, `team`, `players_used`, `possession`, `minutes_90s`, `touches`, `touches_def_pen_area`, `touches_def_3rd`, `touches_mid_3rd`, `touches_att_3rd`, `touches_att_pen_area`, `touches_live_ball`, `take_ons`, `take_ons_won`, `take_ons_won_pct`, `take_ons_tackled`, `take_ons_tackled_pct`, `carries`, `carries_distance`, `carries_progressive_distance`, `progressive_carries`, `carries_into_final_third`, `carries_into_penalty_area`, `miscontrols`, `dispossessed`, `passes_received`, `progressive_passes_received`.

#### `SQUAD_STATS.POSSESSION.AGAINST`
Selector: #stats_squads_possession_against > tbody > tr
Fetches data of the following columns: `against_header_touches`, `against_header_take_ons`, `against_header_carries`, `against_header_receiving`, `team`, `against_players_used`, `against_possession`, `against_minutes_90s`, `against_touches`, `against_touches_def_pen_area`, `against_touches_def_3rd`, `against_touches_mid_3rd`, `against_touches_att_3rd`, `against_touches_att_pen_area`, `against_touches_live_ball`, `against_take_ons`, `against_take_ons_won`, `against_take_ons_won_pct`, `against_take_ons_tackled`, `against_take_ons_tackled_pct`, `against_carries`, `against_carries_distance`, `against_carries_progressive_distance`, `against_progressive_carries`, `against_carries_into_final_third`, `against_carries_into_penalty_area`, `against_miscontrols`, `against_dispossessed`, `against_passes_received`, `against_progressive_passes_received`.

#### `SQUAD_STATS.PLAYING_TIME.FOR`
Selector: #stats_squads_playing_time_for > tbody > tr
Fetches data of the following columns: `header_playing`, `header_starts`, `header_subs`, `header_team_success`, `header_xg_team_success`, `team`, `players_used`, `avg_age`, `games`, `minutes`, `minutes_per_game`, `minutes_pct`, `minutes_90s`, `games_starts`, `minutes_per_start`, `games_complete`, `games_subs`, `minutes_per_sub`, `unused_subs`, `points_per_game`, `on_goals_for`, `on_goals_against`, `plus_minus`, `plus_minus_per90`, `on_xg_for`, `on_xg_against`, `xg_plus_minus`, `xg_plus_minus_per90`.

#### `SQUAD_STATS.PLAYING_TIME.AGAINST`
Selector: #stats_squads_playing_time_against > tbody > tr
Fetches data of the following columns: `against_header_playing`, `against_header_starts`, `against_header_subs`, `against_header_team_success`, `against_header_xg_team_success`, `team`, `against_players_used`, `against_avg_age`, `against_games`, `against_minutes`, `against_minutes_per_game`, `against_minutes_pct`, `against_minutes_90s`, `against_games_starts`, `against_minutes_per_start`, `against_games_complete`, `against_games_subs`, `against_minutes_per_sub`, `against_unused_subs`, `against_points_per_game`, `against_on_goals_for`, `against_on_goals_against`, `against_plus_minus`, `against_plus_minus_per90`, `against_on_xg_for`, `against_on_xg_against`, `against_xg_plus_minus`, `against_xg_plus_minus_per90`.

#### `SQUAD_STATS.MISCELLANEOUS.FOR`
Selector: #stats_squads_misc_for > tbody > tr
Fetches data of the following columns: `header_performance`, `header_aerials`, `team`, `players_used`, `minutes_90s`, `cards_yellow`, `cards_red`, `cards_yellow_red`, `fouls`, `fouled`, `offsides`, `crosses`, `interceptions`, `tackles_won`, `pens_won`, `pens_conceded`, `own_goals`, `ball_recoveries`, `aerials_won`, `aerials_lost`, `aerials_won_pct`.

#### `SQUAD_STATS.MISCELLANEOUS.AGAINST`
Selector: #stats_squads_misc_against > tbody > tr
Fetches data of the following columns: `against_header_performance`, `against_header_aerials`, `team`, `against_players_used`, `against_minutes_90s`, `against_cards_yellow`, `against_cards_red`, `against_cards_yellow_red`, `against_fouls`, `against_fouled`, `against_offsides`, `against_crosses`, `against_interceptions`, `against_tackles_won`, `against_pens_won`, `against_pens_conceded`, `against_own_goals`, `against_ball_recoveries`, `against_aerials_won`, `against_aerials_lost`, `against_aerials_won_pct`.
