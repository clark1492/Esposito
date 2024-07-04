const fetch = require('node-fetch');
const GameAppearance = require("../models/game-appearance");

exports.getClubs = async (req, res) => {
    try {
        const response = await fetch('http://localhost:8989/v1/rest/clubs');
        if (!response.ok) {
            throw new Error('Failed to retrieve clubs');
        }
        const clubs = await response.json();
        res.status(200).json(clubs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getClubsPaged = async (req, res) => {
    try {
        const response = await fetch('http://localhost:8989/v1/rest/clubs/page?' + new URLSearchParams({
            pageSize : req.query.pageSize || 25,
            pageNumber : req.query.pageNumber || 0,
        }));
        if (!response.ok) {
            throw new Error('Failed to retrieve clubs');
        }
        const clubs = await response.json();
        res.status(200).json(clubs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getClubById = async (req, res) => {
    try {
        const response = await fetch(`http://localhost:8989/v1/rest/clubs/${req.params.id}`);
        if (!response.ok) {
            if (response.status === 404) {
                return res.status(404).json({ message: 'Club not found' });
            }
            throw new Error('Failed to retrieve club');
        }
        const club = await response.json();
        res.status(200).json(club);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.createClub = async (req, res) => {
    try {
        const response = await fetch('http://localhost:8989/v1/rest/clubs', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(req.body),
        });
        if (!response.ok) {
            throw new Error('Failed to create club');
        }
        const newClub = await response.json();
        res.status(201).json(newClub);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.updateClubById = async (req, res) => {
    try {
        const response = await fetch(`http://localhost:8989/v1/rest/clubs/${req.params.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(req.body),
        });
        if (!response.ok) {
            if (response.status === 404) {
                return res.status(404).json({ message: 'Club not found' });
            }
            throw new Error('Failed to update club');
        }
        const updatedClub = await response.json();
        res.status(200).json(updatedClub);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.deleteClubById = async (req, res) => {
    try {
        const response = await fetch(`http://localhost:8989/v1/rest/clubs/${req.params.id}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            if (response.status === 404) {
                return res.status(404).json({ message: 'Club not found' });
            }
            throw new Error('Failed to delete club');
        }
        res.status(204).json({ message: 'Club deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }


};

// Search a club by name
exports.searchClubsByName = async function(req, res) {
    try {
        // Set the options
        let options = {
            method: 'get',
            headers: {'User-Agent': 'mainserverEXP (node-fetch)'}
        };

        const response = await fetch(`http://localhost:8989/v1/rest/clubs/search/name?`+ new URLSearchParams({
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

exports.searchPlayerInfo = async function (req, res) {
    try {
        const options = {
            method: 'get',
            headers: { 'User-Agent': 'mainserverEXP (node-fetch)' }
        };

        // Fetch player data
        const response = await fetch(`http://localhost:8989/v1/rest/clubs/search/name?` + new URLSearchParams({
            name: req.query.name || "",
            pageSize: req.query.pageSize || 10,
        }), options);

        if (!response.ok) {
            console.log("No response fetch clubs");
            return res.status(response.status).send(await response.text());
        }

        const clubsList = await response.json();
        const clubMap = new Map(clubsList.map(club => [club.clubId, club]));
        const clubIds = clubsList.map(club => parseInt(club.clubId));

        const andCondition = [
            { date: { $gte: req.query.start || '2000', $lte: req.query.end || '2100' } },
            { player_club_id: { $in: clubIds } }
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
        const playerIds = validAppearances.map(appearance => parseInt(appearance.player_id));

        // Get all playersInfo in a single call
        const playerResponse = await fetch(`http://localhost:8989/v1/rest/player/search/playerIds?` + new URLSearchParams({
            playerIds: playerIds.join(','),
            position: req.query.position || "",
            pageSize: req.query.pageSize || 1000,
        }), options);

        if (!playerResponse.ok) {
            console.log("No response fetch players");
            return res.status(playerResponse.status).send(await playerResponse.text());
        }

        const playersList = await playerResponse.json();
        const playersMap = new Map(playersList.map(player => [player.playerId, player]));


        // Process valid appearances and map club data
        const results = validAppearances.map(appearance => {
            const club = clubMap.get(appearance.player_club_id);
            const player = playersMap.get(appearance.player_id);
            //if(player !== undefined || club !== undefined) {  // There are some players that are not present
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
           // }
        });

        res.json(results);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error');
    }
};