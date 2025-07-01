const express = require('express')
const fs = require('fs')
const path = require('path')


const app = express()


app.get('/files', function(req, res) {
  fs.readdir('./node_modules', function(err, files) {
    if (err) {
      console.log(err);
    } else {
      res.send(files);
    }
  })
});


app.get('/file/app',function(req,res){
  const fullpath= path.join(__dirname,'./app.txt')

  fs.readFile(fullpath,'utf-8',function(err,data){
    if(err){
      res.status(404).send("File Not Found");
    }else{
      res.send(data);
    }
  })
})

app.listen(3000)