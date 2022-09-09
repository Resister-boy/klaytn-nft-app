import React, { useEffect, useContext } from "react";
import * as CaverAPI from "../../api/UseCaver";
import * as KlipAPI from "../../api/UseKlip";
import * as KasAPI from "../../api/UseKAS";
import "bootstrap/dist/css/bootstrap.min.css";
import QrModal from "../qrModal/QrModal";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

export default function PostModal(props) {
  const DEFAULT_ADDRESS = "0x0000000000000000";
  const { modalProps, post } = props;

  // User
  const { user, setMyBalance } = useContext(AuthContext);

  // Modal
  const setShowModal = modalProps.setShowModal;
  const setModalPrefference = modalProps.setModalPrefference;
  const setQrvalue = modalProps.setQrvalue;

  const mintPost = async () => {
    if (user.walletAddress === DEFAULT_ADDRESS) {
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

    KlipAPI.mintCardWithURI(user.walletAddress, mintTokenID, uri, setQrvalue, (result) => {
      alert(JSON.stringify(result));
      // set isNFT true
      axios.put(uri, { userId: user._id, isNFT: true })
        .catch(function (error) {
          if (error.response) {
            alert(error.response.data);
            return;
          }
        })
      // balance update
      const _balance = CaverAPI.getBalance(user.walletAddress);
      setMyBalance(_balance);
      // modal hide
      setShowModal(false);
    });
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
    <QrModal modalProps={modalProps}></QrModal>
  );
}