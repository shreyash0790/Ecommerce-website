const Product = require('../models/product');


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

exports.getCart = async (req, res, next) => {
  try{
   const Cart=await req.user.getCart()
 
  res.render('shop/cart', {
    path: '/cart',
    pageTitle: 'Your Cart',
    products: Cart
  });
}catch(err){
  console.log(err)
}
};

exports.postCart = async (req, res, next) => {
  try {
    const proId = req.body.productId;
    const product = await Product.findById(proId);
    const result = await req.user.addToCart(product);
    res.redirect('/cart');
  } catch (err) {
    console.log(err);
  }
};





exports.postOrders = async (req, res, next) => {

  const PostOrder=await req.user.addOrder()
  console.log(PostOrder)
  res.redirect('/orders');
};

exports.getOrder = async(req, res, next) => {
const getOrders= await req.user.getOrders()
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders',
    orders:getOrders
  });
};



exports.postCartDeleteProduct = async (req, res, next) => {
  try {
    const proId = req.body.productId;
    const deletedProduct = await req.user.deleteCartitems(proId)
    res.redirect('/cart');
  } catch (err) {
    console.log(err);
  }
};
