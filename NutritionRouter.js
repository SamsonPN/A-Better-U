const {FDC_Key} = require('./src/API/API_Key');
const nutrition = require('express').Router();
const request = require('request');

// grabs all food from the FoodData Central API
nutrition.get('/searchFDC/:search', (req, res) => {
  let uri = `https://api.nal.usda.gov/fdc/v1/search/?api_key=${FDC_Key}`;
  let requestObject = {"generalSearchInput": req.params.search};
  request.post({
    url: uri,
    body: requestObject,
    headers:{
      'Content-Type': 'application/json'
    },
    json: true
  }, function(error, response, body){
    res.json(body)
  })
});

//grabs food details from FoodData Central API
nutrition.get('/detailsFDC/:id', (req, res) => {
  let uri = `https://api.nal.usda.gov/fdc/v1/${req.params.id}/?api_key=${FDC_Key}`;
  request.get({
    url: uri,
    headers:{
      'Content-Type': 'application/json'
    },
  }, function(error, response, body){
    res.json(body)
  })
});

// returns all food that have been consumed today
nutrition.get('/getFood/:date', (req,res) => {
  let {db} = req.app.locals;
  let collection = db.collection('nutrition');
  let {date} = req.params;

  collection.findOne(
    { date },
    { projection : { _id: 0, type: 0, date: 0 } }
  )
  .then(result => res.json(result))
  .catch(err => console.error(`Failed to find documents ${err}`))
})

// inserts all recorded food items into the database
nutrition.post('/createNutritionDocument', (req, res) => {
  let {db} = req.app.locals;
  let collection = db.collection('nutrition');
  let {date} = req.body;

  collection.insertOne({
    date: req.body.date,
    Breakfast: [],
    Lunch: [],
    Dinner: [],
    Snacks: []
  })
  res.end()
})

nutrition.post('/insertFood', (req,res) => {
  let {db} = req.app.locals;
  let collection = db.collection('nutrition');
  let {date, FoodAdded, meal} = req.body;

  collection.updateOne(
    { date},
    { $addToSet: { [meal]: { $each: FoodAdded } } }
  )
    .catch(err => console.error(`Failed to insert item: ${err}`))
  res.end()
})

nutrition.put('/updateServings', (req, res) => {
  let {db} = req.app.locals;
  let collection = db.collection('nutrition');
  let {date, meal, ndbno, servings} = req.body;

  collection.updateOne(
    { date, [meal + ".ndbno"] : ndbno },
    { $set: { [meal + ".$.servings"] : servings } }
  )
   .catch(err => console.error(err))
  res.end()
})

// deletes any food items from the database that the user deleted in the client
nutrition.delete('/deleteFood', (req,res) => {
  let {db} = req.app.locals;
  let collection = db.collection('nutrition');
  let { date, meal, ndbno } = req.body;

  collection.updateOne(
    { date },
    { $pull: { [meal] : { ndbno } } }
  )
    .catch(err => console.error(err))

  res.end()
})

module.exports = nutrition;
