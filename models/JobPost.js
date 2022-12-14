const mongoose = require("mongoose");

const JobPostSchema = new mongoose.Schema({

  // TODO: Add Autofill generated by API
  company: {
    type: String,
    required: true,
  },

  // TODO: Should dynamically generate with API
  companyLogo: {
    type: String,
  },
  companyURL: {
     type: String,
     required: true,
  },
  jobTitle: {
    type: String,
    required: true,
  },
  jobPostURL: {
    type: String,
    required: true,
  },
  jobLocation: {
    type: String,
    required: true,
  },
  // Should this be number to be able to sort easier?
  salary: {
    type: String,
  }, 
  description: {
    type: String,
  },
  skillsRequired: {
    type: String,
  },
  likes: {
    type: Number,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  dateAdded: {
    type: Date,
    default: Date.now,
  },
  active: {
    type: Boolean,
    default: true,
  },
  applied: {
    type: Boolean,
    default: false, 
  },
  dateApplied: {
    type: Date,
  },
  premiumApp: {
    type: Boolean,
    default: false,
  },
  intview: {
    type: Boolean,
    default: false,
  },
  offer: {
    type: Boolean,
    default: false,
  },
  dateOffered: {
    type: Date,
  },
  offerAccepted: {
    type: Boolean,
    default: false,
  },
  dateAccepted: {
    type: Date,
  },
  jobVault: {
    type: Boolean,
    default: false,
  },
  interestLevel: {
    type: String,
  },
  favourite: {
    type: Boolean,
    default: false,
  },
  image: {
    type: String,
    require: true,
  },
  cloudinaryId: {
    type: String,
    require: true,
  },
  colour: {
    type: String,
  }

});

module.exports = mongoose.model("JobPost", JobPostSchema);

// TODO: I want to use Interview & Contact schemas with this scehema


/* 
image: {
  type: String,
  require: true,
},
cloudinaryId: {
  type: String,
  require: true,
}, */
