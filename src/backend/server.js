const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const app = express();
app.use(cors());
app.use(express.json());

const SECRET = "supersecretkey";

// ✅ MongoDB connection
mongoose
  .connect("mongodb://localhost:27017/myappdb", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("✅ Connected to MongoDB");
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
  });

// ✅ User Schema
const userSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  password: String,
  role: String,
});
// ✅ Task Schema
const taskSchema = new mongoose.Schema({
  sno: Number,
  title: String,
  desc: String,
  status: String,
  priority: String,
  assignedTo: String,
  assignee: String,
  dueDate: String,
});

const Task = mongoose.model("Task", taskSchema);
app.post("/tasks", async (req, res) => {
  try {
    const task = new Task(req.body);
    await task.save();
    res.status(201).json({ message: "Task created", task });
  } catch (err) {
    res.status(500).json({ message: "Error creating task" });
  }
});
app.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: "Error fetching tasks" });
  }
});
//Update task
app.put("/tasks/:id", async (req, res) => {
  try {
    const updated = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Error updating task" });
  }
});
// Delete task
app.delete("/tasks/:id", async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: "Task deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting task" });
  }
});



const User = mongoose.model("User", userSchema);

// ✅ Registration route
app.post("/register", async (req, res) => {
  const { fullName, email, password, role } = req.body;
  try {
    const existing = await User.findOne({ email });
    if (existing)
      return res.status(400).json({ message: "User already exists" });

    const user = new User({ email, password, role });
    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ message: "Registration error" });
  }
});

// ✅ Login route
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email, password });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign({ email: user.email, role: user.role }, SECRET, {
      expiresIn: "15m",
    });
    const refreshToken = jwt.sign({ email: user.email }, SECRET, {
      expiresIn: "1d",
    });

    res.json({
      token,
      refreshToken,
      user: { email: user.email, role: user.role },
    });
  } catch (err) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Login error" });
  }
});
app.listen(3000, () =>
  console.log("✅ Backend running at http://localhost:3000")
);

//app.post("/login", (req, res) => {
//   const { email, password } = req.body;
//   console.log(email, password, "email")
//   const user = users.find((u) => u.email === email && u.password === password);
//   if (!user) return res.status(401).json({ message: "Invalid credentials" });

//   const token = jwt.sign({ email: user.email, role: user.role }, SECRET, {
//     expiresIn: "15m",
//   });
//   const refreshToken = jwt.sign({ email: user.email }, SECRET, {
//     expiresIn: "1d",
//   });

//   res.json({
//     token,
//     refreshToken,
//     user: { email: user.email, role: user.role },
//   });
// });
