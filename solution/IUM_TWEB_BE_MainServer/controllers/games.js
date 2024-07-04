const Games = require('../models/game');
const services = require('../service-layer')('./services');

// Create a new game
exports.createGame = async function(req, res) {
    try {
        const newGame = new Games(req.body);
        const savedGame = await newGame.save();
        res.status(201).json(savedGame);
    } catch (error) {
        res.status(500).json({ message: error.message });
        services.log.error(error);
    }
};

// Get all games with pagination
exports.getAllGamesPaged = async function(req, res) {
    try {
        let pageNumber = req.query.pageNumber || 0;
        let pageSize = req.query.pageSize || 25;
        const games = await Games.find().limit(pageSize).sort({ createdAt: -1 }).skip(pageSize * pageNumber);
        res.json(games);
    } catch (error) {
        res.status(500).json({ message: error.message });
        services.log.error(error);
    }
};

// Get all games
exports.getAllGames = async function(req, res) {
    try {
        const games = await Games.find().limit(100);
        res.json(games);
    } catch (error) {
        res.status(500).json({ message: error.message });
        services.log.error(error);
    }
};

// Get a single game by ID
exports.getGameById = async function(req, res) {
    try {
        const game = await Games.find({'game_id':req.params.id});
        if (!game) {
            return res.status(404).json({ message: "Game not found" });
        }
        res.json(game);
    } catch (error) {
        res.status(500).json({ message: error.message });
        services.log.error(error);
    }
};

// Update a game by ID
exports.updateGameById = async function(req, res) {
    try {
        const updatedGame = await Games.updateOne({'game_id':req.params.id}, req.body, { new: true });
        if (!updatedGame) {
            return res.status(404).json({ message: "Game not found" });
        }
        res.json(updatedGame);
    } catch (error) {
        res.status(500).json({ message: error.message });
        services.log.error(error);
    }
};

// Delete a game by ID
exports.deleteGameById = async function(req, res) {
    try {
        const deletedGame = await Games.deleteOne({'game_id':req.params.id});
        if (!deletedGame) {
            return res.status(404).json({ message: "Game not found" });
        }
        res.json({ message: "Game deleted successfully" });  // Imposta content-type:json, impostando anche status:200
    } catch (error) {
        res.status(500).json({ message: error.message });
        services.log.error(error);
    }
};
