const { Schema, default: mongoose, Mongoose } = require("mongoose");

const getDateToday = () => new Date().toJSON().slice(0, 10);

const User = Schema({
  name: {
    type: String,
    required: [true, "Enter A Valid Name"],
  },
  email: {
    type: String,
    lowercase: true,
    unique: [true, "Email Already Registered"],
    match: [/[a-z0-9]+@[a-z]+\.[a-z]{2,3}/, "Invalid Email"],
  },
  password: {
    type: String,
    required: true,
    minLength: [6, "Password Length Should Be Atleast 6"],
  },
  city: {
    type: String,
    required: [true, "Choose A City Name"],
  },
  country: {
    type: String,
    required: true,
  },
  birthDate: {
    type: Date,
    immutable: true,
    max: [getDateToday(), "Enter A Valid Birthdate!"]
  }
  ,
  phone: {
    type: Number,
    required: true,
    validate: {
      validator: (value) => value.toString().length === 10,
      message: "Enter A 10 Digit Phone Number",
    },
    unique: [true, "Phone Number Already Registered"],
  },
  role: {
    type: String,
    required: true,
  },
  sex: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    immutable: true,
    default: () => Date.now(),
  },
  emailVerified: {
    type: Boolean,
    default: false
  },
  mailVerificationHash: String,
  monthly: {
    type: Number,
    default: 0
  },
  state: {
    type: String,
    required: true
  },
  currentRequests: new mongoose.Schema({
    petParent: Schema.Types.ObjectId,
    pet:Schema.Types.ObjectId,
    status:String
  })
});

module.exports = mongoose.model("User", User);
