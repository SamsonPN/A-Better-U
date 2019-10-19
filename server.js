const express = require('express');
const app = express();
const port = process.env.PORT || 9000;
const cors = require('cors');
const GridFs = require('gridfs-stream');

const Mongo = require('mongodb');
const MongoClient = Mongo.MongoClient;
const url = 'mongodb://localhost:27017/';
const dbName = 'a-better-u';
const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
const ObjectID = Mongo.ObjectID;
app.locals.ObjectID = ObjectID;

const workoutRouter = require('./Routers/WorkoutRouter');
const nutritionRouter = require('./Routers/NutritionRouter');
const userRouter = require('./Routers/UserRouter');
const storyRouter = require('./Routers/StoryRouter');

client.connect((err)=> {
  console.log('Successfully connected to the server')
  const db = client.db(dbName);
  app.locals.db = db;

  let options = {month: "2-digit", day: "2-digit", year: "numeric"};
  let date = new Date();
  let today = date.toLocaleDateString("en-US", options);
  app.locals.date = today;

  let gfs;
  gfs = GridFs(db, Mongo);
  gfs.collection('storyMedia');
  app.locals.gfs = gfs;
})

app.use(express.json());
app.use(cors());
app.listen(port, function(){
  console.log(`Listening on port ${port}`);
});

// Routers for the workout, nutrition, and story pages and user information
app.use('/workout', workoutRouter);
app.use('/nutrition', nutritionRouter);
app.use('/user', userRouter);
app.use('/story', storyRouter);
