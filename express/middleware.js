//const request = require('supertest');
const assert = require('assert');
const express = require('express');
const { json } = require('stream/consumers');

const app = express();

/*
let requestCount = 0;

function counter (req,res,next){
    requestCount ++;
    next()
}

app.use(counter)

// You have been given an express server which has a few endpoints.
// Your task is to create a global middleware (app.use) which will
// maintain a count of the number of requests made to the server in the global
// requestCount variable

app.get('/user', function(req, res) {
  res.status(200).json({ name: 'john' });
});

app.post('/user', function(req, res) {
  res.status(200).json({ msg: 'created dummy user' });
});

app.get('/requestCount', function(req, res) {
  res.status(200).json({ requestCount });
});
*/



function isOldEnough (req, res, next) {
  const age = Number(req.query.age);
  if (age >= 18) {
    next();
  } else {
    res.status(403).json({ msg: "Access Denied for all Rides" });
  }
}

app.use(isOldEnough);


app.get('/ride1',function(req,res){
  res.send("This is Ride 1")
})

app.get('/ride2',function(req,res){
  res.send("This is Ride 2")
})

app.get('/ride3',function(req,res){
  res.send("This is Ride 3")
})


app.listen(3000,()=>{
    console.log("Server is running on port 3000");
})