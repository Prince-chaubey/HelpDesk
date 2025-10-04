const User = require("../models/User");

// GET current user
exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

// UPDATE current user
exports.updateMe = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.name = name;
    user.email = email;
    if (password) user.password = password; // hashed automatically in pre-save

    await user.save();
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

