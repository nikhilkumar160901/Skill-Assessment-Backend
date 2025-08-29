const db = require('../db/pool');

async function list() {
  const [rows] = await db.query('SELECT id, name, description FROM skills ORDER BY name');
  return rows;
}

async function create({ name, description }) {
  if (!name) throw { status: 400, message: 'name required' };
  const [res] = await db.query('INSERT INTO skills (name, description) VALUES (?, ?)', [name, description || null]);
  const [rows] = await db.query('SELECT id, name, description FROM skills WHERE id = ?', [res.insertId]);
  return rows[0];
}

async function updateSkill(id, name) {
  if (!name) throw { status: 400, message: 'name required' };
  const [res] = await db.query('UPDATE skills SET name = ? WHERE id = ?', [name, id]);
  if (res.affectedRows === 0) throw { status: 404, message: 'Skill not found' };
  const [rows] = await db.query('SELECT id, name, description FROM skills WHERE id = ?', [id]);
  return rows[0];
}

async function deleteSkill(id) {
  const [res] = await db.query('DELETE FROM skills WHERE id = ?', [id]);
  if (res.affectedRows === 0) throw { status: 404, message: 'Skill not found' };
  return { message: 'Skill deleted' };
}

module.exports = { list, create, updateSkill, deleteSkill };
