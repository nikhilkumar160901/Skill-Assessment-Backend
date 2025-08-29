const express = require('express');
const router = express.Router();
const { authenticate, isAdmin } = require('../middlewares/auth.middleware');
const skillsController = require('../controllers/skills.controller');

router.get('/', authenticate, skillsController.listSkills);
router.post('/', authenticate, isAdmin, skillsController.createSkill);
router.put('/:id', authenticate, isAdmin, skillsController.updateSkill);
router.delete('/:id', authenticate, isAdmin, skillsController.deleteSkill);

module.exports = router;






















/**
 * @swagger
 * tags:
 *   name: Skills
 *   description: Skill management APIs
 *
 * /api/skills:
 *   get:
 *     summary: Get list of all skills
 *     tags: [Skills]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of skills
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: "64b123456789abcdef123456"
 *                   name:
 *                     type: string
 *                     example: JavaScript
 *                   category:
 *                     type: string
 *                     example: Programming
 *       401:
 *         description: Unauthorized
 *
 *   post:
 *     summary: Create a new skill (Admin only)
 *     tags: [Skills]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 example: React
 *               category:
 *                 type: string
 *                 example: Frontend
 *     responses:
 *       201:
 *         description: Skill created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "64b123456789abcdef654321"
 *                 name:
 *                   type: string
 *                   example: React
 *                 category:
 *                   type: string
 *                   example: Frontend
 *       400:
 *         description: Invalid request
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (not admin)
 *
 * /api/skills/{id}:
 *   put:
 *     summary: Update a skill by ID (Admin only)
 *     tags: [Skills]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Skill ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Node.js
 *               category:
 *                 type: string
 *                 example: Backend
 *     responses:
 *       200:
 *         description: Skill updated successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (not admin)
 *       404:
 *         description: Skill not found
 *
 *   delete:
 *     summary: Delete a skill by ID (Admin only)
 *     tags: [Skills]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Skill ID
 *     responses:
 *       200:
 *         description: Skill deleted successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (not admin)
 *       404:
 *         description: Skill not found
 */

