const mongodb = require('mongodb');
const getDb = require('../util/database').getDb

const ObjectId = mongodb.ObjectId

class User {
    constructor(username, email, cart, id) {
        this.name = username;
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

