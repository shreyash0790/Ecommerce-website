const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;

const MongoConnect=callback=>{
    MongoClient.connect('mongodb+srv://shreyash:bENuEsrx2RG4UHGj@test1.uhi7exl.mongodb.net/shop?retryWrites=true&w=majority')
    .then(Client=> {
        console.log("Connected");
        _db=Client.db()
        callback();
    })
    .catch(err =>{
        console.log(err)
    } )
}

const getDb=()=>{
    if(_db){
        return _db
    }
    throw "no database found";
}

exports.MongoConnect=MongoConnect;
exports.getDb=getDb;