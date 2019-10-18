const express = require('express');
const app = express();
const port = process.env.PORT || 9000;

const path = require('path');
const crypto = require('crypto');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const GridFs = require('gridfs-stream');
const cors = require('cors');

const Mongo = require('mongodb');
const MongoClient = Mongo.MongoClient;
const url = 'mongodb://localhost:27017/';
const dbName = 'a-better-u';
const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
const ObjectID = Mongo.ObjectID;
app.locals.ObjectID = ObjectID;
let gfs;

const workoutRouter = require('./WorkoutRouter');
const nutritionRouter = require('./NutritionRouter');
const userRouter = require('./UserRouter');

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
app.use(cors());
app.listen(port, function(){
  console.log(`Listening on port ${port}`);
});

// Routers for the workout, nutrition, and story pages and user information
app.use('/workout', workoutRouter);
app.use('/nutrition', nutritionRouter);
app.use('/user', userRouter);

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
