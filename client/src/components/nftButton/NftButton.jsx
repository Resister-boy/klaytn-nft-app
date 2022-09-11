import React, { useContext } from "react";
import * as CaverAPI from "../../api/UseCaver";
import * as KlipAPI from "../../api/UseKlip";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { ModalContext } from "../../context/ModalContext";
import QrModal from "../qrModal/QrModal";
import styles from './NftButton.module.scss'

export default function NftButton({ user, post }) {
  // User
  const { user: currentUser, setMyBalance } = useContext(AuthContext);
  // Modal
  const { showModal, setShowModal, setModalPrefference, setQrvalue, DEFAULT_ADDRESS } = useContext(ModalContext);

  const mintPost = async () => {
    if (currentUser.walletAddress === DEFAULT_ADDRESS) {
      alert("NO ADDRESS");
      return;
    }
    if (post.isNFT === true) {
      alert("this post is already minted");
      return;
    }
    // mint token
    const uri = "/posts/" + post._id;
    const mintTokenID = Math.floor(Math.random() * 99) + 1016500;

    KlipAPI.mintCardWithURI(currentUser.walletAddress, mintTokenID, uri, setQrvalue, (result) => {
      alert(JSON.stringify(result));
      // set isNFT true
      axios.put(uri, { userId: currentUser._id, isNFT: true })
        .catch(function (error) {
          if (error.response) {
            alert(error.response.data);
            return;
          }
        })
      // balance update
      const _balance = CaverAPI.getBalance(currentUser.walletAddress);
      setMyBalance(_balance);
      // alert message and modal hide
      alert("minting success!");
      setShowModal(false);
    });
  };

  const showMintModal = () => {
    // set mint modal
    setModalPrefference({
      title: "Mint",
      kasButton: "",
      klipButton: "Use Klip",
      confirmButton: "",
      onClickKas: () => {
      },
      onClickKlip: () => {
        mintPost();
      }
    });
    // show modal
    setShowModal(true);
  }

  if (user.walletAddress !== currentUser.walletAddress)
    return (null);
  return (
    <div className={styles.container}>
      <button className={styles.modalButton} onClick={() => { showMintModal() }}>
        Mint
      </button>
      <QrModal />
    </div>
  );
}