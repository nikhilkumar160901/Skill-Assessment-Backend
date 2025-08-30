const app = require("./app");
const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== "test") {
  async function startServer() {
    try {
      await connectDB();      // wait for MySQL
      await connectRedis();   // wait for Redis
      app.listen(PORT, () => console.log(`Server running on ${PORT}`));
    } catch (err) {
      console.error("Server failed to start:", err);
      process.exit(1); // optional: exit if DB/Redis not ready
    }
  }
}

startServer();
module.exports = app;
