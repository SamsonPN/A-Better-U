"use strict";
const workout = require('express').Router();
const ObjectID = require('mongodb').ObjectID;

// used by addexerciseview to return list of Muscles and Exercise types
workout.get('/getExerciseTypes', (req,res) => {
  let {exerciseList} = req.app.locals;
  exerciseList.findOne( { "record" : "Exercise Types"} )
    .then(result => res.json(result))
    .catch( err => {
      res.status(404).send({err})
    })
})

// returns all exercises categorized by Muscle and Exercise tabs
workout.get('/getExerciseByCategory', (req,res) => {
  let {exerciseList} = req.app.locals;
  exerciseList.find( req.query )
    .sort( { "name": 1} )
    .toArray()
    .then(items => {res.json(items)})
    .catch( err => {
      res.status(404).send({err})
    })
  })

//used by addexerciseview to return exercises via search bar
workout.get('/getExerciseBySearch/:search', (req, res) => {
  let {exerciseList} = req.app.locals;
  exerciseList.find(
    { name : { $regex: req.params.search, $options: "i" } }
  )
    .sort( { name: 1} )
    .toArray()
    .then(items => {res.json(items)})
    .catch( err => {
      res.status(404).send({err})
    })
 })

// used by workoutcontext.js to fill the Routine tab
workout.get('/getRoutines', (req, res) => {
  let {routines} = req.app.locals;
  routines.find(
    { user: req.session.passport.user }
  )
    .sort( { name : 1 } )
    .toArray()
    .then(items => res.json(items))
    .catch( err => {
      res.status(404).send({err})
    })
})

//used by workoutcontext.js to fill the Saved tab with workouts
workout.get('/getWorkouts', (req, res) => {
  let {workouts} = req.app.locals;
  let {user} = req.session.passport;
  workouts.find(
    { user },
    { projection: { _id: 0, name: 0, user: 0, exercises: 0 } }
  )
    .sort( { date : 1 } )
    .toArray()
    .then(result => res.json(result))
    .catch(err => {
      res.status(404).send({err})
    })
})

workout.get('/getWorkoutsByDate', (req, res) => {
  let {workouts} = req.app.locals;
  let query = {...req.query, user: req.session.passport.user};
  workouts.find( query )
    .sort( { date : 1 } )
    .toArray()
    .then(result => res.json(result))
    .catch(err => {
      res.status(404).send({err})
    })
})

// used by the Date selector to grab the workout
workout.get('/getWorkoutById', (req, res) => {
  let {workouts } = req.app.locals;
  workouts.findOne(
   { _id: ObjectID(req.query._id) } )
    .then(result => res.json(result))
    .catch(err => {
      res.status(404).send({err})
    })
})

//used to update the exercise list for routines/workouts
workout.post('/updateExercises', (req,res) => {
  let { db} = req.app.locals;
  let {_id, exercises, name, collectionName} = req.body;
  let collection = db.collection(collectionName);
  collection.updateOne(
    { _id: ObjectID(_id), user: req.session.passport.user },
    {$set: { name, exercises } },
    {upsert: true}
  )
  .then(result => {
    res.status(200).send(result.result)
  })
  .catch(err => {
    res.status(500).send({err})
  })
})

// saves the workouts to the workout collection
workout.put('/saveWorkout', (req, res) => {
  let {workouts} = req.app.locals;
  let {name, date, exercises, _id} = req.body;
  let {user} = req.session.passport;
  workouts.updateOne(
    { _id: ObjectID(_id)},
    {$set: {name, date, user, exercises } },
    {upsert: true}
  )
    .then(result => {
      res.status(200).send(result.result)
    })
    .catch(err => {
      res.status(500).send({err})
    })
})

//deletes the current routine shown from either the routines or workout collections
workout.delete('/deleteCurrentRoutine/:collectionName/:id', (req, res) => {
  let { db} = req.app.locals;
  let {collectionName, id} = req.params;
  let collection = db.collection(collectionName);
  collection.deleteOne(
    { _id: ObjectID(req.params.id) }
  )
    .then(() => {
      res.sendStatus(204)
    })
    .catch(err => {
      res.status(500).send({err})
    })
})

module.exports = workout;
