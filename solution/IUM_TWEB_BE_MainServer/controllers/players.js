// players-controller.js

const fetch = require('node-fetch');
const GameAppearance = require("../models/game-appearance");
const services = require('../service-layer')('./services');

// Get all players
exports.getPlayers = async function(req, res) {
    try {
        // Set the options
        let options = {
            method: 'get',
            headers: { 'Content-Type': 'application/json' },
            'user-agent': 'mainserverEXP'
        };

        const response = await fetch('http://localhost:8989/v1/rest/player', options);

        if (response.ok) {
            const json = await response.json();
            res.json(json);
        } else {
            // Forward the response code and message
            res.status(response.status).send(await response.text());
        }
    } catch (error) {
        // Handle errors
        services.log.error(error);
        res.status(500).send('Internal server error');
    }
};

exports.getPlayersPaged = async function(req, res) {
    try {
        // Set the options
        let options = {
            method: 'get',
            headers: { 'Content-Type': 'application/json' },
            'user-agent': 'mainserverEXP'
        };

        const response = await fetch('http://localhost:8989/v1/rest/player/page?' + new URLSearchParams({
            pageSize: req.query.pageSize || 25,
            pageNumber: req.query.pageNumber || 0,
        }), options);

        if (!response.ok) {
            throw new Error('Failed to retrieve players');
        }
        const players = await response.json();
        res.status(200).json(players);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get a single player by ID
exports.getPlayerById = async function(req, res) {
    try {
        // Set the options
        let options = {
            method: 'get',
            headers: { 'Content-Type': 'application/json', 'User-Agent': 'mainserverEXP (node-fetch)' }
        };

        const response = await fetch(`http://localhost:8989/v1/rest/player/${req.params.id}`, options);

        if (response.ok) {
            const json = await response.json();
            res.json(json);
        } else {
            // Forward the response code and message
            res.status(response.status).send(await response.text());
        }
    } catch (error) {
        // Handle errors
        services.log.error(error);
        res.status(500).send('Internal server error');
    }
};

// Create a new player
exports.createPlayer = async function(req, res) {
    try {
        // Set the options
        let options = {
            method: 'post',
            headers: { 'Content-Type': 'application/json', 'User-Agent': 'mainserverEXP (node-fetch)' },
            body: JSON.stringify(req.body)
        };

        const response = await fetch('http://localhost:8989/v1/rest/player', options);

        if (response.ok) {
            const json = await response.json();
            res.json(json);
        } else {
            // Forward the response code and message
            res.status(response.status).send(await response.text());
        }
    } catch (error) {
        // Handle errors
        services.log.error(error);
        res.status(500).send('Internal server error');
    }
};

// Update a player by ID
exports.updatePlayerById = async function(req, res) {
    try {
        // Set the options
        let options = {
            method: 'put',
            headers: { 'Content-Type': 'application/json', 'User-Agent': 'mainserverEXP (node-fetch)' },
            body: JSON.stringify(req.body)
        };

        const response = await fetch(`http://localhost:8989/v1/rest/player/${req.params.id}`, options);

        if (response.ok) {
            const json = await response.json();
            res.json(json);
        } else {
            // Forward the response code and message
            res.status(response.status).send(await response.text());
        }
    } catch (error) {
        // Handle errors
        services.log.error(error);
        res.status(500).send('Internal server error');
    }
};

// Delete a player by ID
exports.deletePlayerById = async function(req, res) {
    try {
        // Set the options
        let options = {
            method: 'delete',
            headers: {'Content-Type': 'application/json', 'User-Agent': 'mainserverEXP (node-fetch)'}
        };

        const response = await fetch(`http://localhost:8989/v1/rest/player/${req.params.id}`, options);

        if (response.ok) {
            res.status(204).send(); // No content for successful deletion
        } else {
            // Forward the response code and message
            res.status(response.status).send(await response.text());
        }
    } catch (error) {
        // Handle errors
        services.log.error(error);
        res.status(500).send('Internal server error');
    }
};

// Search a player by name
exports.searchPlayersByName = async function(req, res) {
    try {
        // Set the options
        let options = {
            method: 'get',
            headers: { 'User-Agent': 'mainserverEXP (node-fetch)' }
        };

        const response = await fetch(`http://localhost:8989/v1/rest/player/search/name?` + new URLSearchParams({
            name : req.query.name,
        }), options);

        if (response.ok) {
            const json = await response.json();
            res.json(json);
        } else {
            // Forward the response code and message
            res.status(response.status).send(await response.text());
        }
    } catch (error) {
        // Handle errors
        services.log.error(error);
        res.status(500).send('Internal server error');
    }
};

async function searchPlayerByNameAndPosition(name,position,res){
    try {
        // Set the options
        let options = {
            method: 'get',
            headers: {'User-Agent': 'mainserverEXP (node-fetch)'}
        };

        const response = await fetch(`http://localhost:8989/v1/rest/player/search/name/position?` + new URLSearchParams({
            name,
            position,
        }), options);

        if (response.ok) {
            console.log(response);
            return response.json();
        } else {
            res.status(response.status).send(await response.text());
        }
    } catch (error) {
        // Handle errors
        services.log.error(error);
        res.status(500).send('Internal server error');
    }
}

async function searchPlayer(playerList){
    try {
        // Set the options
        let options = {
            method: 'get',
            headers: {'User-Agent': 'mainserverEXP (node-fetch)'}
        };

        const response = await fetch(`http://localhost:8989/v1/rest/player/search/name/position?` + new URLSearchParams({
            name,
            position,
        }), options);

        if (response.ok) {
            console.log(response);
            return response.json();
        } else {
            res.status(response.status).send(await response.text());
        }
    } catch (error) {
        // Handle errors
        services.log.error(error);
        res.status(500).send('Internal server error');
    }
}

exports.searchPlayerInfo = async function (req, res) {
    try {
        const options = {
            method: 'get',
            headers: { 'User-Agent': 'mainserverEXP (node-fetch)' }
        };

        // Fetch player data
        const response = await fetch(`http://localhost:8989/v1/rest/player/search/name/position?` + new URLSearchParams({
            name: req.query.name || "",
            position: req.query.position || "",
            pageSize: req.query.pageSize || 100,
        }), options);

        if (!response.ok) {
            console.log("No response fetch players");
            return res.status(response.status).send(await response.text());
        }

        const playersList = await response.json();
        const playersMap = new Map(playersList.map(player => [parseInt(player.playerId), player]));

        const playerIds = playersList.map(player => parseInt(player.playerId));
        const andCondition = [
            { date: { $gte: req.query.start, $lte: req.query.end } },
            { player_id: { $in: playerIds } }
        ];

        const pipeline = [
            { $match: { $and: andCondition } },
            {
                $group: {
                    _id: { player_name: "$player_name", player_club_id: "$player_club_id", player_id: "$player_id" },
                    yellow_cards: { $sum: "$yellow_cards" },
                    red_cards: { $sum: "$red_cards" },
                    goals: { $sum: "$goals" },
                    assists: { $sum: "$assists" },
                    minutes_played: { $sum: "$minutes_played" },
                    appearances: { $count: {} }
                }
            },
            {
                $project: {
                    player_id: "$_id.player_id",
                    player_name: "$_id.player_name",
                    player_club_id: "$_id.player_club_id",
                    yellow_cards: "$yellow_cards",
                    red_cards: "$red_cards",
                    goals: "$goals",
                    assists: "$assists",
                    minutes_played: "$minutes_played",
                    appearances: "$appearances"
                }
            }
        ];

        const validAppearances = await GameAppearance.aggregate(pipeline);

        // Get unique club IDs
        const clubIds = [...new Set(validAppearances.map(appearance => appearance.player_club_id))];

        // Get all clubs in a single call
        const clubsResponse = await fetch(`http://localhost:8989/v1/rest/clubs/search/clubIds?` + new URLSearchParams({
            clubIds: clubIds.join(',')
        }), options);

        if (!clubsResponse.ok) {
            console.log("No response fetch clubs");
            return res.status(clubsResponse.status).send(await clubsResponse.text());
        }

        const clubsList = await clubsResponse.json();
        const clubMap = new Map(clubsList.map(club => [club.clubId, club]));

        // Process valid appearances and map club data
        const results = validAppearances.map(appearance => {
            const club = clubMap.get(appearance.player_club_id);
            const player = playersMap.get(appearance.player_id);
            return {
                player_name: appearance.player_name,
                player_id: appearance.player_id,
                club_id: appearance.player_club_id,
                club_name: club?.name || "N/A",
                position: player?.position || "N/A",
                market_value: player?.marketValueInEur || "N/A",
                image_url: player?.imageUrl || "https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg",
                yellow_cards: appearance.yellow_cards,
                red_cards: appearance.red_cards,
                goals: appearance.goals,
                assists: appearance.assists,
                minutes_played: appearance.minutes_played,
                appearances: appearance.appearances
            };
        });

        res.json(results);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error');
    }
};

