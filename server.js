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
  const collection = db.collection('nutrition');
  app.locals.db = db;

  let today = new Date();
  let dd = String(today.getDate()).padStart(2, '0');
  let mm = String(today.getMonth() + 1).padStart(2, '0');
  let yyyy = today.getFullYear();
  today = mm + '/' + dd + '/' + yyyy;


  //initiates collection with documents for each meal for each day
  collection.insertMany( [
  {"date": today, "meal": "Breakfast", "FoodAdded":[],"servings": {} },
  {"date": today, "meal": "Lunch", "FoodAdded":[],"servings": {} },
  {"date": today, "meal": "Dinner", "FoodAdded":[],"servings": {} },
  {"date": today, "meal": "Snacks", "FoodAdded":[],"servings": {} }
  ] ).
    catch(err => console.log(err))

  //ensures that no duplicates are added into the collection
  collection.createIndex({"date": 1, "meal": 1}, {unique: true})

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
  var ndbno;

  collection.updateOne(
    { "date" : req.body.date, "meal" : req.body.meal } ,
    { $addToSet: {"FoodAdded": { $each: req.body.FoodAdded } } } )
    .then(result => {
      if(result.result.nModified !== 0){
        for(ndbno in req.body.servings){
          collection.updateOne(
            {"date": req.body.date, "meal": req.body.meal},
            {$set: {["servings." + ndbno] : req.body.servings[ndbno] }}
          )
        }
      } else {
        console.log("Putting in duplicate!")
      }
    })
    .catch(err => console.error(`Failed to insert item: ${err}`))
})

app.get('/getFood/:date', (req,res) => {
  let db = req.app.locals.db;
  let collection = db.collection('nutrition');

  collection.find( { "date": req.params.date } )
  .toArray()
  .then(items => {
    res.json(items)
  })
  .catch(err => console.error(`Failed to find documents ${err}`))
})

app.get('/getServings/:date/:meal', (req,res) => {
  let db = req.app.locals.db;
  let collection = db.collection('nutrition');

  collection.findOne( {"date" : req.params.date, "meal": req.params.meal})
    .then(result => res.json(result))
})

app.put('/updateServings', (req,res) => {
  let db = req.app.locals.db;
  let collection = db.collection('nutrition');
  let ndbno = `servings.${req.body.ndbno}`;

  collection.updateOne( {"date" : req.body.date, "meal": req.body.meal}, {$set: {[ndbno]: req.body.servings}})
})

app.delete('/deleteFood', (req,res) => {
  let db = req.app.locals.db;
  let collection = db.collection('nutrition');
  console.log(req.body);

  collection.bulkWrite([
    {updateOne: {
      "filter": {"date" : req.body.date , "meal" : req.body.meal },
      "update" : { $pull: { "FoodAdded": {"ndbno": req.body.ndbno} } } }
     },
    {updateOne: {
      "filter" : { "date" : req.body.date, "meal" : req.body.meal },
      "update" : { $unset: { ["servings." + req.body.ndbno] : req.body.servings} } }
    }
  ])
  .then(result => console.log(result.result.nModified))
  .catch(err => console.error)
})


/* use in conjunction with .bulkWrite to do multiple operations.
  - should delete the food from FoodAdded, and also remove its ndbno from the servings too

db.nutrition.updateOne( { "date" : "08/26/2019" , "meal" : "Snacks"}, { $pull: {"FoodAdded": {"ndbno": "45108940"}}})
use this to delete any foods and the servings associated with it from all documents

db.nutrition.updateOne( {"date" : "08/26/2019", "meal" : "Snacks"}, {$unset: {["servings.43570"]:"1"}})
- use this code to remove any servings from the servings thing
*/
