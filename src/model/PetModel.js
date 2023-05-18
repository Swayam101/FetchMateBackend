const { Schema, model, Mongoose, default: mongoose } = require("mongoose");

const Pet = new Schema({
  name: {
    type: String,
    required: true,
  },
  petType: {
    type: String,
    required: true,
    enum: {
      values: ["Dog", "Cat"],
      message: "Unlisted Pet Type",
    },
  },
  breed: {
    type: String,
    required: [true, "Provide A Pet Name"],
  },
  DOB: {
    type: Date,
    required: true,
  },
  parentId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  medical: String,
});

module.exports = model("Pets", Pet);
