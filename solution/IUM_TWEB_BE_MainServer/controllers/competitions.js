const fetch = require('node-fetch');

exports.getCompetitions = async (req, res) => {
    try {
        const response = await fetch('http://localhost:8989/v1/rest/competitions');
        if (!response.ok) {
            throw new Error('Failed to retrieve competitions');
        }
        const competitions = await response.json();
        res.status(200).json(competitions);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getCompetitionsPaged = async (req, res) => {
    try {
        const response = await fetch('http://localhost:8989/v1/rest/competitions/page?' + new URLSearchParams({
            pageSize : req.query.pageSize || 25,
            pageNumber : req.query.pageNumber || 0,
        }));
        if (!response.ok) {
            throw new Error('Failed to retrieve competitions');
        }
        const competitions = await response.json();
        res.status(200).json(competitions);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
exports.getCompetitionById = async (req, res) => {
    try {
        const response = await fetch(`http://localhost:8989/v1/rest/competitions/${req.params.id}`);
        if (!response.ok) {
            if (response.status === 404) {
                return res.status(404).json({ message: 'Competition not found' });
            }
            throw new Error('Failed to retrieve competition');
        }
        const competition = await response.json();
        res.status(200).json(competition);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.createCompetition = async (req, res) => {
    try {
        const response = await fetch('http://localhost:8989/v1/rest/competitions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(req.body),
        });
        if (!response.ok) {
            throw new Error('Failed to create competition');
        }
        const newCompetition = await response.json();
        res.status(201).json(newCompetition);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.updateCompetitionById = async (req, res) => {
    try {
        const response = await fetch(`http://localhost:8989/v1/rest/competitions/${req.params.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(req.body),
        });
        if (!response.ok) {
            if (response.status === 404) {
                return res.status(404).json({ message: 'Competition not found' });
            }
            throw new Error('Failed to update competition');
        }
        const updatedCompetition = await response.json();
        res.status(200).json(updatedCompetition);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.deleteCompetitionById = async (req, res) => {
    try {
        const response = await fetch(`http://localhost:8989/v1/rest/competitions/${req.params.id}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            if (response.status === 404) {
                return res.status(404).json({ message: 'Competition not found' });
            }
            throw new Error('Failed to delete competition');
        }
        res.status(204).json({ message: 'Competition deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
