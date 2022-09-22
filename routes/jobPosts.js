const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const jobPostsController = require("../controllers/jobPosts");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Post Routes - simplified for now
router.get("/:id", ensureAuth, jobPostsController.getJobPost);

router.post("/createJobPost", upload.single("file"), jobPostsController.createJobPost);

router.put("/likeJobPost/:id", jobPostsController.likeJobPost);

router.delete("/deleteJobPost/:id", jobPostsController.deleteJobPost);

module.exports = router;
