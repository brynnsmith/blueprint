const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const jobPostsController = require("../controllers/jobPosts");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Post Routes
router.get("/:id", ensureAuth, jobPostsController.getJobPost);
router.get("/editJob/:id", ensureAuth, jobPostsController.editJob);

router.post("/createJobPost", upload.single("file"), jobPostsController.createJobPost);

router.post("/createInterview", upload.single("file"), jobPostsController.createInterview);

router.post("/createEvent", upload.single("file"), jobPostsController.createEvent);

router.put("/likeJobPost/:id", jobPostsController.likeJobPost);

// router.put("/updateJobStatus/:id", jobPostsController.updateJobStatus);

// Update when updateJobStatus has been created
router.put("/markApplied/:id", jobPostsController.markApplied);

router.delete("/deleteJobPost/:id", jobPostsController.deleteJobPost);

module.exports = router;
