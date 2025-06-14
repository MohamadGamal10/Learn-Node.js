const { Book } = require("./models/Book");
const { Author } = require("./models/Author");
const { books, authors } = require("./data");
const connectToDb = require("./config/db");
require("dotenv").config();

// connect to db
connectToDb();

// Import Books
const importBooks = async () => {
  try {
    await Book.insertMany(books);
    console.log("Books Imported!");
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};
// Remove Books
const removeBooks = async () => {
  try {
    await Book.deleteMany();
    console.log("Books Removed!");
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

// Import Authors
const importAuthors = async () => {
  try {
    await Author.insertMany(authors);
    console.log("Authors Imported!");
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};
// Remove Authors
const removeAuthors = async () => {
  try {
    await Author.deleteMany();
    console.log("Authors Removed!");
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

if (process.argv[2] === "-importb") {
  importBooks();
} else if (process.argv[2] === "-removeb") {
  removeBooks();
}else if (process.argv[2] === "-importa") {
  importAuthors();
} else if (process.argv[2] === "-removea") {
  removeAuthors();
}
