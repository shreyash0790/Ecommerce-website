const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false
  });
};

exports.postAddProduct = async (req, res, next) => {
  try {
    const title = req.body.title;
    const price = req.body.price;
    const imageUrl = req.body.imageUrl;
    const description = req.body.description;
    const product = new Product(null, title, imageUrl, description, price);
    await product.save();
    res.redirect('/');
  } catch (err) {
    console.log(err);
  }
};

exports.getEditProduct = async (req, res, next) => {
  try {
    const editMode = req.query.edit;
    if (!editMode) {
      return res.redirect('/');
    }
    const proId = req.params.productId;
    const product = await Product.findById(proId);
    if (!product) {
      return res.redirect('/');
    }
    res.render('admin/edit-product', {
      pageTitle: 'Edit Product',
      path: '/admin/edit-product',
      editing: editMode,
      product: product[0]
    });
  } catch (err) {
    console.log(err);
  }
};

exports.postEditProduct = async (req, res, next) => {
  try {
    const proId = req.body.productId;
    const updatedTitle = req.body.title;
    const updatedPrice = req.body.price;
    const updatedImageUrl = req.body.imageUrl;
    const updatedDesc = req.body.description;
    const updatedProduct = new Product(proId, updatedTitle, updatedImageUrl, updatedDesc, updatedPrice);
    await updatedProduct.save();
    res.redirect('/admin/products');
  } catch (err) {
    console.log(err);
  }
};

exports.deleteproducts = async (req, res, next) => {
  try {
    const proId = req.body.productId;
    await Product.deleteproductbyID(proId);
    res.redirect('/admin/products');
  } catch (err) {
    console.log(err);
  }
};

exports.getProducts = async (req, res, next) => {
  try {
    const products = await Product.fetchAll();
    res.render('admin/products', {
      prods: products[0],
      pageTitle: 'Admin Products',
      path: '/admin/products'
    });
  } catch (err) {
    console.log(err);
  }
};