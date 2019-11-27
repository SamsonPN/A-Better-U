"use strict";
const cloudinary = require('cloudinary').v2;
const Keys = require('../config/keys');
const ObjectID = require('mongodb').ObjectID;
const story = require('express').Router();

cloudinary.config({
  cloud_name: Keys.cloudinary.cloudName,
  api_key: Keys.cloudinary.clientID,
  api_secret: Keys.cloudinary.clientSecret
})

function CloudinaryDestroy(public_id, resource_type){
  cloudinary.uploader.destroy(public_id, { resource_type })
    .then(result => console.log(result))
    .catch(err => console.error(err))
}

story.get('/getStories', (req,res) => {
  let {stories} = req.app.locals;
  stories.find()
    .sort( { date: -1, _id: -1} )
    .toArray()
    .then(items => { res.json(items) } )
    .catch( err => console.error(err))
})

story.post('/uploadCloudinary', (req, res) => {
  let {date, stories} = req.app.locals;
  let {text} = req.body;
  let {user, name, picture} = req.user;
  cloudinary.uploader.upload(req.files.file.path, {
    resource_type: "auto"
  })
    .then(result => {
      let {public_id, resource_type, secure_url} = result;
      stories.insertOne({
        user: {
          user,
          name,
          picture
        },
        text,
        file: {
          public_id,
          resource_type,
          secure_url
        },
        date
      })
      res.status(201).send({result})
    })
    .catch(err => {
      res.status(500).send({err})
    })
})

story.post('/uploadText', (req, res) => {
  let {date, stories} = req.app.locals;
  let {user, name, picture} = req.user;
  let {file, text} = req.body;
  stories.insertOne({
    user: {
      user,
      name,
      picture
    },
    text,
    file,
    date
  })
    .catch(err => {
      res.status(500).send({err})
    })
  res.sendStatus(201)
})

story.post('/editCloudinary', (req, res) => {
  let {stories} = req.app.locals;
  let {_id, oldFile, text} = req.body;
  oldFile = JSON.parse(oldFile);
  console.log(oldFile)
  cloudinary.uploader.upload(req.files.file.path, {
    resource_type: "auto"
  })
    .then(result => {
      let {public_id, resource_type, secure_url} = result;
      stories.updateOne(
        { _id: ObjectID(_id) },
        {$set: {
          text,
          file: {
            public_id,
            resource_type,
            secure_url
            }
          }
        }
      )
        .catch(err => {
          res.status(500).send({err})
        })
      res.status(201).send({result})
    })
    .catch(err => {
      res.status(500).send({err})
    })
  CloudinaryDestroy(oldFile.public_id, oldFile.resource_type);
});

story.post('/editText', (req, res) => {
  let {stories} = req.app.locals;
  let { _id, text } = req.body;
  stories.updateOne(
    { _id: ObjectID(_id) },
    {$set: { text } }
  )
    .catch(err => {
      res.status(500).send({ err })
    })
  res.status(200).send(`Update successful for story: ${_id}`);
})

story.delete('/deleteStory', (req, res) => {
  let {stories} = req.app.locals;
  let { story_id, public_id, resource_type } = req.query;
  stories.deleteOne( { _id : ObjectID(story_id) } )
    .catch(err => console.error(err))
  if(public_id){
    CloudinaryDestroy(public_id, resource_type);
  }
  res.end()
})

module.exports = story;
