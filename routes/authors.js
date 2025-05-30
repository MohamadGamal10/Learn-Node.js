const express = require("express");
const router = express.Router();
const { verifyTokenAndAdmin } = require("../middlewares/verifyToken");
const {
  getAllAuthors,
  getAuthorById,
  createAuthor,
  updateAuthor,
  deleteAuthor,
} = require("../controllers/authorController");

// router.get("/", getAllAuthors);
// router.post("/", verifyTokenAndAdmin, createAuthor);

router.route("/").get(getAllAuthors).post(verifyTokenAndAdmin, createAuthor);

// router.get("/:id", getAuthorById);
// router.put("/:id", verifyTokenAndAdmin, updateAuthor);
// router.delete("/:id", verifyTokenAndAdmin, deleteAuthor);

router
  .route("/:id")
  .get(getAuthorById)
  .put(verifyTokenAndAdmin, updateAuthor)
  .delete(verifyTokenAndAdmin, deleteAuthor);

module.exports = router;
