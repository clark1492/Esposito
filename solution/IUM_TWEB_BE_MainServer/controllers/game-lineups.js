const fetch = require('node-fetch');

exports.getGameLineUps = async (req, res) => {
    try {
        const response = await fetch('http://localhost:8989/v1/rest/gameLineUps');
        if (!response.ok) {
            throw new Error('Failed to retrieve game lineups');
        }
        const gameLineUps = await response.json();
        res.status(200).json(gameLineUps);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getGameLineUpsPaged = async (req, res) => {
    try {
        const response = await fetch('http://localhost:8989/v1/rest/gameLineUps/page?' + new URLSearchParams({
            pageSize: req.query.pageSize || 25,
            pageNumber: req.query.pageNumber || 0,
        }));
        if (!response.ok) {
            throw new Error('Failed to retrieve game lineups');
        }
        const gameLineUps = await response.json();
        res.status(200).json(gameLineUps);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getGameLineUpsPaged = async (req, res) => {
    try {
        const response = await fetch('http://localhost:8989/v1/rest/gameLineUps/page?' + new URLSearchParams({
            pageSize : req.query.pageSize || 25,
            pageNumber : req.query.pageNumber || 0,
        }));
        if (!response.ok) {
            throw new Error('Failed to retrieve game lineups');
        }
        const gameLineUps = await response.json();
        res.status(200).json(gameLineUps);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getGameLineUpById = async (req, res) => {
    try {
        const response = await fetch(`http://localhost:8989/v1/rest/gameLineUps/${req.params.id}`);
        if (!response.ok) {
            if (response.status === 404) {
                return res.status(404).json({ message: 'Game lineup not found' });
            }
            throw new Error('Failed to retrieve game lineup');
        }
        const gameLineUp = await response.json();
        res.status(200).json(gameLineUp);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.createGameLineUp = async (req, res) => {
    try {
        const response = await fetch('http://localhost:8989/v1/rest/gameLineUps', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(req.body),
        });
        if (!response.ok) {
            throw new Error('Failed to create game lineup');
        }
        const newGameLineUp = await response.json();
        res.status(201).json(newGameLineUp);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.updateGameLineUpById = async (req, res) => {
    try {
        const response = await fetch(`http://localhost:8989/v1/rest/gameLineUps/${req.params.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(req.body),
        });
        if (!response.ok) {
            if (response.status === 404) {
                return res.status(404).json({ message: 'Game lineup not found' });
            }
            throw new Error('Failed to update game lineup');
        }
        const updatedGameLineUp = await response.json();
        res.status(200).json(updatedGameLineUp);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.deleteGameLineUpById = async (req, res) => {
    try {
        const response = await fetch(`http://localhost:8989/v1/rest/gameLineUps/${req.params.id}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            if (response.status === 404) {
                return res.status(404).json({ message: 'Game lineup not found' });
            }
            throw new Error('Failed to delete game lineup');
        }
        res.status(204).json({ message: 'Game lineup deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
