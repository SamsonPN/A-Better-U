const express = require('express');
const app = express();
const request = require('request');
const port = 9000;

const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const dbName = 'a-better-u'; //name of the database to be used
const client = new MongoClient(url, { useNewUrlParser: true })

client.connect((err)=> {
  console.log('Successfully connected to the server')

  const db = client.db(dbName);
  app.locals.db = db;
})

app.use(express.json());

// const exerciseInfo = {
//   url: 'https://wger.de/api/v2/exerciseinfo/',
//   method: 'GET',
//   headers: {
//     'Accept': 'application/json'
//   }
// }
//
// request(exerciseInfo, function(err, res,body){
//   let json = JSON.parse(body);
//   console.log(json)
// })

app.listen(port, function(){
  console.log(`Listening on port ${port}`);
});

app.post('/insertFood', (req,res) => {
  let db = req.app.locals.db;
  let collection = db.collection('nutrition');

  collection.insertOne(req.body)
    .then(result => console.log(`Successfully inserted item with _id: ${result.insertedId}`))
    .catch(err => console.error(`Failed to insert item: ${err}`))
})

app.get('/getFood/:date', (req,res) => {
  let db = req.app.locals.db;
  let collection = db.collection('nutrition');

  collection.find( { "date": req.params.date } )
  .toArray()
  .then(items => {
    console.log(`Successfully found ${items.length} documents: ${items}`)
    res.json(items)
  })
  .catch(err => console.error(`Failed to find documents ${err}`))
})
