const db = require('../db/pool');

async function list({ limit = 10, offset = 0 } = {}) {
  const [rows] = await db.query(
    'SELECT id, name, email, role, created_at FROM users ORDER BY id DESC LIMIT ? OFFSET ?',
    [parseInt(limit, 10), parseInt(offset, 10)]
  );
  return rows;
}

async function getById(id) {
  const [rows] = await db.query(
    'SELECT id, name, email, role, created_at FROM users WHERE id = ?',
    [id]
  );
  if (!rows.length) throw { status: 404, message: 'User not found' };
  return rows[0];
}

module.exports = { list, getById };
