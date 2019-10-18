const user = require('express').Router();

// will probably delete this and put it into user and call it once!
user.get('/getGoals', (req,res) => {
  let {db} = req.app.locals;
  let collection = db.collection('users');
  collection.findOne(
    { user: '1' },
    { projection : { _id: 0, type: 0, user: 0, favExercises: 0, favFoods: 0} } )
    .then(result => res.json(result))
})

// updates the users' goals such as weight loss goals and macronutrient goals
user.put('/updateMacroGoals', (req,res) => {
  let {db} = req.app.locals;
  let collection = db.collection('users');

  collection.updateOne(
    { user: '1' },
    { $set: {macros: req.body} },
    {upsert : true}
  )
    .catch(err => console.error(error))
  res.end()
})

user.put('/updateCalorieGoal', (req,res) => {
  let {db} = req.app.locals;
  let collection = db.collection('users');
  let {Calories, ...userStats} = req.body;
  console.log({Calories, userStats})

  collection.updateOne(
    { user: '1' },
    { $set: {Calories, userStats } },
    {upsert : true}
  )
    .catch(err => console.error(error))
  res.end()
})

//get favorites!
user.get('/getFavorites', (req,res) => {
  let {db} = req.app.locals;
  let collection = db.collection('users');

  collection.findOne(
    { user : "1"},
    req.query
  )
    .then(result => res.json(result))
    .catch(err => console.error(err))
})

user.post('/insertFavorites', (req, res) => {
  let {db} = req.app.locals;
  let collection = db.collection('users');
  let {field, item, user} = req.body;

  collection.updateOne(
    { user },
    { $addToSet: { [field]: item } },
    { upsert: true }
  )
    .catch(err => console.error(err))
  res.end();
})

user.put('/deleteFavorites', (req, res) => {
  let {db} = req.app.locals;
  let collection = db.collection('users');
  let { field, item, user} = req.body;

  collection.updateOne(
    { user },
    { $pull: { [field] : item } }
  )
    .catch(err => console.error(err))
  res.end();
})


module.exports = user;
