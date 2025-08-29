const parsePagination = (req) => {
const page = Math.max(1, parseInt(req.query.page || '1', 10));
const limit = Math.min(100, parseInt(req.query.limit || '10', 10));
const offset = (page - 1) * limit;
return { page, limit, offset };
};
module.exports = { parsePagination };