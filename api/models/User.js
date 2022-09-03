const mongoose = require("mongoose");

const PostSchema = new mogoose.Schema(
	{
		walletAddress: {
			type: String,
			required: true,
			unique: true,
			min: 40,
			max: 40,
		},
		title: {
			type: String,
			required: true,
			min: 3,
			max: 40,
		},
		content: {
			type: String,
			min: 10,
			max: 100,
			default: "",
		},
		date: {
			type: Date,
			default: Date.now,
		},
		image: {
			type: String,
			default: "",
		},
		isNFT: {
			type: Boolean,
			default: false,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);