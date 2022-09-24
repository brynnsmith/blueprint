const mongoose = require("mongoose");

const ContactSchema = new mongoose.Schema({

  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  company: {
     type: String,
     // Make default to jobPost _id .companyName
  },
  position: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  linkedInURL: {
    type: String,
  },
  twitterURL: {
    type: String,
  },
  githubURL: {
    type: String,
  },
  facebookURL: {
    type: String,
  },
  connection: {
    type: String,
  },
  contactNotes: {
    type: String,
  },
  coffeeChat: {
    type: Boolean,
    default: false,
  },
  coffeeChatDate: {
    type: Date,
  },
  followUp: {
    type: Boolean,
    default: false,
  },
  jobPost: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "JobPost",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  }

});

module.exports = mongoose.model("Contact", ContactSchema);