const path = require('path');
const crypto = require('crypto');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');

const story = require('express').Router();

const storage = new GridFsStorage({
  url: 'mongodb://localhost:27017/a-better-u',
  file: (req, file) => {
    console.log('im in')
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

story.get('/getStories', (req,res) => {
  let {db} = req.app.locals;
  let collection = db.collection('stories');

  collection.find()
    .sort( { date: -1, _id: -1} )
    .toArray()
    .then(items => { res.json(items) } )
    .catch( err => console.error(err))
})

// @route GET /files
// @desc Display all files in JSON
// gonna use GridFsStream for this
// returns an array of files
story.get('/files', (req, res) => {
  let {gfs} = req.app.locals;
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
story.post('/uploadStories', upload.single('file'), (req, res) => {
  let {db, date} = req.app.locals;
  let collection = db.collection('stories');
  let text = req.body.text || "";
  let file_id = req.file ? req.file.id : false;
  let file_type = req.file ? req.file.contentType : false;

  collection.insertOne({
    user: "1",
    text,
    file_id,
    file_type,
    date
  })
    .catch(err => console.error(err))
  res.end()
});

story.put('/editStories', upload.single('file'), (req, res) => {
  let {db, gfs, ObjectID} = req.app.locals;
  let collection = db.collection('stories');
  let {_id, oldFile} = req.body;
  let text = req.body.text || "";
  let file_id = req.file ? ObjectID(req.file.id) : false;
  let file_type = req.file ? req.file.contentType : false;

  collection.updateOne(
    { _id : ObjectID(_id) },
    {$set: { text, file_id, file_type } }
  )
    .catch(err => console.error(err))

  if(req.file){
    gfs.remove({_id: oldFile, root: 'storyMedia'}, (err, gridStore) => {
      if(err){
        return res.status(404).json({
          err: err
        });
      }
    })
  }
  res.end()
});

//need to use readStream to show the files
//@route GET /image/:filename
// @desc Display image
story.get('/media/:id', (req, res) => {
  let {gfs, ObjectID} = req.app.locals;
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
story.delete('/files/:id', (req,res) => {
  let {gfs} = req.app.locals;
  gfs.remove({_id: req.params.id, root: 'storyMedia'}, (err, gridStore) => {
    if(err){
      return res.status(404).json({
        err: err
      });
    }
  })
});

story.delete('/deleteStory', (req, res) => {
  let {db, gfs, ObjectID} = req.app.locals;
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

module.exports = story;
