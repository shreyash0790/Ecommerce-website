const Sequelize=require('sequelize');
const sequelize=require('../util/database');

const Product=sequelize.define('product',{
 id:{
  type: Sequelize.INTEGER,
  autoIncrement:true,
  allowNull:false,
  primaryKey:true
 },
 title:{
  type: Sequelize.STRING,
  allowNull:false
 },
 price:{
  type: Sequelize.DOUBLE,
  allowNull:false
 },
imageUrl:{
  type: Sequelize.STRING,
  allowNull:false
 },
 description:{
  type: Sequelize.STRING,
  allowNull:false
 }
})
module.exports=Product;









// const db=require('../util/database');

// module.exports = class Product {
//   constructor(id,title, imageUrl, description, price) {
//     this.id=id;
//     this.title = title;
//     this.imageUrl = imageUrl;
//     this.description = description;
//     this.price = price;
//   }

//   save() {
//    return db.execute('INSERT INTO products (title,price,imageURL,description) VALUES (?,?,?,?)',
//    [this.title,this.price,this.imageUrl,this.description])
//   }

//   static fetchAll() {
//    return  db.execute('SELECT * FROM products');
//   }

//   static findById(id){
//    return db.execute('SELECT *FROM products WHERE products.id=?',[id])
  
//   }
//   static deleteproductbyID(id){
//     return db.execute('DELETE FROM products WHERE products.id=?',[id])
//   }

// };