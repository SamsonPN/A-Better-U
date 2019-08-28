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
  {"date": today, "type" : "foods", "meal": "Breakfast", "FoodAdded":[],"servings": {} },
  {"date": today, "type" : "foods", "meal": "Lunch", "FoodAdded":[],"servings": {} },
  {"date": today, "type" : "foods", "meal": "Dinner", "FoodAdded":[],"servings": {} },
  {"date": today, "type" : "foods", "meal": "Snacks", "FoodAdded":[],"servings": {} },
  {"date": today, "type" : "totals", "calories": 0, "protein": 0, "fat": 0, "carbs": 0}
  ])
    .catch(err => console.log(err))

  const goals = db.collection('nutritionGoals')

  goals.insertOne({
    "type" : "goals", "CalorieGoal": 0, "ProteinGoal": 0, "FatGoal": 0, "CarbsGoal": 0
  })
    .catch(err => console.log(err))

  //ensures that no duplicates are added into the collection
  collection.createIndex( { "date": 1, "meal": 1 }, {unique: true} );
  goals.createIndex( { "type": 1 }, {unique: true} );

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
    { "date" : req.body.date, "meal" : req.body.meal, "type" : "foods" } ,
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

  collection.find( { "date": req.params.date, "type": "foods" } )
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

app.get('/getGoals', (req,res) => {
  let db = req.app.locals.db;
  let collection = db.collection('nutritionGoals');

  collection.findOne( {"type" : "goals"})
    .then(result => res.json(result))
})

app.put('/updateServings', (req,res) => {
  let db = req.app.locals.db;
  let collection = db.collection('nutrition');
  let ndbno = `servings.${req.body.ndbno}`;

  console.log(req.body)
  collection.updateOne( {"date" : req.body.date, "meal": req.body.meal}, {$set: {[ndbno]: req.body.servings}})
})

app.put('/updateGoals', (req,res) => {
  let db = req.app.locals.db;
  let collection = db.collection('nutritionGoals');

  if(req.body.CalorieGoal !== undefined){
  collection.updateOne( {"type" : "goals" }, { $set: {"CalorieGoal" : req.body.CalorieGoal}})
    .catch(err => console.error(error))
  }else{
    collection.updateOne( {"type" : "goals" }, { $set : {
      "ProteinGoal" : req.body.ProteinGoal,
      "FatGoal" : req.body.FatGoal,
      "CarbsGoal": req.body.CarbsGoal
    }})
  }
})

app.delete('/deleteFood', (req,res) => {
  let db = req.app.locals.db;
  let collection = db.collection('nutrition');

  req.body.delete.forEach( item => {
    collection.bulkWrite([
      {updateOne: {
        "filter": {"date" : item.date, "meal" : item.meal },
        "update" : { $pull: { "FoodAdded": {"ndbno": item.ndbno} } } }
       },
      {updateOne: {
        "filter" : { "date" : item.date, "meal" : item.meal },
        "update" : { $unset: { ["servings." + item.ndbno] : item.servings} } }
      }
    ])
    .then(result => console.log(`Items modified: ${result.result.nModified}`))
    .catch(err => console.error(error))
  })
})
