import express from "express";
import {
  registerUser,
  loginUser,
  getUserById,
  addUserDetails,
  getUserDetails,
  deleteUserById,
  
} from "../controllers/userController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import isAdmin from "../middlewares/adminMiddleware.js";

const router = express.Router();

// Login user
router.post("/login", loginUser);

// Register a new user
router.post("/register", registerUser);

// Routes that require authentication and admin role
router.get("/", authMiddleware, isAdmin, getUserDetails);
router.delete("/delete/:id", authMiddleware, isAdmin, deleteUserById);
router.put("/update/:id", authMiddleware, addUserDetails);

// Get user by ID
router.get("/:id", getUserById);

export default router;
