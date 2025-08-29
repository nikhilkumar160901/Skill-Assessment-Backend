const usersService = require('../services/users.service');

async function listUsers(req, res, next) {
  try {
    const { limit, offset } = req.query;
    const { page, limit: lim, offset: off } = require('../utils/paginator').parsePagination(req);
    const rows = await usersService.list({ limit: lim, offset: off });
    res.json(rows);
  } catch (err) { next(err); }
}

async function getMe(req, res, next) {
  try {
    const user = await usersService.getById(req.user.id);
    res.json(user);
  } catch (err) { next(err); }
}

async function getUserById(req, res, next) {
  try {
    const user = await usersService.getById(req.params.id);
    res.json(user);
  } catch (err) { next(err); }
}

module.exports = { listUsers, getMe, getUserById };
