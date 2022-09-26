const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const homeController = require("../controllers/home");
const jobPostsController = require("../controllers/jobPosts");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Main Routes - simplified for now
router.get("/", homeController.getIndex);
router.get("/profile", ensureAuth, jobPostsController.getProfile);
router.get("/addJob", ensureAuth, jobPostsController.getAddJob)
router.get("/editJob", ensureAuth, jobPostsController.getEditJob)
router.get("/addInterview", ensureAuth, jobPostsController.getAddInterview)
router.get("/feed", ensureAuth, jobPostsController.getFeed);
router.get("/login", authController.getLogin);
router.post("/login", authController.postLogin);
router.get("/logout", authController.logout);
router.get("/signup", authController.getSignup);
router.post("/signup", authController.postSignup);

module.exports = router;
