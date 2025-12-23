const express = require("express");
const User = require("../models/User");
const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");

const router = express.Router();

router.get("/users", auth, role("admin"), async (req, res) => {
  const users = await User.find();
  res.json(users);
});

module.exports = router;
