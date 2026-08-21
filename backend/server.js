// backend/server.js
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const designRoutes = require("./routes/designRoutes");
const inquiryRoutes=require("./routes/inquiryRoutes");
const authRoutes = require("./routes/authRoutes");
const connectDB = require("./config/db");
console.log("Cloud Name:", process.env.CLOUDINARY_CLOUD_NAME);
console.log("API Key:", process.env.CLOUDINARY_API_KEY);
console.log("API Secret:", process.env.CLOUDINARY_API_SECRET ? "Loaded" : "Missing");
const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/designs", designRoutes);
app.use("/api/inquiries",inquiryRoutes);
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Flower Point API is Running");
});

const PORT = process.env.PORT || 5000;

connectDB().finally(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});