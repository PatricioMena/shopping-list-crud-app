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
  collection = db.collection('items');
});

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(process.env.PORT || 2121, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
