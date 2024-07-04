const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const gameSchema = new Schema({
    game_id: {
        type: Number,
        required: true
    },
    competition_id: {
        type: String,
        required: true
    },
    season: {
        type: Number,
        required: true
    },
    round: String,
    date: {
        type: Date,
        required: true
    },
    home_club_id: {
        type: Number,
        required: true
    },
    away_club_id: {
        type: Number,
        required: true
    },
    home_club_goals: Number,
    away_club_goals: Number,
    home_club_position: Number,
    away_club_position: Number,
    home_club_manager_name: String,
    away_club_manager_name: String,
    stadium: String,
    attendance: Number,
    referee: String,
    url: String,
    home_club_name: String,
    away_club_name: String,
    aggregate: String,
    competition_type: String
});

const GameModel = mongoose.model('Game', gameSchema);

module.exports = GameModel;
