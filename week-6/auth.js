const express = require('express')
const jwt = require('jsonwebtoken');

const app = express()

app.use(express.json())

const JWT_SECRET = "aaditya"


const users=[{
    username:"Aaditya",
    password: "123",
    token:""
},{
    username:"Harsha",
    password: "456",
    token: "abcd"
}]

app.post('/signup',(req,res)=>{
    const username= req.body.username;
    const password= req.body.password;
    const userExists = users.find(user => user.username === username);
    console.log(users);


    if(userExists){
        return res.status(200).send("User Exists")
    }else{
        const token= jwt.sign({ username }, JWT_SECRET);
        users.push({ username, password, token });

        return res.json({
            token : token,
            msg : "You are signed Up"
        })
    }
    
})


app.post('/signin',(req,res)=>{
    const username= req.body.username;
    const password= req.body.password;
    const user = users.find(user => user.username === username);
    const token = jwt.sign({ username }, JWT_SECRET)

    if(!user){
        return res.status(404).send("User Does not exits")
    }else if(user.password !== password){
        return res.status(403).send("Password Incorrect")
    }else{
        res.json({
            token : token
        })
    }
})



app.get('/me',(req,res)=>{
    const token = req.headers['authorization'];
    const decoded = jwt.verify(token, JWT_SECRET);

    
    if(decoded){
        res.json({
            user : decoded.username
        })
    }else{
        res.status(403).send("User Unauthorized")
    }
    
});

app.listen(3000, ()=>{
    console.log("The server is listening");
})

