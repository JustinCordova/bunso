import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // hashed
  avatar: String,
  bio: String,
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

export default mongoose.model('User', userSchema);
