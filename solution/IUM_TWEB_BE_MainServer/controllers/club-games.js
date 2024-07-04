const fetch = require('node-fetch');

exports.getClubGames = async (req, res) => {
    try {
        const response = await fetch('http://localhost:8989/v1/rest/clubGames');
        if (!response.ok) {
            throw new Error('Failed to retrieve club games');
        }
        const clubGames = await response.json();
        res.status(200).json(clubGames);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getClubGamesPaged = async (req, res) => {
    try {
        const response = await fetch('http://localhost:8989/v1/rest/clubGames/page?'+ new URLSearchParams({
            pageSize : req.query.pageSize || 25,
            pageNumber: req.query.pageNumber || 0,
        }));
        if (!response.ok) {
            throw new Error('Failed to retrieve club games');
        }
        const clubGames = await response.json();
        res.status(200).json(clubGames);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getClubGameById = async (req, res) => {
    try {
        const response = await fetch(`http://localhost:8989/v1/rest/clubGames/game/${req.params.gameid}/club/${req.params.clubid}`);
        if (!response.ok) {
            if (response.status === 404) {
                return res.status(404).json({ message: 'Club game not found' });
            }
            throw new Error('Failed to retrieve club game');
        }
        const clubGame = await response.json();
        res.status(200).json(clubGame);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.createClubGame = async (req, res) => {
    try {
        const response = await fetch('http://localhost:8989/v1/rest/clubGames', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(req.body),
        });
        if (!response.ok) {
            throw new Error('Failed to create club game');
        }
        const newClubGame = await response.json();
        res.status(201).json(newClubGame);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.updateClubGameById = async (req, res) => {
    try {
        const response = await fetch(`http://localhost:8989/v1/rest/clubGames/game/${req.params.gameid}/club/${req.params.clubid}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(req.body),
        });
        if (!response.ok) {
            if (response.status === 404) {
                return res.status(404).json({ message: 'Club game not found' });
            }
            throw new Error('Failed to update club game');
        }
        const updatedClubGame = await response.json();
        res.status(200).json(updatedClubGame);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.deleteClubGameById = async (req, res) => {
    try {
        const response = await fetch(`http://localhost:8989/v1/rest/clubGames/game/${req.params.gameid}/club/${req.params.clubid}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            if (response.status === 404) {
                return res.status(404).json({ message: 'Club game not found' });
            }
            throw new Error('Failed to delete club game');
        }
        res.status(204).json({ message: 'Club game deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};