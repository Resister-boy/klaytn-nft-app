import React, { useEffect } from "react";
import * as CaverAPI from "../../api/UseCaver";
import * as KlipAPI from "../../api/UseKlip";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import QrModal from "../qrModal/QrModal";

export default function LoginModal(props) {
	const {userProps, modalProps} = props;

	// User
	const user = userProps.user;
	const setUser = userProps.setUser;
	const setMyBalance = userProps.setMyBalance;
	const setMyAddress = userProps.setMyAddress;

	// Modal
	const setShowModal = modalProps.setShowModal;
	const setModalPrefference = modalProps.setModalPrefference;
	const setQrvalue = modalProps.setQrvalue;

	const registerUser = async (address, username) => {
		// try register user
		const response = await axios.post("/auth/register", { walletAddress: address, username: username })
			.catch(function (error) {
				if (error.response & error.response.data) {
					alert(error.response.data);
				}
			})
		// if api call fails, return immeidatley
		if (!(response && response.data))
			return ;
		// alert success message
		alert(username + "님 회원가입이 완료됐습니다. 다시 로그인 해주세요.");
		// set login modal
		setModalPrefference({
			title: "Login",
			buttonName: "login",
			onConfirm: () => {
				loginUser();
			},
		});
	}

	const loginUser = () => {
		KlipAPI.getAddress(setQrvalue, async (address) => {
			// try login
			await setMyAddress(address);
			const response = await axios.post("/auth/login", { walletAddress: address })
				.catch(function (error) {
					// if user not found(ststus: 404) try register
					if (error.response && error.response.status === 404) {
						alert("회원가입이 필요합니다.");
						setModalPrefference({
							title: "Register",
							buttonName: "sign up",
							onConfirm: (address, username) => {
								registerUser(address, username);
							}
						});
					} else {
						alert("server error");
					}
				})
			// if api call fails, return immeidatley
			if (!(response && response.data))
				return;
			// set user info		
			const _balance = await CaverAPI.getBalance(address);
			setMyBalance(_balance);
			setUser(response.data);
			setShowModal(false);
		});
	}

	useEffect(() => {
		if (!user)
		{
			setModalPrefference({
				title: "Login",
				buttonName: "login",
				onConfirm: () => {
					loginUser();
				},
			});
			setShowModal(true);
		}
	}, []);

	return (
		<QrModal userProps={userProps} modalProps={modalProps}></QrModal>
	);
}