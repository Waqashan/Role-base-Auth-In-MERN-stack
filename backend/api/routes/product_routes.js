const express = require("express");
const router = express.Router();
const authMiddleWare=require('../auth-middlewares/authMiddleWare')
const productController = require("../controller/ProductController");
const upload=require('../auth-middlewares/multerImage')
router.post("/add-product",authMiddleWare.authVerify,authMiddleWare.isAdmin,upload.single("image"),productController.AddProduct);
router.post("/update-product",authMiddleWare.authVerify,authMiddleWare.isAdmin, productController.UpdateProduct);
router.post("/delete-product",authMiddleWare.authVerify,authMiddleWare.isAdmin, productController.DeleteProduct);
router.get('/all-products', productController.getAllProducts);

module.exports = router;
