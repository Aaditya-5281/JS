const express = require('express')

const app = express()


function http (req,res,next){
    const header=req.headers
    console.log(req.headers);
    console.log(req.url);
    console.log(req.method);
    next()
}

app.use(http)

app.get('/https',function(req,res){
    res.send(req.statusCode)
})

app.listen(3000)