const express = require('express');
const router = express.Router();
const clubGameController = require('../controllers/club-games');

/**
 * @swagger
 * tags:
 *   name: Club Games
 *   description: Endpoints for managing club games
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     ClubGame:
 *       type: object
 *       properties:
 *         id:
 *           type: object
 *           properties:
 *             clubId:
 *               type: integer
 *             gameId:
 *               type: integer
 *           required:
 *             - clubId
 *             - gameId
 *         ownGoals:
 *           type: integer
 *         ownPosition:
 *           type: integer
 *         ownManagerName:
 *           type: string
 *         opponentId:
 *           type: integer
 *         opponentGoals:
 *           type: integer
 *         opponentPosition:
 *           type: integer
 *         opponentManagerName:
 *           type: string
 *         hosting:
 *           type: string
 *         win:
 *           type: boolean
 *       required:
 *         - ownGoals
 *         - opponentId
 *         - opponentGoals
 *         - hosting
 *         - win
 */


/**
 * @swagger
 * /club-games:
 *   get:
 *     summary: Retrieve a list of club games
 *     description: Retrieve a list of club games from the external server.
 *     tags: [Club Games]
 *     responses:
 *       200:
 *         description: A list of club games
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ClubGame'
 *       500:
 *         description: Internal server error
 */
router.get('/', clubGameController.getClubGames);

/**
 * @swagger
 * /club-games/{gameid}/{clubid}:
 *   get:
 *     summary: Retrieve a single club game by game ID and club ID
 *     description: Retrieve a single club game from the external server by its game ID and club ID
 *     tags: [Club Games]
 *     parameters:
 *       - in: path
 *         name: gameid
 *         required: true
 *         description: ID of game related to the club game to delete
 *         schema:
 *           type: integer
 *       - in: path
 *         name: clubid
 *         required: true
 *         description: ID of club related to the game to delete
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A single club game
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ClubGame'
 *       404:
 *         description: Club game not found
 *       500:
 *         description: Internal server error
 */
router.get('/:gameid/:clubid', clubGameController.getClubGameById);

/**
 * @swagger
 * /club-games:
 *   post:
 *     summary: Create a new club game
 *     description: Create a new club game in the external server.
 *     tags: [Club Games]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ClubGame'
 *     responses:
 *       201:
 *         description: A new club game created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ClubGame'
 *       500:
 *         description: Internal server error
 */
router.post('/', clubGameController.createClubGame);

/**
 * @swagger
 * /club-games/{id}:
 *   put:
 *     summary: Update a club game by ID
 *     description: Update an existing club game in the external server by its ID.
 *     tags: [Club Games]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the club game to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ClubGame'
 *     responses:
 *       200:
 *         description: Updated club game
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ClubGame'
 *       404:
 *         description: Club game not found
 *       500:
 *         description: Internal server error
 */
router.put('/:gameid/:clubid', clubGameController.updateClubGameById);

/**
 * @swagger
 * /club-games/{gameid}/{clubid}:
 *   delete:
 *     summary: Delete a club game by ID
 *     description: Delete an existing club game in the external server by its ID.
 *     tags: [Club Games]
 *     parameters:
 *      - in: path
 *        name: gameid
 *        required: true
 *        description: ID of game related to the club game to delete
 *        schema:
 *          type: integer
 *      - in: path
 *        name: clubid
 *        required: true
 *        description: ID of club related to the game to delete
 *        schema:
 *          type: integer
 *     responses:
 *       200:
 *         description: Club game deleted
 *       404:
 *         description: Club game not found
 *       500:
 *         description: Internal server error
 */

router.delete('/:gameid/:clubid', clubGameController.deleteClubGameById);

module.exports = router;
