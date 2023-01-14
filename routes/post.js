const express = require("express");
const router = express.Router();

const postController = require("../controllers/post");

router.post("/create-new-post", postController.createNewPost);
router.get("/get-posts", postController.getPosts);

exports.route = router;
