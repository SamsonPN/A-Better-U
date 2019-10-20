"use strict";
const user = require('express').Router();

// will probably delete this and put it into user and call it once!
user.get('/getGoals', (req,res) => {
  let {users} = req.app.locals;
  users.findOne(
    { user: '1' },
    { projection : { _id: 0, type: 0, user: 0, favExercises: 0, favFoods: 0} } )
    .then(result => res.json(result))
})

//get favorites!
user.get('/getFavorites', (req,res) => {
  let {users} = req.app.locals;
  users.findOne(
    { user : "1"},
    req.query
  )
    .then(result => res.json(result))
    .catch(err => console.error(err))
})

// updates the users' goals such as weight loss goals and macronutrient goals
user.post('/updateMacroGoals', (req,res) => {
  let {users} = req.app.locals;
  users.updateOne(
    { user: '1' },
    { $set: {macros: req.body} },
    {upsert : true}
  )
    .catch(err => console.error(error))
  res.end()
})

user.post('/updateUserStats', (req,res) => {
  let {users} = req.app.locals;
  let {Calories, ...userStats} = req.body;

  users.updateOne(
    { user: '1' },
    { $set: {Calories, userStats } },
    {upsert : true}
  )
    .catch(err => console.error(error))
  res.end()
})

user.post('/insertFavorites', (req, res) => {
  let {users} = req.app.locals;
  let {field, item, user} = req.body;

  users.updateOne(
    { user },
    { $addToSet: { [field]: item } },
    { upsert: true }
  )
    .catch(err => console.error(err))
  res.end();
})

user.post('/deleteFavorites', (req, res) => {
  let {users} = req.app.locals;
  let { field, item, user} = req.body;

  users.updateOne(
    { user },
    { $pull: { [field] : item } }
  )
    .catch(err => console.error(err))
  res.end();
})


module.exports = user;
