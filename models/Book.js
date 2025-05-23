const mongoose = require("mongoose");
const Joi = require("joi");

const BookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    minLength: 3,
    maxLength: 250,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Author",
  },
  description: {
    type: String,
    required: true,
    trim: true,
    minLength: 5,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  cover: {
    type: String,
    required: true,
    enum: ["soft cover", "hard cover"],
  },
});

// validate Create Book
function validateCreateBook(book) {
  const schema = Joi.object({
    title: Joi.string().trim().min(3).max(250).required(),
    author: Joi.string().required(),
    description: Joi.string().trim().min(5).required(),
    price: Joi.number().min(0).required(),
    cover: Joi.string().valid("soft cover", "hard cover").required(),
  });
  return schema.validate(book);
}

// validate Update Book
function validateUpdateBook(book) {
  const schema = Joi.object({
    title: Joi.string().trim().min(3).max(250),
    author: Joi.string(),
    description: Joi.string().trim().min(5),
    price: Joi.number().min(0),
    cover: Joi.string().valid("soft cover", "hard cover"),
  });
  return schema.validate(book);
}

const Book = mongoose.model("Book", BookSchema);
module.exports = {
  Book,
  validateCreateBook,
  validateUpdateBook
};
