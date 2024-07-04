const express = require('express');
const router = express.Router();
const clubController = require('../controllers/clubs');
const playersController = require("../controllers/players");
/**
 * @swagger
 * components:
 *   schemas:
 *     Club:
 *       type: object
 *       properties:
 *         clubId:
 *           type: integer
 *         clubCode:
 *           type: string
 *         name:
 *           type: string
 *         domesticCompetitionId:
 *           type: string
 *         totalMarketValue:
 *           type: boolean
 *         squadSize:
 *           type: integer
 *         averageAge:
 *           type: number
 *         foreignersNumber:
 *           type: integer
 *         foreignersPercentage:
 *           type: number
 *         nationalTeamPlayers:
 *           type: integer
 *         stadiumName:
 *           type: string
 *         stadiumSeats:
 *           type: integer
 *         netTransferRecord:
 *           type: string
 *         coachName:
 *           type: boolean
 *         lastSeason:
 *           type: integer
 *         url:
 *           type: string
 *       required:
 *         - clubCode
 *         - name
 *         - domesticCompetitionId
 *         - squadSize
 *         - nationalTeamPlayers
 *         - stadiumName
 *         - stadiumSeats
 *         - netTransferRecord
 *         - lastSeason
 *         - url
 */

/**
 * @swagger
 * /clubs:
 *   get:
 *     summary: Retrieve a list of clubs
 *     description: Retrieve a list of clubs from the external server.
 *     tags: [Clubs]
 *     responses:
 *       200:
 *         description: A list of clubs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Club'
 *       500:
 *         description: Internal server error
 */
router.get('/', clubController.getClubs);

/**
 * @swagger
 * /clubs/{id}:
 *   get:
 *     summary: Retrieve a single club by ID
 *     description: Retrieve a single club from the external server by its ID.
 *     tags: [Clubs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the club to retrieve
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A single club
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Club'
 *       404:
 *         description: Club not found
 *       500:
 *         description: Internal server error
 */
router.get('/:id', clubController.getClubById);

/**
 * @swagger
 * /clubs:
 *   post:
 *     summary: Create a new club
 *     description: Create a new club in the external server.
 *     tags: [Clubs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Club'
 *     responses:
 *       201:
 *         description: Club created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Club'
 *       500:
 *         description: Internal server error
 */
router.post('/', clubController.createClub);

/**
 * @swagger
 * /clubs/{id}:
 *   put:
 *     summary: Update a club by ID
 *     description: Update an existing club in the external server by its ID.
 *     tags: [Clubs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the club to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Club'
 *     responses:
 *       200:
 *         description: Club updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Club'
 *       404:
 *         description: Club not found
 *       500:
 *         description: Internal server error
 */
router.put('/:id', clubController.updateClubById);

/**
 * @swagger
 * /clubs/{id}:
 *   delete:
 *     summary: Delete a club by ID
 *     description: Delete an existing club from the external server by its ID.
 *     tags: [Clubs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the club to delete
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Club deleted successfully
 *       404:
 *         description: Club not found
 *       500:
 *         description: Internal server error
 */
router.delete('/:id', clubController.deleteClubById);

/**
 * @swagger
 * /clubs/search/name:
 *   get:
 *     summary: Search a club by name
 *     description: Search a club from the external server by name.
 *     tags: [Clubs]
 *     parameters:
 *       - in: query
 *         name: name
 *         required: true
 *         description: Name of the club to search
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of clubs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Club'
 *       500:
 *         description: Internal server error
 */
router.get('/search/name', clubController.searchClubsByName);

/**
 * @swagger
 * /clubs/search/info:
 *   get:
 *     summary: Search a player info by club Names
 *     description: Search players from the external server by club names, start and end of the season, and position.
 *     tags: [Clubs]
 *     parameters:
 *       - in: query
 *         name: name
 *         required: false
 *         description: Name of the club to search
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
router.get('/search/info', clubController.searchPlayerInfo);

module.exports = router;
