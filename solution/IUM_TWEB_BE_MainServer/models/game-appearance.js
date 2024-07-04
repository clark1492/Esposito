const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const gameAppearanceSchema = new Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    appearance_id: {
        type: Number,
        required: true
    },
    game_id: {
        type: Number,
        required: true
    },
    player_id: {
        type: Number,
        required: true
    },
    player_club_id: {
        type: Number,
        required: true
    },
    player_current_club_id: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    player_name: {
        type: String,
        required: true
    },
    competition_id: {
        type: String,
        required: true
    },
    yellow_cards: {
        type: Number,
        required: true
    },
    red_cards: {
        type: Number,
        required: true
    },
    goals: {
        type: Number,
        required: true
    },
    assists: {
        type: Number,
        required: true
    },
    minutes_played: {
        type: Number,
        required: true
    }
});

const GameAppearanceModel = mongoose.model('GameAppearance', gameAppearanceSchema, 'appearances');

module.exports = GameAppearanceModel;
