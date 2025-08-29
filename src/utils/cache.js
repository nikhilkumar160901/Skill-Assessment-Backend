const Redis = require("ioredis");

let redis;

if (process.env.NODE_ENV === "test") {
  console.log("🧪 Test mode: Skipping Redis connection");
  redis = {
    on: () => {},
    get: async () => null,
    set: async () => {},
    del: async () => {}
  };
} else {
  redis = new Redis({
    host: process.env.REDIS_HOST || "127.0.0.1",
    port: process.env.REDIS_PORT || 6379,
  });

  redis.on("connect", () => console.log("✅ Redis connected"));
  redis.on("error", (err) => console.error("❌ Redis error", err));
}

async function setCache(key, value, ttl = 60) {
  try {
    await redis.set(key, JSON.stringify(value), "EX", ttl);
  } catch (err) {
    console.error("Redis setCache error:", err);
  }
}

async function getCache(key) {
  try {
    const data = await redis.get(key);
    return data ? JSON.parse(data) : null;
  } catch (err) {
    console.error("Redis getCache error:", err);
    return null;
  }
}

async function clearCache(key) {
  try {
    await redis.del(key);
  } catch (err) {
    console.error("Redis clearCache error:", err);
  }
}

module.exports = { redis, setCache, getCache, clearCache };
