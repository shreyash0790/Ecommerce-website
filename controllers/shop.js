const Product = require('../models/product');
// const Cart = require('../models/cart')

exports.getProducts = async (req, res, next) => {
    try {
      const product =  await Product.fetchAll()
      res.render('shop/product-list', {
        prods: product,
        pageTitle: 'All Products',
        path: '/products'
      })
    } catch (err) {
      console.log(err);
    }
};

exports.getproduct = async (req, res, next) => {
  try {
      const proId = req.params.productId;
      const product = await Product.findById(proId);
      res.render('shop/product-detail', {
          product: product,
          pageTitle: product.title,
          path: '/products'
      });
  } catch (err) {
      console.error('Error fetching product:', err);
  }  
};



exports.getIndex = async (req, res, next) => {
  try {
    const product =  await Product.fetchAll()
    res.render('shop/index', {
      prods: product,
      pageTitle: 'Shop',
      path: '/'
    })
  } catch (err) {
    console.log(err);
  }
};

// exports.getCart = async (req, res, next) => {
//   try{
//    const Cart=await req.user.getCart()
//    const Procart= await Cart.getProducts() 
//   res.render('shop/cart', {
//     path: '/cart',
//     pageTitle: 'Your Cart',
//     products: Procart
//   });
// }catch(err){
//   console.log(err)
// }
// };

exports.postCart = async (req, res, next) => {
  try {
    const proId = req.body.productId;
 Product.findById(proId)
 .then(product=>{
  return req.user.addToCart(product)
 })
 .then(result=>console.log(result))

    res.redirect('/cart');
  } catch (err) {
    console.log(err);
  }
};

// exports.getOrders = (req, res, next) => {
//   res.render('shop/orders', {
//     path: '/orders',
//     pageTitle: 'Your Orders'
//   });
// };

// exports.getCheckout = (req, res, next) => {
//   res.render('shop/checkout', {
//     path: '/checkout',
//     pageTitle: 'Checkout'
//   });
// };