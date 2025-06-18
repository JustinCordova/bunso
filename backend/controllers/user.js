import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "../models/user.js";

export const signup = async (req, res) => {
  const { email, password, firstName, lastName, username, profilePicture } =
    req.body;

  try {
    // Check if user already exists by email or username
    const existingEmail = await User.findOne({ email });
    const existingUsername = await User.findOne({ username });

    if (existingEmail)
      return res.status(400).json({ message: "Email already in use" });
    if (existingUsername)
      return res.status(400).json({ message: "Username already taken" });

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user
    const result = await User.create({
      name: `${firstName} ${lastName}`,
      username,
      email,
      password: hashedPassword,
      profilePicture: profilePicture || "",
    });

    // Create JWT token
    const token = jwt.sign(
      { email: result.email, id: result._id },
      process.env.SECRET,
      { expiresIn: "1h" }
    );

    res.status(201).json({ result, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const signin = async (req, res) => {
  const { identifier, password } = req.body; // "identifier" can be email or username

  try {
    // Try finding user by email OR username
    const user = await User.findOne({
      $or: [{ email: identifier }, { username: identifier }],
    });

    if (!user) {
      return res.status(404).json({ message: "User doesn't exist" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { email: user.email, id: user._id },
      process.env.SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({ result: user, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  if (req.userId !== id) {
    return res
      .status(403)
      .json({ message: "You are not authorized to update this profile." });
  }
  const { name, username, bio, profilePicture } = req.body;
  try {
    const updatedFields = {};
    if (name) updatedFields.name = name;
    if (username) updatedFields.username = username;
    if (bio !== undefined) updatedFields.bio = bio;
    if (profilePicture !== undefined)
      updatedFields.profilePicture = profilePicture;
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $set: updatedFields },
      { new: true, runValidators: true }
    );
    if (!updatedUser)
      return res.status(404).json({ message: "User not found" });
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
