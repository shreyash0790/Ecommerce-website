const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing:false
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const price = req.body.price;
  const imageUrl = req.body.imageUrl;
  const description = req.body.description;
  const product = new Product(null,title, imageUrl, description, price);
  product.save();
  res.redirect('/');
};
exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect('/');
  }
  const proId = req.params.productId;
  Product.findById(proId, product => {
    if(!product){
      return res.redirect('/')
    }
    res.render('admin/edit-product', {
      pageTitle: 'Edit Product',
      path: '/admin/edit-product',
      editing:editMode,
      product: product
    });
  })
};

exports.postEditProduct=(req, res, next) => {
const proId=req.body.productId;
const upadatedtitle=req.body.title;
const upadatedprice=req.body.price;
const upadatedImageurl=req.body.imageUrl;
const upadatedDesc=req.body.description;
const upadatedproduct=new Product(proId,upadatedtitle,upadatedImageurl,upadatedDesc,upadatedprice);
upadatedproduct.save();
res.redirect('/admin/products');
}

exports.deleteproducts=(req, res, next) => {
  const proId=req.body.productId;
  Product.deleteproductbyID(proId)
  res.redirect('/admin/products');
}

exports.getProducts = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    });
  });
};
