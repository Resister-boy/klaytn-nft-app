import "./post.css";
import { MoreVert } from "@mui/icons-material";
import { useState } from "react";
import axios from "axios";
import QRCode from "qrcode.react";
import * as KasAPI from "../../api/UseKAS";
import * as CaverAPI from "../../api/UseCaver";
import * as KlipAPI from "../../api/UseKlip";
import "bootstrap/dist/css/bootstrap.min.css";
import { Alert, Container, Form, Button, Modal } from "react-bootstrap";

const DEFAULT_QR_CODE = "DEFAULT";
const DEFAULT_ADDRESS = "0x0000000000000000";

export default function NFTPost(props) {
  const {post, isOwner, user} = props;

  const walletAddress = user ? user.walletAddress : null;
  const userId = user ? user._id : null;

  // Token

	// Modal
	const [showModal, setShowModal] = useState(false);
	const [modalInput, setModalInput] = useState("");
	const [modalProps, setModalProps] = useState({
		title: "Minting",
		buttonName: "mint",
		onClick: () => { },
	});

  // User
	const [qrvalue, setQrvalue] = useState(DEFAULT_QR_CODE);

  const onClickMint = async (uri) => {
    const mintTokenID = Math.floor(Math.random() * 99 + 1016500);
    alert(mintTokenID);
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
      axios.put("/posts/" + post._id, { userId: userId, isNFT: true });
      setShowModal(false);
    });
  };

  // fetchMyNFTs
	const fetchMyNFTs = async (walletAddress) => {
		if (walletAddress === DEFAULT_ADDRESS) {
			alert("NO ADDRESS");
			return;
		}
		const _nfts = await CaverAPI.fetchCardOf(walletAddress);
		setNFTs(_nfts);
	}
  
  if (post.isNFT === false)
    return (null);
  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <span className="postUsername">
              user
            </span>
            <span className="postDate">{post.date}</span>
          </div>
          <div className="postTopRight">
            <MoreVert />
          </div>
        </div>
        <div className="postCenter">
          <h4>{post?.title}</h4>
          <br />
          <span className="postText">{post?.content}</span>
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
          </div>
          {
            isOwner ?
              <div className="postBottomRight">
                <button className="mintButton" onClick={() => { setShowModal(true); }}>
                  minting
                </button>
              </div> : null
          }
        </div>
      </div>
      <div className="modalWrappter">
        <Modal
          centered
          size="sm"
          show={showModal}
          onHide={() => {
            setShowModal(false);
          }}
          style={{ border: 0 }}
        >
          <Modal.Header
            style={{ display: "flex", justifyContent: "center", alignItems: "center", border: 0, opacity: 0.8 }}
          >
            <Modal.Title>{modalProps.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body
            style={{ border: 0, opacity: 0.8 }}
          >
            <Container style={{ backgroundColor: "white", width: 200, height: 200, padding: 10 }} >
              <QRCode value={qrvalue} size={180} style={{ margin: "auto" }} />
            </Container>
            <Form style={{ padding: 20 }}>
              <Form.Group className="mb-1" controlId="exampleForm.ControlInput1">
                <Form.Label>To Address</Form.Label>
                <Form.Control
                  type="address"
                  autoFocus
                  placeholder={walletAddress}
                  onChange={e => setModalInput(e.target.value)}
                  disabled
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer
            style={{ display: "flex", justifyContent: "center", alignItems: "center", border: 0, opacity: 0.8 }}
          >
            <Button
              variant="primary"
              onClick={() => {
                onClickMint("/posts/" + post._id);
              }}
              style={{ backgroundColor: "#278ef5", borderColor: "#278ef5" }}
            >
              {modalProps.buttonName}
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                setShowModal(false);
              }}
              style={{ backgroundColor: "#494d52", borderColor: "#494d52" }}
            >
              close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}
