const router = require("express").Router();
const axios = require("axios");
const API = require("../KlaytnAPI/API");
const User = require("../models/User");

const isOwnersToken = async (address, tokenId) => {
	var isInclude = false
	const nfts = await API.getNFTs(address);
	for (var i = 0; i < (nfts).length; i++) {
		if (nfts[i].id !== tokenId) {
			continue ;
		} else {
			isInclude = true;
		}
	}
	return isInclude;
}

// get auth URL (QR / mobile)
router.put("/connectURL", async (req, res) => {
	try {
		const response = await axios.post(process.env.A2P_API_PREPARE_URL, {
			bapp: {
				name: process.env.APP_NAME,
			},
			type: "auth"
		});
		const { request_key } = await response.data;
		if (req.body.isMobile === true) {
			res.status(200).json({url: process.env.MB_URL, request_key: request_key});
		} else {
			res.status(200).json({url: process.env.QR_URL, request_key: request_key});
		}
	} catch (err) {
		res.status(500).json(err);
	}
})

// get mint URL
router.put("/mintPostURL", async (req, res) => {
	try {
		// upload metadata
		// const metadataURL = await API.uploadMetaData(req.body, req.body.desc.name, req.body.img);
		// if (!metadataURL) {
		// 	res.status(404).json("failed to upload metadata");
		// }

		// execute contract
		const functionJson = '{ "constant": false, "inputs": [ { "name": "to", "type": "address" }, { "name": "tokenId", "type": "uint256" }, { "name": "tokenURI", "type": "string" } ], "name": "mintWithTokenURI", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }';
		const request_key = await API.executeContract(process.env.NFT_CONTRACT_ADDRESS, functionJson, "0", `["${req.body.toAddress}", "${req.body.tokenId}", "${req.body.uri}"]`);
		if (!request_key) {
			res.status(404).json("failed to execute create token contract");
		}

		// response to client
		if (req.body.isMobile === true) {
			res.status(200).json({url: process.env.MB_URL, request_key: request_key});
		} else {
			res.status(200).json({url: process.env.QR_URL, request_key: request_key});
		}
	} catch (err) {
		res.status(500).json(err);
	}
})

// get sale token URL
router.put("/saleTokenURL", async (req, res) => {
	try {
		// execute contract
		const functionJson = '{ "constant": false, "inputs": [ { "name": "from", "type": "address" }, { "name": "to", "type": "address" }, { "name": "tokenId", "type": "uint256" } ], "name": "safeTransferFrom", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }';
		const request_key = await API.executeContract(process.env.NFT_CONTRACT_ADDRESS, functionJson, "0", `["${req.body.fromAddress}", "${process.env.MARKET_CONTRACT_ADDRESS}", "${req.body.tokenId}"]`);
		if (!request_key) {
			res.status(404).json("failed to execute contract");
		}

		// response to client
		if (req.body.isMobile === true) {
			res.status(200).json({url: process.env.MB_URL, request_key: request_key});
		} else {
			res.status(200).json({url: process.env.QR_URL, request_key: request_key});
		}
	} catch (err) {
		res.status(500).json(err);
	}
});

// get buy token URL
router.put("/purchaseTokenURL", async (req, res) => {
	try {
		// execute contract
		const functionJson = '{ "constant": false, "inputs": [ { "name": "tokenId", "type": "uint256" }, { "name": "NFTAddress", "type": "address" } ], "name": "buyNFT", "outputs": [ { "name": "", "type": "bool" } ], "payable": true, "stateMutability": "payable", "type": "function" }';
		const request_key = await API.executeContract(process.env.MARKET_CONTRACT_ADDRESS, functionJson, "10000000000000000", `["${req.body.tokenId}", "${process.env.NFT_CONTRACT_ADDRESS}"]`);
		if (!request_key) {
			res.status(404).json("failed to execute purchase token contract");
		}

		// response to client
		if (req.body.isMobile === true) {
			res.status(200).json({url: process.env.MB_URL, request_key: request_key});
		} else {
			res.status(200).json({url: process.env.QR_URL, request_key: request_key});
		}
	} catch(err) {
		res.status(500).json(err);
	}
})

// get burn a Token URL
router.put("/burnTokenURL", async (req, res) => {
	try {
		// check token is owner's
		const isInclude = await isOwnersToken(req.body.walletAddress, req.body.tokenId);

		if (isInclude) {
			// execute contract
			const functionJson = '{ "constant": false, "inputs": [ { "name": "from", "type": "address" }, { "name": "to", "type": "address" }, { "name": "tokenId", "type": "uint256" } ], "name": "safeTransferFrom", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }';
			const request_key = await API.executeContract(process.env.NFT_CONTRACT_ADDRESS, functionJson, "0", `["${req.body.walletAddress}", "0x0000000000000000000000000000000000000000", "${req.body.tokenId}"]`);
			if (!request_key) {
				res.status(403).json("failed to execute burn token contract")
			}

			// response to client
			if (req.body.isMobile === true) {
				res.status(200).json({url: process.env.MB_URL, request_key: request_key});
			} else {
				res.status(200).json({url: process.env.QR_URL, request_key: request_key});
			}
		} else {
			res.status(403).json("you can only burn your own token");
		}

	} catch (err) {
		req.status(500).json(err);
	}
})

// get all Token on Market
router.get("/info/all", async (req, res) => {
	try {
		const nfts = await API.getNFTs(process.env.MARKET_CONTRACT_ADDRESS);
		res.status(200).json(nfts);
	} catch (err) {
		res.status(500).json(err);
	}
})

// // get user's Token on Market
// router.put("/info/:walletAddress", async (req, res) => {
// 	try {
// 		const balance = await API.getBalance(req.body.walletAddress);
// 		const currentUser = await User.findOne({walletAddress: req.params.walletAddress});
// 		console.log(currentUser)
// 		if (currentUser.walletAddress == req.body.walletAddress && balance > 0) {
// 			const nfts = await API.getNFTs(currentUser.walletAddress);
// 			res.status(200).json(nfts);
// 		} else {
// 			res.status(403).json("you can access only your Token");
// 		}
// 	} catch (err) {
// 		res.status(500).json(err);
// 	}
// });

// get user's Token on Market
router.put("/info/:walletAddress", async (req, res) => {
	try {
		// const currentUser = await User.findOne({walletAddress: req.params.walletAddress});
		const nfts = await API.getNFTs(req.params.walletAddress);
		res.status(200).json(nfts);
	} catch (err) {
		res.status(500).json(err);
	}
});

// get a token
router.get("/info/:tokenId", async (req, res) => {
	try {
		if (req.body.tokenId === req.params.tokenId) {
			const nfts = API.getNFTs(req.body.walletAddress);
			for (var i = 0; i < nfts.length; i++) {
				if (nfts[i].id === req.body.tokenId) {
					break;
				}
			}
			res.status(200).json(nfts[i]);
		}
		else {
			res.status(403).json("you can access only your Token")
		}
	} catch (err) {
		res.status(500).json(err);
	}
});

module.exports = router