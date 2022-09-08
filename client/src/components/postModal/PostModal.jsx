import React, { useEffect } from "react";
import * as CaverAPI from "../../api/UseCaver";
import * as KlipAPI from "../../api/UseKlip";
import * as KasAPI from "../../api/UseKAS";
import "bootstrap/dist/css/bootstrap.min.css";
import QrModal from "../qrModal/QrModal";


export default function PostModal(props) {
	const DEFAULT_ADDRESS = "0x0000000000000000";
	const { userProps, modalProps, post } = props;

	// User
	const user = userProps.user;
	const setMyBalance = userProps.setMyBalance;

	// Modal
	const setShowModal = modalProps.setShowModal;
	const setModalPrefference = modalProps.setModalPrefference;
	const setQrvalue = modalProps.setQrvalue;

	const mintPost = async () => {
		if (user.walletAddress === DEFAULT_ADDRESS) {
			alert("NO ADDRESS");
			return;
		}
		// metadata upload
		const metadataURL = await KasAPI.uploadMetaData("/posts/" + post._id);
		if (!metadataURL) {
			alert("메타 데이터 업로드에 실패하였습니다.");
			return;
		}
		// mint token
		const mintTokenID = Math.floor(Math.random() * 99) + 1016500;
		alert(user.walletAddress, mintTokenID);
		KlipAPI.mintCardWithURI(user.walletAddress, mintTokenID, metadataURL, setQrvalue, (result) => {
			alert(JSON.stringify(result));
		});
		// balance update
		const _balance = await CaverAPI.getBalance(user.walletAddress);
		setMyBalance(_balance);
		// hide modal
		await setShowModal(false);
	};

	useEffect(() => {
		if (post.isNFT === false) {
			setModalPrefference({
				title: "Minting",
				buttonName: "mint",
				onConfirm: () => {
					mintPost();
				},
			});
		}
		else {
			setModalPrefference({
				title: "Market upload",
				buttonName: "upload",
				onConfirm: () => {
				},
			}
			);
		}
	}, []);

	return (
		<QrModal userProps={userProps} modalProps={modalProps}></QrModal>
	);
}