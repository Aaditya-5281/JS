const express= require('express')
const bodyParser= require('body-parser')

const app = express()

app.use(bodyParser.json())

app.post('/',function(req,res){
    console.log(req.body);
    const x= parseInt(req.body.x)
    const y= parseInt(req.body.y)
    res.json({
        sum : x + y
    })
})

app.listen(3000)