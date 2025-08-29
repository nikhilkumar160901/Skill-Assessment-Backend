const attemptsService = require('../services/attempts.service');

async function start(req, res, next) {
  try {
    const attempt = await attemptsService.startAttempt(req.user.id, req.body.skill_id, req.body.question_ids);
    res.status(201).json(attempt);
  } catch (err) { next(err); }
}

async function submit(req, res, next) {
  try {
    const result = await attemptsService.submitAttempt(req.user.id, req.params.id, req.body.answers || []);
    res.json(result);
  } catch (err) { next(err); }
}

async function history(req, res, next) {
  try {
    const { limit: lim, offset: off } = require('../utils/paginator').parsePagination(req);
    const rows = await attemptsService.history(req.user.id, lim, off);
    res.json(rows);
  } catch (err) { next(err); }
}

module.exports = { start, submit, history };
