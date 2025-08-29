const express = require('express');
const router = express.Router();
const { authenticate, isAdmin } = require('../middlewares/auth.middleware');
const questionsController = require('../controllers/questions.controller');

router.post('/', authenticate, isAdmin, questionsController.createQuestion);
router.get('/skill/:skillId', authenticate, questionsController.getQuestionsForSkill);

module.exports = router;










/**
 * @swagger
 * tags:
 *   name: Questions
 *   description: Question management for skills
 *
 * /api/questions:
 *   post:
 *     summary: Create a new question
 *     tags: [Questions]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - skillId
 *               - text
 *               - options
 *               - correctOption
 *             properties:
 *               skillId:
 *                 type: string
 *                 description: Skill ID the question belongs to
 *                 example: 64b123456789abcdef111111
 *               text:
 *                 type: string
 *                 description: The question text
 *                 example: "What is closure in JavaScript?"
 *               options:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Multiple choice options
 *                 example: ["A variable scope", "A function inside another function", "An object method", "None of the above"]
 *               correctOption:
 *                 type: integer
 *                 description: Index of the correct option (0-based)
 *                 example: 1
 *     responses:
 *       201:
 *         description: Question created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: 64babcdef1234567890aaa111
 *                 skillId:
 *                   type: string
 *                 text:
 *                   type: string
 *                 options:
 *                   type: array
 *                   items:
 *                     type: string
 *                 correctOption:
 *                   type: integer
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (not admin)
 *
 * /api/questions/skill/{skillId}:
 *   get:
 *     summary: Get questions for a specific skill
 *     tags: [Questions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: skillId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the skill
 *     responses:
 *       200:
 *         description: List of questions for the skill
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: 64babcdef1234567890aaa111
 *                   skillId:
 *                     type: string
 *                   text:
 *                     type: string
 *                   options:
 *                     type: array
 *                     items:
 *                       type: string
 *                   correctOption:
 *                     type: integer
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Skill not found or no questions
 */
