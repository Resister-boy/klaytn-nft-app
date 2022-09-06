const router = require("express").Router();
const Post = require("../models/Post");
const User = require("../models/User");

//create a post
router.post("/", async (req, res) => {
	const newPost = new Post(req.body);
	try {
		const savedPost = await newPost.save();
		res.status(200).json(savedPost);
	} catch (err) {
		res.status(500).json(err);
	}
});

//update a post
router.put("/:id", async (req, res) => {
	try {
		const post = await Post.findById(req.params.id);
		if (post.walletAddress === req.body.walletAddress) {
			await post.updateOne({ $set: req.body });
			res.status(200).json("The post has been updated");
		} else {
			res.status(403).json("You can update only your post");
		}
	} catch (err) {
		res.status(500).json(err);
	}
});

//delete a post
router.delete("/:id", async (req, res) => {
	try {
		const post = await Post.findById(req.params.id);
		if (post.walletAddress === req.body.walletAddress) {
			await post.deleteOne();
			res.status(200).json("The post has been deleted");
		} else {
			res.status(403).json("You can delete only your post");
		}
	} catch (err) {
		res.status(500).json(err);
	}
});

//get a post
router.get("/:id", async (req, res) => {
	try {
		const post = await Post.findById(req.params.id);
		res.status(200).json(post);
	} catch (err) {
		res.status(500).json(err);
	}
});

//get user posts
router.get("/user/:userId", async (req, res) => {
	try {
		const currentUser = await User.findById(req.params.userId);
		const userPosts = await Post.find({ userId: currentUser._id });
		res.status(200).json(userPosts);
	} catch (err) {
		res.status(500).json(err);
	}
});

//get timeline posts
router.get("/timeline/all", async (req, res) => {
	try {
		const allPosts = await Post.find();
		res.status(200).json(allPosts);
	} catch (err) {
		res.status(500).json(err);
	}
});

module.exports = router