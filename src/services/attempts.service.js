const db = require('../db/pool');

async function startAttempt(userId, skillId, questionIds = null) {
  const conn = await db.getConnection();
  try {
    await conn.beginTransaction();

    let selectedQuestions = [];
    let maxScore = 0;

    let qs;
    if (Array.isArray(questionIds) && questionIds.length) {
      
      [qs] = await conn.query(
        "SELECT id, question_text, points FROM questions WHERE id IN (?) AND skill_id = ?",
        [questionIds, skillId]
      );
    } else {
      [qs] = await conn.query(
        "SELECT id, question_text, points FROM questions WHERE skill_id = ? ORDER BY RAND() LIMIT 10",
        [skillId]
      );
    }


    const qIds = qs.map((q) => q.id);
    maxScore = qs.reduce((s, q) => s + (q.points || 1), 0);

    let options = [];
    if (qIds.length) {
      [options] = await conn.query(
        "SELECT id, question_id, option_text FROM question_options WHERE question_id IN (?)",
        [qIds]
      );
    }

  
    selectedQuestions = qs.map((q) => ({
      id: q.id,
      text: q.question_text,
      points: q.points || 1,
      options: options.filter((opt) => opt.question_id === q.id),
    }));

    
    const [res] = await conn.query(
      "INSERT INTO quiz_attempts (user_id, skill_id, max_score) VALUES (?, ?, ?)",
      [userId, skillId, maxScore]
    );
    const attemptId = res.insertId;

    await conn.commit();

    return { attempt_id: attemptId, max_score: maxScore, questions: selectedQuestions };
  } catch (e) {
    await conn.rollback();
    throw e;
  } finally {
    conn.release();
  }
}


async function submitAttempt(userId, attemptId, answers = []) {
  const conn = await db.getConnection();
  try {
    await conn.beginTransaction();

    const [attemptRows] = await conn.query('SELECT * FROM quiz_attempts WHERE id = ? AND user_id = ?', [attemptId, userId]);
    if (!attemptRows.length) throw { status: 404, message: 'Attempt not found' };
    const attempt = attemptRows[0];

    let totalScore = 0;

    for (const a of answers) {
      if (!a.question_id) continue;
      const selectedOptionId = a.selected_option_id || null;
      let isCorrect = 0;
      let scoreAwarded = 0;

      if (selectedOptionId) {
        const [optRows] = await conn.query('SELECT is_correct FROM question_options WHERE id = ?', [selectedOptionId]);
        if (optRows.length && optRows[0].is_correct === 1) {
          isCorrect = 1;
          const [qRows] = await conn.query('SELECT points FROM questions WHERE id = ?', [a.question_id]);
          const pts = qRows.length ? qRows[0].points || 1 : 1;
          scoreAwarded = pts;
          totalScore += scoreAwarded;
        }
      }

      await conn.query(
        'INSERT INTO quiz_answers (attempt_id, question_id, selected_option_id, is_correct, score_awarded) VALUES (?, ?, ?, ?, ?)',
        [attemptId, a.question_id, selectedOptionId, isCorrect, scoreAwarded]
      );
    }

    await conn.query('UPDATE quiz_attempts SET total_score = ?, finished_at = NOW() WHERE id = ?', [totalScore, attemptId]);

    await conn.commit();
    return { attempt_id: attemptId, total_score: totalScore, max_score: attempt.max_score };
  } catch (e) {
    await conn.rollback();
    throw e;
  } finally {
    conn.release();
  }
}

async function history(userId, limit = 10, offset = 0) {
  const [rows] = await db.query(
    `SELECT qa.id, qa.skill_id, s.name AS skill_name,
            qa.total_score, qa.max_score,
            DATE_FORMAT(qa.started_at, '%Y-%m-%d %H:%i:%s') AS started_at,
            DATE_FORMAT(qa.finished_at, '%Y-%m-%d %H:%i:%s') AS finished_at,
            TIMESTAMPDIFF(SECOND, qa.started_at, qa.finished_at) AS duration_seconds
     FROM quiz_attempts qa
     JOIN skills s ON qa.skill_id = s.id
     WHERE qa.user_id = ?
     ORDER BY qa.started_at DESC
     LIMIT ? OFFSET ?`,
    [userId, parseInt(limit, 10), parseInt(offset, 10)]
  );
  return rows;
}


module.exports = { startAttempt, submitAttempt, history };
