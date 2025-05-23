const express = require("express");
const booksPath = require("./routes/books");
const authorsPath = require("./routes/authors");
const authPath = require("./routes/auth");
const mongoose = require("mongoose");
const logger = require("./middlewares/logger");
const { notFound, errorHandler } = require("./middlewares/errors");
require("dotenv").config();

// connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("Connected to MongoDB..."))
    .catch((err) => console.error("Could not connect to MongoDB...", err));

// init app
const app = express();

// apply middleware
app.use(express.json());

// logger middleware
app.use(logger);

// routes
app.use("/api/books", booksPath);
app.use("/api/authors", authorsPath);
app.use("/api/auth", authPath);

// error handler middleware
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}...`);
});

