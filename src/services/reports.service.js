const db = require('../db/pool');

async function userPerformance(userId) {
  const [rows] = await db.query(
    `SELECT a.id as attempt_id, a.skill_id, s.name as skill, a.total_score, a.max_score, a.started_at, a.finished_at
     FROM quiz_attempts a
     JOIN skills s ON a.skill_id = s.id
     WHERE a.user_id = ?
     ORDER BY a.started_at DESC`,
    [userId]
  );
  return rows;
}

async function skillGap(userId) {
  const [rows] = await db.query(
    `SELECT s.id as skill_id, s.name as skill,
       ROUND(AVG((a.total_score / NULLIF(a.max_score,0)) * 100), 2) as avg_percent
     FROM quiz_attempts a
     JOIN skills s ON a.skill_id = s.id
     WHERE a.user_id = ?
     GROUP BY s.id, s.name
     ORDER BY avg_percent ASC`,
    [userId]
  );
  return rows;
}

async function timeBased(start, end) {
  let where = '';
  const params = [];
  if (start && end) {
    where = 'WHERE a.started_at BETWEEN ? AND ?';
    params.push(start, end);
  } else {
    where = "WHERE a.started_at >= DATE_SUB(NOW(), INTERVAL 30 DAY)";
  }

  const [rows] = await db.query(
    `SELECT DATE(a.started_at) as date, COUNT(*) as attempts,
      ROUND(AVG((a.total_score / NULLIF(a.max_score,0)) * 100), 2) as avg_percent
     FROM quiz_attempts a
     ${where}
     GROUP BY DATE(a.started_at)
     ORDER BY date`,
    params
  );
  return rows;
}

module.exports = { userPerformance, skillGap, timeBased };
