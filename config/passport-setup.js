const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const keys = require('./keys');

passport.serializeUser((req, id, done) => {
  done(null, id);
});

passport.deserializeUser((req, id, done) => {
  let {db, ObjectID} = req.app.locals;
  let users = db.collection('users');
  users.findOne( { _id: ObjectID(id) } )
    .then(user => {
      done(null, user)
    })
});

passport.use(
  new GoogleStrategy({
  callbackURL: '/auth/google/redirect',
  passReqToCallback: true,
  clientID: keys.google.clientID,
  clientSecret: keys.google.clientSecret
}, (req, accessToken, refreshToken, profile, done) => {
    let {users, ObjectID} = req.app.locals;
    users.findOne( { user: profile.id} )
      .then(user => {
        if(user){
          // if user exists
          done(null, user._id);
        }
        else{
          // if user doesn't exist, add it to user collection
          users.insertOne({
            user: profile.id,
            name: profile.displayName,
            picture: profile._json.picture,
            userStats: {
              age: '',
              sex: '',
              feet: '',
              inches: '',
              weight: '',
              activity: {
                name: 'Levels',
                value: 0
              },
              goal: {
                name: "Maintain",
                value: 0
              }
            },
            Calories: 0,
            macros: {
              Protein: 0,
              Fat: 0,
              Carbs: 0
            },
            favExercises: [],
            favFoods: []
          })
            .then(result => {
              done(null, result.insertedId)
            })
        }
      });
  })
);

passport.use(
  new FacebookStrategy({
    callbackURL: '/auth/facebook/redirect',
    passReqToCallback: true,
    clientID: keys.facebook.clientID,
    clientSecret: keys.facebook.clientSecret,
  }, (req, accessToken, refreshToken, profile, done) => {
    console.log({facebook: profile});
    let {users, ObjectID} = req.app.locals;
    users.findOne( { user: profile.id} )
      .then(user => {
        if(user){
          // if user exists
          done(null, user._id);
        }
        else{
          // if user doesn't exist, add it to user collection
          let picture = `https://graph.facebook.com/${profile.id}/picture?type=large`;
          users.insertOne({
            user: profile.id,
            name: profile.displayName,
            picture: picture,
            userStats: {
              age: '',
              sex: '',
              feet: '',
              inches: '',
              weight: '',
              activity: {
                name: 'Levels',
                value: 0
              },
              goal: {
                name: "Maintain",
                value: 0
              }
            },
            Calories: 0,
            macros: {
              Protein: 0,
              Fat: 0,
              Carbs: 0
            },
            favExercises: [],
            favFoods: []
          })
            .then(result => {
              done(null, result.insertedId)
            })
        }
      });
  })
)
