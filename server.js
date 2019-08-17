const express = require('express');
const app = express();
const request = require('request');
const port = 9000;

// const exercise = {
//   url: 'https://wger.de/api/v2/exercise/',
//   method: 'GET',
//   headers: {
//     'Accept': 'application/json'
//   }
// }
//
// request(exercise, function(err, res, body) {
//   var json = JSON.parse(body);
//   console.log(json);
// })

const exerciseInfo = {
  url: 'https://wger.de/api/v2/exerciseinfo/',
  method: 'GET',
  headers: {
    'Accept': 'application/json'
  }
}

request(exerciseInfo, function(err, res,body){
  let json = JSON.parse(body);
  console.log(json)
})


app.listen(port, function(){
  console.log(`Listening on port ${port}`);
});


app.get('/express_backend', (req,res) => {
  res.send({express: "YOUR EXPRESS BACKEND IS CONNECTED"})
})

app.get('/expression', (req,res) => {
  res.send({express:"YAY ANOTHER THINGIE"});
})
