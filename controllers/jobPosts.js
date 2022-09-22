const cloudinary = require("../middleware/cloudinary");
const JobPost = require("../models/JobPost");

module.exports = {
  getProfile: async (req, res) => {
    try {
      const jobPosts = await JobPost.find({ user: req.user.id });
      res.render("profile.ejs", { jobPosts: jobPosts, user: req.user });
    } catch (err) {
      console.log(err);
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
  getJobPost: async (req, res) => {
    try {
      const jobPost = await JobPost.findById(req.params.id);
      res.render("jobPost.ejs", { jobPost: jobPost, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  createJobPost: async (req, res) => {
    try {
      // Upload image to cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);

      await JobPost.create({
        image: result.secure_url,
        cloudinaryId: result.public_id,
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
  deleteJobPost: async (req, res) => {
    try {
      // Find post by id
      let jobPost = await JobPost.findById({ _id: req.params.id });
      // Delete image from cloudinary
      await cloudinary.uploader.destroy(jobPost.cloudinaryId);
      // Delete post from db
      await JobPost.remove({ _id: req.params.id });
      console.log("Deleted Post");
      res.redirect("/profile");
    } catch (err) {
      res.redirect("/profile");
    }
  },
};
