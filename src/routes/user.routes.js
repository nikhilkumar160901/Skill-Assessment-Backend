const express = require('express');
const router = express.Router();
const { authenticate, isAdmin } = require('../middlewares/auth.middleware');
const usersController = require('../controllers/users.controller');

router.get('/', authenticate, isAdmin, usersController.listUsers);
router.get('/me', authenticate, usersController.getMe);
router.get('/:id', authenticate, isAdmin, usersController.getUserById);

module.exports = router;











/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management APIs
 *
 * /api/users:
 *   get:
 *     summary: Get list of all users
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of users
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
 *                     example: John Doe
 *                   email:
 *                     type: string
 *                     example: john@example.com
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (not admin)
 *
 * /api/users/me:
 *   get:
 *     summary: Get details of the currently logged-in user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Current user profile
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "64b123456789abcdef123456"
 *                 name:
 *                   type: string
 *                   example: Jane Doe
 *                 email:
 *                   type: string
 *                   example: jane@example.com
 *       401:
 *         description: Unauthorized
 *
 * /api/users/{id}:
 *   get:
 *     summary: Get user by ID (Admin only)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       200:
 *         description: User details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "64b123456789abcdef123456"
 *                 name:
 *                   type: string
 *                   example: Alice Example
 *                 email:
 *                   type: string
 *                   example: alice@example.com
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (not admin)
 *       404:
 *         description: User not found
 */
