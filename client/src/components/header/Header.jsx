// import React, { useContext, useState } from 'react'
// import WalletConnect from '../common/WalletConnect'
// import Logo from '../common/Logo'
// import { Link } from 'react-router-dom'
// import styles from '../../styles/Header.module.scss'
// import { AuthContext } from '../../context/AuthContext'

// function Header() {
// 	// User
// 	const {
// 		user, setUser,
// 		myAddress, setMyAddress,
// 		myBalance, setMyBalance
// 	} = useContext(AuthContext);

// 	// Modal
// 	const [showModal, setShowModal] = useState(false);
// 	const [modalPrefference, setModalPrefference] = useState({
// 		title: "Modal",
// 		kasButton: "Use KaiKas",
// 		klipButton: "Use Klip",
// 		onClickKas: () => { },
// 		onClickKlip: () => { },
// 	})

// 	// Login api call
// 	const loginCall = async() => {
// 		const response = await axios.post("/auth/login", { walletAddress: address })
// 			.catch(function (error) {
// 				// if user not found(ststus: 404) try register
// 				if (error.response && error.response.status === 404) {
// 					alert("회원가입이 필요합니다.");
// 				} else {
// 					alert("server error");
// 				}
// 			})
// 		return (response);
// 	}

// 	// ConnectKaiKasWallet
// 	const connectKaikasWallet = async () => {
// 		if (typeof window !== "undefined" && window.klaytn.isKaikas === false) {
// 			window.open(
// 				"https://chrome.google.com/webstore/detail/kaikas/jblndlipeogpafnldhgmapagcccfchpi"
// 			);
// 		} else {
// 			if (typeof window !== "undefined") {
// 				window.klaytn.enable()
// 					.then(async (result) => {
// 						const address = window.klaytn.selectedAddress
// 						console.log(window.klaytn.selectedAddress);
// 						console.log(result);

// 						const response = await loginCall(); 
// 						setMyAddress(result)
// 						setIsConnected(true)
// 						const _balance = await CaverAPI.getBalance(address)
// 						console.log('balance', _balance)
// 						setMyBalance(_balance)

// 						if (response && response.data) {
// 							setUserName(response.data);
// 							setShowModal(false);
// 						} else {
// 							registerUser(result, username);
// 						}
// 					})
// 					.catch((error) => {
// 						console.log(error)
// 					})
// 			} else return;
// 		}
// 	}

// 	const onClickConnectWallet = () => {
// 		setModalPrefference({
// 			title: "Login",
// 			buttonName: "login with KaiKas",
// 		})
// 	}

// 	return (
// 		<header className={styles.container}>
// 			<div className={styles.inner}>
// 				<div className={styles.logoContainer}>
// 					<Logo />
// 				</div>
// 				<nav className={styles.navContainer}>
// 					<Link to="/feed">
// 						<span className={styles.navItem}>Feed</span>
// 					</Link>
// 					<Link to="/dashboard">
// 						<span className={styles.navItem}>Dashboard</span>
// 					</Link>
// 				</nav>
// 				<div className={styles.walletContainer}>
// 					{isConnected
// 						? <span className={styles.connected}>연결되었습니다</span>
// 						: <button className={styles.modalButton} onClick={() => { setShowModal(true) }}>Connect Wallet</button>
// 					}
// 					<WalletConnect />
// 				</div>
// 			</div>
// 		</header>
// 	)
// }

// export default Header