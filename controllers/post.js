const Post = require("../models/Post");
const fs = require("fs");

const io = require("../socket");

exports.createNewPost = async (req, res, next) => {
  try {
    const reqData = req.body;
    const reqFile = req.file;

    // console.log("reqData:", reqData);
    // console.log("reqFile:", reqFile);
    const image = reqFile.path.replace("\\", "/");
    console.log("image:", image);

    const newPost = new Post({
      title: reqData.title,
      content: reqData.content,
      image: image,
      updatedAt: new Date(),
    });
    await newPost.save();
    // const posts = await Post.find();
    io.getIO().emit("posts", { action: "newPost", post: newPost });
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

exports.getPost = async (req, res, next) => {
  try {
    const id = req.query.id;
    const post = await Post.findById(id);
    // console.log("post:", post);
    if (post != null) {
      const _date = new Date(post.updatedAt);
      const _post = {
        ...post._doc,
        date:
          _date.getDate() +
          "/" +
          _date.getMonth() +
          1 +
          "/" +
          _date.getFullYear(),
      };
      res.send(_post);
    } else {
      res.statusMessage = "No Post Found";
      res.status(404).send({ msg: "No Post Found" });
    }
  } catch (error) {
    return next(new Error(error));
  }
};

exports.deletePost = async (req, res, next) => {
  try {
    const id = req.body.id;
    const post = await Post.findById(id).select("image");
    // console.log("post:", post);
    if (post.image != null || post.image != "") {
      fs.unlinkSync(post.image);
    }
    await Post.findByIdAndDelete(id);
    io.getIO().emit("posts", { action: "deletePost", post: id });

    res.end();
  } catch (error) {
    return next(new Error(error));
  }
};

exports.editPost = async (req, res, next) => {
  try {
    const reqFile = req.file;
    const reqData = req.body;
    // console.log("reqData:", reqData);
    // console.log("reqFile:", reqFile);
    const imagePath = reqFile ? reqFile.path.replace("\\", "/") : reqData.image;
    // console.log("image:", image);
    let editedPost = {
      title: reqData.title,
      content: reqData.content,
      image: imagePath,
      updatedAt: new Date(),
    };

    await Post.findByIdAndUpdate(reqData._id, editedPost);
    editedPost = await Post.findById(reqData._id);
    io.getIO().emit("posts", { action: "updatePost", post: editedPost });
    res.end();
  } catch (error) {
    return next(new Error(error));
  }
};
