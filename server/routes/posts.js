const router = require("express").Router();
const Post = require("../models/Post");
const User = require("../models/User");

//create a post
router.post("/", async (req, res) => {
	//requset body를 가지고 newPost 생성
	const newPost = new Post(req.body);
	try {
		const savedPost = await newPost.save();
		//저장 성공시 status:200 post 반환
		res.status(200).json(savedPost);
	} catch (err) {
		res.status(500).json(err);
	}
});

//update a post
router.put("/:id", async (req, res) => {
	try {
		//requset parameter에 있는 _id 가지고 post find
		const post = await Post.findById(req.params.id);
		if (post.userId === req.body.userId) {
			//update 하려는 post의 작성자인 userId가 requset body userId와 같을 때
			//requset body 가지고 post update
			await post.updateOne({ $set: req.body });
			//성공시 status:200
			res.status(200).json("The post has been updated");
		} else {
			//userId가 다를 시 status:403
			res.status(403).json("You can update only your post");
		}
	} catch (err) {
		res.status(500).json(err);
	}
});

// update owner's id
router.put("/modifiyOwner/:id", async (req, res) => {
	try {
		//requset parameter에 있는 _id 가지고 post find
		const post = await Post.findById(req.params.id);
		if (post.isOnSale && post.isNFT) {
			//update 하려는 post의 작성자인 userId가 requset body userId와 같을 때
			//requset body 가지고 post update
			await post.updateOne({ $set: req.body });
			//성공시 status:200
			res.status(200).json("The post has been updated");
		} else {
			//userId가 다를 시 status:403
			res.status(403).json("You can update only your post");
		}
	} catch (err) {
		res.status(500).json(err);
	}
});
//delete a post
router.delete("/:id", async (req, res) => {
	try {
		//requset parameter의 _id를 가지고 post find
		const post = await Post.findById(req.params.id);
		if (post.userId === req.body.userId) {
			//post의 userId가 requset body의 userId와 같을 때
			await post.deleteOne();
			//delete 성공시 status:200
			res.status(200).json("The post has been deleted");
		} else {
			//post의 userId가 다를 때 status:403
			res.status(403).json("You can delete only your post");
		}
	} catch (err) {
		res.status(500).json(err);
	}
});

//get a post
router.get("/:id", async (req, res) => {
	try {
		//requset parameter _id로 post를 찾고
		const post = await Post.findById(req.params.id);
		//찾아진 post 반환. status:200
		res.status(200).json(post);
	} catch (err) {
		res.status(500).json(err);
	}
});

//get user posts
router.get("/user/:userId", async (req, res) => {
	try {
		//request parameter로 보낸 userId로 현재 user를 찾고
		const currentUser = await User.findById(req.params.userId);
		//user의 _id로 user가 작성한 post들을 찾는다.
		const userPosts = await Post.find({ userId: currentUser._id });
		//status:200 찾은 userPosts 반환.
		res.status(200).json(userPosts);
	} catch (err) {
		res.status(500).json(err);
	}
});

//get timeline posts
router.get("/timeline/all", async (req, res) => {
	try {
		//Post db에 저장된 값들을 모두 가져온다.
		const allPosts = await Post.find();
		//status:200 allPosts 반환.
		res.status(200).json(allPosts);
	} catch (err) {
		res.status(500).json(err);
	}
});

module.exports = router