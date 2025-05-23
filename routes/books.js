const express = require("express");
const router = express.Router();
const Joi = require("joi");

const books = [
  {
    id: 1,
    title: "Book 1",
    author: "Author 1",
    description: "Description 1",
    price: 50,
    cover: "soft cover",
  },
  {
    id: 2,
    title: "Book 2",
    author: "Author 2",
    description: "Description 2",
    price: 60,
    cover: "hard cover",
  },
];

/**
 * @desc   Get all books
 * @route  GET /api/books
 * @method GET
 * @access Public
 */

router.get("/", (req, res) => {
  res.status(200).json(books);
});

/**
 * @desc   Get single book
 * @route  GET /api/books/:id
 * @method GET
 * @access Public
 */

router.get("/:id", (req, res) => {
  const book = books.find((b) => b.id === parseInt(req.params.id));
  if (book) {
    res.status(200).json(book);
  } else {
    res.status(404).json({ message: "Book not found" });
  }
});

/**
 * @desc   Create a book
 * @route  POST /api/books
 * @method POST
 * @access Public
 */

router.post("/", (req, res) => {
  const { error } = validateCreateBook(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const book = {
    id: books.length + 1,
    title: req.body.title,
    author: req.body.author,
    description: req.body.description,
    price: req.body.price,
    cover: req.body.cover,
  };
  books.push(book);
  res.status(201).json(book);
});

/**
 * @desc   Update a book
 * @route  PUT /api/books/:id
 * @method PUT
 * @access Public
 */

router.put("/:id", (req, res) => {
  const { error } = validateUpdateBook(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const book = books.find((b) => b.id === parseInt(req.params.id));
  if (book) {
    book.name = req.body.name;
    res.status(200).json(book);
  } else {
    res.status(404).json({ message: "Book not found" });
  }
});

/**
 * @desc   Delete a book
 * @route  DELETE /api/books/:id
 * @method DELETE
 * @access Public
 */

router.delete("/:id", (req, res) => {
  const book = books.find((b) => b.id === parseInt(req.params.id));
  if (book) {
    const index = books.indexOf(book);
    books.splice(index, 1);
    res.status(200).json({ message: "Book deleted" });
  } else {
    res.status(404).json({ message: "Book not found" });
  }
});

// validate Create Book
function validateCreateBook(book) {
  const schema = Joi.object({
    title: Joi.string().trim().min(3).max(200).required(),
    author: Joi.string().trim().min(3).max(200).required(),
    description: Joi.string().trim().min(3).max(500).required(),
    price: Joi.number().min(0).required(),
    cover: Joi.string().trim().required(),
  });
  return schema.validate(book);
}

// validate Update Book
function validateUpdateBook(book) {
  const schema = Joi.object({
    title: Joi.string().trim().min(3).max(200).required(),
    author: Joi.string().trim().min(3).max(200).required(),
    description: Joi.string().trim().min(3).max(500).required(),
    price: Joi.number().min(0).required(),
    cover: Joi.string().trim().required(),
  });
  return schema.validate(book);
}

module.exports = router;
 