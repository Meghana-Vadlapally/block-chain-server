const _ = require('lodash');
var Product = require("./../models/Product.model");
const Util = require("../utils");

const RegisterProduct = function (req, res, next) {
    console.log(req.body);
    const data = _.pick(req.body, ['name', 'description', 'price']);
    const userId = Util.getUserId(req);

    if(data.name && data.description && data.price) {
        Product.create({...data, postedBy: userId, productImagePath: req.file.path})
            .then(response => {
                res.send({message: 'Product registered successfully!'})
            })
            .catch(error => {
                res.status(500).send({message:'Unable to upload product, please try again!'});
            })
    } else {
        res.status(400).send({ message: "Enter all required fields!" });
    }
};

module.exports = RegisterProduct;