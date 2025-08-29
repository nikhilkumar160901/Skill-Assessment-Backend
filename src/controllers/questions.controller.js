const questionsService = require('../services/questions.service');

async function createQuestion(req, res, next) {
  try {
    const created_by = req.user.id;
    const q = await questionsService.create(req.body, created_by);
    res.status(201).json(q);
  } catch (err) { next(err); }
}

async function getQuestionsForSkill(req, res, next) {
  try {
    const limit = parseInt(req.query.limit || '10', 10);
    const q = await questionsService.getForSkill(req.params.skillId, limit);
    res.json(q);
  } catch (err) { next(err); }
}

module.exports = { createQuestion, getQuestionsForSkill };
