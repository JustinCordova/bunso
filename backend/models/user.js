// models/userModel.js
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import validator from "validator";

const userSchema = new mongoose.Schema({
  name: {
    // real full name (e.g., John Doe)
    type: String,
    required: true,
    trim: true,
  },
  username: {
    // unique username (e.g., johndoe123)
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
    default: "",
    trim: true,
  },
  profilePicture: {
    type: String, // base64 string or URL
    default: "",
  },
  createdAt: {
    type: Date,
    default: () => new Date(),
    immutable: true,
  },
});

// Must be a regular function, not arrow function
// because then using (this) does not work
// Signup static method
userSchema.statics.signup = async function (name, username, email, password) {
  // Normalize inputs
  name = name.trim();
  username = username.trim().toLowerCase();
  email = email.trim().toLowerCase();

  // Validation
  if (!name || !username || !email || !password)
    throw Error("All fields must be filled");
  if (!validator.isEmail(email)) throw Error("Email not valid");
  if (!validator.isStrongPassword(password))
    throw Error("Password not strong enough");

  // Uniqueness checks
  const usernameExists = await this.findOne({ username });
  if (usernameExists) throw Error("Username already taken");

  const emailExists = await this.findOne({ email });
  if (emailExists) throw Error("Email already in use");

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  // Create user
  return this.create({ name, username, email, password: hash });
};

// Login static method
userSchema.statics.signin = async function (identifier, password) {
  if (!identifier || !password) throw Error("All fields must be filled");
  identifier = identifier.trim().toLowerCase();

  // Find user by username OR email (case-insensitive)
  const user = await this.findOne({
    $or: [{ email: identifier }, { username: identifier }],
  });

  if (!user) throw Error("Incorrect username or email");

  const match = await bcrypt.compare(password, user.password);
  if (!match) throw Error("Incorrect password");

  return user;
};

const User = mongoose.model("User", userSchema);
export default User;
