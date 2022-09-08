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
		const response = await axios.post("/auth/register", { walletAddress: address, username: username })
			.catch(function (error) {
				if (error.response) {
					alert("server error");
					return ;
				}
			})
		if (response && response.data)
		{
			alert(response.data.username + "님 환영합니다.");
			setUser(response.data);
			setShowModal(false);
		}
	}

	const getUserData = () => {
		KlipAPI.getAddress(setQrvalue, async (address) => {
			const response = await axios.post("/auth/login", { walletAddress: address })
				.catch(function (error) {
					if (error.response && error.response.status === 404) {
						alert("회원가입이 필요합니다.");
					}
					else if (error.response) {
						alert("server error");
					}
				})
			setMyAddress(address);
			const _balance = await CaverAPI.getBalance(address);
			setMyBalance(_balance);
			if (response && response.data)
			{
				setUser(response.data);
				setShowModal(false);
			}
			else
			{
				setModalPrefference({
					title: "Register",
					buttonName: "sign up",
					onConfirm: (address, username) => {
						registerUser(address, username);
					}
				});
			}
		});
	}

	useEffect(() => {
		if (!user)
		{
			setModalPrefference({
				title: "Login",
				buttonName: "login",
				onConfirm: () => {
					getUserData();
				},
			});
			setShowModal(true);
		}
	}, []);

	return (
		<QrModal userProps={userProps} modalProps={modalProps}></QrModal>
	);
}