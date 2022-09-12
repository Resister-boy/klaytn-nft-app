import React, { useContext } from "react";
import * as CaverAPI from "../../api/UseCaver";
import * as KlipAPI from "../../api/UseKlip";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { ModalContext } from "../../context/ModalContext";
import QrModal from "../qrModal/QrModal";
import styles from "./NftButton.module.scss";

export default function NftButton({ user, post, type }) {
  // User
  const { user: currentUser, setMyBalance } = useContext(AuthContext);
  // Modal

  const {
    showModal,
    setShowModal,
    setModalPrefference,
    setQrvalue,
    DEFAULT_ADDRESS,
  } = useContext(ModalContext);

  let button;

  const checkType = (type) => {
    if (type === "mint") {
      button = (
        <button
          className={styles.modalButton}
          onClick={() => {
            showMintModal();
          }}
        >
          Mint
        </button>
      );
    } else if (type === "market") {
      button = (
        <button
          className={styles.modalButton}
          onClick={() => {
            showMarketModal();
          }}
        >
          Sale
        </button>
      );
    } else if (type === "buy") {
      button = (
        <button
          className={styles.modalButton}
          onClick={() => {
            showBuyModal();
          }}
        >
          Buy
        </button>
      );
    } else if (type === "burn") {
      button = (
        <button
          className={styles.modalButton}
          onClick={() => {
            showBurnModal();
          }}
        >
          Burn
        </button>
      )
    }
  };

  const getRandomArbitrary = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

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
    // token id random generator
    const mintTokenID = getRandomArbitrary(
      parseInt(currentUser.tokenIdHead),
      parseInt(currentUser.tokenIdTail)
    );

    const uriJson = {
      toAddress: currentUser.walletAddress,
      tokenId: mintTokenID,
      uri: "/posts/" + post._id,
      isMobile: false,
    };
    const uri = "/posts/" + post._id;
    // const mintTokenID = Math.floor(Math.random() * 99) + 1016500;

    let request_key = null;
    axios.put("/klaytn/mintPostURL", uriJson).then((res) => {
      console.log(uriJson);
      setQrvalue(res.data.url + res.data.request_key);
      request_key = res.data.request_key;
      let timeId = setInterval(() => {
        axios
          .get(
            `https://a2a-api.klipwallet.com/v2/a2a/result?request_key=${request_key}`
          )
          .then((res) => {
            if (res.data.result) {
              console.log(`[result] ${JSON.stringify(res.data.result)}`);
              clearInterval(timeId);
              setQrvalue("DEFAULT");
              alert("Mint Successful");
              axios
                .put(uri, {
                  userId: currentUser._id,
                  isNFT: true,
                  tokenId: mintTokenID,
                })
                .catch(function (error) {
                  if (error.response) {
                    alert(error.response.data);
                    return;
                  }
                });
              setShowModal(false);
              // navigate("/mypage/" + myAddress);
            }
          });
      }, 1000);
    });
    // KlipAPI.mintCardWithURI(
    //   currentUser.walletAddress,
    //   mintTokenID,
    //   uri,
    //   setQrvalue,
    //   (result) => {
    //     alert(JSON.stringify(result));
    //     // set isNFT true
    //     axios
    //       .put(uri, { userId: currentUser._id, isNFT: true })
    //       .catch(function (error) {
    //         if (error.response) {
    //           alert(error.response.data);
    //           return;
    //         }
    //       });
    //     // balance update
    //     const _balance = CaverAPI.getBalance(currentUser.walletAddress);
    //     setMyBalance(_balance);
    //     // alert message and modal hide
    //     alert("minting success!");
    //     setShowModal(false);
    //   }
    // );
  };

  const salePost = () => {
    let request_key = null;
    const cardInfo = {
      isMobile: false,
      fromAddress: currentUser.walletAddress,
      tokenId: post.tokenId,
    };
    console.log(cardInfo);
    try {
      axios.put("/klaytn/saleTokenURL", cardInfo).then((res) => {
        const qvalue = res.data.url + res.data.request_key;
        // console.log(qvalue);
        setQrvalue(qvalue);
        request_key = res.data.request_key;
        let timeId = setInterval(() => {
          axios
            .get(
              `https://a2a-api.klipwallet.com/v2/a2a/result?request_key=${request_key}`
            )
            .then((res) => {
              if (res.data.result) {
                console.log(`[result] ${JSON.stringify(res.data.result)}`);
                clearInterval(timeId);
                alert("Now token is On Market");
                axios
                  .put("/posts/" + post._id, {
                    userId: currentUser._id,
                    isOnSale: true,
                  })
                  .catch(function (error) {
                    if (error.response) {
                      alert(error.response.data);
                      return;
                    }
                  });
                setShowModal(false);
                // navigate("/mypage/" + Address);
              }
            });
        }, 1000);
      });
    } catch (err) {
      console.log(err.response.data);
    }
  };

  const buyPost = () => {
    let request_key = null;
    const cardInfo = {
      isMobile: false,
      tokenId: post.tokenId,
    };
    console.log(cardInfo);
    try {
      axios.put("/klaytn/purchaseTokenURL", cardInfo).then((res) => {
        const qvalue = res.data.url + res.data.request_key;
        // console.log(qvalue);
        setQrvalue(qvalue);
        request_key = res.data.request_key;
        let timeId = setInterval(() => {
          axios
            .get(
              `https://a2a-api.klipwallet.com/v2/a2a/result?request_key=${request_key}`
            )
            .then((res) => {
              if (res.data.result) {
                console.log(`[result] ${JSON.stringify(res.data.result)}`);
                clearInterval(timeId);
                alert("You Bought NFT Post. It's all yours now");
                axios
                  .put("/posts/modifiyOwner/" + post._id, {
                    userId: currentUser._id,
                    isOnSale: false,
                  })
                  .catch(function (error) {
                    if (error.response) {
                      alert(error.response.data);
                      return;
                    }
                  });
                setShowModal(false);
                // navigate("/mypage/" + Address);
              }
            });
        }, 1000);
      });
    } catch (err) {
      console.log(err.response.data);
    }
  };

  const burnPost = () => {
    let request_key = null;
    const cardInfo = {
      isMobile: false,
      walletAddress: currentUser.walletAddress,
      tokenId: post.tokenId,
    };
    console.log(cardInfo);
    try {
      axios.put("/klaytn/burnTokenURL", cardInfo).then((res) => {
        const qvalue = res.data.url + res.data.request_key;
        // console.log(qvalue);
        setQrvalue(qvalue);
        request_key = res.data.request_key;
        let timeId = setInterval(() => {
          axios
            .get(
              `https://a2a-api.klipwallet.com/v2/a2a/result?request_key=${request_key}`
            )
            .then((res) => {
              if (res.data.result) {
                console.log(`[result] ${JSON.stringify(res.data.result)}`);
                clearInterval(timeId);
                alert("You burn the NFT Post");
                axios
                  .delete("/posts/" + post._id, {
                    userId: currentUser._id,
                  })
                  .catch(function (error) {
                    if (error.response) {
                      alert(error.response.data);
                      return;
                    }
                  });
                setShowModal(false);
                // navigate("/mypage/" + Address);
              }
            });
        }, 1000);
      });
    } catch (err) {
      console.log(err.response.data);
    }
  }

  const showMintModal = () => {
    // set mint modal
    setModalPrefference({
      title: "Mint",
      kasButton: "",
      klipButton: "Use Klip",
      confirmButton: "",
      onClickKas: () => {},
      onClickKlip: () => {
        mintPost();
      },
    });
    // show modal
    setShowModal(true);
  };

  const showMarketModal = () => {
    //set market modal
    setModalPrefference({
      title: "Sale",
      kasButton: "",
      klipButton: "Use Klip",
      confirmButton: "",
      onClickKas: () => {},
      onClickKlip: () => {
        salePost();
      },
    });
    // show modal
    setShowModal(true);
  };

  const showBuyModal = () => {
    setModalPrefference({
      title: "Buy",
      kasButton: "",
      klipButton: "Use Klip",
      confirmButton: "",
      onClickKas: () => {},
      onClickKlip: () => {
        buyPost();
      },
    });
    // show modal
    setShowModal(true);
  };

  const showBurnModal = () => {
    setModalPrefference({
      title: "Burn",
      kasButton: "",
      klipButton: "Use Klip",
      confirmButton: "",
      onClickKas: () => {},
      onClickKlip: () => {
        burnPost();
      },
    });
    // show modal
    setShowModal(true);
  }

  return (
    <div className={styles.container}>
      {checkType(type)}
      {button}
      <QrModal />
    </div>
  );
}
