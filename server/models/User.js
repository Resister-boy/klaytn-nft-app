const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
	{
		walletAddress: {
			type: String,
			required: true,
			uniuqe: true,
			min: 42,
			max: 42,
		},
		username: {
			type: String,
			required: true,
			min: 3,
			max: 20,
			unique: true,
		},
		tokenIdHead: {
			type: String,
			required: true,
			unique: true,
		},
		tokenIdTail: {
			type: String,
			required: true,
			unique: true,
		},
		profilePicture: {
			type: String,
			default: "",
		},
		coverPicture: {
			type: String,
			default: "",
		},
		followers: {
			type: Array,
			default: [],
		},
		followings: {
			type: Array,
			default: [],
		},
		isAdmin: {
			type: Boolean,
			default: false,
		},
		desc: {
			type: String,
			max: 50,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);