const express = require('express');
const router = express.Router();
const { authenticate, isAdmin } = require('../middlewares/auth.middleware');
const reportsController = require('../controllers/reports.controller');

router.get('/user/:userId', authenticate, isAdmin, reportsController.userPerf);
router.get('/skill-gap/:userId', authenticate, isAdmin, reportsController.skillGap);
router.get('/time-based', authenticate, isAdmin, reportsController.timeBased);

module.exports = router;









/**
 * @swagger
 * tags:
 *   name: Reports
 *   description: Admin-only performance and analytics reports
 *
 * /api/reports/user/{userId}:
 *   get:
 *     summary: Get performance report of a specific user
 *     tags: [Reports]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       200:
 *         description: User performance report
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 userId:
 *                   type: string
 *                   example: 64b123456789abcdef111111
 *                 performance:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       skill:
 *                         type: string
 *                         example: JavaScript
 *                       score:
 *                         type: number
 *                         example: 85
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (not admin)
 *       404:
 *         description: User not found
 *
 * /api/reports/skill-gap/{userId}:
 *   get:
 *     summary: Get skill gap analysis for a specific user
 *     tags: [Reports]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       200:
 *         description: Skill gap analysis
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 userId:
 *                   type: string
 *                   example: 64b123456789abcdef222222
 *                 missingSkills:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: [ "React", "Node.js" ]
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (not admin)
 *       404:
 *         description: User not found
 *
 * /api/reports/time-based:
 *   get:
 *     summary: Get time-based reports (performance trends)
 *     tags: [Reports]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Performance data over time
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   date:
 *                     type: string
 *                     format: date
 *                     example: "2025-08-01"
 *                   avgScore:
 *                     type: number
 *                     example: 72
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (not admin)
 */


