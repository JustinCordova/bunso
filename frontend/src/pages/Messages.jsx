import React, { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import axios from "axios";

const SOCKET_URL = "http://localhost:4000"; // Adjust if backend runs elsewhere
const API_URL = "http://localhost:4000";

const Messages = () => {
  const socketRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [conversations, setConversations] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const user = JSON.parse(localStorage.getItem("bunso_user"));

  // Ref for the chat messages container
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);
  const [isAtBottom, setIsAtBottom] = useState(true);
  const [lastMessageCount, setLastMessageCount] = useState(0);

  // Find the selected user object from allUsers
  const selectedUser = allUsers.find((u) => u._id === selectedUserId) || null;

  // Helper: robustly check if a message is from the current user
  const isOwnMessage = (msg) => {
    const senderId =
      typeof msg.sender === "object" && msg.sender !== null
        ? msg.sender._id
        : msg.sender;
    return senderId === user._id || msg.senderId === user._id;
  };

  // Fetch all users (except self) for sidebar - only once on mount
  useEffect(() => {
    if (!user || !user._id) return;
    axios
      .get(`${API_URL}/users/all`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("bunso_token")}`,
        },
      })
      .then((res) => {
        setAllUsers(res.data);
        // If no user is selected, select the first user by default (optional)
        // if (!selectedUserId && res.data.length > 0) setSelectedUserId(res.data[0]._id);
      })
      .catch((err) => console.error("Failed to fetch users", err));
    // eslint-disable-next-line
  }, []); // Only on mount

  // Fetch conversations on mount (for highlighting)
  useEffect(() => {
    if (!user || !user._id) return;
    axios
      .get(`${API_URL}/messages/conversations`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("bunso_token")}`,
        },
      })
      .then((res) => setConversations(res.data))
      .catch((err) => console.error("Failed to fetch conversations", err));
  }, [user]);

  // Fetch message history when selectedUserId changes
  useEffect(() => {
    if (!user || !user._id || !selectedUserId) return;
    axios
      .get(`${API_URL}/messages/with/${selectedUserId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("bunso_token")}`,
        },
      })
      .then((res) => {
        // Preserve any optimistic messages when fetching history
        setMessages((prev) => {
          const optimisticMessages = prev.filter((msg) => msg.isOptimistic);
          return [...res.data, ...optimisticMessages];
        });
      })
      .catch((err) => console.error("Failed to fetch messages", err));
  }, [user, selectedUserId]);

  // Socket.IO connection and listeners
  useEffect(() => {
    if (!user || !user._id) return;
    const socket = io(SOCKET_URL);
    socketRef.current = socket;
    socket.emit("register", user._id);

    socket.on("receive_message", (msg) => {
      // Only add if it's for the current conversation
      if (
        selectedUserId &&
        ((msg.sender === selectedUserId && msg.recipient === user._id) ||
          (msg.sender === user._id && msg.recipient === selectedUserId))
      ) {
        setMessages((prev) => {
          // Check if message already exists (prevent duplicates)
          const exists = prev.some(
            (existingMsg) =>
              existingMsg._id === msg._id ||
              (existingMsg.content === msg.content &&
                existingMsg.createdAt === msg.createdAt &&
                existingMsg.sender === msg.sender)
          );
          if (exists) return prev;
          return [...prev, msg];
        });
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [user, selectedUserId]);

  // Scroll handler to track if user is at bottom
  const handleScroll = () => {
    if (!chatContainerRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current;
    // Consider within 40px of bottom as "at bottom"
    setIsAtBottom(scrollHeight - scrollTop - clientHeight < 40);
  };

  // Auto-scroll to bottom only if user is at bottom or a message is sent by the user
  useEffect(() => {
    if (!chatContainerRef.current) return;
    // If new message is from self, always scroll
    const lastMsg = messages[messages.length - 1];
    if (!lastMsg) return;
    const isOwn = isOwnMessage(lastMsg);
    if (isOwn || isAtBottom) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
    setLastMessageCount(messages.length);
  }, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim() || !selectedUserId) return;

    const optimisticId = `optimistic_${Date.now()}_${Math.random()}`;
    const msg = {
      _id: optimisticId,
      senderId: user._id,
      recipientId: selectedUserId,
      content: input,
      createdAt: new Date().toISOString(),
      sender: user._id,
      recipient: selectedUserId,
      isOptimistic: true, // Flag to identify optimistic messages
    };

    // Show immediately (optimistic UI)
    setMessages((prev) => [...prev, msg]);
    setInput("");

    // Try to send via socket (for real-time delivery)
    if (socketRef.current && socketRef.current.connected) {
      socketRef.current.emit("send_message", {
        senderId: user._id,
        recipientId: selectedUserId,
        content: input,
      });
    }
  };

  // Helper: check if user is in conversations
  const isInConversations = (userId) =>
    conversations.some((conv) => conv._id === userId);

  return (
    <div className="flex max-w-4xl mx-auto p-4 h-[80vh]">
      {/* Sidebar: All Users */}
      <div className="w-64 bg-white/10 rounded-l-lg shadow p-4 overflow-y-auto flex flex-col gap-2">
        <h2 className="text-lg font-bold mb-2 text-white/80">Users</h2>
        {allUsers.length === 0 && (
          <div className="text-gray-400 text-sm">No other users found.</div>
        )}
        {allUsers.map((u) => (
          <button
            key={u._id}
            onClick={() => setSelectedUserId(u._id)}
            className={`w-full text-left px-3 py-2 rounded transition-all duration-200 mb-1 ${
              selectedUserId === u._id
                ? "bg-indigo-600 text-white"
                : isInConversations(u._id)
                ? "bg-white/5 text-white/90 font-semibold"
                : "bg-white/5 text-white/80 hover:bg-indigo-700/40"
            }`}
          >
            <div className="font-semibold">{u.username || u.name}</div>
            <div className="text-xs text-gray-300">@{u.username}</div>
            {isInConversations(u._id) && (
              <span className="ml-2 text-xs text-indigo-300">●</span>
            )}
          </button>
        ))}
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 bg-white/10 rounded-r-lg shadow flex flex-col">
        <div
          className="flex-1 p-4 overflow-y-auto flex flex-col gap-2"
          ref={chatContainerRef}
          onScroll={handleScroll}
        >
          {selectedUserId && !selectedUser && (
            <div className="text-gray-400 text-center mt-10">
              User not found. They may have been deleted.
            </div>
          )}
          {selectedUser ? (
            messages.length === 0 ? (
              <div className="text-gray-400 text-center mt-10">
                No messages yet. Start the conversation!
              </div>
            ) : (
              <>
                {messages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex ${
                      isOwnMessage(msg) ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-xs px-4 py-2 rounded-lg shadow text-sm mb-1 ${
                        isOwnMessage(msg)
                          ? "bg-indigo-500 text-white"
                          : "bg-gray-200 text-gray-900"
                      }`}
                    >
                      <div>{msg.content}</div>
                      <div className="text-xs text-right text-white/70 mt-1">
                        {msg.createdAt
                          ? new Date(msg.createdAt).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })
                          : ""}
                      </div>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </>
            )
          ) : (
            <div className="text-gray-400 text-center mt-10">
              Select a user to start chatting.
            </div>
          )}
        </div>
        {/* Input */}
        <form
          onSubmit={handleSend}
          className="flex gap-2 p-4 border-t border-white/10 bg-white/5"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            placeholder={
              selectedUser
                ? `Message @${selectedUser.username || selectedUser.name}`
                : "Select a user..."
            }
            disabled={!selectedUser}
          />
          <button
            type="submit"
            className="px-4 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700 transition"
            disabled={!selectedUser || !input.trim()}
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default Messages;
