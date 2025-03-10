const express = require('express')
const app = express();
const path = require('path');
const user = require('./models/index')
const products = require('./models/products')
const cors = require('cors');
const cookies = require('cookie-parser')
const { name } = require('ejs');

app.set('view engine', 'ejs');
app.use(cookies())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname + '/public')));
app.use(cors({
 origin: 'http://localhost:3000',
 credentials: true
}))

app.get('/form/:pref', (req, res) => {
 res.render(__dirname + '/views/from.ejs', { pageName: req.params.pref });
})

app.get('/admin', (req, res) => {
 res.render(__dirname + '/views/adminPanel.ejs');
})

app.get('/products', async (req, res) => {
 try {
  let findAll = await products.find({});
  // res.render(__dirname + '/views/products.ejs', {allProducts: findAll});
  res.send(findAll);
 } catch (err) {
  res.send(err.message)
 }
})

app.post('/admin', async (req, res)=>{
 try{
 let {name, img, price, bg, quantity} = req.body;
 let addProduct = await products.create({
  name,
  img,
  price,
  bg,
  quantity
 });
 addProduct ? res.send('product addes') : res.send('error'); 
}
catch(err){
 res.send(err.message);
}
})

app.post('/create', async (req, res) => {
 try {
  let { name, password } = req.body;
  let create = await user.create({ name, password });
  if (create) {
   console.log('user created');
  }
  else {
   throw Error('not cretaed')
  }
 } catch (err) {
  res.send(err.message)
 }
})

app.post('/find', async (req, res) => {
 try {
  let { name, password } = req.body;
  console.log(name)
  let find = await user.findOne({ name });
  if (find) {
   res.cookie('user', name);
   res.send(true);
   console.log(find)
  }
  else {
   res.send(false)
   throw Error('not found');
  }
 } catch (err) {
  res.send(err.message)
 }
})


app.post('/bought', async (req, res) => {
 try {
  let { products } = req.body;
  let name = req.cookies.user;
  let findUser = await user.findOne({ name })
  products.map((pID) => {
   findUser.bought.push(pID);
  })
  await findUser.save();
  let pop = await findUser.populate('bought');
  console.log(pop);
  products = [];
  res.send(pop);
 } catch (err) {
  res.send(err.message);
 }
})

app.listen(3004, (err) => {
 console.log('server running');
})

module.exports = app;