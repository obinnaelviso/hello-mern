import User from "../models/User.js";
export const create = async (req, res) => {
  const { label, icon } = req.body;
  await User.updateOne(
    { _id: req.user._id },
    { $set: { categories: [...req.user.categories, { label, icon }] } }
  );
  res.json({ message: "New category created successfully!" });
};
export const update = async (req, res) => {
  const categories = req.user.categories;
  const newCategories = categories.filter(
    (category) => category._id != req.params.id
  );
  User.updateOne(
    { _id: req.user._id },
    { $set: { categories: newCategories } }
  );
  res.json({ user: req.user, message: "Category deleted successfully!" });
};

export const destroy = async (req, res) => {
  const categories = req.user.categories;
  const newCategories = categories.filter(
    (category) => category._id != req.params.id
  );
  await User.updateOne(
    { _id: req.user._id },
    { $set: { categories: newCategories } }
  );
  res.json({ message: "Category deleted successfully!" });
};
