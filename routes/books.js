const express = require("express");
const router = express.Router();
const {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
} = require("../controllers/bookController");

const { verifyTokenAndAdmin } = require("../middlewares/verifyToken");

// router.get("/", getAllBooks);
// router.post("/", verifyTokenAndAdmin, createBook);

router.route("/").get(getAllBooks).post(verifyTokenAndAdmin, createBook);

// router.get("/:id", getBookById);
// router.put("/:id", verifyTokenAndAdmin, updateBook);
// router.delete("/:id", verifyTokenAndAdmin, deleteBook);

router
  .route("/:id")
  .get(getBookById)
  .put(verifyTokenAndAdmin, updateBook)
  .delete(verifyTokenAndAdmin, deleteBook);

module.exports = router;
