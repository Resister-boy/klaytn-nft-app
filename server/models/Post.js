const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
	{
		userId: {
			type: String,
			required: true,
		},
		title: {
			type: String,
			required: true,
			max: 40,
		},
		content: {
			type: String,
			max: 500,
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
		isOnSale: {
			type: Boolean,
			default: false,
		},
		tokenId: {
			type: String,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);