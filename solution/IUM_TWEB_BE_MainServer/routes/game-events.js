// Router for game events
const express = require('express');
const router = express.Router();
const gameEventsController = require('../controllers/game-events');
const services = require('../service-layer')('./services');

/**
 * @swagger
 * tags:
 *   name: Game Events
 *   description: API endpoints for managing game events
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     GameEvent:
 *       type: object
 *       required:
 *         - game_event_id
 *         - date
 *         - game_id
 *         - minute
 *         - type
 *         - club_id
 *         - player_id
 *         - description
 *         - player_in_id
 *       properties:
 *         game_event_id:
 *           type: string
 *           description: Unique identifier for the game event.
 *         date:
 *           type: string
 *           format: date
 *           description: Date of the game event (YYYY-MM-DD).
 *         game_id:
 *           type: integer
 *           description: ID of the game associated with the event.
 *         minute:
 *           type: integer
 *           description: Minute of the game when the event occurred.
 *         type:
 *           type: string
 *           description: Type of the event (e.g., "Goal", "Substitution").
 *         club_id:
 *           type: integer
 *           description: ID of the club associated with the event.
 *         player_id:
 *           type: integer
 *           description: ID of the player involved in the event.
 *         description:
 *           type: string
 *           description: Description of the event.
 *         player_in_id:
 *           type: integer
 *           description: ID of the player who entered the game (for substitution events).
 */


/**
 * @swagger
 * /game-events:
 *   post:
 *     summary: Create a new game event
 *     tags: [Game Events]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/GameEvent'
 *     responses:
 *       '201':
 *         description: Created
 *       '500':
 *         description: Internal server error
 */
router.post('/', gameEventsController.createGameEvent);

/**
 * @swagger
 * /game-events:
 *   get:
 *     summary: Get all game events
 *     tags: [Game Events]
 *     responses:
 *       '200':
 *         description: Successful operation
 *       '500':
 *         description: Internal server error
 */
router.get('/', gameEventsController.getAllGameEvents);

/**
 * @swagger
 * /game-events/{id}:
 *   get:
 *     summary: Get a single game event by ID
 *     tags: [Game Events]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the game event to retrieve
 *         schema:
 *           type: string
 *           format: ObjectId
 *     responses:
 *       '200':
 *         description: Successful operation
 *       '404':
 *         description: Game event not found
 *       '500':
 *         description: Internal server error
 */
router.get('/:id', gameEventsController.getGameEventById);

/**
 * @swagger
 * /game-events/{id}:
 *   put:
 *     summary: Update a game event by ID
 *     tags: [Game Events]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the game event to update
 *         schema:
 *           type: string
 *           format: ObjectId
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/GameEvent'
 *     responses:
 *       '200':
 *         description: Updated successfully
 *       '404':
 *         description: Game event not found
 *       '500':
 *         description: Internal server error
 */
router.put('/:id', gameEventsController.updateGameEventById);

/**
 * @swagger
 * /game-events/{id}:
 *   delete:
 *     summary: Delete a game event by ID
 *     tags: [Game Events]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the game event to delete
 *         schema:
 *           type: string
 *           format: ObjectId
 *     responses:
 *       '200':
 *         description: Deleted successfully
 *       '404':
 *         description: Game event not found
 *       '500':
 *         description: Internal server error
 */
router.delete('/:id', gameEventsController.deleteGameEventById);

module.exports = router;