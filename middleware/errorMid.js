const errorMid = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;
  res.status(statusCode).json({
    err: err.message,
    stack: err.stack,
  });
};

module.exports = errorMid