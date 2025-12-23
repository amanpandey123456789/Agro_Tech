const express = require("express");
const Crop = require("../models/Crop");
const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");

const router = express.Router();

// ADD CROP (FARMER)
router.post("/", auth, role("farmer"), async (req, res) => {
  const crop = await Crop.create({
    ...req.body,
    farmerId: req.user.id
  });
  res.json(crop);
});

// DELETE CROP (FARMER)
router.delete("/:id", auth, role("farmer"), async (req, res) => {
  const crop = await Crop.findOneAndDelete({ _id: req.params.id, farmerId: req.user.id });
  if (!crop) return res.status(404).json({ message: "Crop not found" });
  res.json({ message: "Crop deleted" });
});

// UPDATE CROP (FARMER)
router.put("/:id", auth, role("farmer"), async (req, res) => {
  const crop = await Crop.findOneAndUpdate(
    { _id: req.params.id, farmerId: req.user.id },
    req.body,
    { new: true }
  );
  if (!crop) return res.status(404).json({ message: "Crop not found" });
  res.json(crop);
});

// VIEW CROPS (PUBLIC)
router.get("/", async (req, res) => {
  const crops = await Crop.find().populate('farmerId', 'name');
  res.json(crops);
});

module.exports = router;
