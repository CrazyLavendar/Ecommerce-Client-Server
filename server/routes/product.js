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
  list,
  productsCount,
  productStar,
  listRelated,
} = require("../controllers/product");

//routes
router.post("/product", authCheck, adminCheck, create);
router.get("/products/total", productsCount);
router.get("/product/:slug", read);
router.get("/products/:count", listAll);
router.delete("/product/:slug", authCheck, adminCheck, remove);
router.put("/product/:slug", authCheck, adminCheck, update);
router.post("/products", list);

router.put("/product/star/:productId", authCheck, productStar);
router.get("/product/related/:productId", listRelated);
module.exports = router;
