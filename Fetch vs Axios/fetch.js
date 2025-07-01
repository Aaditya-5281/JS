import express from 'express';
import fetch from 'node-fetch';
import axios from 'axios'

const app= express()
/*
app.get('/axios',async function lockedIn(req,res) {
    const content =  await axios.get("https://jsonplaceholder.typicode.com/posts")
    res.send(content.data)
})
*/


app.get('/fetch',async function lockedIn(req,res) {
    const content =  await fetch("https://jsonplaceholder.typicode.com/posts")
    const data = await content.json()
    res.send(data)
})

app.listen(3000,function(){
    console.log("Server is listening");
})