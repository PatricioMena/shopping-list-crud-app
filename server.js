const express = require('express');
const app = express();
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();

let db;
dbConnectionString = process.env.DB_STRING;
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
app.use(cors());

app.get('/', async (req, res) => {
  const shoppingItems = await db.collection('items').find().toArray();
  res.render('index.ejs', { items: shoppingItems });
});

app.post('/addItem', (req, res) => {
  db.collection('items')
    .insertOne({
      itemName: req.body.itemName.trim(),
      categoryName: req.body.categoryName.trim(),
      qty: 1
    })
    .then((result) => {
      console.log('Item added');
      res.redirect('/');
    })
    .catch((error) => console.error(error));
});

app.put('/plusOneItem', (req, res) => {
  db.collection('items')
    .updateOne(
      {
        itemName: req.body.itemNameS,
        categoryName: req.body.categoryNameS,
        qty: req.body.itemQtyS
      },
      {
        // $set mongodb operator: replaces the value of a field with the specified value
        $set: {
          qty: req.body.itemQtyS + 1
        }
      }
    )
    .then((result) => {
      console.log('Quantity added');
      res.json('Quantity added');
    })
    .catch((error) => console.error(error));
});

app.put('/minusOneItem', async (req, res) => {
  db.collection('items')
    .updateOne(
      {
        itemName: req.body.itemNameS,
        categoryName: req.body.categoryNameS,
        qty: req.body.itemQtyS
      },
      {
        // $set mongodb operator: replaces the value of a field with the specified value
        $set: {
          qty: req.body.itemQtyS - 1
        }
      }
    )
    .then((result) => {
      console.log('Quantity subtracted');
      res.json('Quantity subtracted');
    })
    .catch((error) => console.error(error));
});

app.delete('/deleteItem', async (req, res) => {
  db.collection('items')
    .deleteOne({ itemName: req.body.itemNameS })
    .then((result) => {
      console.log('Produce deleted');
      res.json('Product deleted');
    })
    .catch((error) => console.error(error));
});

app.listen(process.env.PORT || 2121, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
