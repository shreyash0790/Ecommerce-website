const mongodb = require('mongodb');
const { get } = require('../routes/admin');
const getDb = require('../util/database').getDb

const ObjectId = mongodb.ObjectId

class User {
    constructor(name, email, cart, id) {
        this.name = name;
        this.email = email;
        this.cart = cart // {items : []}
        this._id = id
    }

    save() {
        const db = getDb()
        return db.collection('users').insertone(this)

    }

    addToCart(product) {
        const cartProductIndex = this.cart.items.findIndex(cp => {
            return cp.productId.toString() === product._id.toString();
        })
        let newQuantity = 1;
        const updatedCartitems = [...this.cart.items]

        if (cartProductIndex >= 0) {
            newQuantity = this.cart.items[cartProductIndex].quantity + 1;
            updatedCartitems[cartProductIndex].quantity = newQuantity
        }
        else {
            updatedCartitems.push({ productId: new ObjectId(product._id), quantity: 1 })

        }
        const updatedCart = { items: updatedCartitems }
        const db = getDb();
        return db.collection('users').updateOne(
            { _id: new ObjectId(this._id) },
            { $set: { cart: updatedCart } }
        )
    }


    getCart() {
        const db = getDb();
        let productIds = this.cart.items.map(i => {
            return i.productId
        })
        return db.collection('products').find({ _id: { $in: productIds } }) //in find ids in an array and create objects of ids 
            .toArray()
            .then(products => {
                return products.map(p => {
                    return {
                        ...p, quantity: this.cart.items.find(i => {
                            return i.productId.toString() === p._id.toString();
                        }).quantity
                    }
                })
            })
    }

    deleteCartitems(productId) {
        const updatedCartItems = this.cart.items.filter(items => {
            return items.productId.toString() !== productId.toString();
        })
        const db = getDb();
        return db.collection('users').updateOne(
            { _id: new ObjectId(this._id) },
            { $set: { cart: { items: updatedCartItems } } }
        )


    }

    addOrder() {
        console.log('User ID:', this._id);
        console.log('Username:', this.name);
        const db = getDb();
        return this.getCart()               // adding product info with user data in orders collection
            .then(products => {
                const order = {
                    items: products,
                    user: {
                        _id: new ObjectId(this._id),
                        name: this.name,
                        email: this.email
                    }
                }
                return db
                    .collection('orders')
                    .insertOne(order)
            })
            .then(result => {
                this.cart = { items: [] } //clearing cart  from user object
                return db
                    .collection('users')
                    .updateOne(
                        { _id: new ObjectId(this._id) },
                        { $set: { cart: { items: [] } } }       //removing cart from database 
                    )
            })
    }


    getOrders() {
        const db=getDb()
        return db.collection('orders').find({'user._id': new ObjectId(this._id)})
        .toArray();

    }

    static findUserbyID(userId) {
        const db = getDb()
        return db.collection('users')
            .findOne({ _id: new mongodb.ObjectId(userId) })
            .then(user => {
                return user
            })
            .catch(err => {
                console.log(err)
            })
    }



}


module.exports = User;

