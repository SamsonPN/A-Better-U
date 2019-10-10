const express = require('express');
const app = express();
const port = 9000;
const path = require('path');
const crypto = require('crypto');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const GridFs = require('gridfs-stream');

const Mongo = require('mongodb');
const MongoClient = Mongo.MongoClient;
const url = 'mongodb://localhost:27017/';
const dbName = 'a-better-u'; //name of the database to be used
const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
const ObjectID = Mongo.ObjectID;
let gfs;

client.connect((err)=> {
  console.log('Successfully connected to the server')
  const db = client.db(dbName);
  app.locals.db = db;

  let options = {month: "2-digit", day: "2-digit", year: "numeric"};
  let date = new Date();
  let today = date.toLocaleDateString("en-US", options);
  app.locals.date = today;

  gfs = GridFs(db, Mongo);
  gfs.collection('storyMedia');
})


app.use(express.json());
app.use('/', express.static(path.join(__dirname, 'build')));
app.listen(port, function(){
  console.log(`Listening on port ${port}`);
});

/*

Nutrition Operations

*/

// inserts all recorded food items into the database
app.post('/createNutritionDocument', (req, res) => {
  let today = req.app.locals.date;
  let db = req.app.locals.db;
  let collection = db.collection('nutrition');

  collection.insertOne({
    date : req.body.date,
    Breakfast: [],
    Lunch: [],
    Dinner: [],
    Snacks: []
  })
  res.end()
})

app.post('/insertFood', (req,res) => {
  let db = req.app.locals.db;
  let collection = db.collection('nutrition');

  collection.updateOne(
    { date : req.body.date},
    { $addToSet: { [req.body.meal]: { $each: req.body.FoodAdded } } }
  )
    .catch(err => console.error(`Failed to insert item: ${err}`))
  res.end()
})


// returns all food that have been consumed today
app.get('/getFood/:date', (req,res) => {
  let db = req.app.locals.db;
  let collection = db.collection('nutrition');

  collection.findOne(
    { date: req.params.date },
    { projection : { _id: 0, type: 0, date: 0 } }
  )
  .then(result => res.json(result))
  .catch(err => console.error(`Failed to find documents ${err}`))
})

app.put('/updateServings', (req, res) => {
  let db = req.app.locals.db;
  let collection = db.collection('nutrition');
  //req.body.meal
  //req.body.ndbno
  //req.body.servings

  collection.updateOne(
    { date : req.body.date, [req.body.meal + ".ndbno"] : req.body.ndbno },
    { $set: { [req.body.meal + ".$.servings"] : req.body.servings } }
  )
   .catch(err => console.error(err))
  res.end()
})

// will probably delete this and put it into user and call it once!
app.get('/getGoals', (req,res) => {
  let db = req.app.locals.db;
  let collection = db.collection('nutritionGoals');

  collection.findOne(
    { "type" : "goals" },
    { "projection" : { "_id": 0, "type": 0} } )
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

// deletes any food items from the database that the user deleted in the client
app.delete('/deleteFood', (req,res) => {
  let db = req.app.locals.db;
  let collection = db.collection('nutrition');
  //item.meal
  //item.ndbno
  req.body.delete.forEach(item =>
    collection.updateOne(
        { "date" : item.date },
        { $pull: { [item.meal]: {"ndbno": item.ndbno} } }
      )
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

app.get('/getExerciseByCategory', (req,res) => {
  let db = req.app.locals.db;
  let collection = db.collection('exerciseList');

  collection.find( req.query )
    .sort( { "name": 1} )
    .toArray()
    .then(items => {res.json(items)})
    .catch( err => console.error(err))
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

  collection.find(req.query)
    .sort( { "date" : 1 } )
    .toArray()
    .then(result => res.json(result))
    .catch(err => console.error(err))
})

//inserts exercises into the routine collection (doesn't need a date)
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

//updates the routine in the routineView page
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

//removes the exercises in the RoutineView page
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

//deletes the entire routine from routine tab
app.delete('/deleteRoutine/:name', (req,res) => {
  let db = req.app.locals.db;
  let collection = db.collection('routines');
  collection.deleteOne( { "name": req.params.name } )
    .catch(err => console.error(err))
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

app.post('/insertWorkoutExercises', (req,res) => {
  let db = req.app.locals.db;
  let collection = db.collection('workouts');

  collection.updateOne(
   { "name" : req.body.name, "date": req.body.date } ,
   { $addToSet: {"exercises": { $each: req.body.exercises } } }
   )
    .catch(err => console.error(`Failed to insert item: ${err}`))
  res.end();
})

app.put('/updateWorkouts', (req,res) => {
  let db = req.app.locals.db;
  let collection = db.collection('workouts');

  collection.updateOne(
    { "name": req.body.oldName, "date" : req.body.date },
    {$set: { "name" : req.body.newName, "exercises": req.body.exercises } }
  )
    .catch(err => console.error(err))
  res.end();
})

app.put('/removeWorkoutExercise', (req,res) => {
  let db = req.app.locals.db;
  let collection = db.collection('workouts');

  collection.updateOne(
    { "name" : req.body.name, "date" : req.body.date},
    {$pull: {"exercises" : {"name" : req.body.exercise, "type" : req.body.type}}}
  )
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

/*

DEALING WITH FAVORITING STUFF!!!

*/

//get favorites!
app.get('/getFavorites', (req,res) => {
  let db = req.app.locals.db;
  let collection = db.collection('users');

  collection.findOne(
    { "user" : "1"},
    req.query
  )
    .then(result => res.json(result))
    .catch(err => console.error(err))
})

// insert Favorites
app.post('/insertFavoriteExercises', (req,res) => {
  let db = req.app.locals.db;
  let collection = db.collection('users');

  collection.updateOne(
    { "user" : req.body.user },
    { $addToSet: {"favExercises" : { $each: req.body.favExercises } } },
    { upsert: true }
  )
    .catch(err => console.error(err))
  res.end();
})

app.post('/insertFavoriteFoods', (req,res) => {
  let db = req.app.locals.db;
  let collection = db.collection('users');
  console.log(req.body)

  collection.updateOne(
    { "user" : req.body.user },
    { $addToSet: {"favFoods" : { $each: req.body.favFoods } } },
    { upsert: true }
  )
    .catch(err => console.error(err))
  res.end();
})

app.put('/deleteFavoriteExercises', (req,res) => {
  let db = req.app.locals.db;
  let collection = db.collection('users');

  collection.updateOne(
    { "user" : req.body.user },
    { $pull: { "favExercises" : { "name" : req.body.name, "type" : req.body.type } } }
  )
    .catch(err => console.error(err))
  res.end();
})

app.put('/deleteFavoriteFoods', (req,res) => {
  let db = req.app.locals.db;
  let collection = db.collection('users');

  collection.updateOne(
    { "user" : req.body.user },
    { $pull: { "favFoods" : { "name" : req.body.name, "ndbno" : req.body.ndbno } } }
  )
    .catch(err => console.error(err))
  res.end();
})


/*

Story Media Uploads

*/
app.get('/getStories', (req,res) => {
  let db = app.locals.db;
  let collection = db.collection('stories');

  collection.find()
    .sort( { "date": -1, "_id" : -1} )
    .toArray()
    .then(items => { res.json(items) } )
    .catch( err => console.error(err))
})



const storage = new GridFsStorage({
  url: url + dbName,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString('hex') + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: 'storyMedia' //should match the collection name that you gave it!!!
        };
        resolve(fileInfo);
      });
    });
  }
});

const upload = multer({ storage });

// @route GET /
// @desc: Loads form
app.get('/', (req, res) => {
  gfs.files.find().toArray((err, files) => {
    // Check if files
    if(!files || files.length === 0){
      //if there are no files
      res.render('index', {files: false});
    }
    else {
      files.map(file => {
        if(file.contentType === 'image/jpeg' || file.contentType === 'image/svg+xml' || file.contentType === 'video/quicktime'){
          file.isImage = true;
        }
        else {
          file.isImage = false;
        }
      });
      res.render('index', {files: files});
    }
  });
});

// @route GET /files
// @desc Display all files in JSON
// gonna use GridFsStream for this
// returns an array of files
app.get('/files', (req, res) => {
  gfs.files.find().toArray((err, files) => {
    // Check if files
    if(!files || files.length === 0){
      return res.status(404).json({
        err: 'No files exist'
      });
    }

    // Files exist
    return res.json(files);
  });
});

// @route POST /upload
// @desc Uploads file to DB
app.post('/uploadStoriesWithFile', upload.single('file'), (req, res) => {
  let db = app.locals.db;
  let collection = db.collection('stories');
  let text = req.body.text || "";
  let today = app.locals.date;

  collection.insertOne({
    "user" : "1",
    "text" : text,
    "file_id" : req.file.id,
    "file_type" : req.file.contentType,
    "date" : today
  })
    .catch(err => console.error(err))
  res.end()
});

app.post('/uploadStoriesWithoutFile', (req, res) => {
  let db = app.locals.db;
  let collection = db.collection('stories');
  let today = app.locals.date;

  collection.insertOne({
    "user" : "1", "text" : req.body.text, "file_id" : false, "file_type" : false, "date" : today
  })
    .catch(err => console.error(err))
  res.end()
})

app.put('/editStoriesWithFile', upload.single('file'), (req, res) => {
  let db = app.locals.db;
  let collection = db.collection('stories');

  collection.updateOne(
    { "_id" : ObjectID(req.body._id) },
    {$set: {"text" : req.body.text, "file_id" : ObjectID(req.file.id), "file_type" : req.file.contentType} }
  )
    .catch(err => console.error(err))

  gfs.remove({_id: req.body.oldFile, root: 'storyMedia'}, (err, gridStore) => {
    if(err){
      return res.status(404).json({
        err: err
      });
    }
  })
  res.end()
});

app.put('/editStoriesWithoutFile', (req, res) => {
  let db = app.locals.db;
  let collection = db.collection('stories');

  collection.updateOne(
    {"_id" : ObjectID(req.body._id)},
    {$set: {"text" : req.body.text}}
  )
    .catch(err => console.error(err))
  res.end()
})

//MIGHT NOT NEED THIS!!!
// @route GET /files/:filename
// @desc Display single file object
// gonna use GridFsStream for this
// returns an array of files
app.get('/files/:id', (req, res) => {
  //gets filename from the url
  //gfs.files.findOne({filename: req.params.filename}, (err, file) => {
  gfs.files.findOne({_id: ObjectID(req.params.id)}, (err, file) => {
    if(!file || file.length === 0){
      return res.status(404).json({
        err: 'No file exists'
      });
    }

    //File exists
    return res.json(file);
  });
});

//need to use readStream to show the files
//@route GET /image/:filename
// @desc Display image
app.get('/media/:id', (req, res) => {
  //gets filename from the url
  gfs.files.findOne({_id: ObjectID(req.params.id)}, (err, file) => {
    if(!file || file.length === 0){
      return res.status(404).json({
        err: 'No file exists'
      });
    }
    const readstream = gfs.createReadStream(file.filename);
    readstream.pipe(res);
  });
});

//@route DELETE /files/:id
// @desc Delete file
app.delete('/files/:id', (req,res) => {
  //root refers to the collections
  // SHOULD ALSO MATCH THE COLLECTION NAME!!!!
  gfs.remove({_id: req.params.id, root: 'storyMedia'}, (err, gridStore) => {
    if(err){
      return res.status(404).json({
        err: err
      });
    }
  })
});

app.delete('/deleteStory', (req, res) => {
  let db = app.locals.db;
  let collection = db.collection('stories');

  collection.deleteOne( { "_id" : ObjectID(req.query.story_id) } )
    .catch(err => console.error(err))

  if(req.query.file_id){
    gfs.remove({_id: ObjectID(req.query.file_id), root: 'storyMedia'}, (err, gridStore) => {
      if(err){
        return res.status(404).json({
          err: err
        });
      }
    })
  }
  res.end()
})
