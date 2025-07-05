const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt"); 
const { courseModel, adminModel, purchaseModel, userModel } = require("./db");

const app = express();
app.use(express.json());

const JWT_SECRET = "aaditya";

// Admin Authentication Middleware
function adminAuth(req, res, next) {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) return res.status(401).send("Token missing");

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.adminId = decoded.adminId;
    req.admin = decoded.admin;
    next();
  } catch (err) {
    res.status(403).send("Unauthorized Admin");
  }
}

// User Authentication Middleware
function userAuth(req, res, next) {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) return res.status(401).send("Token missing");

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.userId;
    req.username = decoded.user;
    next();
  } catch (err) {
    res.status(403).send("Unauthorized");
  }
}

// ================= Admin Routes =================

// Admin Signup
app.post("/adminsignup", async (req, res) => {
  try {
    const { adminName, password } = req.body;

    const existingAdmin = await adminModel.findOne({ adminName });
    if (existingAdmin) {
      return res.status(400).send("Admin already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await adminModel.create({ adminName, password: hashedPassword });

    res.status(201).json({ msg: "Admin signed up successfully" });
  } catch (error) {
    console.error("Signup Error", error);
    res.status(500).send("Error Signing up");
  }
});

// Admin Login
app.post("/adminlogin", async (req, res) => {
  try {
    const { adminName, password } = req.body;

    const admin = await adminModel.findOne({ adminName });
    if (!admin) return res.status(403).send("Invalid Admin");

    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) return res.status(403).send("Invalid credentials");

    const token = jwt.sign(
      { admin: admin.adminName, adminId: admin._id },
      JWT_SECRET
    );
    res.json({ token });
  } catch (error) {
    console.error("Login Error", error);
    res.status(500).send("Login Error");
  }
});

// Create Course
app.post("/createcourse", adminAuth, async (req, res) => {
  try {
    const { courseName, coursePrice } = req.body;

    const courseExist = await courseModel.findOne({ courseName });
    if (courseExist) return res.status(400).send("Course already exists");

    const newCourse = await courseModel.create({ courseName, coursePrice });
    res.status(201).send("Course created successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error creating course");
  }
});

// Delete Course
app.post("/deletecourse", adminAuth, async (req, res) => {
  try {
    const { courseId } = req.body;

    const course = await courseModel.findById(courseId);
    if (!course) return res.status(404).send("Course not found");

    await courseModel.findByIdAndDelete(courseId);
    res.send("Course deleted successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error deleting course");
  }
});

// Add or Update Course Content
app.post("/coursecontent", adminAuth, async (req, res) => {
  try {
    const { courseId, content } = req.body;

    const course = await courseModel.findById(courseId);
    if (!course) return res.status(404).send("Course not found");

    course.content = content;
    await course.save();

    res.send("Course updated successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error updating course");
  }
});

// ================= User Routes =================

// User Signup
app.post("/usersignup", async (req, res) => {
  try {
    const { username, password } = req.body;

    const existingUser = await userModel.findOne({ username });
    if (existingUser) return res.status(400).send("User already exists");

    const hashedPassword = await bcrypt.hash(password, 10);
    await userModel.create({ username, password: hashedPassword });

    res.status(201).json({ msg: "User signed up successfully" });
  } catch (error) {
    console.error("Signup Error", error);
    res.status(500).send("Error Signing up");
  }
});

// User Login
app.post("/userlogin", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await userModel.findOne({ username });
    if (!user) return res.status(403).send("Invalid credentials");

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(403).send("Invalid credentials");

    const token = jwt.sign(
      { user: user.username, userId: user._id },
      JWT_SECRET
    );
    res.json({ token });
  } catch (error) {
    console.error("Login Error", error);
    res.status(500).send("Login Error");
  }
});

// Purchase Course
app.post("/purchases", userAuth, async (req, res) => {
  try {
    const { courseId } = req.body;
    if (!courseId) return res.status(400).send("Course ID required");

    const course = await courseModel.findById(courseId);
    if (!course) return res.status(404).send("Course not found");

    const purchase = await purchaseModel.create({
      userId: req.userId,
      courseId,
    });

    res.status(201).send("Course purchased successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error purchasing course");
  }
});

// Get All Courses
app.get("/courses", userAuth, async (req, res) => {
  try {
    const courses = await courseModel.find();
    res.status(200).json(courses);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// ================= Start Server =================

app.listen(3000, () => {
  console.log("Server started on http://localhost:3000");
});
