const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    name: {
        type: String
    },
    details: {
        type: String
    },
    shortDescription: {
       type: String
    },
    price: {
        type: Number
    },
    productImagePath: {
      type: String
    },
   postedBy: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User"
     },
    postedOn: {
        type: Date,
        default: Date.now
    },
    availability: {
        type: Date,
        default: Date.now
    },
    status: {
        type: Number,
        default: 1
    },
    soldOn: {
        type: Date
    },
    soldBy: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
});

const Product = mongoose.model("Products", ProductSchema);

module.exports = Product;
