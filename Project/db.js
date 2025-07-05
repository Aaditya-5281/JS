const mongoose = require('mongoose')
require("dotenv").config();

mongoose.connect(process.env.DB_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("--------------MongoDB connected-------------------"))
  .catch((err) => console.error("DB connection error:", err));

  const userSchema = new mongoose.Schema({
    username: String,
    password: String,
  });

  const adminSchema = new mongoose.Schema({
    adminName: String,
    password: String,
  });

  const courseSchema = new mongoose.Schema({
    courseName: String,
    coursePrice: Number,
    content: String,
  });

  const purchaseSchema = new mongoose.Schema({
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "courses",
      required: true,
    },
    purchasedAt: { type: Date, default: Date.now },
  });

  const userModel = mongoose.model("users", userSchema);
  const adminModel = mongoose.model("admin", adminSchema);
  const courseModel = mongoose.model("courses", courseSchema);
  const purchaseModel = mongoose.model("purchases", purchaseSchema);

  module.exports = {
    userModel,
    adminModel,
    courseModel,
    purchaseModel,
  };
  





