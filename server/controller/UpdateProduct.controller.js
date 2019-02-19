const _ = require('lodash');
var Product = require("./../models/Product.model");
const Util = require("../utils");
const CONSTANTS = require("../constants");

const ProductPurchase = function (req, res, next) {
    const data = _.pick(req.body, ['productId']);
    console.log(data);
    const userId = Util.getUserId(req);

    if(data.productId) {
        Product.findOneAndUpdate(
            {_id: data.productId, status: CONSTANTS.PRODUCT_STATUS.AVAILABLE},
            {$set:{status: CONSTANTS.PRODUCT_STATUS.SOLD, soldBy: userId, soldOn: Date.now() }},
            {upsert: false} //don't create new record if not found
            )
            .then(response => {
                if(response) res.send({message: 'Product purchased successfully!'});
                else res.status(400).send({message:'Unable to purchase product, please try again!'});
            })
            .catch(error => {
                res.status(500).send({message:'Unable to purchase product, please try again!'});
            })
    } else {
        res.status(500).send({message:'Unable to purchase product, please try again!'});
    }
};

module.exports = {
    ProductPurchase
};