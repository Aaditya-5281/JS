const express = require('express');
const jwt = require('jsonwebtoken');
const { userModel, todoModel } = require('./db'); // Make sure db.js exports userModel and todoModel

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
    const { username, password } = req.body;

    const existingUser = await userModel.findOne({ username });
    if (existingUser) {
        return res.status(400).send('User already exists');
    }

    await userModel.create({ username, password });
    res.json({ msg: 'You are Signed in' });
});


app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    const user = await userModel.findOne({ username, password });
    if (user) {
        const token = jwt.sign(
            { user: user.username, userId: user._id },
            JWT_SECRET
        );
        res.json({ token });
    } else {
        res.status(403).send('Login Failed');
    }
});


app.post('/todo', auth, async (req, res) => {
    const { title, done } = req.body;
    const userId = req.userId;

    await todoModel.create({ title, done, userId });
    res.status(200).send('Todo Created Successfully');
});


app.get('/todos', auth, async (req, res) => {
    const todos = await todoModel.find({ userId: req.userId });
    res.json(todos);
});


app.listen(3000, () => {
    console.log('Server is listening on port 3000');
});
