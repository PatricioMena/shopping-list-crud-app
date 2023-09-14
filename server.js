const express = require('express');
const app = express();
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();

let db,
  dbConnectionString = process.env.DB_STRING,
  dbName = 'shopping-list';

MongoClient.connect(dbConnectionString).then((client) => {
  console.log('Connected to shopping list database');
  db = client.db(dbName);
});

// EJS
app.set('view engine', 'ejs');

// Middleware: methods between processing the request and sending the response in our app
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true })); // tool that helps server understand the data sent from website. incoming request object as string or array
app.use(express.json()); // telling express to recognize the incoming request object as JSON object

app.get('/', async (req, res) => {
  const shoppingItems = await db.collection('items').find().toArray();
  res.render('index.ejs', { items: shoppingItems });
});

app.post('/addItem', async (req, res) => {
  db.collection('items').insertOne({
    itemName: req.body.itemName,
    categoryName: req.body.categoryName,
    qty: 1
  });
  try {
    console.log('Item added');
    res.redirect('/');
  } catch (err) {
    console.error(err);
  }
});

app.delete('/deleteItem', async (req, res) => {
  try {
    db.collection('items').deleteOne({ itemName: req.body.itemNameS });
    res.json('Product Deleted');
  } catch (err) {
    console.error(err);
  }
});

app.listen(process.env.PORT || 2121, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
