const GameAppearance = require('../models/game-appearance');
const services = require('../service-layer')('./services');


// Create a new game appearance
exports.createGameAppearance = async function (req, res) {
  try {
    const newGameAppearance = new GameAppearance(req.body);
    const savedGameAppearance = await newGameAppearance.save();
    res.status(201).json(savedGameAppearance);
  } catch (error) {
    res.status(500).json({message: error.message});
    services.log.error(error);
  }
};

// Get all game appearances
exports.getAllGameAppearances = async function (req, res) {
  try {
    const gameAppearances = await GameAppearance.find().limit(100);//.sort({ createdAt: -1 }).skip(pageSize * (pageNumber - 1))
    res.json(gameAppearances);
  } catch (error) {
    res.status(500).json({message: error.message});
    services.log.error(error);
  }
};

// Get all game appearances with pagination
exports.getAllGameAppearancesPaged = async function (req, res) {
  try {
    let pageSize = req.query.pageSize || 25;
    let pageNumber = req.query.pageNumber || 0;
    const gameAppearances = await GameAppearance.find().limit(pageSize).sort({createdAt: -1}).skip(pageSize * pageNumber);
    res.json(gameAppearances);
  } catch (error) {
    res.status(500).json({message: error.message});
    services.log.error(error);
  }
};

// Get a single game appearance by ID
exports.getGameAppearanceById = async function (req, res) {
  try {
    const gameAppearance = await GameAppearance.findOne({'appearance_id': req.params.id});
    if (!gameAppearance) {
      return res.status(404).json({message: "Game appearance not found"});
    }
    res.json(gameAppearance);
  } catch (error) {
    res.status(500).json({message: error.message});
    services.log.error(error);
  }
};

// Get a player info of the season from club name
exports.getPlayerInfoAggregateClubName = async function (req, res) {
  try {

    const clubId = parseInt(req.query.clubid, 10);

    var pipeline = [
      {
        $match: {
          $and: [
            {
              player_club_id: clubId
            },
            {
              date: {
                $gte: req.query.startdate
              }
            },
            {
              date: {
                $lte: req.query.enddate
              }
            }
          ]
        }
      },
      {
        $group: {
          _id: {
            player_name: "$player_name",
            player_club_id: "$player_club_id",
            player_id: "$player_id"
          },
          yellow_cards: {$sum: "$yellow_cards"},
          red_cards: {$sum: "$red_cards"},
          goals: {$sum: "$goals"},
          assists: {$sum: "$assists"},
          minutes_played: {$sum: "$minutes_played"},
          appearances: {$count: {}}
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
          appearances : "$appearances"
        }
      }
    ];
    const result = await GameAppearance.aggregate(pipeline).limit(25).sort({createdAt: -1}).skip(pageSize * pageNumber);
    console.log("Aggregation result:", result);

    return res.json(result);
  } catch (error) {
    console.error("Error performing aggregation:", error);
    res.status(500).json({ message: "Error performing aggregation", error });
  }
};

// Get a player info of the season new
exports.getPlayerInfoAggregatePlayerName = async function (req, res) {
  try {
    let pageSize = parseInt(req.query.pageSize || 25);
    let pageNumber = parseInt(req.query.pageNumber || 0);
    var andCondition = [{
      date: {
        $gte: req.query.startdate,
        $lte: req.query.enddate
      }
    }];
    if(req.query.playerid) {

      const playerId = parseInt(req.query.playerid, 10);
      andCondition.push({player_id: playerId});
    }
      var pipeline = [
        {
          $match: {
            $and: andCondition
          }
        },
        {
          $group: {
            _id: {
              player_name: "$player_name",
              player_club_id: "$player_club_id",
              player_id: "$player_id"
            },
            yellow_cards: {$sum: "$yellow_cards"},
            red_cards: {$sum: "$red_cards"},
            goals: {$sum: "$goals"},
            assists: {$sum: "$assists"},
            minutes_played: {$sum: "$minutes_played"},
            appearances: {$count: {}}
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
        },
        { $skip : pageSize * pageNumber }

      ];
    const result = await GameAppearance.aggregate(pipeline).limit(pageSize)/*.skip(pageSize*pageNumber)*/;

    console.log("Aggregation result:", result);
    console.log("Aggregation field:", result[0].player_id);

    return res.json(result);
  } catch (error) {
    console.error("Error performing aggregation:", error);
    res.status(500).json({ message: "Error performing aggregation", error });
  }
};

// Update a game appearance by ID
exports.updateGameAppearanceById = async function (req, res) {
  try {
    const updatedGameAppearance = await GameAppearance.updateOne({'appearance_id': req.params.id}, req.body, {new: true});
    if (!updatedGameAppearance) {
      return res.status(404).json({message: "Game appearance not found"});
    }
    res.json(updatedGameAppearance);
  } catch (error) {
    res.status(500).json({message: error.message});
    services.log.error(error);
  }
};

// Delete a game appearance by ID
exports.deleteGameAppearanceById = async function (req, res) {
  try {
    const deletedGameAppearance = await GameAppearance.deleteOne({'appearance_id': req.params.id});
    if (!deletedGameAppearance) {
      return res.status(404).json({message: "Game appearance not found"});
    }
    res.json({message: "Game appearance deleted successfully"});
  } catch (error) {
    res.status(500).json({message: error.message});
    services.log.error(error);
  }
};
