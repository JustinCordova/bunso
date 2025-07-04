import express from "express";
import {
  sendMessage,
  getMessagesBetweenUsers,
  getConversations,
} from "../controllers/message.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// Send a message
router.post("/", auth, sendMessage);
// Get all messages between current user and another user
router.get("/with/:userId", auth, getMessagesBetweenUsers);
// Get all conversations for current user
router.get("/conversations", auth, getConversations);

export default router;
