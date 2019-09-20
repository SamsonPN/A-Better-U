const express = require('express');
const app = express();
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
  app.locals.date = today;


  //initiates collection with documents for each meal for each day
  collection.insertMany( [
  {"date": today, "type" : "foods", "meal": "Breakfast", "FoodAdded":[] },
  {"date": today, "type" : "foods", "meal": "Lunch", "FoodAdded":[] },
  {"date": today, "type" : "foods", "meal": "Dinner", "FoodAdded":[] },
  {"date": today, "type" : "foods", "meal": "Snacks", "FoodAdded":[] },
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

app.listen(port, function(){
  console.log(`Listening on port ${port}`);
});

/*

Nutrition Operations

*/

// inserts all recorded food items into the database
app.post('/insertFood', (req,res) => {
  let db = req.app.locals.db;
  let collection = db.collection('nutrition');

  collection.updateOne(
    { "date" : req.body.date, "meal" : req.body.meal, "type" : "foods" } ,
    { $addToSet: {"FoodAdded": { $each: req.body.FoodAdded } } } )
    .catch(err => console.error(`Failed to insert item: ${err}`))
  res.end()
})


// returns all food that have been consumed today
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

app.put('/updateServings', (req, res) => {
  let db = req.app.locals.db;
  let collection = db.collection('nutrition');

  collection.updateOne(
    {"date" : app.locals.date, "meal": req.body.meal, "FoodAdded.ndbno" : req.body.ndbno},
    {$set: {"FoodAdded.$.servings" : req.body.servings}}
  )
   .catch(err => console.error(err))
  res.end()
})

// returns the user's calorie/macronutrient goals as JSON
app.get('/getGoals', (req,res) => {
  let db = req.app.locals.db;
  let collection = db.collection('nutritionGoals');

  collection.findOne( {"type" : "goals"})
    .then(result => res.json(result))
})

// updates the users' goals such as weight loss goals and macronutrient goals
app.put('/updateGoals', (req,res) => {
  let db = req.app.locals.db;
  let collection = db.collection('nutritionGoals');

  //updates the bmr goals only
  if(req.body.CalorieGoal !== undefined){
  collection.updateOne( {"type" : "goals" }, { $set: {"CalorieGoal" : req.body.CalorieGoal}})
    .catch(err => console.error(error))
  }else{ //else updates the macronutrient goals
    collection.updateOne( {"type" : "goals" }, { $set : {
      "ProteinGoal" : req.body.ProteinGoal,
      "FatGoal" : req.body.FatGoal,
      "CarbsGoal": req.body.CarbsGoal
    }})
  }
  res.end()
})

// stores the user's food entry values today like amount of calories, protein, fat, carbs, consumed
app.put('/storeFoodEntry', (req, res) => {
  let db = req.app.locals.db;
  let collection = db.collection('nutrition');

  collection.updateOne( { "date": req.body.date, "type": "totals"}, { $set: {
      "calories": req.body.calories,
      "protein": req.body.protein,
      "fat": req.body.fat,
      "carbs": req.body.carbs
    }
  })
    .catch(err => console.error(err))
  res.end()
})

// deletes any food items from the database that the user deleted in the client
app.delete('/deleteFood', (req,res) => {
  let db = req.app.locals.db;
  let collection = db.collection('nutrition');

  req.body.delete.forEach(item =>
    collection.updateOne(
        {"date" : item.date, "meal" : item.meal },
        { $pull: { "FoodAdded": {"ndbno": item.ndbno} } }
      )
    .then(result => console.log(`Items modified: ${result.result.nModified}`))
    .catch(err => console.error(error))
  )
  res.end()
})
/*

Workout Operations

*/

app.get('/getExerciseTypes', (req,res) => {
  let db = req.app.locals.db;
  let collection = db.collection('exerciseList');

  collection.findOne( { "record" : "Exercise Types"} )
    .then(result => res.json(result))
})

app.get('/getExerciseByCategory/:muscle/:type', (req,res) => {
  let db = req.app.locals.db;
  let collection = db.collection('exerciseList');

  if (req.params.muscle !== "Muscles" && req.params.type !== "Exercise Type"){
  collection.find( { "muscle" : req.params.muscle, "type": req.params.type} )
    .sort( { "name": 1} )
    .toArray()
    .then(items => {res.json(items)})
    .catch( err => console.error(err))
  }
  else if (req. params.muscle === "Muscles") {
    collection.find( { "type": req.params.type} )
      .sort( { "name": 1} )
      .toArray()
      .then(items => {res.json(items)})
      .catch( err => console.error(err))
    }
  else {
    collection.find( { "muscle" : req.params.muscle} )
      .sort( { "name": 1} )
      .toArray()
      .then(items => {res.json(items)})
      .catch( err => console.error(err))
    }
})

app.get('/getExerciseBySearch/:search', (req, res) => {
  let db = req.app.locals.db;
  let collection = db.collection('exerciseList');

  collection.find( { "name" : {$regex: req.params.search, $options: "i" }})
    .sort( { "name": 1} )
    .toArray()
    .then(items => {res.json(items)})
    .catch( err => console.error(err))
})

app.get('/getRoutineExercises/:name', (req,res) => {
  let db = req.app.locals.db;
  let collection = db.collection('routines');

  collection.findOne( { "name": req.params.name } )
    .then(result => res.json(result))
})

app.get('/getRoutines', (req, res) => {
  let db = req.app.locals.db;
  let collection = db.collection('routines');

  collection.find()
    .sort( { "name" : 1 } )
    .toArray()
    .then(items => res.json(items))
    .catch(err => console.error(err))
})

app.get('/getWorkouts', (req, res) => {
  let db = req.app.locals.db;
  let collection = db.collection('workouts');

  collection.find()
    .sort( { "date" : 1 } )
    .toArray()
    .then(result => res.json(result))
    .catch(err => console.error(err))
})

//inserts exercises into the routine collection
app.post('/insertRoutineExercises', (req,res) => {
  let db = req.app.locals.db;
  let collection = db.collection('routines');

  collection.updateOne(
   { "name" : req.body.name } ,
   { $addToSet: {"exercises": { $each: req.body.exercises } } },
   {upsert: true}
   )
    .catch(err => console.error(`Failed to insert item: ${err}`))
  res.end();
})

app.post('/saveWorkout', (req, res) => {
  let db = req.app.locals.db;
  let collection = db.collection('workouts');

  collection.updateOne(
    {"name" : req.body.name, "date" : req.body.date},
    {$set: {"exercises": req.body.exercises}},
    {upsert: true}
  )
  res.end();
})

app.put('/updateRoutine', (req,res) => {
  let db = req.app.locals.db;
  let collection = db.collection('routines');

  collection.updateOne(
    { "name": req.body.oldName },
    {$set: { "name" : req.body.newName, "exercises": req.body.exercises } }
  )
    .catch(err => console.error(err))
  res.end();
})

app.put('/removeRoutineExercise', (req,res) => {
  let db = req.app.locals.db;
  let collection = db.collection('routines');

  collection.updateOne(
    { "name" : req.body.name},
    {$pull: {"exercises" : {"name" : req.body.exercise, "type" : req.body.type}}}
  )
    .catch(err => console.error(err))
  res.end();
})

app.delete('/deleteRoutine/:name', (req,res) => {
  let db = req.app.locals.db;
  let collection = db.collection('routines');
  collection.deleteOne( { "name": req.params.name } )
    .catch(err => console.error(err))
  res.end();
})

app.delete('/deleteWorkout/:name/:date', (req,res) => {
  let db = req.app.locals.db;
  let collection = db.collection('workouts');

  collection.deleteOne( { "name": req.params.name, "date" : req.params.date } )
    .catch(err => console.error(err))
  res.end();
})
