const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "../images"));
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString().replace(/:/g, "-") + "-" + file.originalname);
    },
})

const upload = multer({ storage });

// api/upload
router.post("/", upload.single("image"), (req, res) => {
    res.status(200).json({ message: "Image uploaded successfully" });
});


module.exports = router;