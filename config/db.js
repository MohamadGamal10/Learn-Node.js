const mongoose = require("mongoose");

async function connectToDb() {
  //   mongoose
  //     .connect(process.env.MONGO_URI)
  //     .then(() => console.log("Connected to MongoDB..."))
  //     .catch((err) => console.error("Could not connect to MongoDB...", err));
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB...");
  } catch (err) {
    console.error("Could not connect to MongoDB...", err);
  }
}

module.exports = connectToDb;
