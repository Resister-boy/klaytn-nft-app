import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "./Upload.module.scss";
import dateFormat, { masks } from "dateformat";
import { AuthContext } from "../../context/AuthContext";
import { ModalContextProvider } from "../../context/ModalContext";
import NftButton from "../nftButton/NftButton";
import { useRef } from "react";
import { useContext } from "react";

export default function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState("");
  const { user } = useContext(AuthContext);
  const url = useRef("");
  const title = useRef("");
  const content = useRef("");

  const postUpload = async () => {
    const postJson = {
      userId: user._id,
      title: title.current.value,
      content: content.current.value,
      image: url.current.value,
    };
    const res = await axios.post("/posts", postJson).catch(function (error) {
      alert("Upload failed.");
      if (error && error.response && error.response.status)
        alert("status: " + error.response.status);
    });
    alert("Upload success!");
  };

  return (
    <ModalContextProvider>
      <section className={styles.container}>
        <div className={styles.imageContainer}>
          {post?.image ? (
            <img
              src={post.image}
              alt="content"
              className={styles.imageContent}
            />
          ) : null}
        </div>
        <div className={styles.textContainer}>
          <div className={styles.basicContainer}>
            <div>Title</div>
            <input className={styles.contentTitle} required ref={title}></input>
          </div>
          <div className={styles.uniqueContainer}>
            <div className={styles.contentContainer}>
              <textarea
                className={styles.contentContainerSub}
                ref={content}
              ></textarea>
            </div>
            <div className={styles.descriptContainer}>
              <input
                type="url"
                style={{ border: "solid 1px black" }}
                placeholder={"Please enter image URL"}
                ref={url}
              />
              <button
                onClick={() => {
                  postUpload();
                }}
                className={styles.modalButton}
              >
                submit
              </button>
            </div>
            <div className=""></div>
          </div>
        </div>
      </section>
    </ModalContextProvider>
  );
}
