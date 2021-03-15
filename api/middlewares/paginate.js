function paginate(model) {
  return async (req, res, next) => {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const result = {};

    if (endIndex < (await model.countDocuments())) {
      result.next = {
        page: page + 1,
        limit: limit,
      };
    }
    if (startIndex > 0) {
      result.previous = {
        page: page - 1,
        limit: limit,
      };
    }
    try {
      result.results = await model
        .find()
        .limit(limit)
        .skip(startIndex)
        .select('-__v');
      res.json(result);
    } catch (err) {
      next(err);
    }
  };
}

module.exports = paginate;
