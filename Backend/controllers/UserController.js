// controllers/UserController.js
import UserModel from "../models/UserModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};


// Register new user
export const registerUser = async (req, res) => {
  const { name, email, password, role } = req.body;

  // 1️⃣ Check required fields
  if (!name || !email || !password || !role) {
    return res.status(400).json({
      success: false,
      message: "Missing required fields: name, email, password, or role",
    });
  }

  // 2️⃣ Validate email
  if (!validator.isEmail(email)) {
    return res.status(400).json({ success: false, message: "Invalid email format" });
  }

  // 3️⃣ Validate password
  if (password.length < 8) {
    return res.status(400).json({
      success: false,
      message: "Password must be at least 8 characters",
    });
  }

  // 4️⃣ Validate role
  if (!["patient", "doctor"].includes(role)) {
    return res.status(400).json({
      success: false,
      message: "Role must be either 'patient' or 'doctor'",
    });
  }

  console.log("Register Request Body:", req.body);

  try {
    // 5️⃣ Check if user exists
    const userExists = await UserModel.findOne({ email });
    if (userExists) {
      return res.status(400).json({ success: false, message: "User already exists" });
    }

    // 6️⃣ Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 7️⃣ Save user
    const newUser = await UserModel.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (err) {
    console.error("Registration Error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Login user
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1️⃣ Validate input
    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Email and password are required" });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ success: false, message: "Invalid email format" });
    }

    // 2️⃣ Find user (case-insensitive)
    const user = await UserModel.findOne({ email: { $regex: `^${email}$`, $options: "i" } });
    if (!user) {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }

    // 3️⃣ Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }

    // 4️⃣ Generate JWT token
    let token;
    try {
      token = generateToken(user);
    } catch (err) {
      console.error("JWT Error:", err);
      return res.status(500).json({ success: false, message: "Server error generating token" });
    }

    // 5️⃣ Respond with success
    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

  } catch (err) {
    console.error("Login Error:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};


// Get logged-in user profile
export const getUserProfile = async (req, res) => {
  res.json(req.user);
};
