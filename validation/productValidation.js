const joi = require("@hapi/joi");

const productValidaion = data => {
    const schema = {
        reference: joi.string().required(),
        name: joi.string().required(),
        description: joi.string().required(),
        image: joi.string(),
        variants: joi.array().items(
            joi.object(
                {
                    sku: joi.number().required(),
                    specification: joi.string().required(),
                    price: joi.number().required()
                })
        )
    };
    return joi.validate(data, schema);
};

module.exports.productValidaion = productValidaion