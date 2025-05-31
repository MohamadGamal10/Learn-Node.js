const express = require("express");
const logger = require("./middlewares/logger");
const { notFound, errorHandler } = require("./middlewares/errors");
const connectToDb = require("./config/db");
require("dotenv").config();

// connect to db
connectToDb();

// init app
const app = express();

// apply middleware
app.use(express.json());

// mvc
app.use(express.urlencoded({ extended: false }));

// logger middleware
app.use(logger);

// set view engine / mvc
app.set("view engine", "ejs");

// routes
app.use("/api/books", require("./routes/books"));
app.use("/api/authors", require("./routes/authors"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/users", require("./routes/users"));
app.use("/password", require("./routes/password")); // mvc

// error handler middleware
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}...`);
});

