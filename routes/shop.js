const path = require('path');

const express = require('express');

const shopController = require('../controllers/shop');

const router = express.Router();

router.get('/', shopController.getIndex);

router.get('/products', shopController.getProducts);

router.get('/products/:productId', shopController.getproduct);

router.get('/cart', shopController.getCart);

router.post('/cart',shopController.postCart);

router.post('/cart-delete-item',shopController.postCartDeleteProduct);

router.post('/create-orders', shopController.postOrders);

router.get('/orders', shopController.getOrder);

// router.get('/checkout', shopController.getCheckout);

module.exports = router;
