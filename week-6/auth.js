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


function auth(req, res, next) {
    const token = req.headers['authorization'];
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded.username;  
        next();
    } catch (err) {
        res.status(403).send("Unauthorized");
    }
}


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
            token : token,
            msg : "You are Signed In"
        })
    }
})



app.get('/me', auth, (req, res) => {
    const currentUser = req.user;  
    const user = users.find(user => user.username === currentUser);

    if (user) {
        res.json({
            username: user.username,
            password: user.password  
        });
    } else {
        res.status(404).send("User not found");
    }
});

app.listen(3000, ()=>{
    console.log("The server is listening");
})

