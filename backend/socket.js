import { Server as SocketIOServer } from "socket.io";
import Message from "./models/messageModel.js";

export default function setupSocket(server) {
  const io = new SocketIOServer(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  // UserId to socketId mapping
  const userSocketMap = {};

  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    // Register userId with this socket
    socket.on("register", (userId) => {
      userSocketMap[userId] = socket.id;
      socket.userId = userId; // Attach to socket for cleanup
      console.log(`User ${userId} registered with socket ${socket.id}`);
    });

    // Handle sending messages
    socket.on("send_message", async (data) => {
      // data: { recipientId, content, senderId }
      try {
        // Save message to DB
        const message = new Message({
          sender: data.senderId,
          recipient: data.recipientId,
          content: data.content,
          // read: false by default
        });
        const savedMessage = await message.save();
        // Emit to recipient if online
        const recipientSocketId = userSocketMap[data.recipientId];
        if (recipientSocketId) {
          io.to(recipientSocketId).emit("receive_message", savedMessage);
          console.log(
            `Delivered message to user ${data.recipientId} at socket ${recipientSocketId}`
          );
        } else {
          console.log(
            `User ${data.recipientId} is not connected. Message saved as unread.`
          );
        }
        // Optionally, emit ack to sender
        socket.emit("message_sent", savedMessage);
      } catch (error) {
        console.error("Error saving message:", error);
        socket.emit("message_error", { error: error.message });
      }
    });

    socket.on("disconnect", () => {
      // Clean up userSocketMap
      if (socket.userId && userSocketMap[socket.userId] === socket.id) {
        delete userSocketMap[socket.userId];
        console.log(`User ${socket.userId} disconnected and mapping removed.`);
      } else {
        console.log("User disconnected:", socket.id);
      }
    });
  });
}
