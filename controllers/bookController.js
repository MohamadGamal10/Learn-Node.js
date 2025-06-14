const {
  Book,
  validateCreateBook,
  validateUpdateBook,
} = require("../models/Book");
const asyncHandler = require("express-async-handler");

/**
 * @desc   Get all books
 * @route  GET /api/books
 * @method GET
 * @access Public
 */

const getAllBooks = asyncHandler(async (req, res) => {
  const { price, minPrice, maxPrice } = req.query;

  // const books = await Book.find();
  let books;
  if (minPrice && maxPrice) {
    books = await Book.find({
      // price: 10, // equal
      // price: { $eq: price }, // equal
      // price: { $ne: 10 }, // not equal
      // price: { $gt: 10 }, // greater than
      // price: { $gte: 10 }, // greater than or equal
      price: { $gte: minPrice, $lte: maxPrice }, // between
      // price: { $lt: 10 }, // less than
      // price: { $lte: 10 }, // less than or equal
      // price: { $in: [10, 12, 14] }, // in
      // price: { $nin: [10, 12, 14] }, // not in
      // price: { $mod: [2, 0] }, // modulus
    }).populate("author", ["firstName", "lastName"]);
  } else {
    books = await Book.find().populate("author", ["firstName", "lastName"]);
  }
  res.status(200).json(books);
});

/**
 * @desc   Get single book
 * @route  GET /api/books/:id
 * @method GET
 * @access Public
 */

const getBookById = asyncHandler(async (req, res) => {
  // const book = await Book.findById(req.params.id);
  const book = await Book.findById(req.params.id).populate("author");
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
 * @access Private - (only Admin)
 */

const createBook = asyncHandler(async (req, res) => {
  const { error } = validateCreateBook(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const book = new Book({
    title: req.body.title,
    author: req.body.author,
    description: req.body.description,
    price: req.body.price,
    cover: req.body.cover,
  });
  const result = await book.save();
  res.status(201).json(result);
});

/**
 * @desc   Update a book
 * @route  PUT /api/books/:id
 * @method PUT
 * @access Private - (only Admin)
 */

const updateBook = asyncHandler(async (req, res) => {
  const { error } = validateUpdateBook(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  console.log(req.params.id)
  const bookUpdated = await Book.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        title: req.body.title,
        author: req.body.author,
        description: req.body.description,
        price: req.body.price,
        cover: req.body.cover,
      },
    },
    { new: true }
  );
  res.status(200).json(bookUpdated);
});

/**
 * @desc   Delete a book
 * @route  DELETE /api/books/:id
 * @method DELETE
 * @access Private - (only Admin)
 */

const deleteBook = asyncHandler(async (req, res) => {
  const book = await Book.findById(req.params.id);
  if (book) {
    await Book.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Book deleted successfully" });
  } else {
    res.status(404).json({ message: "Book not found" });
  }
});

module.exports = {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
};
