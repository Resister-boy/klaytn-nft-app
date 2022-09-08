import React, { useEffect } from "react";
import * as CaverAPI from "../../api/UseCaver";
import * as KlipAPI from "../../api/UseKlip";
import "bootstrap/dist/css/bootstrap.min.css";
import './loginModal.css';
import axios from "axios";
import QrModal from "../qrModal/QrModal";

export default function LoginModal(props) {
	const {componentProps} = props;

	// User
	const user = componentProps.user;
	const setUser = componentProps.setUser;
	const setMyBalance = componentProps.setMyBalance;
	const setMyAddress = componentProps.setMyAddress;

	// Modal
	const setShowModal = componentProps.setShowModal;
	const setModalProps = componentProps.setModalProps;
	const setQrvalue = componentProps.setQrvalue;

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
			alert(response.data.username);
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
				setModalProps({
					title: "Register",
					buttonName: "sign up",
					onClick: (address, username) => {
						registerUser(address, username);
					}
				});
			}
		});
		setModalProps({
			title: "Login",
			buttonName: "close",
			onClick: () => {
				setShowModal(false);
			},
		});
	}

	useEffect(() => {
		if (!user)
		{
			getUserData();
			setShowModal(true);
		}
	}, []);

	return (
		<QrModal componentProps={componentProps}></QrModal>
	);
}