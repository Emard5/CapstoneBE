import express from "express";
import { registerUser, loginUser, getMe, updateUser } from "../controllers/userControllers.mjs";
import { verifyToken } from "../middleware/authMiddleware.mjs";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", verifyToken, getMe);
router.put("/me", verifyToken, updateUser);

export default router;
