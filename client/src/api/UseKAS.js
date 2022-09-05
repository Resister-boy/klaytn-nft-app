import axios from "axios";
import {
	CHAIN_ID,
} from "../constants";

const option = {
	headers: {
		Authorization: "Basic S0FTS0VHTVBCMUY0NTY4N1hHTFA5Q09BOlJhTkJKYzRmcktwUEo4VFFSVVRVa2dxT1VrUU5sZGFJeEt3MmZWUXU=",
		"x-chain-id": CHAIN_ID,
		"content-type" : "application/json",
	}
}

export const uploadMetaData = async (imageUrl) => {
	const _description = "This is KlayLion NFT";
	const _name = "KlayLionNFT";

	const metadata = {
		metadata: {
			name: _name,
			description: _description,
			image: imageUrl
		}
	}

	try {
		const response = await axios.post("https://metadata-api.klaytnapi.com/v1/metadata", metadata, option);
		console.log(`${JSON.stringify(response.data)}`);	
		return response.data.uri;
	} catch(e) {
		console.log(e);
		return (false);
	}
}