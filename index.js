const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const registerRoutes = require("./routes/register.routes");
const loginRoutes = require("./routes/login.routes");
const dashboardRoutes = require("./routes/dashboard.routes");
const taskRoutes = require("./routes/task.routes")
const auth = require("./middleware/authMiddleware");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

app.use(express.json());
// app.use(cors())
app.use(
  cors({
    origin: "http://localhost:3000", // Adjust this to match your frontend URL
    credentials: true,
  })
);

// Routes
app.use("/api", registerRoutes);
app.use("/api", loginRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/tasks", auth, taskRoutes);
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
