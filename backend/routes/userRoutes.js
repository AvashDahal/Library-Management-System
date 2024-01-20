import express from "express";
import {
  registerUser,
  loginUser,
  
} from "../controllers/userController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import isAdmin from "../middlewares/adminMiddleware.js";


const router = express.Router();

// Register a new user
router.post("/register", registerUser);

// Login user
router.post("/login", loginUser);



// router.get('/admin-only', ()=>{
//     console.log("hello");
// });

export default router;
