const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../db/pool");

const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

async function register(name, email, password, role) {
  const passwordHash = await bcrypt.hash(password, 10);

  const [rows] = await db.query("SELECT id FROM users WHERE email = ?", [email]);
  if (rows.length > 0) {
    throw new Error("Email already registered");
  }

  const [result] = await db.query(
    "INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)",
    [name, email, passwordHash]
  );

  return {
    id: result.insertId,
    name,
    email,
    role: role ? role : 'user',
  };
}



async function login(email, password) {
  const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
  if (rows.length === 0) throw new Error("Invalid credentials");

  const user = rows[0];
  const valid = await bcrypt.compare(password, user.password_hash);
  if (!valid) throw new Error("Invalid credentials");

  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    JWT_SECRET,
    { expiresIn: "7d" }
  );

  return { token, user: { id: user.id, name: user.name, email: user.email, role: user.role } };
}

module.exports = { register, login };
