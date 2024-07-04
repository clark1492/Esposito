var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const gameEventSchema = new Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    game_event_id: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    game_id: {
        type: Number,
        required: true
    },
    minute: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    club_id: {
        type: Number,
        required: true
    },
    player_id: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    player_in_id: {
        type: Number,
        required: true
    }
});

const GameEventModel = mongoose.model('GameEvent', gameEventSchema, 'game_events');

module.exports = GameEventModel;
