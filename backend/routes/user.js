import express from "express";
import auth from "../middleware/auth.js";
const router = express.Router();

import { signin, signup, updateUser } from "../controllers/user.js";

router.post("/signin", signin);
router.post("/signup", signup);
router.patch("/:id", auth, updateUser);

router.get("/protected", auth, (req, res) => {
  res.json({ message: "This is a protected route", user: req.user });
});

export default router;
