const express = require('express');
const { simpleAuth } = require('./checkAuth')

const routerProducts = express.Router();
const productController = require('../controller/ProductController');

routerProducts.get("/token", productController.createJWTToken);

routerProducts.get("/products", simpleAuth, productController.getProduct);
routerProducts.post("/products", simpleAuth, productController.createProduct);
routerProducts.put("/products/:product_id", simpleAuth, productController.updateProduct);
routerProducts.delete("/products/:product_id", simpleAuth, productController.deleteProduct);

routerProducts.get("/products/:product_id", simpleAuth, productController.getProductById);
routerProducts.get("/products/:product_id/variants/", simpleAuth, productController.getProductVariants);
routerProducts.get("/products/:product_id/variants/:variant_id", simpleAuth, productController.getProductVariantsById);

module.exports = routerProducts