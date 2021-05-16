const express = require("express");

const router = express.Router();

//middelwares
const { authCheck, adminCheck } = require("../middlewares/auth");

//controller
const {
  create,
  read,
  listAll,
  remove,
  update,
} = require("../controllers/product");

//routes
router.post("/product", authCheck, adminCheck, create);
router.get("/product/:slug", read);
router.get("/products/:count", listAll);
router.delete("/product/:slug", authCheck, adminCheck, remove);
router.put("/product/:slug", authCheck, adminCheck, update);
module.exports = router;
