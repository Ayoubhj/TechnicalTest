const Product = require("../models/product")
const {
    productValidaion,
} = require("../validation/productValidation");
const jwt = require("jsonwebtoken");

exports.getProduct = (req, res) => {

    Product.find().then(result => {
        res.status(200).json({
            response: result
        });
    }).catch(
        (error) => {
            res.status(400).json({
                message: "no data found",
                error: error
            });
        }
    )
}

exports.createProduct = (req, res) => {

    const { error } = productValidaion(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let product = new Product(req.body);

    product.save().then(result => {
        res.status(201).json({
            message: 'Product Created successfully!'
        });
    }).catch(
        (error) => {
            res.status(500).json({
                error: error
            });
        }
    )
}

exports.updateProduct = async (req, res) => {

    const { error } = productValidaion(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let product = new Product();

    let ExistingProduct;
    await Product.findById(req.params.product_id).then(result => {
        ExistingProduct = result
    }).catch(err => {
        (error) => {
            res.status(500).json({
                error: error
            });
        }
    })

    if (ExistingProduct) {
        product = Object.assign(ExistingProduct, req.body)
        await product.save().then(result => {
            res.status(201).json({
                message: 'Product updated successfully!'
            });
        }).catch(err => {
            (error) => {
                res.status(400).json({
                    error: error
                });
            }
        })
    } else {
        res.status(400).json({
            message: "There is No product to update"
        });
    }

}

exports.deleteProduct = async (req, res) => {

    let productId = req.params.product_id

    Product.deleteOne({ productId }).then(result => {
        res.status(201).json({
            message: 'Product Deleted successfully!'
        });
    }).catch(err => {
        (error) => {
            res.status(500).json({
                error: error
            });
        }
    })


}

exports.getProductById = (req, res) => {

    let productId = req.params.product_id;

    Product.findById(productId).then(result => {


        res.status(200).json({
            response: result
        });

    }).catch((error) => {
        res.status(400).json({
            message: "no data found",
            error: error
        });
    })
}

exports.getProductVariants = (req, res) => {

    let productId = req.params.product_id;

    Product.findById(productId).then(result => {
        res.status(200).json({
            response: result.variants
        });
    }).catch(err => {
        (error) => {
            res.status(500).json({
                message: "no data found",
                error: error
            });
        }
    })
}

exports.getProductVariantsById = (req, res) => {

    let productId = req.params.product_id;
    let variantId = req.params.variant_id;

    let variantObject;
    Product.findById(productId).then(result => {
        result.variants.forEach(variant => {

            if (variantId == variant.id) {
                variantObject = variant
            }
        })
        if (variantObject) {
            res.send(variantObject)
        } else {
            res.status(400).json({
                message: "There is no variant"
            });
        }
    }).catch(err => {
        (error) => {
            res.status(500).json({
                error: error
            });
        }
    })

}

exports.createJWTToken = (req, res) => {

    const token = jwt.sign(
        { role: "admin" },
        process.env.TOKEN_SCRET
    );

    res.send(token)

}