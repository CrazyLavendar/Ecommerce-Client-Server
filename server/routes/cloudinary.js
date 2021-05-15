const express = require("express");
const router = express.Router();

//middelwares
const { authCheck, adminCheck } = require("../middlewares/auth");

//controller
const { upload, remove } = require("../controllers/cloudinary");

//routes

router.post("/uploadimages", authCheck, adminCheck, upload);
router.post("/removeimage", authCheck, adminCheck, remove);

//exports
module.exports = router;
