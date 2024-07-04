// Router for game events
const express = require('express');
const router = express.Router();
const gameAppearanceController = require('../controllers/game-appearances');
const services = require('../service-layer')('./services');

/**
 * @swagger
 * components:
 *   schemas:
 *     GameAppearance:
 *       type: object
 *       required:
 *         - game_id
 *         - date
 *         - player_id
 *         - club_id
 *       properties:
 *         game_id:
 *           type: integer
 *           description: Unique identifier for the game.
 *         date:
 *           type: string
 *           format: date
 *           description: Date of the game appearance (YYYY-MM-DD).
 *         player_id:
 *           type: integer
 *           description: Unique identifier for the player.
 *         club_id:
 *           type: integer
 *           description: Unique identifier for the club.
 *         player_name:
 *           type: string
 *           description: Name of the player.
 *         description:
 *           type: string
 *           description: Description of the game appearance.
 *         player_in_id:
 *           type: integer
 *           description: Unique identifier for the player who entered the game.
 */

// Create a new game appearance
/**
 * @swagger
 * /game-appearances:
 *   post:
 *     summary: Create a new game appearance
 *     tags: [Game Appearances]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/GameAppearance'
 *     responses:
 *       '200':
 *         description: Successful operation
 *       '500':
 *         description: Internal server error
 */
router.post('/', gameAppearanceController.createGameAppearance);

// Get all game appearances
/**
 * @swagger
 * /game-appearances:
 *   get:
 *     summary: Get all game appearances
 *     tags: [Game Appearances]
 *     responses:
 *       '200':
 *         description: Successful operation
 *       '500':
 *         description: Internal server error
 */
router.get('/', gameAppearanceController.getAllGameAppearances);

// Get all game appearances with pagination
/**
 * @swagger
 * /game-appearances/page:
 *   get:
 *     summary: Get all game appearances
 *     tags: [Game Appearances]
 *     parameters:
 *       - in: query
 *         name: pageSize
 *         required: false
 *         description: Number of items to retrieve in a page
 *         schema:
 *           type: integer
 *       - in: query
 *         name: pageNumber
 *         required: false
 *         description: Page number to retrieve
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Successful operation
 *       '500':
 *         description: Internal server error
 */
router.get('/page', gameAppearanceController.getAllGameAppearancesPaged);

// Get a single game appearance by ID
/**
 * @swagger
 * /game-appearances/{id}:
 *   get:
 *     summary: Get a single game appearance by ID
 *     tags: [Game Appearances]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the game appearance to retrieve
 *         schema:
 *           type: string
 *           format: ObjectId
 *     responses:
 *       '200':
 *         description: Successful operation
 *       '404':
 *         description: Game appearance not found
 *       '500':
 *         description: Internal server error
 */
router.get('/:id', gameAppearanceController.getGameAppearanceById);

// Get a player info
/**
 * @swagger
 * /game-appearances/search/club:
 *   get:
 *     summary: Get a player info from club id
 *     tags: [Game Appearances]
 *     parameters:
 *       - in: query
 *         name: clubid
 *         required: true
 *         description: ID of the club
 *         schema:
 *           type: integer
 *       - in: query
 *         name: startdate
 *         required: true
 *         description: the start date of the season
 *         schema:
 *           type: string
 *       - in: query
 *         name: enddate
 *         required: true
 *         description: the end date of the season
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successful operation
 *       '404':
 *         description: Player info not found
 *       '500':
 *         description: Internal server error
 */
router.get('/search/club',gameAppearanceController.getPlayerInfoAggregateClubName);

// Update a game appearance by ID
/**
 * @swagger
 * /game-appearances/{id}:
 *   put:
 *     summary: Update a game appearance by ID
 *     tags: [Game Appearances]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the game appearance to update
 *         schema:
 *           type: string
 *           format: ObjectId
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/GameAppearance'
 *     responses:
 *       '200':
 *         description: Successful operation
 *       '404':
 *         description: Game appearance not found
 *       '500':
 *         description: Internal server error
 */
router.put('/:id', gameAppearanceController.updateGameAppearanceById);

// Delete a game appearance by ID
/**
 * @swagger
 * /game-appearances/{id}:
 *   delete:
 *     summary: Delete a game appearance by ID
 *     tags: [Game Appearances]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the game appearance to delete
 *         schema:
 *           type: string
 *           format: ObjectId
 *     responses:
 *       '200':
 *         description: Successful operation
 *       '404':
 *         description: Game appearance not found
 *       '500':
 *         description: Internal server error
 */
router.delete('/:id', gameAppearanceController.deleteGameAppearanceById);


// Get a player info
/**
 * @swagger
 * /game-appearances/search/player:
 *   get:
 *     summary: Get a player info from player id
 *     tags: [Game Appearances]
 *     parameters:
 *       - in: query
 *         name: playerid
 *         required: false
 *         description: ID of the player
 *         schema:
 *           type: integer
 *       - in: query
 *         name: startdate
 *         required: true
 *         description: the start date of the season
 *         schema:
 *           type: string
 *       - in: query
 *         name: enddate
 *         required: true
 *         description: the end date of the season
 *         schema:
 *           type: string
 *       - in: query
 *         name: pageSize
 *         required: false
 *         description: Number of items to retrieve in a page
 *         schema:
 *           type: integer
 *       - in: query
 *         name: pageNumber
 *         required: false
 *         description: Page number to retrieve
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Successful operation
 *       '404':
 *         description: Player info not found
 *       '500':
 *         description: Internal server error
 */
router.get('/search/player',gameAppearanceController.getPlayerInfoAggregatePlayerName);

module.exports = router;