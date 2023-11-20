const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
const MongoConnect=require('./util/database').MongoConnect;

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

const User=require('./models/user')


app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use((req,res,next)=>{
    User.findUserbyID('655603f1adb1daa5dff443ec')
    .then(user=>{
        req.user=new User(user.name,user.email,user.cart,user._id);
        next();
    })
    .catch(err=>console.log(err));
})

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);


MongoConnect(()=>{

 app.listen(3000);
});