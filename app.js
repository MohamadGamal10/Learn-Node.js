const express = require("express");
const booksPath = require("./routes/books");
const authorsPath = require("./routes/authors");
const mongoose = require("mongoose");
require("dotenv").config();

// connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("Connected to MongoDB..."))
    .catch((err) => console.error("Could not connect to MongoDB...", err));

// init app
const app = express();

// apply middleware
app.use(express.json());

// routes
app.use("/api/books", booksPath);
app.use("/api/authors", authorsPath);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}...`);
});

