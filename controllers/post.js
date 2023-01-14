const Post = require("../models/Post");

exports.createNewPost = (req, res, next) => {
  try {
    const reqData = req.body;
    const reqFile = req.file;

    console.log("reqData:", reqData);
    console.log("reqFile:", reqFile);

    const newPost = new Post({
      title: reqData.title,
      content: reqData.content,
      image: "",
      updatedAt: new Date(),
    });
    newPost.save();
    res.end();
  } catch (error) {
    return next(new Error(error));
  }
};

exports.getPosts = async (req, res, next) => {
  try {
    const posts = await Post.find();
    res.send(posts);
  } catch (error) {
    return next(new Error(error));
  }
};
