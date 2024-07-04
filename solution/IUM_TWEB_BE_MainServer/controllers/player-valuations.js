const fetch = require('node-fetch');

exports.getPlayerValuations = async (req, res) => {
    try {
        const response = await fetch('http://localhost:8989/v1/rest/playerValuations');
        if (!response.ok) {
            throw new Error('Failed to retrieve player valuations');
        }
        const playerValuations = await response.json();
        res.status(200).json(playerValuations);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getPlayerValuationsPaged = async (req, res) => {
    try {
        const response = await fetch('http://localhost:8989/v1/rest/playerValuations/page?'+ new URLSearchParams({
            pageSize: req.query.pageSize || 25,
            pageNumber: req.query.pageNumber || 0,
        }));
        if (!response.ok) {
            throw new Error('Failed to retrieve player valuations');
        }
        const playerValuations = await response.json();
        res.status(200).json(playerValuations);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getPlayerValuationById = async (req, res) => {
    try {
        // /v1/rest/playerValuations/player/598/date/2004-10-04
        const response = await fetch(`http://localhost:8989/v1/rest/playerValuations/player/${req.params.playerid}/date/${req.params.date}`);
        if (!response.ok) {
            if (response.status === 404) {
                return res.status(404).json({ message: 'Player valuation not found' });
            }
            throw new Error('Failed to retrieve player valuation');
        }
        const playerValuation = await response.json();
        res.status(200).json(playerValuation);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getPlayerValuationByPlayerId = async (req, res) => {
    try {
        // /v1/rest/playerValuations/player/598
        //TODO:TONOTE: 404 or empty list as spring?
        const response = await fetch(`http://localhost:8989/v1/rest/playerValuations/player/${req.params.playerid}`);
        if (!response.ok) {
            if (response.status === 404) {
                return res.status(404).json({ message: 'Player valuation not found' });
            }
            throw new Error('Failed to retrieve player valuation');
        }
        const playerValuation = await response.json();
        res.status(200).json(playerValuation);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getPlayerValuationByClubId = async (req, res) => {
    try {
        // http://localhost:8989/v1/rest/playerValuations/club/24
        //TODO:TONOTE: 404 or empty list as spring?
        const response = await fetch(`http://localhost:8989/v1/rest/playerValuations/club/${req.params.clubid}`);
        if (!response.ok) {
            if (response.status === 404) {
                return res.status(404).json({ message: 'Player valuation not found by clubId' });
            }
            throw new Error('Failed to retrieve player valuation by clubId');
        }
        const playerValuation = await response.json();
        res.status(200).json(playerValuation);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getPlayerValuationAndInfoByClubId = async (req, res) => {
    try {
        // i.e. http://localhost:8989/v1/rest/playerValuations/info/club/5?pageSize=25&pageNumber=0
        const response = await fetch(`http://localhost:8989/v1/rest/playerValuations/info/club/${req.params.clubid}?`+ new URLSearchParams({
            pageSize: req.query.pageSize || 25,
            pageNumber: req.query.pageNumber || 0,
        }));
        if (!response.ok) {
            if (response.status === 404) {
                return res.status(404).json({ message: 'Player valuations by clubId not found' });
            }
            throw new Error('Failed to retrieve player valuation by clubId');
        }
        const playerValuation = await response.json();
        res.status(200).json(playerValuation);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.createPlayerValuation = async (req, res) => {
    try {
        const response = await fetch('http://localhost:8989/v1/rest/playerValuations', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(req.body),
        });
        if (!response.ok) {
            throw new Error('Failed to create player valuation');
        }
        const newPlayerValuation = await response.json();
        res.status(201).json(newPlayerValuation);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.updatePlayerValuationById = async (req, res) => {
    try {
        const response = await fetch(`http://localhost:8989/v1/rest/playerValuations/player/${req.params.playerid}/date/${req.params.date}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(req.body),
        });
        if (!response.ok) {
            if (response.status === 404) {
                return res.status(404).json({ message: 'Player valuation not found' });
            }
            throw new Error('Failed to update player valuation');
        }
        const updatedPlayerValuation = await response.json();
        res.status(200).json(updatedPlayerValuation);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.deletePlayerValuationById = async (req, res) => {
    try {
        const response = await fetch(`http://localhost:8989/v1/rest/playerValuations/player/${req.params.playerid}/date/${req.params.date}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            if (response.status === 404) {
                return res.status(404).json({ message: 'Player valuation not found' });
            }
            throw new Error('Failed to delete player valuation');
        }
        res.status(204).json({ message: 'Player valuation deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getPlayerValuationAndInfoByIdAndDates = async (req, res) => {
    try {
        //http://localhost:8989/v1/rest/playerValuations/info/player/16631
        const response = await fetch(`http://localhost:8989/v1/rest/playerValuations/info/player/${req.params.playerid}?`+ new URLSearchParams({
            pageSize: req.query.pageSize || 25,
            pageNumber: req.query.pageNumber || 0,
            startDate: req.query.startDate || "1950-01-01",
            endDate: req.query.endDate || "3000-12-12",
        }));
        if (!response.ok) {
            if (response.status === 404) {
                return res.status(404).json({ message: 'Player valuations by playerId not found' });
            }
            throw new Error('Failed to retrieve player valuation by playerId');
        }
        const playerValuation = await response.json();
        res.status(200).json(playerValuation);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getTopPlayerValuationAndInfoByIdAndDates = async (req, res) => {
    try {
        //http://localhost:8989/v1/rest/playerValuations/info/top/page
        const response = await fetch(`http://localhost:8989/v1/rest/playerValuations/info/top/page?`+ new URLSearchParams({
            pageSize: req.query.pageSize || 25,
            pageNumber: req.query.pageNumber || 0,
            startDate: req.query.startDate || "1950-01-01",
            endDate: req.query.endDate || "3000-12-12",
        }));
        if (!response.ok) {
            if (response.status === 404) {
                return res.status(404).json({ message: 'Player valuations not found' });
            }
            throw new Error('Failed to retrieve top player valuation');
        }
        const playerValuation = await response.json();
        res.status(200).json(playerValuation);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
