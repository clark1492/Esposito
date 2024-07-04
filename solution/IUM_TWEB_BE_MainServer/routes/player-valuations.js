const express = require('express');
const router = express.Router();
const playerValuationController = require('../controllers/player-valuations');

/**
 * @swagger
 * tags:
 *   name: PlayerValuations
 *   description: Endpoints for managing player valuations
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     PlayerValuation:
 *       type: object
 *       properties:
 *         id:
 *           type: object
 *           properties:
 *             playerId:
 *               type: integer
 *             date:
 *               type: string
 *               format: date
 *           required:
 *             - playerId
 *             - date
 *         lastSeason:
 *           type: integer
 *         datetime:
 *           type: string
 *           format: date-time
 *         dateWeek:
 *           type: string
 *           format: date
 *         marketValueInEur:
 *           type: integer
 *         n:
 *           type: integer
 *         currentClubId:
 *           type: integer
 *         playerClubDomesticCompetitionId:
 *           type: string
 */


/**
 * @swagger
 * /player-valuations:
 *   get:
 *     summary: Retrieve a list of player valuations
 *     description: Retrieve a list of player valuations from the external server.
 *     tags: [PlayerValuations]
 *     responses:
 *       200:
 *         description: A list of player valuations
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/PlayerValuation'
 *       500:
 *         description: Internal server error
 */
router.get('/', playerValuationController.getPlayerValuations);

/**
 * @swagger
 * /player-valuations/page:
 *   get:
 *     summary: Get a list of player valuations paged
 *     description: Get a list of player valuations from the external server paged.
 *     tags: [PlayerValuations]
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
 *         description: A list of player valuation
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/PlayerValuation'
 *       404:
 *         description: Player valuation not found
 *       500:
 *         description: Internal server error
 */

router.get('/page', playerValuationController.getPlayerValuationsPaged);

/**
 * @swagger
 * /player-valuations/club/{clubid}:
 *   get:
 *     summary: Get a list of player valuations by PlayerId
 *     description: Get the list of player valuation for a given club
 *     tags: [PlayerValuations]
 *     parameters:
 *       - in: path
 *         name: clubid
 *         required: true
 *         description: ID of the club valuation to retrieve
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A list of player valuation
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/PlayerValuation'
 *       404:
 *         description: Player valuation not found
 *       500:
 *         description: Internal server error
 */

router.get('/club/:clubid', playerValuationController.getPlayerValuationByClubId);

router.get('/info/club/:clubid', playerValuationController.getPlayerValuationAndInfoByClubId);

/**
 * @swagger
 * /player-valuations/{playerid}/{date}:
 *   get:
 *     summary: Get a player valuation by ID
 *     description: Get a player valuation from the external server by its ID.
 *     tags: [PlayerValuations]
 *     parameters:
 *       - in: path
 *         name: playerid
 *         required: true
 *         description: ID of the player valuation to retrieve
 *         schema:
 *           type: integer
 *       - in: path
 *         name: date
 *         required: true
 *         description: date of the player valuation to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A single player valuation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PlayerValuation'
 *       404:
 *         description: Player valuation not found
 *       500:
 *         description: Internal server error
 */

router.get('/:playerid/:date', playerValuationController.getPlayerValuationById);

router.get('/info/player/:playerid', playerValuationController.getPlayerValuationAndInfoByIdAndDates);

router.get('/info/top/page', playerValuationController.getTopPlayerValuationAndInfoByIdAndDates);


/**
 * @swagger
 * /player-valuations/{playerid}:
 *   get:
 *     summary: Get a list of player valuations by PlayerId
 *     description: Get the list of player valuation for a given player
 *     tags: [PlayerValuations]
 *     parameters:
 *       - in: path
 *         name: playerid
 *         required: true
 *         description: ID of the player valuation to retrieve
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A list of player valuation
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/PlayerValuation'
 *       404:
 *         description: Player valuation not found
 *       500:
 *         description: Internal server error
 */

router.get('/:playerid', playerValuationController.getPlayerValuationByPlayerId);


/**
 * @swagger
 * /player-valuations:
 *   post:
 *     summary: Create a new player valuation
 *     description: Create a new player valuation in the external server.
 *     tags: [PlayerValuations]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PlayerValuation'
 *     responses:
 *       201:
 *         description: New player valuation created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PlayerValuation'
 *       500:
 *         description: Internal server error
 */
router.post('/', playerValuationController.createPlayerValuation);

/**
 * @swagger
 * /player-valuations/{playerid}/{date}:
 *   put:
 *     summary: Update a player valuation by ID
 *     description: Update an existing player valuation in the external server by its ID.
 *     tags: [PlayerValuations]
 *     parameters:
 *       - in: path
 *         name: playerid
 *         required: true
 *         description: ID of the player valuation to retrieve
 *         schema:
 *           type: string
 *       - in: path
 *         name: date
 *         required: true
 *         description: date of the player valuation to retrieve
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PlayerValuation'
 *     responses:
 *       200:
 *         description: Updated player valuation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PlayerValuation'
 *       404:
 *         description: Player valuation not found
 *       500:
 *         description: Internal server error
 */
router.put('/:playerid/:date', playerValuationController.updatePlayerValuationById);

/**
 * @swagger
 * /player-valuations/{playerid}/{date}:
 *   delete:
 *     summary: Delete a player valuation by ID
 *     description: Delete an existing player valuation from the external server by its ID.
 *     tags: [PlayerValuations]
 *     parameters:
 *       - in: path
 *         name: playerid
 *         required: true
 *         description: ID of the player valuation to retrieve
 *         schema:
 *           type: string
 *       - in: path
 *         name: date
 *         required: true
 *         description: date of the player valuation to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Player valuation deleted successfully
 *       404:
 *         description: Player valuation not found
 *       500:
 *         description: Internal server error
 */
router.delete('/:playerid/:date', playerValuationController.deletePlayerValuationById);

module.exports = router;
