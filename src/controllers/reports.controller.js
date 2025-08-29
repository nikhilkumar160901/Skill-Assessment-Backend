const reportsService = require("../services/reports.service");
const { setCache, getCache } = require("../utils/cache");


async function userPerf(req, res) {
  try {
    const { userId } = req.params;
    const cacheKey = `userPerf:${userId}`;

    let data = await getCache(cacheKey);
    if (!data) {
      data = await reportsService.userPerformance(userId);
      await setCache(cacheKey, data, 120);
    }

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch user performance" });
  }
}


async function skillGap(req, res) {
  try {
    const { userId } = req.params;
    const cacheKey = `skillGap:${userId}`;

    let data = await getCache(cacheKey);
    if (!data) {
      data = await reportsService.skillGap(userId);
      await setCache(cacheKey, data, 300); 
    }

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch skill gap" });
  }
}


async function timeBased(req, res) {
  try {
    const { start, end } = req.query;
    const cacheKey = `timeBased:${start || "default"}:${end || "default"}`;

    let data = await getCache(cacheKey);
    if (!data) {
      data = await reportsService.timeBased(start, end);
      await setCache(cacheKey, data, 300); 
    }

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch time-based reports" });
  }
}

module.exports = { userPerf, skillGap, timeBased };
