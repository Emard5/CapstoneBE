import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.mjs";
import userRoutes from "./routes/userRoutes.mjs";
import { errorHandler } from "./middleware/errorMiddleware.mjs";

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes);

// simple root
app.get("/", (req, res) => res.send("Backend running"));

// error middleware (must be last)
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
