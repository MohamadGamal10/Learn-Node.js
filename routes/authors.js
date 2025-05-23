const express = require("express");
const router = express.Router();
const Joi = require("joi");
const { Author } = require("../models/Author");

// const authors = new Author({
//   firstName: "mohamed",
//   lastName: "gamal",
//   nationality: "Egyptian",
//   image: "img1.png",
// });
/**
 * @desc   Get all authors
 * @route  GET /api/authors
 * @method GET
 * @access Public
 */

router.get("/", async (req, res) => {
  try {
    const authors = await Author.find();
    // const authors = await Author.find().sort({ firstName: 1 }).select("firstName lastName -_id");
    res.status(200).json(authors);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

/**
 * @desc   Get single author
 * @route  GET /api/authors/:id
 * @method GET
 * @access Public
 */

router.get("/:id", async (req, res) => {
  try {
    const author = await Author.findById(req.params.id);
    if (author) {
      res.status(200).json(author);
    } else {
      res.status(404).json({ message: "author not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

/**
 * @desc   Create a author
 * @route  POST /api/authors
 * @method POST
 * @access Public
 */

router.post("/", async (req, res) => {
  const { error } = validateCreateAuthor(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  try {
    const author = new Author({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      nationality: req.body.nationality,
      image: req.body.image,
    });

    const result = await author.save();

    res.status(201).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

/**
 * @desc   Update a author
 * @route  PUT /api/authors/:id
 * @method PUT
 * @access Public
 */

router.put("/:id", (req, res) => {
  const { error } = validateUpdateAuthor(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const author = authors.find((b) => b.id === parseInt(req.params.id));
  if (author) {
    author.firstName = req.body.firstName;
    author.lastName = req.body.lastName;
    author.nationality = req.body.nationality;
    author.image = req.body.image;
    res.status(200).json(author);
  } else {
    res.status(404).json({ message: "author not found" });
  }
});

/**
 * @desc   Delete a author
 * @route  DELETE /api/authors/:id
 * @method DELETE
 * @access Public
 */

router.delete("/:id", (req, res) => {
  const author = authors.find((b) => b.id === parseInt(req.params.id));
  if (author) {
    const index = authors.indexOf(author);
    authors.splice(index, 1);
    res.status(200).json({ message: "author deleted" });
  } else {
    res.status(404).json({ message: "author not found" });
  }
});

// validate Create author
function validateCreateAuthor(author) {
  const schema = Joi.object({
    firstName: Joi.string().trim().min(3).max(200).required(),
    lastName: Joi.string().trim().min(3).max(200).required(),
    nationality: Joi.string().trim().min(3).max(200).required(),
    image: Joi.string().trim(),
  });
  return schema.validate(author);
}

// validate Update author
function validateUpdateAuthor(author) {
  const schema = Joi.object({
    firstName: Joi.string().trim().min(3).max(200),
    lastName: Joi.string().trim().min(3).max(200),
    nationality: Joi.string().trim().min(3).max(200),
    image: Joi.string().trim(),
  });
  return schema.validate(author);
}

module.exports = router;
