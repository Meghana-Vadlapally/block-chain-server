const _ = require('lodash');
var Product = require("./../models/Product.model");
const Util = require("../utils");
const CONSTANTS = require('../constants');
const ObjectID = require("mongodb").ObjectID;

const ListOfProducts = function (req, res, next) {
    Product.find({status: {$ne: CONSTANTS.PRODUCT_STATUS.SOLD}})
        .populate('postedBy', 'fullName')
        .then(posts => {
            res.send(posts);
        })
        .catch(error => {
            res.status(500).send({message:'Unable to process request'});
        })
};


const ProductDetails = function (req, res, next) {
    const productId = req.params.productId;
    if(!ObjectID.isValid(productId)){
        return res.status(404).send([]);
    }
    Product.findById(productId)
        .populate('postedBy', 'fullName')
        .then(product => {
            res.send(product);
        })
        .catch(error => {
            res.status(500).send({message:'Unable to process request'});
        })

};

const MerchantProducts = function (req, res, next) {
    const userId = req.params.merchantId;
    if(!ObjectID.isValid(userId)){
        return res.status(404).send([]);
    }

    Product.find({postedBy:userId, status: {$ne: CONSTANTS.PRODUCT_STATUS.SOLD}})
        .then(product => {
            res.send(product);
        })
        .catch(error => {
            res.status(500).send({message:'Unable to process request'});
        })

};


const MyProducts = function (req, res, next) {

    const loginUserId = Util.getUserId(req);

    Product.find( { postedBy:loginUserId })
        .then(product => {
            res.send(product);
        })
        .catch(error => {
            res.status(500).send({message:'Unable to process request'});
        })

};

module.exports = {
    ListOfProducts,
    ProductDetails,
    MerchantProducts,
    MyProducts
};
