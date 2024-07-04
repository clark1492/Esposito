const express = require('express');
const router = express.Router();
const gameLineUpController = require('../controllers/game-lineups');

/**
 * @swagger
 * tags:
 *   name: GameLineUps
 *   description: Endpoints for managing game lineups
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     GameLineUp:
 *       type: object
 *       properties:
 *         gameId:
 *           type: integer
 *         clubId:
 *           type: integer
 *         type:
 *           type: string
 *         number:
 *           type: integer
 *         playerId:
 *           type: integer
 *         playerName:
 *           type: string
 *         teamCaptain:
 *           type: boolean
 *         position:
 *           type: string
 *       required:
 *         - gameId
 *         - clubId
 *         - type
 *         - playerId
 *         - playerName
 *         - teamCaptain
 *         - position
 */

/**
 * @swagger
 * /game-lineups:
 *   get:
 *     summary: Retrieve a list of game lineups
 *     description: Retrieve a list of game lineups from the external server.
 *     tags: [GameLineUps]
 *     responses:
 *       200:
 *         description: A list of game lineups
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/GameLineUp'
 *       500:
 *         description: Internal server error
 */
router.get('/', gameLineUpController.getGameLineUps);

/**
 * @swagger
 * /game-lineups/page:
 *   get:
 *     summary: Retrieve a list of game lineups
 *     description: Retrieve a list of game lineups from the external server.
 *     tags: [GameLineUps]
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
 *       200:
 *         description: A list of game lineups
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/GameLineUp'
 *       500:
 *         description: Internal server error
 */
router.get('/page', gameLineUpController.getGameLineUpsPaged);

/**
 * @swagger
 * /game-lineups/{id}:
 *   get:
 *     summary: Retrieve a single game lineup by ID
 *     description: Retrieve a single game lineup from the external server by its ID.
 *     tags: [GameLineUps]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the game lineup to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A single game lineup
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GameLineUp'
 *       404:
 *         description: Game lineup not found
 *       500:
 *         description: Internal server error
 */
router.get('/:id', gameLineUpController.getGameLineUpById);

/**
 * @swagger
 * /game-lineups:
 *   post:
 *     summary: Create a new game lineup
 *     description: Create a new game lineup in the external server.
 *     tags: [GameLineUps]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/GameLineUp'
 *     responses:
 *       201:
 *         description: New game lineup created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GameLineUp'
 *       500:
 *         description: Internal server error
 */
router.post('/', gameLineUpController.createGameLineUp);

/**
 * @swagger
 * /game-lineups/{id}:
 *   put:
 *     summary: Update a game lineup by ID
 *     description: Update an existing game lineup in the external server by its ID.
 *     tags: [GameLineUps]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the game lineup to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/GameLineUp'
 *     responses:
 *       200:
 *         description: Updated game lineup
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GameLineUp'
 *       404:
 *         description: Game lineup not found
 *       500:
 *         description: Internal server error
 */
router.put('/:id', gameLineUpController.updateGameLineUpById);

/**
 * @swagger
 * /game-lineups/{id}:
 *   delete:
 *     summary: Delete a game lineup by ID
 *     description: Delete an existing game lineup from the external server by its ID.
 *     tags: [GameLineUps]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the game lineup to delete
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Game lineup deleted successfully
 *       404:
 *         description: Game lineup not found
 *       500:
 *         description: Internal server error
 */
router.delete('/:id', gameLineUpController.deleteGameLineUpById);

module.exports = router;
