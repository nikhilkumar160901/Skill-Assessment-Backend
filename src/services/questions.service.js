const db = require('../db/pool');

async function create({ skill_id, question_text, points = 1, options = [] }, created_by) {
  if (!skill_id || !question_text || !Array.isArray(options) || options.length < 2) {
    throw { status: 400, message: 'invalid payload' };
  }

  const conn = await db.getConnection();
  try {
    await conn.beginTransaction();
    const [res] = await conn.query(
      'INSERT INTO questions (skill_id, question_text, points, created_by) VALUES (?, ?, ?, ?)',
      [skill_id, question_text, points, created_by]
    );
    const qid = res.insertId;

    const insertOptSql = 'INSERT INTO question_options (question_id, option_text, is_correct) VALUES (?, ?, ?)';
    for (const opt of options) {
      await conn.query(insertOptSql, [qid, opt.option_text, opt.is_correct ? 1 : 0]);
    }

    await conn.commit();
    const [rows] = await db.query('SELECT id, skill_id, question_text, points, created_by FROM questions WHERE id = ?', [qid]);
    return rows[0];
  } catch (e) {
    await conn.rollback();
    throw e;
  } finally {
    conn.release();
  }
}

async function getForSkill(skillId, limit = 10) {
  const [questions] = await db.query(
    'SELECT id, question_text, points FROM questions WHERE skill_id = ? ORDER BY RAND() LIMIT ?',
    [skillId, parseInt(limit, 10)]
  );

  if (!questions.length) return [];

  const qIds = questions.map((q) => q.id);
  
  const [options] = await db.query(
    `SELECT id, question_id, option_text FROM question_options WHERE question_id IN (?) ORDER BY id`,
    [qIds]
  );

  const grouped = questions.map((q) => ({
    id: q.id,
    question_text: q.question_text,
    points: q.points,
    options: options.filter((o) => o.question_id === q.id).map((o) => ({ id: o.id, text: o.option_text })),
  }));

  return grouped;
}

module.exports = { create, getForSkill };
