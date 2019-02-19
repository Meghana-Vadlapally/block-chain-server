const express = require('express');
const apiRoutes = express.Router();
const upload = require('./multer');

const authenticate = require("./middleware/authenticate");

// controllers
const RegisterUser = require('./controller/RegisterUser.controller');
const LoginUser = require('./controller/LoginUser.controller');
const RegisterProduct = require('./controller/RegisterProduct.controller');
const { ProductPurchase } = require('./controller/UpdateProduct.controller');
const {ListOfProducts, ProductDetails, MerchantProducts, MyProducts} = require('./controller/Products.controller');


apiRoutes.post('/register', RegisterUser);
apiRoutes.post('/login', LoginUser);
apiRoutes.post('/product/new', authenticate, upload.single('productImage') ,RegisterProduct);
apiRoutes.post('/product/purchase', authenticate, ProductPurchase);
apiRoutes.get('/products', ListOfProducts);
apiRoutes.get('/products/:merchantId', MerchantProducts);
apiRoutes.get('/my-products', authenticate, MyProducts);
apiRoutes.get('/product/:productId', ProductDetails);

module.exports = apiRoutes;
