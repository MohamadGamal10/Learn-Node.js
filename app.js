const express = require("express");
const booksPath = require("./routes/books");
const authorsPath = require("./routes/authors");
const mongoose = require("mongoose");

// connect to db
mongoose.connect("mongodb://localhost/bookStoreDB")
    .then(() => console.log("Connected to MongoDB..."))
    .catch((err) => console.error("Could not connect to MongoDB...", err));

// init app
const app = express();

// apply middleware
app.use(express.json());

// routes
app.use("/api/books", booksPath);
app.use("/api/authors", authorsPath);


const port = 5000;
app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});

// app.post();
// app.put();
// app.delete();
