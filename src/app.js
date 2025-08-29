const express = require('express');
const cors = require("cors");
const { errorHandler } = require('./middlewares/error.middleware');
const routes = require('./routes');
const setupSwagger = require("./swagger");

const app = express();

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());

app.get('/', (req, res) => res.json({ ok: true, service: 'Skill Portal API' }));

app.use('/api', routes);
app.get('/api/health', (req, res) => {
  res.json({ status: "ok" });
});

setupSwagger(app);

app.use(errorHandler);

module.exports = app;
