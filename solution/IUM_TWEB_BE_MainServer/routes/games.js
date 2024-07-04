const express = require('express');
const router = express.Router();
const gameController = require('../controllers/games');

/**
 * @swagger
 * components:
 *   schemas:
 *     Game:
 *       type: object
 *       required:
 *         - game_id
 *         - competition_id
 *         - season
 *         - date
 *         - home_club_id
 *         - away_club_id
 *       properties:
 *         game_id:
 *           type: integer
 *           description: Unique identifier for the game.
 *         competition_id:
 *           type: string
 *           description: Identifier for the competition.
 *         season:
 *           type: integer
 *           description: Year of the season.
 *         round:
 *           type: string
 *           description: Round of the game.
 *         date:
 *           type: string
 *           format: date
 *           description: Date of the game (YYYY-MM-DD).
 *         home_club_id:
 *           type: integer
 *           description: Unique identifier for the home club.
 *         away_club_id:
 *           type: integer
 *           description: Unique identifier for the away club.
 *         home_club_goals:
 *           type: integer
 *           description: Number of goals scored by the home club.
 *         away_club_goals:
 *           type: integer
 *           description: Number of goals scored by the away club.
 *         home_club_position:
 *           type: integer
 *           description: Position of the home club.
 *         away_club_position:
 *           type: integer
 *           description: Position of the away club.
 *         home_club_manager_name:
 *           type: string
 *           description: Name of the manager of the home club.
 *         away_club_manager_name:
 *           type: string
 *           description: Name of the manager of the away club.
 *         stadium:
 *           type: string
 *           description: Name of the stadium where the game is played.
 *         attendance:
 *           type: integer
 *           description: Number of attendees at the game.
 *         referee:
 *           type: string
 *           description: Name of the referee officiating the game.
 *         url:
 *           type: string
 *           format: url
 *           description: URL to the game details.
 *         home_club_name:
 *           type: string
 *           description: Name of the home club.
 *         away_club_name:
 *           type: string
 *           description: Name of the away club.
 *         aggregate:
 *           type: string
 *           description: Aggregate score of the game.
 *         competition_type:
 *           type: string
 *           description: Type of competition.
 */


// Create a new game
/**
 * @swagger
 * /games:
 *   post:
 *     summary: Create a new game
 *     tags: [Games]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Game'
 *     responses:
 *       '201':
 *         description: Created
 *       '500':
 *         description: Internal server error
 */
router.post('/', gameController.createGame);

// Get all games
/**
 * @swagger
 * /games:
 *   get:
 *     summary: Get all games
 *     tags: [Games]
 *     responses:
 *       '200':
 *         description: Successful operation
 *       '500':
 *         description: Internal server error
 */
router.get('/', gameController.getAllGames);

// Get all games
/**
 * @swagger
 * /games/page:
 *   get:
 *     summary: Get all games
 *     tags: [Games]
 *     responses:
 *       '200':
 *         description: Successful operation
 *       '500':
 *         description: Internal server error
 */
router.get('/page', gameController.getAllGamesPaged);

// Get a single game by ID
/**
 * @swagger
 * /games/{id}:
 *   get:
 *     summary: Get a single game by ID
 *     tags: [Games]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the game to retrieve
 *         schema:
 *           type: string
 *           format: ObjectId
 *     responses:
 *       '200':
 *         description: Successful operation
 *       '404':
 *         description: Game not found
 *       '500':
 *         description: Internal server error
 */
router.get('/:id', gameController.getGameById);

// Update a game by ID
/**
 * @swagger
 * /games/{id}:
 *   put:
 *     summary: Update a game by ID
 *     tags: [Games]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the game to update
 *         schema:
 *           type: string
 *           format: ObjectId
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Game'
 *     responses:
 *       '200':
 *         description: Updated successfully
 *       '404':
 *         description: Game not found
 *       '500':
 *         description: Internal server error
 */
router.put('/:id', gameController.updateGameById);

// Delete a game by ID
/**
 * @swagger
 * /games/{id}:
 *   delete:
 *     summary: Delete a game by ID
 *     tags: [Games]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the game to delete
 *         schema:
 *           type: string
 *           format: ObjectId
 *     responses:
 *       '200':
 *         description: Deleted successfully
 *       '404':
 *         description: Game not found
 *       '500':
 *         description: Internal server error
 */
router.delete('/:id', gameController.deleteGameById);

module.exports = router;
