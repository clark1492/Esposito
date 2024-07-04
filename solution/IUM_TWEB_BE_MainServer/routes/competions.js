const express = require('express');
const router = express.Router();
const competitionController = require('../controllers/competitions');

/**
 * @swagger
 * tags:
 *   name: Competitions
 *   description: Endpoints for managing competitions
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Competition:
 *       type: object
 *       properties:
 *         competitionId:
 *           type: string
 *         competitionCode:
 *           type: string
 *         name:
 *           type: string
 *         subType:
 *           type: string
 *         type:
 *           type: string
 *         countryId:
 *           type: integer
 *         countryName:
 *           type: string
 *         domesticLeagueCode:
 *           type: string
 *         confederation:
 *           type: string
 *         url:
 *           type: string
 *       required:
 *         - competitionCode
 *         - name
 *         - subType
 *         - type
 *         - countryId
 *         - confederation
 *         - url
 */

/**
 * @swagger
 * /competitions:
 *   get:
 *     summary: Retrieve a list of competitions
 *     description: Retrieve a list of competitions from the external server.
 *     tags: [Competitions]
 *     responses:
 *       200:
 *         description: A list of competitions
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Competition'
 *       500:
 *         description: Internal server error
 */
router.get('/', competitionController.getCompetitions);

/**
 * @swagger
 * /competitions/{id}:
 *   get:
 *     summary: Retrieve a single competition by ID
 *     description: Retrieve a single competition from the external server by its ID.
 *     tags: [Competitions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the competition to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A single competition
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Competition'
 *       404:
 *         description: Competition not found
 *       500:
 *         description: Internal server error
 */
router.get('/:id', competitionController.getCompetitionById);

/**
 * @swagger
 * /competitions:
 *   post:
 *     summary: Create a new competition
 *     description: Create a new competition in the external server.
 *     tags: [Competitions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Competition'
 *     responses:
 *       201:
 *         description: A new competition created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Competition'
 *       500:
 *         description: Internal server error
 */
router.post('/', competitionController.createCompetition);

/**
 * @swagger
 * /competitions/{id}:
 *   put:
 *     summary: Update a competition by ID
 *     description: Update an existing competition in the external server by its ID.
 *     tags: [Competitions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the competition to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Competition'
 *     responses:
 *       200:
 *         description: Updated competition
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Competition'
 *       404:
 *         description: Competition not found
 *       500:
 *         description: Internal server error
 */
router.put('/:id', competitionController.updateCompetitionById);

/**
 * @swagger
 * /competitions/{id}:
 *   delete:
 *     summary: Delete a competition by ID
 *     description: Delete an existing competition from the external server by its ID.
 *     tags: [Competitions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the competition to delete
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Competition deleted successfully
 *       404:
 *         description: Competition not found
 *       500:
 *         description: Internal server error
 */
router.delete('/:id', competitionController.deleteCompetitionById);

module.exports = router;
