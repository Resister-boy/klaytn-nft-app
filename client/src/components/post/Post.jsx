import "./post.css";
import { MoreVert } from "@mui/icons-material";
import PostModal from "../postModal/PostModal";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useRef, useEffect } from "react";
import axios from "axios";

export default function Post(props) {
  const {userProps, post, isOwner} = props;

  // Modal
	const [showModal, setShowModal] = useState(false);
	const [modalPrefference, setModalPrefference] = useState({
		title: "Modal",
		buttonName: "confirm",
		onConfirm: () => { },
	});
  const DEFAULT_QR_CODE = "DEFAULT";
	const [qrvalue, setQrvalue] = useState(DEFAULT_QR_CODE);
	const modalInputRef = useRef();

	const modalProps = {
		showModal: showModal, setShowModal: setShowModal,
		modalPrefference: modalPrefference, setModalPrefference: setModalPrefference,
		qrvalue: qrvalue, setQrvalue: setQrvalue,
		modalInputRef: modalInputRef
	}

  const [postWriter, setPostWriter] = useState("");

  // get post username
  const getPostUser = async () => {
    const response = await axios.get("/users/" + post.userId);
    if (response && response.data)
      setPostWriter(response.data.username);
  }

  useEffect(() => {
    return () => {
      getPostUser();
    };
  }, []);

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <span className="postUsername">
              {postWriter}
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
                <button
                className="postButton"
                onClick={() => {setShowModal(true)}}
                >
                  {modalPrefference.buttonName}
                </button>
              </div> : null
          }
        </div>
      </div>
      <div className="modalWrappter">
        <PostModal userProps={userProps} modalProps={modalProps} post={post} />
      </div>
    </div>
  );
}
