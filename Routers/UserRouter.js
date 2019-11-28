"use strict";
const user = require('express').Router();
const ObjectID = require('mongodb').ObjectID;

user.get('/getGoals', (req,res) => {
  let {users} = req.app.locals;
  users.findOne(
    { _id: ObjectID(req.user._id) },
    { projection : { _id: 0, type: 0, user: 0, favExercises: 0, favFoods: 0} } )
    .then(result => {
      res.json(result)
    })
    .catch(err => {
      res.status(500).send({err})
    })
})

//get favorites!
user.get('/getFavorites', (req,res) => {
  let {users} = req.app.locals;
  users.findOne(
    { _id: ObjectID(req.user._id) },
    req.query
  )
    .then(result => res.json(result))
    .catch(err => {
      res.status(500).send({err})
    })
})

user.get('/getUserInfo', (req, res) => {
  let {users} = req.app.locals;
  let {user} = req;
  users.findOne(
    { _id: ObjectID(user._id)}
  )
   .then(user => res.json(user))
   .catch(err => {
     res.status(500).send({err})
   })
})

// updates the users' goals such as weight loss goals and macronutrient goals
user.post('/updateMacroGoals', (req,res) => {
  let {users} = req.app.locals;
  users.updateOne(
    { _id: ObjectID(req.user._id) },
    { $set: {macros: req.body} },
    {upsert : true}
  )
  .then(result => {
    res.status(200).send(result.result)
  })
  .catch(err => {
    res.status(500).send({err})
  })
})

user.post('/updateUserStats', (req,res) => {
  let {users} = req.app.locals;
  let {Calories, ...userStats} = req.body;
  users.updateOne(
    { _id: ObjectID(req.user._id) },
    { $set: {Calories, userStats } },
    {upsert : true}
  )
    .then(result => {
      res.status(200).send(result.result)
    })
    .catch(err => {
      res.status(500).send({err})
    })
})

user.post('/insertFavorites', (req, res) => {
  let {users} = req.app.locals;
  let {field, item} = req.body;
  users.updateOne(
    { _id: ObjectID(req.user._id) },
    { $addToSet: { [field]: item } },
    { upsert: true }
  )
  .then(result => {
    res.status(201).send(result.result)
  })
  .catch(err => {
    res.status(500).send({err})
  })
})

user.post('/deleteFavorites', (req, res) => {
  let {users} = req.app.locals;
  let { field, item} = req.body;
  users.updateOne(
    { _id: ObjectID(req.user._id) },
    { $pull: { [field] : item } }
  )
  .then(() => {
    res.status(200).send(result.result)
  })
  .catch(err => {
    res.status(500).send({err})
  })
  res.end();
})


module.exports = user;
