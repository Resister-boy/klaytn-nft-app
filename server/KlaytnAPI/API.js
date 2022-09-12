const axios = require("axios");
const Caver = require("caver-js");
const KIP17ABI = require("./ABI.json");
const dotenv = require("dotenv");
dotenv.config();

const option_CAVER = {
	headers: [
	  {
		name: "Authorization",
		value: process.env.AUTH,
	  },
	  {name: "x-chain-id", value: process.env.CHAIN_ID}
	]
};

const option_KAS = {
	headers: {
		Authorization: process.env.AUTH,
		"x-chain-id": process.env.CHAIN_ID,
		"content-type" : "application/json",
	}
};

const caver = new Caver(new Caver.providers.HttpProvider("https://node-api.klaytnapi.com/v1/klaytn", option_CAVER));
const NFTContract = new caver.contract(KIP17ABI, process.env.NFT_CONTRACT_ADDRESS);

module.exports = {
	// =======================  CAVER API  ========================
	getNFTs: async (address) => {
		//Fetch Balance
		const balance = await NFTContract.methods.balanceOf(address).call();
		console.log(`[NFT Balance] ${balance}: ${address}`);
		//Fetch TokenIds
		const tokenIds = [];
		for (let i = 0; i < balance; i++) {
			const id = await NFTContract.methods.tokenOfOwnerByIndex(address, i).call();
			tokenIds.push(id);
		}
		//Fetch TokenURIs
		const tokenURIs = [];
		for (let i = 0; i < balance; i++) {
			const uri = await NFTContract.methods.tokenURI(tokenIds[i]).call(); // metadata kas 주소
			tokenURIs.push(uri);
		}
		const nfts = [];
		for (let i = 0; i < balance; i++) {
			nfts.push({ uri: tokenURIs[i], id: tokenIds[i] });
		}
		return (nfts);
	},

	getBalance: (address) => {
		return caver.rpc.klay.getBalance(address).then((response) => {
			const balance = caver.utils.convertFromPeb(caver.utils.hexToNumberString(response));
			console.log(`BALANCE: ${balance}`);
			return (balance);
		})
	},


	// =======================  KAS API ========================
	uploadMetaData: async (description, name, imageUrl) => {
		const _description = description;
		const _name = name;

		const metadata = {
			metadata: {
				name: _name,
				description: _description,
				image: imageUrl
			}
		}

		try {
			const response = await axios.post("https://metadata-api.klaytnapi.com/v1/metadata", metadata, option_KAS);
			// console.log(`${JSON.stringify(response.data)}`);
			return response.data.uri;
		} catch(e) {
			console.log(e);
			return (false);
		}
	},


	// ======================= KLIP API ==========================
	executeContract: async (txTo, functionJson, value, params) => {
		try{
			const response = await axios.post(process.env.A2P_API_PREPARE_URL, {
				bapp: {
					name: process.env.APP_NAME,
				},
				type: "execute_contract",
				transaction: {
					to: txTo,
					abi: functionJson,
					value: value,
					params: params
				},
			});
			return response.data.request_key;
		} catch (err) {
			console.log(err);
			return false;
		} 
	}
}
