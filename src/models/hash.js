const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Hash = new Schema(
  {
    hash: { type: String },
    type: {
      type: String,
      enum: ["file", "json"],
      default: "file",
    },
    content: { type: Object },
  },
  {
    timestamps: true,
  }
);

module.exports = {
  Hash: mongoose.model("Hash", Hash),
};
