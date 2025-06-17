import { body, validationResult } from "express-validator";

// Validation middleware
export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Post validation rules
export const postValidationRules = [
  body("title")
    .trim()
    .isLength({ min: 3, max: 200 })
    .withMessage("Title must be between 3 and 200 characters")
    .escape(),

  body("body")
    .trim()
    .isLength({ min: 10 })
    .withMessage("Body must be at least 10 characters long")
    .escape(),

  body("tags").optional().isArray().withMessage("Tags must be an array"),

  body("tags.*")
    .optional()
    .isString()
    .trim()
    .isLength({ min: 2, max: 30 })
    .withMessage("Each tag must be between 2 and 30 characters")
    .escape(),

  body("snippet")
    .optional()
    .trim()
    .isLength({ max: 300 })
    .withMessage("Snippet must not exceed 300 characters")
    .escape(),

  body("selectedFile")
    .optional()
    .custom((value) => {
      if (!value) return true; // Allow empty/undefined values
      if (typeof value !== "string") return false;
      if (!value.startsWith("data:image/")) {
        throw new Error(
          "Invalid image format. Only JPEG, PNG, GIF, and WebP are allowed"
        );
      }
      // Check if base64 string is not too large (5MB limit)
      const base64Data = value.split(",")[1];
      const sizeInBytes = Math.ceil((base64Data.length * 3) / 4);
      const sizeInMB = sizeInBytes / (1024 * 1024);
      if (sizeInMB > 5) {
        throw new Error("Image size must not exceed 5MB");
      }
      return true;
    }),
];

// User validation rules
export const userValidationRules = [
  body("email")
    .trim()
    .isEmail()
    .withMessage("Please enter a valid email")
    .normalizeEmail(),

  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long")
    .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)
    .withMessage(
      "Password must contain at least one letter, one number, and one special character"
    ),

  body("username")
    .trim()
    .isLength({ min: 3, max: 30 })
    .withMessage("Username must be between 3 and 30 characters")
    .matches(/^[a-zA-Z0-9_]+$/)
    .withMessage("Username can only contain letters, numbers, and underscores")
    .escape(),

  body("name")
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage("Name must be between 2 and 100 characters")
    .escape(),
];
