const express = require('express');
const jwt = require('jsonwebtoken');
const { userModel, todoModel } = require('./db'); 
const bcrypt = require('bcrypt');


const app = express();
app.use(express.json());

const JWT_SECRET = 'aaditya';


function auth(req, res, next) {
    const token = req.headers['authorization'];
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded.user;
        req.userId = decoded.userId;
        next();
    } catch (error) {
        res.status(403).send('Unauthorized');
    }
}


app.post('/signin', async (req, res) => {
    try {
        const { username, password } = req.body;
        const existingUser = await userModel.findOne({ username });

        if (existingUser) {
            return res.status(400).send('User already exists');
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        
        await userModel.create({ username, password : hashedPassword});

        res.json({ msg: 'You are Signed in' });
    } catch (error) {
        console.log("Signin Error",error);
        res.status(403).send("Error Signing in")    
    }
});


app.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        
        // Find user by username only (not password)
        const user = await userModel.findOne({ username });
        
        if (!user) {
            return res.status(403).send('Invalid credentials');
        }
        
        // Compare password with hashed password from database
        const isPasswordValid = await bcrypt.compare(password, user.password);
        
        if (isPasswordValid) {
            const token = jwt.sign(
                { user: user.username, userId: user._id },
                JWT_SECRET
            );
            res.json({ token });
        } else {
            res.status(403).send('Invalid credentials');
        }
        
    } catch (error) {
        console.log("Error in Login", error);
        res.status(500).send("Login Error");
    }
});


app.post('/todo', auth, async (req, res) => {

    try {
        const { title, done } = req.body;
        const userId = req.userId;
        
        await todoModel.create({ title, done, userId });
        res.status(200).send('Todo Created Successfully');
    } catch (error) {
        console.log(error);
        res.send("Todo Creation Unsuccessful")
    }
});


app.get('/todos', auth, async (req, res) => {
    try {
        const todos = await todoModel.find({ userId: req.userId });
        res.json(todos);        
    } catch (error) {
        console.log(error);
        res.send("Failed to fetch todos")
    }
});




app.listen(3000, () => {
    console.log('Server is listening on port 3000');
});
