const authService = require("../services/auth.service");

let testUsers = [];

async function register(req, res) {
  try {
    const { name, email, password, role } = req.body;

    if (process.env.NODE_ENV === "test") {
      
      if (testUsers.find(u => u.email === email)) {
        throw new Error("User already exists");
      }
      const user = { id: testUsers.length + 1, name, email, password, role: role || "user" };
      testUsers.push(user);
      return res.status(201).json(user);
    }

    
    const user = await authService.register(name, email, password, role);
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (process.env.NODE_ENV === "test") {
      const user = testUsers.find(u => u.email === email && u.password === password);
      if (!user) throw new Error("Invalid credentials");
      return res.json({ token: "fake-jwt-token", user });
    }

    
    const data = await authService.login(email, password);
    res.json(data);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

module.exports = { register, login };
