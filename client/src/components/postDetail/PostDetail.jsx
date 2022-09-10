import axios from 'axios';
import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styles from './PostDetail.module.scss';
import dateFormat, { masks } from "dateformat";
import { AuthContext } from '../../context/AuthContext';


export default function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState("");
  const [user, setUser] = useState("");
  // const { user: currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchPost = async () => {
      const res = await axios.get("/posts/" + id);
      if (res && res.data)
        setPost(res.data);
      fetchUser(res.data);
    }
    const fetchUser = async (post) => {
      const res = await axios.get("/users/" + post.userId)
        .catch(function (error) {
        })
      if (res && res.data)
        setUser(res.data);
    };
    fetchPost();
  }, []);

  return (
    <section className={styles.container}>
      <div className={styles.imageContainer}>
        {
          post?.image ?
            <img
              src={post.image}
              alt="content"
              width="400"
              className={styles.imageContent}
            />
            : null
        }
      </div>
      <div className={styles.textContainer}>
        <div className={styles.basicContainer}>
          <span className={styles.contentTitle}>{post.title}</span>
          <div className={styles.contentAddress}>0x01234567</div>
          <div className={styles.contentDate}>{dateFormat(post.createdAt, "yyyy-mm-dd HH:MM:ss")}</div>
        </div>
        <div className={styles.uniqueContainer}>
          <div className={styles.contentContainer}>{post.content}</div>
          <span className={styles.ownerName}>{user ? user.username : "undefined"}</span>
          <span className={styles.ownerAddress}>{user ? user.walletAddress : "undefined"}</span>
          <div>isNFT? {post.isNFT ? "true" : "false"}</div>
        </div>
      </div>
    </section>
  )
}