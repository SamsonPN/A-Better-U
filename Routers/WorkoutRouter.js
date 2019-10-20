"use strict";
const workout = require('express').Router();

// used by addexerciseview to return list of Muscles and Exercise types
workout.get('/getExerciseTypes', (req,res) => {
  let {exerciseList} = req.app.locals;
  exerciseList.findOne( { "record" : "Exercise Types"} )
    .then(result => res.json(result))
})

// returns all exercises categorized by Muscle and Exercise tabs
workout.get('/getExerciseByCategory', (req,res) => {
  let {exerciseList} = req.app.locals;
  exerciseList.find( req.query )
    .sort( { "name": 1} )
    .toArray()
    .then(items => {res.json(items)})
    .catch( err => console.error(err))
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
    .catch( err => console.error(err))
})

// used by workoutcontext.js to fill the Routine tab
workout.get('/getRoutines', (req, res) => {
  let {routines} = req.app.locals;
  routines.find()
    .sort( { name : 1 } )
    .toArray()
    .then(items => res.json(items))
    .catch(err => console.error(err))
})

//used by workoutcontext.js to fill the Saved tab with workouts
workout.get('/getWorkouts', (req, res) => {
  let {workouts} = req.app.locals;
  workouts.find( req.query )
    .sort( { date : 1 } )
    .toArray()
    .then(result => res.json(result))
    .catch(err => console.error(err))
})

// used by the Date selector to grab the workout
workout.get('/getWorkoutById', (req, res) => {
  let {ObjectID, workouts } = req.app.locals;
  workouts.findOne(
   { _id: ObjectID(req.query._id) } )
    .then(result => res.json(result))
    .catch(err => console.error(err))
})

//used to update the exercise list for routines/workouts
workout.post('/updateExercises', (req,res) => {
  let { db, ObjectID } = req.app.locals;
  let {_id, exercises, name, collectionName} = req.body;
  let collection = db.collection(collectionName);
  collection.updateOne(
    { _id: ObjectID(_id) },
    {$set: { name, exercises } },
    {upsert: true}
  )
    .catch(err => console.error(err))
  res.end();
})

// saves the workouts to the workout collection
workout.post('/saveWorkout', (req, res) => {
  let {workouts} = req.app.locals;
  let {name, date, exercises} = req.body;
  workouts.updateOne(
    { name, date },
    { $set: { exercises } },
    { upsert: true }
  )
  res.end();
})

//deletes the current routine shown from either the routines or workout collections
workout.delete('/deleteCurrentRoutine/:collectionName/:id', (req, res) => {
  let { db, ObjectID } = req.app.locals;
  let {collectionName, id} = req.params;
  let collection = db.collection(collectionName);
  collection.deleteOne(
    { _id: ObjectID(req.params.id) }
  )
    .catch(err => console.error(err))
  res.end();
})

module.exports = workout;
