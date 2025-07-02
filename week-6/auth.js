const express = require('express')

const app = express()

app.use(express.json())


const users=[{
    username:"Aaditya",
    password: "123",
    token:""
},{
    username:"Harsha",
    password: "456",
    token: ""
}]

app.post('/signup',(req,res)=>{
    const username= req.body.username;
    const password= req.body.password;
    const userExists = users.find(user => user.username === username);


    if(userExists){
        return res.status(200).send("User Exists")
    }else{
        const token= Math.random().toString(36).substring(2)
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
    

    if(!user){
        return res.status(404).send("User Does not exits")
    }else if(user.password !== password){
        return res.status(403).send("Password Incorrect")
    }else{
        res.json({
            token : user.token
        })
    }
})


app.listen(3000, ()=>{
    console.log("The server is listening");
})