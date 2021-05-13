const express = require("express");

const router = express.Router();

router.get("/user", (req, res) => {
  //request response handler
  res.json({
    data: "You hit the.. user API enpoint",
  });
});

module.exports = router;
