// userControllers.js
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

// Register a new user
const registerUser = async (req, res) => {
  try {
    const { username, email, password, confirmPassword, citizenId, location } =
      req.body;
    console.log(req.body);

  

    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const user = new User({
      username,
      email,
      password: hashedPassword,
      citizenId,
      location,
    });
    // Save the user to the database
    await user.save();
    

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Login user
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);

    // Find the user by email
    const user = await User.findOne({ email });

    // If user not found or password is incorrect
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Generate JWT token

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1h" }
    );

    //     const token = jwt.sign({ userId: user._id, role: user.role },process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
    console.log("success");
    res.status(200).json({ token, username: user.username });
  } catch (error) {

    res.status(500).json({ error: error.message });
  }
};
const addUserDetails = async (req, res) => {
  try {
    const { gender, dateOfBirth, phoneNo, emergencyContact } = req.body;
    const user = await User.findById(req.params.id);
    if (user) {
      user.phoneNo = phoneNo || user.phoneNo;

      user.dateOfBirth = dateOfBirth || user.dateOfBirth;

      user.gender = gender || user.gender;
      user.emergencyContact = emergencyContact || user.emergencyContact;
      

      await user.save();

      res.status(200).json({ message: "User details updated successfully" });
    } else {
      res.status(400).json({ error: "Add all details" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

 const getUserDetails = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(400).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password');
        if (user) {
        res.status(200).json(user);
        } else {
        res.status(400).json({ error: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
    }

const deleteUserById= async(req, res)=>{
  try {
    const user = await User.findById(req.params.id);
    if(user){
      await user.remove();
      res.status(200).json({message: 'User removed successfully'});
    }
    else
    {
      res.status(400).json({error: 'User not found'});
    }

  }
  catch (error) {
    res.status(500).json({ error: error.message });
}
};


export { registerUser, loginUser, getUserById, addUserDetails,getUserDetails,deleteUserById };

// export { registerUser, loginUser, adminOnlyRoute, addUserDetails,getUserDetails }
