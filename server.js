"use strict";
const express = require('express');
const app = express();
const port = process.env.PORT || 9000;
const formData = require('express-form-data');
const cors = require('cors');
const passport = require('passport');
const cookieSession = require('cookie-session');
const {keys, passportSetup} = require('./config/ExportConfig');
const Mongo = require('mongodb');
const MongoClient = Mongo.MongoClient;
const client = new MongoClient(keys.mongodb.dbURI, { useNewUrlParser: true, useUnifiedTopology: true });
const {authRouter, workoutRouter, nutritionRouter, userRouter, storyRouter} = require('./Routers/ExportRouters');

app.use(cookieSession({
  maxAge: 7 * 24 * 60 * 60 * 1000,
  keys: [keys.session.cookieKey]
}));

app.use(formData.parse());
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());
app.use(cors());

client.connect((err)=> {
  console.log('Successfully connected to the server')
  const db = client.db('a-better-u');
  app.locals.db = db;
  app.locals.exerciseList = db.collection('exerciseList');
  app.locals.nutrition = db.collection('nutrition');
  app.locals.routines = db.collection('routines');
  app.locals.stories = db.collection('stories');
  app.locals.users = db.collection('users');
  app.locals.workouts = db.collection('workouts');
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

//Middleware to get today's date
app.use((req, res, next) => {
  let options = {month: "2-digit", day: "2-digit", year: "numeric"};
  let date = new Date();
  let today = date.toLocaleDateString("en-US", options);
  app.locals.date = today;
  next()
});

const isAuthenticated = (req, res, next) => {
  if(req.user){
    next();
  }
  else{
    res.status(401).send({error: "Not authenticated!"});
  }
};

// Routers for the workout, nutrition, and story pages and user information
app.use('/auth', authRouter);
app.use('/workout', isAuthenticated, workoutRouter);
app.use('/nutrition', isAuthenticated, nutritionRouter);
app.use('/user', isAuthenticated, userRouter);
app.use('/story', isAuthenticated, storyRouter);
