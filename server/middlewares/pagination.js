const express = require('express');

exports.paginatedResults = (model) => {
  return async (req, res, next) => {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const data = {};

    if (endIndex < (await model.countDocuments().exec())) {
      data.next = {
        page: page + 1,
        limit: limit,
      };
    }

    if (startIndex > 0) {
      data.previous = {
        page: page - 1,
        limit: limit,
      };
    }
    try {
      data.data = await model.find().sort({ created_at: -1 }).limit(limit).skip(startIndex).exec();
      res.paginatedResults = data.data;
      next();
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  };
};
