const mongoose = require("mongoose");

const cropSchema = new mongoose.Schema({
  name: String,
  price: Number,
  quantity: Number,
  farmerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
});

module.exports = mongoose.model("Crop", cropSchema);
