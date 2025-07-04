import Message from "../models/messageModel.js";
import User from "../models/user.js";

// Send a new message
export const sendMessage = async (req, res) => {
  try {
    const { recipientId, content } = req.body;
    const senderId = req.userId;
    if (!recipientId || !content) {
      return res
        .status(400)
        .json({ message: "Recipient and content are required." });
    }
    const message = new Message({
      sender: senderId,
      recipient: recipientId,
      content,
    });
    await message.save();
    res.status(201).json(message);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all messages between the current user and another user
export const getMessagesBetweenUsers = async (req, res) => {
  try {
    const userId = req.userId;
    const otherUserId = req.params.userId;
    const messages = await Message.find({
      $or: [
        { sender: userId, recipient: otherUserId },
        { sender: otherUserId, recipient: userId },
      ],
    })
      .sort({ createdAt: 1 })
      .populate("sender", "username name")
      .populate("recipient", "username name");
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a list of unique users the current user has conversations with
export const getConversations = async (req, res) => {
  try {
    const userId = req.userId;
    const messages = await Message.find({
      $or: [{ sender: userId }, { recipient: userId }],
    });
    // Get unique user IDs
    const userIds = new Set();
    messages.forEach((msg) => {
      if (msg.sender.toString() !== userId) userIds.add(msg.sender.toString());
      if (msg.recipient.toString() !== userId)
        userIds.add(msg.recipient.toString());
    });
    // Fetch user details
    const users = await User.find({ _id: { $in: Array.from(userIds) } }).select(
      "_id username name"
    );
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
