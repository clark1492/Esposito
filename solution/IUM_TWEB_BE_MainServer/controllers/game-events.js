// the controller must import the model(s) it works on
const GameEvent = require('../models/game-event');
const {log} = require("../services/log-service");

// Create a new game event
exports.createGameEvent = async function(req, res) {
    try {
        const gameEvent = new GameEvent(req.body);
        await gameEvent.save();
        res.status(201).json(gameEvent);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Get all game events
exports.getAllGameEvents = async function(req, res) {
    try {
        const gameEvents = await GameEvent.find().limit(100);
        res.status(200).json(gameEvents);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Get all game events with pagination
exports.getAllGameEventsPaged = async function(req, res) {
    try {
        let pageSize = req.query.pageSize || 25;
        let pageNumber = req.query.pageNumber || 0;
        const gameEvents = await GameEvent.find().limit(pageSize).sort({ createdAt: -1 }).skip(pageSize * pageNumber);
        res.status(200).json(gameEvents);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Get a single game event by ID
exports.getGameEventById = async function(req, res) {
    try {
        const gameEvent = await GameEvent.findOne({'game_event_id': req.params.id});
        if (!gameEvent) {
            res.status(404).json({ message: 'Game event not found' });
            return;
        }
        res.status(200).json(gameEvent);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Update a game event by ID
exports.updateGameEventById = async function(req, res) {
    try {
        const gameEvent = await GameEvent.updateOne({'game_event_id': req.params.id}, req.body, { new: true });
        if (!gameEvent) {
            res.status(404).json({ message: 'Game event not found' });
            return;
        }
        res.status(200).json(gameEvent);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Delete a game event by ID
exports.deleteGameEventById = async function(req, res) {
    try {
        const gameEvent = await GameEvent.deleteOne({'game_event_id': req.params.id});
        if (!gameEvent) {
            res.status(404).json({ message: 'Game event not found' });
            return;
        }
        res.status(200).json({ message: 'Deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
