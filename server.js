import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

const app = express();

// Security Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Rate Limiter
const limiter = rateLimit({
  windowMs: 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Routes
app.get("/api", (req, res) => {
  res.json({ message: "Hello from Express with ESM!" });
});

app.post("/api/data", (req, res) => {
  const data = req.body;
  res.status(201).json({ received: data });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
