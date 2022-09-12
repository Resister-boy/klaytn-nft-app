const router = require("express").Router();
const User = require("../models/User");

//REGISTER
router.post("/register", async (req, res) => {
	try {
		//create new user
		//requset body에 있는 walletAddress, username을 가지고 새로운 user 등록
		const newUser = new User({
			walletAddress: req.body.walletAddress,
			username: req.body.username,
			tokenIdHead: req.body.tokenIdHead,
			tokenIdTail: req.body.tokenIdTail,
		});
	
		//save user and respond
		//성공적으로 등록이 됐다면 status:200 user 반환
		const user = await newUser.save();
		res.status(200).json(user);
	} catch (err) {
		res.status(500).json(err)
	}
});

//LOGIN
router.post("/login", async (req, res) => {
	try {
		//requset body에 있는 walletAddress로 user 정보를 찾는다.
		const user = await User.findOne({ walletAddress: req.body.walletAddress });
		console.log(user);
		//user가 존재하지 않는다면 status:404 "user not found" 반환
		if (!user)
			return (res.status(404).json("user not found"));
		//존재한다면 status:200 user 반환
		res.status(200).json(user);
	} catch (err) {
		res.status(500).json(err)
	}
})

module.exports = router;