const express = require("express");
const router = express.Router();

const postController = require("../controllers/post");

router.post("/create-new-post", postController.createNewPost);
router.get("/get-posts", postController.getPosts);
router.get("/get-post", postController.getPost);
router.post("/delete-post", postController.deletePost);
router.post("/edit-post", postController.editPost);

exports.route = router;
