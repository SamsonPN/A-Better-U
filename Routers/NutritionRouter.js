"use strict";
// const {FDC_Key} = require('../src/API/API_Key');
const nutrition = require('express').Router();
// const request = require('request');

// grabs all food from the FoodData Central API
// nutrition.get('/searchFDC/:search', (req, res) => {
//   let uri = `https://api.nal.usda.gov/fdc/v1/search/?api_key=${FDC_Key}`;
//   let requestObject = {"generalSearchInput": req.params.search};
//   request.post({
//     url: uri,
//     body: requestObject,
//     headers:{
//       'Content-Type': 'application/json'
//     },
//     json: true
//   }, (error, response, body) => {
//     res.json(body)
//   })
// });

//grabs food details from FoodData Central API
// nutrition.get('/detailsFDC/:id', (req, res) => {
//   let uri = `https://api.nal.usda.gov/fdc/v1/${req.params.id}/?api_key=${FDC_Key}`;
//   request.get({
//     url: uri,
//     headers:{
//       'Content-Type': 'application/json'
//     },
//   }, (error, response, body) => {
//     res.json(body)
//   })
// });

// returns all food that have been consumed today
nutrition.get('/getFood/:date', (req,res) => {
  let {nutrition} = req.app.locals;
  let {date} = req.params;
  let {user} = req.user;
  nutrition.findOne(
    { date, user },
    { projection : { _id: 0, type: 0, date: 0, user: 0 } }
  )
  .then(result => {res.json(result)})
  .catch( err => {
    res.status(404).send({err})
  })
})

nutrition.get('/getRecents', (req, res) => {
  let {nutrition} = req.app.locals;
  let {user} = req.user;
  nutrition.find(
    { user,
      $or:
        [
          {'Breakfast.0' : { $exists: true } },
          {'Lunch.0' : { $exists: true } },
          {'Dinner.0' : { $exists: true } },
          {'Snacks.0' : { $exists: true } },
        ]
    },
    { projection: {_id: 0, date: 0, user: 0 } }
  )
    .sort({ _id: -1})
    .limit(1)
    .toArray()
    .then(result => res.json(result))
    .catch( err => {
      res.status(404).send({err})
    })
})

// inserts all recorded food items into the database
nutrition.post('/createNutritionDocument', (req, res) => {
  let {nutrition} = req.app.locals;
  let {date} = req.body;
  let {user} = req.user;
  nutrition.insertOne({
    user,
    date,
    Breakfast: [],
    Lunch: [],
    Dinner: [],
    Snacks: []
  })
  .then(result => {
    res.status(201).send(result.result)
  })
  .catch( err => {
    res.status(500).send({err})
  })
  res.end()
})

nutrition.post('/insertFood', (req,res) => {
  let {nutrition} = req.app.locals;
  let {date, FoodAdded, meal} = req.body;
  let {user} = req.user;
  nutrition.updateOne(
    { date, user },
    { $addToSet: { [meal]: { $each: FoodAdded } } }
  )
    .then(result => {
      res.status(201).send(result.result)
    })
    .catch(err => {
      res.status(500).send({ err })
    })
})

nutrition.post('/updateServings', (req, res) => {
  let {nutrition} = req.app.locals;
  let {date, meal, ndbno, servings} = req.body;
  let {user} = req.user;
  nutrition.updateOne(
    { date, [meal + ".ndbno"] : ndbno, user },
    { $set: { [meal + ".$.servings"] : servings } }
  )
    .then(result => {
      res.status(201).send(result.result)
    })
    .catch( err => {
      res.status(500).send({err})
    })
})

// deletes any food items from the database that the user deleted in the client
nutrition.delete('/deleteFood', (req,res) => {
  let {nutrition} = req.app.locals;
  let { date, meal, ndbno } = req.body;
  let {user} = req.user;
  nutrition.updateOne(
    { date, user },
    { $pull: { [meal] : { ndbno } } }
  )
    .then(result => {
      res.status(201).send(result.result)
    })
    .catch( err => {
      res.status(500).send({err})
    })
})

module.exports = nutrition;
