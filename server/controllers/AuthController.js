import { Router } from "express";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = Router();

router.post("/register", async (req, res) => {
  const { email, password, firstName, lastName } = req.body;
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(422).json({ message: "User already exists" });
    return;
  } else {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    const user = await User({
      email,
      password: hashedPassword,
      firstName,
      lastName,
    });
    await user.save();
    res.status(201).json({ message: "User registered successfully!" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    res.status(400).json({ message: "Credentials does not match" });
    return;
  }
  const passwordMatched = bcrypt.compareSync(password, user.password);
  if (!passwordMatched) {
    res.status(400).json({ message: "Credentials does not match!" });
    return;
  }
  // create jwt token
  const payload = {
    username: user.email,
    _id: user._id,
  };
  const token = jwt.sign(payload, process.env.JWT_SECRET);
  res.json({ message: "Login successful!", token });
});

export default router;
