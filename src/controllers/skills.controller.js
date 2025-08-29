const skillsService = require('../services/skills.service');

async function listSkills(req, res, next) {
  try {
    const rows = await skillsService.list();
    res.json(rows);
  } catch (err) { next(err); }
}

async function createSkill(req, res, next) {
  try {
    const skill = await skillsService.create(req.body);
    res.status(201).json(skill);
  } catch (err) { next(err); }
}

async function updateSkill(req, res, next) {
  try {
    const skill = await skillsService.updateSkill(req.params.id, req.body.name);
    res.json(skill);
  } catch (err) { next(err); }
}

async function deleteSkill(req, res, next) {
  try {
    const result = await skillsService.deleteSkill(req.params.id);
    res.json(result);
  } catch (err) { next(err); }
}

module.exports = { listSkills, createSkill, updateSkill, deleteSkill };
