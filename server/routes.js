const express = require('express');
const apiRoutes = express.Router();
const upload = require('./multer');

const authenticate = require("./middleware/authenticate");

// controllers
const RegisterUser = require('./controller/RegisterUser.controller');
const LoginUser = require('./controller/LoginUser.controller');
const RegisterProduct = require('./controller/RegisterProduct.controller');
const { ProductPurchase } = require('./controller/UpdateProduct.controller');

apiRoutes.post('/register', RegisterUser);
apiRoutes.post('/login', LoginUser);
apiRoutes.post('/product/new', authenticate, upload.single('productImage') ,RegisterProduct);
apiRoutes.post('/product/purchase', authenticate, ProductPurchase);


module.exports = apiRoutes;