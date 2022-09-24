const mongoose = require("mongoose");

const InterviewSchema = new mongoose.Schema({

  intDate: {
    type: Date,
    required: true,
  },
  intTime: {
    type: String,
    required: true,
  },
  intLocation: {
     type: String,
  },
  intLinkURL: {
    type: String,
  },
  intType: {
    type: String,
  },
  intPerson: {
    type: String,
  },
  intNotes: {
    type: String,
  },
  intCompleted: {
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

module.exports = mongoose.model("Interview", InterviewSchema);