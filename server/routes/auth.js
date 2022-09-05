const router = require("express").Router();
const User = require("../models/User");

//REGISTER
router.post("/register", async (req, res) => {
	try {
		//create new user
		const newUser = new User({
			walletAddress: req.body.walletAddress,
			username: req.body.username,
		});
	
		//save user and respond
		const user = await newUser.save();
		res.status(200).json(user);
	} catch (err) {
		console.log(err);
	}	
});

//LOGIN
router.post("/login", async (req, res) => {
	try {
		const user = await User.findOne({ walletAddress: req.body.walletAddress });
		console.log(user);
		if (!user)
			return (res.status(404).json("user not found"));
		res.status(200).json(user);
	} catch (err) {
		res.status(500).json(err);
	}
});

module.exports = router;