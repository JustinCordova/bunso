import rateLimit from "express-rate-limit";

// Create a limiter for general API routes
export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again after 15 minutes",
  standardHeaders: true,
  legacyHeaders: false,
});

// Create a stricter limiter for auth routes
export const authLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5, // Limit each IP to 5 requests per windowMs
  message:
    "Too many login attempts from this IP, please try again after an hour",
  standardHeaders: true,
  legacyHeaders: false,
});
