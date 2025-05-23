const express = require("express");
const router = express.Router();
const {
  Author,
  validateCreateAuthor,
  validateUpdateAuthor,
} = require("../models/Author");
const asyncHandler = require("express-async-handler");


/**
 * @desc   Get all authors
 * @route  GET /api/authors
 * @method GET
 * @access Public
 */

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const authors = await Author.find();
    // const authors = await Author.find().sort({ firstName: 1 }).select("firstName lastName -_id");
    res.status(200).json(authors);
  })
);

/**
 * @desc   Get single author
 * @route  GET /api/authors/:id
 * @method GET
 * @access Public
 */

router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const author = await Author.findById(req.params.id);
    if (author) {
      res.status(200).json(author);
    } else {
      res.status(404).json({ message: "author not found" });
    }
  })
);

/**
 * @desc   Create a author
 * @route  POST /api/authors
 * @method POST
 * @access Public
 */

router.post(
  "/",
  asyncHandler(async (req, res) => {
    const { error } = validateCreateAuthor(req.body);

    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const author = new Author({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      nationality: req.body.nationality,
      image: req.body.image,
    });

    const result = await author.save();

    res.status(201).json(result);
  })
);

/**
 * @desc   Update a author
 * @route  PUT /api/authors/:id
 * @method PUT
 * @access Public
 */

router.put(
  "/:id",
  asyncHandler(async (req, res) => {
    const { error } = validateUpdateAuthor(req.body);

    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const author = await Author.findById(req.params.id);

    if (author) {
      const authorUpdated = await Author.findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            nationality: req.body.nationality,
            image: req.body.image,
          },
        },
        {
          new: true,
        }
      );
      res.status(200).json(authorUpdated);
    } else {
      res.status(404).json({ message: "author not found" });
    }
  })
);

/**
 * @desc   Delete a author
 * @route  DELETE /api/authors/:id
 * @method DELETE
 * @access Public
 */

router.delete(
  "/:id",
  asyncHandler(async (req, res) => {
    const author = await Author.findById(req.params.id);
    if (author) {
      await Author.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: "author deleted" });
    } else {
      res.status(404).json({ message: "author not found" });
    }
  })
);

module.exports = router;
