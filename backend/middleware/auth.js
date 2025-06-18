import jwt from "jsonwebtoken";
import User from "../models/user.js";
import logger from "../utils/logger.js";

const auth = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    logger.warn("Missing or invalid authorization header");
    return res.status(401).json({ error: "Authorization token required" });
  }

  const token = authorization.split(" ")[1];

  try {
    let decodedData;

    const isCustomAuth = token.length < 500;

    if (isCustomAuth) {
      // Custom JWT (your app)
      decodedData = jwt.verify(token, process.env.SECRET);

      req.userId = decodedData?.id;

      // Optionally attach the full user
      const user = await User.findById(req.userId).select("_id");
      if (!user) {
        logger.warn("User not found during authentication", {
          userId: req.userId,
        });
        return res.status(401).json({ error: "User not found" });
      }
      req.user = user;
    } else {
      // Google OAuth JWT (no secret needed)
      decodedData = jwt.decode(token);

      req.userId = decodedData?.sub; // Google tokens use "sub" as user ID
      req.user = { _id: req.userId }; // Fake user object with just an ID
    }

    next();
  } catch (error) {
    logger.error("Authentication error", {
      error: error.message,
      stack: error.stack,
    });
    res.status(401).json({ error: "Request is not authorized" });
  }
};

export default auth;
