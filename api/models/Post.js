const mongoose = require("mongoose");

const PostSchema = new mogoose.Schema(
	{
		walletAddress: {
			type: String,
			required: true,
			unique: true,
			min: 42,
			max: 42,
		},
		title: {
			type: String,
			min: 3,
			max: 40,
		},
		content: {
			type: String,
			min: 10,
			max: 100,
		},
		date: {
			type: Date,
			default: Date.now,
		},
		image: {
			type: String,
		},
		isNFT: {
			type: Boolean,
			default: false,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);