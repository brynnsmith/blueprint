const cloudinary = require("../middleware/cloudinary");
const JobPost = require("../models/JobPost");
const Interview = require("../models/Interview");
const Event = require("../models/Event");
const Contact = require("../models/Contact");

module.exports = {
  // PROFILE
  getProfile: async (req, res) => {
    try {
      const jobPosts = await JobPost.find({ user: req.user.id }).sort({ dateAdded: "desc" }).lean();
      const interviews = await Interview.find({ user: req.user.id }).sort({ intDate: 1 }).lean();
      const events = await Event.find({ user: req.user.id }).sort({eventDate: 1 }).lean();
      res.render("profile.ejs", { jobPosts: jobPosts, user: req.user, interviews: interviews, events: events });
    } catch (err) {
      console.log(err);
    }
  },
  // JOB POST
  getJobPost: async (req, res) => {
    try {
      const jobPost = await JobPost.findById(req.params.id);
      const interview = await Interview.findById(req.params.id);
      res.render("jobPost.ejs", { jobPost: jobPost, user: req.user, interview: interview });
    } catch (err) {
      console.log(err);
    }
  },
  getAddJob: async (req, res) => {
    try {
      await res.render("addJob.ejs")
    } catch (err) {
      console.log(err);
    }
  },
  createJobPost: async (req, res) => {
    try {
      /* Upload image to cloudinary
      const result = await cloudinary.uploader.upload(req.file.path); */

      await JobPost.create({
        //image: result.secure_url,
        //cloudinaryId: result.public_id,
        jobTitle: req.body.jobTitle,
        jobPostURL: req.body.jobPostURL,
        company: req.body.company,
        companyURL: req.body.companyURL,
        jobLocation: req.body.jobLocation,
        salary: req.body.salary,
        description: req.body.description,
        skillsRequired: req.body.skillsRequired,
        likes: 0,
        user: req.user.id,
      });
      console.log("Post has been added!");
      res.redirect("/profile");
    } catch (err) {
      console.log(err);
    }
  },
  likeJobPost: async (req, res) => {
    try {
      await JobPost.findOneAndUpdate(
        { _id: req.params.id },
        {
          $inc: { likes: 1 },
        }
      );
      console.log("Likes +1");
      res.redirect(`/jobPost/${req.params.id}`);
    } catch (err) {
      console.log(err);
    }
  },
  

// TODO: UPDATE THIS TO MAKE IT UPDATE JOB STATUS
  markApplied: async (req, res) => {
    try {
      await JobPost.findOneAndUpdate(
        { _id: req.params.id },
        { $set: {
          applied: true
        } },
      );
      console.log("Marked as Applied for job");
      res.redirect(`/jobPost/${req.params.id}`);
    } catch (err) {
      console.log(err);
    }
  },

  deleteJobPost: async (req, res) => {
    try {
      // Find post by id
      //let jobPost = await JobPost.findById({ _id: req.params.id });
      // Delete image from cloudinary
      //await cloudinary.uploader.destroy(jobPost.cloudinaryId);
      // Delete post from db
      await JobPost.remove({ _id: req.params.id });
      console.log("Deleted Post");
      res.redirect("/profile");
    } catch (err) {
      res.redirect("/profile");
    }
  },
 
getEditJob: async (req,res)  => {
  try {
    const jobPost = await JobPost.findById(req.params.id);
    await res.render("editJob.ejs", { jobPost: jobPost, user: req.user })
  } catch (err) {
    console.log(err)
  }
},
getFeed: async (req, res) => {
  try {
    const jobPosts = await JobPost.find().sort({ createdAt: "desc" }).lean();
    res.render("feed.ejs", { jobPosts: jobPosts });
  } catch (err) {
    console.log(err);
  }
},

// INTERVIEW

getInterview: async (req, res) => {
  try {
    const interview = await Interview.findById(req.params.id);
    res.render("interview.ejs", { interview: interview, user: req.user });
  } catch (err) {
    console.log(err);
  }
},

getAddInterview: async (req, res) => {
    try {
      const jobPosts = await JobPost.find({ user: req.user.id }).sort({ company: 1 }).lean();
      await res.render("addInterview.ejs", { jobPosts: jobPosts, user: req.user })
    } catch (err) {
      console.log(err);
    }
  },
createInterview: async (req, res) => {
  try {
   // let jobPost = await JobPost.findById({ _id: req.params.id });
    await Interview.create({
      intTime: req.body.intTime,
      intDate: req.body.intDate,
      intLocation: req.body.intLocation,
      inkLinkURL: req.body.intLinkURL,
      intType: req.body.intType,
      intPerson: req.body.intPerson,
      intNotes: req.body.intNotes,
      intCompleted: req.body.intCompleted,
      intCompany: req.body.intCompany,
      intPosition: req.body.intPosition,
      user: req.user.id,
    });

      console.log("Interview has been added!");
      // TODO: redirect this to the job post it was added to
      res.redirect(`/profile`);
    } catch (err) {
      console.log(err);
    }
},
deleteInterview: async (req, res) => {
  try {
      await Interview.remove({ _id:req.params.id });
      console.log('Interview contact!')
  } catch (err) {
      console.log(err);
  }
},



// NETWORKING 

getAddContact: async (req, res) => {
  try {
    await res.render("addContact.ejs")
  } catch (err) {
    console.log(err);
  }
},
createContact: async (req, res) => {
  try {
  //const jobPost = await JobPost.findById({ _id: req.params.id });
    await Contact.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      company: req.body.company,
      position: req.body.position,
      email: req.body.email,
      phone: req.body.phone,
      linkedInURL: req.body.linkedInURL,
      twitterURL: req.body.twitterURL,
      githubURL: req.body.githubURL,
      facebookURL: req.body.facebookURL,
      connection: req.body.connection,
      contactNotes: req.body.contactNotes,
      coffeeChat: req.body.coffeeChat,
      coffeeChatDate: req.body.coffeeChatDate,
      followUp: req.body.followUp,
      //jobPost: req.jobPost.id,
      user: req.user.id,
    });

      console.log("Contact has been added!");
      // TODO: redirect this to the job post it was added to
      res.redirect(`/profile`);
    } catch (err) {
      console.log(err);
    }
},
getContact: async (req, res) => {
  try {
      const contact = await Contact.findById({ _id: req.params.id });
      const jobPost = await JobPost.findById({ _id: req.params.id });
      await res.render("contact.ejs", { contact: contact, user: req.user, jobPost: jobPost });
  } catch (err) {
      console.log(err);
  }
},
deleteContact: async (req, res) => {
  try {
      //const contact = await Contact.findById({ _id: req.params.id });
      await Contact.remove({ _id:req.params.id });
      console.log('Deleted contact!')
  } catch (err) {
      console.log(err);
  }
},
getAddEvent: async (req, res) => {
  try {
    await res.render("addEvent.ejs", { user:req.user })
  } catch (err) {
    console.log(err);
  }
},
createEvent: async (req, res) => {
  try {
    await Event.create({
      eventTitle: req.body.eventTitle,
      eventDate: req.body.eventDate,
      eventTime: req.body.eventTime,
      eventLocation: req.body.eventLocation,
      eventLinkURL: req.body.eventLinkURL,
      eventType: req.body.eventType,
      eventNotes: req.body.eventNotes,
      eventContact: req.body.eventContact,
      user: req.user.id,
    });
      console.log("Event has been added!");
      // TODO: redirect this to the job post it was added to
      res.redirect(`/profile`);
    } catch (err) {
      console.log(err);
    }
},
getEvent: async (req, res) => {
  try {
      const event = await Event.findById({ _id: req.params.id });
      res.render("event.ejs", { event: event, user: req.user });
  } catch (err) {
      console.log(err);
  }
},
deleteEvent: async (req, res) => {
  try {
      await Event.remove({ _id:req.params.id });
      console.log('Deleted event!')
  } catch (err) {
      console.log(err);
  }
}


};
