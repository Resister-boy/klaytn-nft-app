import React, { useContext } from "react";
import * as CaverAPI from "../../api/UseCaver";
import * as KlipAPI from "../../api/UseKlip";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { ModalContext } from "../../context/ModalContext";
import QrModal from "../qrModal/QrModal";

export default function LoginButton() {
  // User
  const { setUser, setMyBalance, setMyAddress } = useContext(AuthContext);
  // Modal
  const { setShowModal, setModalPrefference, modalInputRef, setQrvalue } = useContext(ModalContext);

  // registerUser
  const registerUser = async (address) => {
    // try register user
    const response = await axios.post("/auth/register", { walletAddress: address, username: modalInputRef.current.value })
      .catch(function (error) {
        if (error.response && error.response.data) {
          alert(address);
          alert(modalInputRef.current.value);
          alert(error.response.data);
        }
      })
    // if api call fails, return immeidatley
    if (!response)
      return;
    // alert success message
    alert("Welcome! " + response.data.username + ". Please try login again");
    // change modal
    showLoginModal();
  }

  // Login api call
  const loginCall = async (address) => {
    alert(address);
    const response = await axios.post("/auth/login", { walletAddress: address })
      .catch(function (error) {
        // if user not found(ststus: 404) try register
        if (error.response && error.response.status === 404) {
          alert("You need to register");
          showRegisterModal(address);
        } else {
          alert("server error");
        }
      })
    return (response);
  }

  // connect kaikas
  const connectKaikasWallet = async () => {
    if (typeof window !== "undefined" && window.klaytn.isKaikas === false) {
      window.open(
        "https://chrome.google.com/webstore/detail/kaikas/jblndlipeogpafnldhgmapagcccfchpi"
      );
    } else {
      if (typeof window !== "undefined") {
        window.klaytn.enable()
          .then(async (result) => {
            const address = window.klaytn.selectedAddress;
            const response = await loginCall(address);
            // if api call fails, return immediately
            if (!response)
              return;
            // set user info		
            setMyAddress(address);
            const _balance = await CaverAPI.getBalance(address);
            setMyBalance(_balance);
            setUser(response.data);
            setShowModal(false);
          })
      } else return;
    }
  }

  // connect klip
  const connectKlipWallet = async () => {
    KlipAPI.getAddress(setQrvalue, async (address) => {
      // try login
      const response = await loginCall(address);
      // if api call fails, return immediately
      if (!response)
        return;
      // set user info		
      setMyAddress(address);
      const _balance = await CaverAPI.getBalance(address);
      setMyBalance(_balance);
      setUser(response.data);
      setShowModal(false);
    });
  }

  const showRegisterModal = (address) => {
    // set register modal
    setModalPrefference({
      title: "Register",
      kasButton: "",
      klipButton: "",
      confirmButton: "register",
      onConfirm: () => {
        registerUser(address);
      }
    });
    // show modal
    setShowModal(true);
  }

  const showLoginModal = () => {
    // set login modal
    setModalPrefference({
      title: "Login",
      kasButton: "Login with Kaikas",
      klipButton: "Login with Klip",
      onClickKas: () => {
        connectKaikasWallet();
      },
      onClickKlip: () => {
        connectKlipWallet();
      }
    });
    // show modal
    setShowModal(true);
  }

  return (
    <div>
      <button onClick={() => { showLoginModal() }}>
        Login
      </button>
      <QrModal />
    </div>
  );
}