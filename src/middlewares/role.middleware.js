const permit = (...allowed) => (req, res, next) => {
if (!req.user) return res.status(401).json({ error: 'Unauthorized' });
if (allowed.includes(req.user.role)) return next();
return res.status(403).json({ error: 'Forbidden' });
};


module.exports = { permit };