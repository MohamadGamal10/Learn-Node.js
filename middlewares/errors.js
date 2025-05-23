
const notFound = (req, res, next) => {
  const error = new Error("Not found");
  error.statusCode = 404;
  next(error);
};

const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({ message: err.message });
};

module.exports = {
  notFound,
  errorHandler
};