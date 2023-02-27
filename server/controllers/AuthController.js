import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  const { email, password, firstName, lastName } = req.body;
  const userExists = await User.findOne({ email });
  const categories = [
    { label: "Travel", icon: "user" },
    { label: "Fun", icon: "user" },
    { label: "Work", icon: "user" },
    { label: "Home", icon: "user" },
    { label: "Transport", icon: "user" },
  ];
  if (userExists) {
    res.status(422).json({ message: "User already exists", icon: "user" });
    return;
  } else {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    const user = await User({
      email,
      password: hashedPassword,
      firstName,
      lastName,
      categories,
    });
    await user.save();
    res.status(201).json({ message: "User registered successfully!" });
  }
};

export const login = async (req, res) => {
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
};
