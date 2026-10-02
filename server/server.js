// Standalone Express Server with Optional MongoDB connection
// If MONGODB_URI is provided in .env, it stores in Mongo.
// Otherwise, it reads and writes to local JSON in src/data/portfolioData.json and uploads in public/uploads/

import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

// Serve uploads statically
const uploadsDir = path.resolve(__dirname, "../public/uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}
app.use("/uploads", express.static(uploadsDir));

const dataDir = path.resolve(__dirname, "../src/data");
const jsonFilePath = path.resolve(dataDir, "portfolioData.json");

let isMongoConnected = false;
let PortfolioModel = null;

// Connect to MongoDB ONLY if MONGODB_URI is present in .env
if (process.env.MONGODB_URI) {
  try {
    const mongoose = await import("mongoose");
    await mongoose.default.connect(process.env.MONGODB_URI);
    isMongoConnected = true;
    console.log("Connected successfully to MongoDB!");

    const portfolioSchema = new mongoose.default.Schema(
      {
        slug: { type: String, default: "main", unique: true },
        data: { type: Object, required: true },
      },
      { timestamps: true }
    );
    PortfolioModel = mongoose.default.model("Portfolio", portfolioSchema);
  } catch (err) {
    console.warn("MongoDB connection failed, falling back to local file storage:", err.message);
  }
} else {
  console.log("Running in local file-system mode (No MongoDB URI detected). Data will be saved to src/data/portfolioData.json");
}

// GET Portfolio Data
app.get("/api/portfolio-data", async (req, res) => {
  try {
    if (isMongoConnected && PortfolioModel) {
      const doc = await PortfolioModel.findOne({ slug: "main" });
      if (doc && doc.data) {
        return res.json(doc.data);
      }
    }

    if (fs.existsSync(jsonFilePath)) {
      const content = fs.readFileSync(jsonFilePath, "utf-8");
      return res.json(JSON.parse(content));
    }

    return res.json({ notFound: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST / Save Portfolio Data
app.post("/api/portfolio-data", async (req, res) => {
  try {
    const payload = req.body;

    // Save to local file system as primary/backup
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    fs.writeFileSync(jsonFilePath, JSON.stringify(payload, null, 2), "utf-8");

    // Also persist to MongoDB if connected
    if (isMongoConnected && PortfolioModel) {
      await PortfolioModel.findOneAndUpdate(
        { slug: "main" },
        { data: payload },
        { upsert: true, new: true }
      );
    }

    res.json({
      success: true,
      message: "Data saved successfully!",
      storage: isMongoConnected ? "MongoDB + Local File" : "Local File",
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// File Upload endpoint
app.post("/api/upload", (req, res) => {
  try {
    const { fileName, fileData, isResume } = req.body;
    if (!fileData) {
      return res.status(400).json({ error: "No file data provided" });
    }

    const base64Data = fileData.replace(/^data:[^;]+;base64,/, "");
    const buffer = Buffer.from(base64Data, "base64");

    const safeName = (Date.now() + "-" + (fileName || "upload")).replace(/[^a-zA-Z0-9.-]/g, "_");
    const destPath = path.resolve(uploadsDir, safeName);
    fs.writeFileSync(destPath, buffer);

    if (isResume) {
      const resumePath = path.resolve(__dirname, "../public/Rajan_Resume.pdf");
      try {
        fs.writeFileSync(resumePath, buffer);
      } catch (e) {
        console.error("Resume file update error:", e);
      }
    }

    res.json({
      success: true,
      url: `/uploads/${safeName}`,
      fileName: safeName,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    mongo: isMongoConnected,
    storage: isMongoConnected ? "MongoDB" : "Local File System",
  });
});

app.listen(PORT, () => {
  console.log(`Portfolio Server running at http://localhost:${PORT}`);
});
