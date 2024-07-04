const express = require('express');
const router = express.Router();
const playersController = require('../controllers/players');
/**
 * @swagger
 * tags:
 *   name: Players
 *   description: API endpoints for managing players
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Player:
 *       type: object
 *       properties:
 *         playerId:
 *           type: integer
 *         firstName:
 *           type: string
 *         lastName:
 *           type: string
 *         name:
 *           type: string
 *         lastSeason:
 *           type: integer
 *         currentClubId:
 *           type: integer
 *         playerCode:
 *           type: string
 *         countryOfBirth:
 *           type: string
 *         cityOfBirth:
 *           type: string
 *         countryOfCitizenship:
 *           type: string
 *         dateOfBirth:
 *           type: string
 *           format: date
 *         subPosition:
 *           type: string
 *         position:
 *           type: string
 *         foot:
 *           type: string
 *         heightInCm:
 *           type: integer
 *         marketValueInEur:
 *           type: integer
 *         highestMarketValueInEur:
 *           type: integer
 *         contractExpirationDate:
 *           type: string
 *           format: date
 *         agentName:
 *           type: string
 *         imageUrl:
 *           type: string
 *         url:
 *           type: string
 *         currentClubDomesticCompetitionId:
 *           type: string
 *         currentClubName:
 *           type: string
 *       required:
 *         - lastName
 *         - name
 *         - lastSeason
 *         - currentClubId
 *         - playerCode
 *         - imageUrl
 *         - url
 *         - currentClubDomesticCompetitionId
 *         - currentClubName
 */


// Get all players
/**
 * @swagger
 * /players:
 *   get:
 *     summary: Retrieve a list of players
 *     description: Retrieve a list of players from the external server.
 *     tags: [Players]
 *     responses:
 *       200:
 *         description: A list of players
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Player'
 *       500:
 *         description: Internal server error
 */
router.get('/', playersController.getPlayers);

// Get all players paged
/**
 * @swagger
 * /players/page:
 *   get:
 *     summary: Retrieve a list of players paged
 *     description: Retrieve a list of players from the external server paged.
 *     tags: [Players]
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
 *         description: A list of players
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Player'
 *       500:
 *         description: Internal server error
 */
router.get('/page', playersController.getPlayersPaged);

// Get a single player by ID
/**
 * @swagger
 * /players/{id}:
 *   get:
 *     summary: Retrieve a single player by ID
 *     description: Retrieve a single player from the external server by its ID.
 *     tags: [Players]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the player to retrieve
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A single player
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Player'
 *       404:
 *         description: Player not found
 *       500:
 *         description: Internal server error
 */
router.get('/:id', playersController.getPlayerById);

// Create a new player
/**
 * @swagger
 * /players:
 *   post:
 *     summary: Create a new player
 *     description: Create a new player in the external server.
 *     tags: [Players]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Player'
 *     responses:
 *       201:
 *         description: Player created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Player'
 *       500:
 *         description: Internal server error
 */
router.post('/', playersController.createPlayer);

// Update a player by ID
/**
 * @swagger
 * /players/{id}:
 *   put:
 *     summary: Update a player by ID
 *     description: Update an existing player in the external server by its ID.
 *     tags: [Players]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the player to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Player'
 *     responses:
 *       200:
 *         description: Player updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Player'
 *       404:
 *         description: Player not found
 *       500:
 *         description: Internal server error
 */
router.put('/:id', playersController.updatePlayerById);

// Delete a player by ID
/**
 * @swagger
 * /players/{id}:
 *   delete:
 *     summary: Delete a player by ID
 *     description: Delete an existing player from the external server by its ID.
 *     tags: [Players]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the player to delete
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Player deleted successfully
 *       404:
 *         description: Player not found
 *       500:
 *         description: Internal server error
 */
router.delete('/:id', playersController.deletePlayerById);

/**
 * @swagger
 * /players/search/name:
 *   get:
 *     summary: Search a player by name
 *     description: Search a player from the external server by name.
 *     tags: [Players]
 *     parameters:
 *       - in: query
 *         name: name
 *         required: true
 *         description: Name of the player to search
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of players
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Player'
 *       500:
 *         description: Internal server error
 */
router.get('/search/name', playersController.searchPlayersByName);

/**
 * @swagger
 * /players/search/info:
 *   get:
 *     summary: Search a player info
 *     description: Search players by partial name, position and season.
 *     tags: [Players]
 *     parameters:
 *       - in: query
 *         name: name
 *         required: false
 *         description: Name of the player to search
 *         schema:
 *           type: string
 *       - in: query
 *         name: position
 *         required: false
 *         description: Position of the player to search
 *         schema:
 *           type: string
 *       - in: query
 *         name: start
 *         required: true
 *         description: Start of the season to search
 *         schema:
 *           type: string
 *       - in: query
 *         name: end
 *         required: true
 *         description: Enf of the season to search
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of players
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Player'
 *       500:
 *         description: Internal server error
 */
router.get('/search/info', playersController.searchPlayerInfo);


module.exports = router;