import React, { useEffect } from "react";
import * as CaverAPI from "../../api/UseCaver";
import * as KlipAPI from "../../api/UseKlip";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import QrModal from "../qrModal/QrModal";

export default function PostModal(props) {
	const {componentProps, postData} = props;

	// User
	const user = componentProps.user;
	const setUser = componentProps.setUser;
	const setMyBalance = componentProps.setMyBalance;
	const setMyAddress = componentProps.setMyAddress;

	// Modal
	const setShowModal = componentProps.setShowModal;
	const setModalProps = componentProps.setModalProps;
	const setQrvalue = componentProps.setQrvalue;

	// Post
	const post = postData.post;

	const mintPost = async (uri) => {
		if (walletAddress === DEFAULT_ADDRESS) {
			alert("NO ADDRESS");
			return;
		}
		// metadata upload
		const metadataURL = await KasAPI.uploadMetaData(uri);
		if (!metadataURL) {
			alert("메타 데이터 업로드에 실패하였습니다.");
			return;
		}
		KlipAPI.mintCardWithURI(walletAddress, mintTokenID, metadataURL, setQrvalue, (result) => {
			alert(JSON.stringify(result));
		});
	};
	
	useEffect(() => {
		if (!user)
		{
			setModalProps({
				title: Minting,
				buttonName: mint,
				onConfirm: () => {
					mintPost();
				},
			})
		}
	}, []);


	if (!user)
		return (<div>{alert("NO USER!")}</div>);
	return (
		<QrModal componentProps={componentProps}></QrModal>
	);
}