const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://aadityakumar26082004:aaditya5281@cluster0.wh9ak.mongodb.net/", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('--------------MongoDB connected-------------------'))
.catch(err => console.error('DB connection error:', err));

const userSchema = new mongoose.Schema({
    username: String,
    password: String
});

const todoSchema = new mongoose.Schema({
    title: String,
    done: Boolean,
    userId: mongoose.Schema.Types.ObjectId
});

const userModel = mongoose.model('users', userSchema);
const todoModel = mongoose.model('todos', todoSchema);

module.exports = { userModel, todoModel };
