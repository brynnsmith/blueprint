const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({

  eventDate: {
    type: Date,
    required: true,
  },
  eventTime: {
    type: String,
    required: true,
  },
  eventLocation: {
     type: String,
  },
  eventLinkURL: {
    type: String,
  },
  eventType: {
    type: String,
  },
  eventNotes: {
    type: String,
  },
  eventCompleted: {
    type: Boolean,
    default: false,
  },
  contact: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Contact",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  }
});

module.exports = mongoose.model("Event", EventSchema);