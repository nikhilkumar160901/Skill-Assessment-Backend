const express = require('express');
const router = express.Router();
const { authenticate, isAdmin } = require('../middlewares/auth.middleware');
const attemptsController = require('../controllers/attempts.controller');

router.post('/start', authenticate, attemptsController.start);
router.post('/:id/submit', authenticate, attemptsController.submit);
router.get('/history', authenticate, attemptsController.history);

module.exports = router;










/**
 * @swagger
 * tags:
 *   name: Attempts
 *   description: User attempts management
 *
 * /api/attempts/start:
 *   post:
 *     summary: Start a new attempt
 *     tags: [Attempts]
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
 *             properties:
 *               skillId:
 *                 type: string
 *                 description: Skill ID for which the attempt is started
 *                 example: 64b123456789abcdef111111
 *     responses:
 *       201:
 *         description: Attempt started successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 attemptId:
 *                   type: string
 *                   example: 64babcdef1234567890aaa111
 *                 skillId:
 *                   type: string
 *                   example: 64b123456789abcdef111111
 *                 status:
 *                   type: string
 *                   example: in-progress
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *
 * /api/attempts/{id}/submit:
 *   post:
 *     summary: Submit answers for an attempt
 *     tags: [Attempts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The attempt ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - answers
 *             properties:
 *               answers:
 *                 type: array
 *                 description: List of answers
 *                 items:
 *                   type: object
 *                   properties:
 *                     questionId:
 *                       type: string
 *                       example: 64babc999999999999999999
 *                     selectedOption:
 *                       type: integer
 *                       example: 2
 *     responses:
 *       200:
 *         description: Attempt submitted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 attemptId:
 *                   type: string
 *                   example: 64babcdef1234567890aaa111
 *                 score:
 *                   type: number
 *                   example: 8
 *                 total:
 *                   type: number
 *                   example: 10
 *                 status:
 *                   type: string
 *                   example: completed
 *       400:
 *         description: Invalid submission
 *       401:
 *         description: Unauthorized
 *
 * /api/attempts/history:
 *   get:
 *     summary: Get the logged-in user's attempt history
 *     tags: [Attempts]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of past attempts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   attemptId:
 *                     type: string
 *                     example: 64babcdef1234567890aaa111
 *                   skillId:
 *                     type: string
 *                     example: 64b123456789abcdef111111
 *                   score:
 *                     type: number
 *                     example: 7
 *                   total:
 *                     type: number
 *                     example: 10
 *                   status:
 *                     type: string
 *                     example: completed
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     example: 2025-08-27T10:00:00.000Z
 *       401:
 *         description: Unauthorized
 */
