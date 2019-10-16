const express = require('express');
const app = express();
const port = process.env.PORT || 9000;

const path = require('path');
const crypto = require('crypto');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const GridFs = require('gridfs-stream');
const request = require('request');
const cors = require('cors');

const Mongo = require('mongodb');
const MongoClient = Mongo.MongoClient;
const url = 'mongodb://localhost:27017/';
const dbName = 'a-better-u'; //name of the database to be used
const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
const ObjectID = Mongo.ObjectID;
app.locals.ObjectID = ObjectID;
let gfs;

const workoutRouter = require('./WorkoutRouter');

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
app.listen(port, function(){
  console.log(`Listening on port ${port}`);
});
app.use(cors());

app.use('/workout', workoutRouter);

// use request module to grab all data from FoodData Central API
app.get('/getFDC', (req, res) => {
  let uri = `https://api.nal.usda.gov/fdc/v1/search/?api_key=${key}`;
  let requestObject = {"generalSearchInput":"Cheddar cheese"};
  request.post({
    url: uri,
    body: requestObject,
    headers:{
      'Content-Type': 'application/json'
    },
    json: true
  }, function(error, response, body){
    res.json(body)
  })
});
/*

Nutrition Operations

*/

// inserts all recorded food items into the database
app.post('/createNutritionDocument', (req, res) => {
  let {db} = req.app.locals;
  let collection = db.collection('nutrition');

  collection.insertOne({
    date: req.body.date,
    Breakfast: [],
    Lunch: [],
    Dinner: [],
    Snacks: []
  })
  res.end()
})

app.post('/insertFood', (req,res) => {
  let {db} = req.app.locals;
  let collection = db.collection('nutrition');
  let {date, FoodAdded, meal} = req.body;

  collection.updateOne(
    { date},
    { $addToSet: { [meal]: { $each: FoodAdded } } }
  )
    .catch(err => console.error(`Failed to insert item: ${err}`))
  res.end()
})


// returns all food that have been consumed today
app.get('/getFood/:date', (req,res) => {
  let {db} = req.app.locals;
  let collection = db.collection('nutrition');

  collection.findOne(
    { date: req.params.date },
    { projection : { _id: 0, type: 0, date: 0 } }
  )
  .then(result => res.json(result))
  .catch(err => console.error(`Failed to find documents ${err}`))
})

app.put('/updateServings', (req, res) => {
  let {db} = req.app.locals;
  let collection = db.collection('nutrition');
  let {date, meal, ndbno, servings} = req.body;

  collection.updateOne(
    { date, [meal + ".ndbno"] : ndbno },
    { $set: { [meal + ".$.servings"] : servings } }
  )
   .catch(err => console.error(err))
  res.end()
})

// will probably delete this and put it into user and call it once!
app.get('/getGoals', (req,res) => {
  let {db} = req.app.locals;
  let collection = db.collection('nutritionGoals');

  collection.findOne(
    { "type" : "goals" },
    { "projection" : { "_id": 0, "type": 0} } )
    .then(result => res.json(result))
})

// updates the users' goals such as weight loss goals and macronutrient goals
app.put('/updateGoals', (req,res) => {
  let {db} = req.app.locals;
  let collection = db.collection('nutritionGoals');
  let {CalorieGoal, ProteinGoal, FatGoal, CarbsGoal} = req.body;

  //updates the bmr goals only
  if(CalorieGoal !== undefined){
  collection.updateOne(
    {"type" : "goals" },
    { $set: { CalorieGoal } }
  )
    .catch(err => console.error(error))
  } else{ //else updates the macronutrient goals
    collection.updateOne(
      {"type" : "goals" },
      { $set : { ProteinGoal, FatGoal, CarbsGoal } }
    )
      .catch(err => console.error(error))
  }
  res.end()
})

// deletes any food items from the database that the user deleted in the client
app.delete('/deleteFood', (req,res) => {
  let {db} = req.app.locals;
  let collection = db.collection('nutrition');

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

DEALING WITH FAVORITING STUFF!!!

*/

//get favorites!
app.get('/getFavorites', (req,res) => {
  let {db} = req.app.locals;
  let collection = db.collection('users');

  collection.findOne(
    { user : "1"},
    req.query
  )
    .then(result => res.json(result))
    .catch(err => console.error(err))
})

app.post('/insertFavorites', (req, res) => {
  let {db} = req.app.locals;
  let collection = db.collection('users');
  let {favItems, field, user} = req.body;

  collection.updateOne(
    { user },
    { $addToSet: { [field] : { $each: favItems } } },
    { upsert: true }
  )
    .catch(err => console.error(err))
  res.end();
})

app.put('/deleteFavorites', (req, res) => {
  let {db} = req.app.locals;
  let collection = db.collection('users');
  let {user, item, field} = req.body;

  collection.updateOne(
    { user },
    { $pull: { [field] : item } }
  )
    .catch(err => console.error(err))
  res.end();
})

/*

Story Media Uploads

*/
app.get('/getStories', (req,res) => {
  let {db} = req.app.locals;
  let collection = db.collection('stories');

  collection.find()
    .sort( { date: -1, _id: -1} )
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
  let {db, date} = req.app.locals;
  let collection = db.collection('stories');
  let text = req.body.text || "";
  let {contentType, id} = req.file;

  collection.insertOne({
    user: "1",
    text,
    "file_id" : id,
    "file_type" : contentType,
    date
  })
    .catch(err => console.error(err))
  res.end()
});

app.post('/uploadStoriesWithoutFile', (req, res) => {
  let {db, date} = req.app.locals;
  let collection = db.collection('stories');
  let {text} = req.body;

  collection.insertOne({
    user: "1",
    text,
    file_id: false,
    file_type: false,
    date
  })
    .catch(err => console.error(err))
  res.end()
})

app.put('/editStoriesWithFile', upload.single('file'), (req, res) => {
  let {db} = req.app.locals;
  let collection = db.collection('stories');
  let {_id, text, oldFile} = req.body;
  let {id, contentType} = req.file;

  collection.updateOne(
    { "_id" : ObjectID(_id) },
    {$set: { text, "file_id" : ObjectID(id), "file_type" : contentType} }
  )
    .catch(err => console.error(err))

  gfs.remove({_id: oldFile, root: 'storyMedia'}, (err, gridStore) => {
    if(err){
      return res.status(404).json({
        err: err
      });
    }
  })
  res.end()
});

app.put('/editStoriesWithoutFile', (req, res) => {
  let {db} = req.app.locals;
  let collection = db.collection('stories');
  let {_id, text} = req.body;

  collection.updateOne(
    { _id: ObjectID(_id) },
    { $set: { text } }
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
  let {db} = req.app.locals;
  let collection = db.collection('stories');
  let { story_id, file_id } = req.query;

  collection.deleteOne( { _id : ObjectID(story_id) } )
    .catch(err => console.error(err))

  if(file_id){
    gfs.remove({_id: ObjectID(file_id), root: 'storyMedia'}, (err, gridStore) => {
      if(err){
        return res.status(404).json({
          err: err
        });
      }
    })
  }
  res.end()
})
