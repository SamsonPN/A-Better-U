"use strict";
const express = require('express');
const app = express();
const port = process.env.PORT || 9000;
const cors = require('cors');
const GridFs = require('gridfs-stream');
const passport = require('passport');
const cookieSession = require('cookie-session');
const keys = require('./config/keys');
const passportSetup = require('./config/passport-setup');
const Mongo = require('mongodb');
const MongoClient = Mongo.MongoClient;
const url = 'mongodb://localhost:27017/';
const dbName = 'a-better-u';
const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
const authRouter = require('./Routers/AuthRouter');
const workoutRouter = require('./Routers/WorkoutRouter');
const nutritionRouter = require('./Routers/NutritionRouter');
const userRouter = require('./Routers/UserRouter');
const storyRouter = require('./Routers/StoryRouter');

app.use(cookieSession({
  maxAge: 24 * 60 * 60 * 1000,
  keys: [keys.session.cookieKey]
}));

app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());
app.use(cors());

client.connect((err)=> {
  console.log('Successfully connected to the server')
  const db = client.db(dbName);
  let gfs;
  gfs = GridFs(db, Mongo);
  gfs.collection('storyMedia');
  app.locals.gfs = gfs;
  app.locals.db = db;
  app.locals.ObjectID = Mongo.ObjectID;
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

// isAuthenticated use this for later!
// app.use((req, res, next) => {
//   if(req.session.passport.user){
//     next()
//   }
//   else{
//     res.redirect('http://localhost:3000/');
//   }
// })

//Middleware to get today's date
app.use((req, res, next) => {
  let options = {month: "2-digit", day: "2-digit", year: "numeric"};
  let date = new Date();
  let today = date.toLocaleDateString("en-US", options);
  app.locals.date = today;
  next()
});

// Routers for the workout, nutrition, and story pages and user information
app.use('/auth', authRouter);
app.use('/workout', workoutRouter);
app.use('/nutrition', nutritionRouter);
app.use('/user', userRouter);
app.use('/story', storyRouter);

module.exports.db = app.locals.db;
