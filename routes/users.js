const express = require("express");
const router = express.Router();
const {
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("../middlewares/verifyToken");
const {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

router.get("/", verifyTokenAndAdmin, getAllUsers);

// router.get("/:id", verifyTokenAndAuthorization, getUserById);
// router.put("/:id", verifyTokenAndAuthorization, updateUser);
// router.delete("/:id", verifyTokenAndAuthorization, deleteUser);

router
  .route("/:id")
  .get(verifyTokenAndAuthorization, getUserById)
  .put(verifyTokenAndAuthorization, updateUser)
  .delete(verifyTokenAndAuthorization, deleteUser);

module.exports = router;
