import User from "../models/User.js";

// GET profile
export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch profile" });
  }
};

// UPDATE profile
export const updateProfile = async (req, res) => {
  try {
    const { name, city } = req.body;

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.name = name || user.name;
    user.city = city || user.city;

    await user.save();

    res.json({
      message: "Profile updated successfully",
      name: user.name,
      city: user.city
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to update profile" });
  }
};
