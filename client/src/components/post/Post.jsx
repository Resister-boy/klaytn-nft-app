import React, { useContext, useState, useEffect } from 'react';
import { format } from "timeago.js";
import styles from './Post.module.scss'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';

export default function Post({ index, post }) {
  const id = String(index).padStart(4, "0");
  const fixedContent = post.content.slice(0, 60);
  const [user, setUser] = useState({});
  const { user: currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get("/users/" + post.userId)
        .catch(function (error) {
          setUser(undefined);
        })
      if (res && res.data)
        setUser(res.data);
    };
    fetchUser();
  }, [post.userId]);

  return (
    <section className={styles.container}>
      <Link to={`/post/${id}`}>
        <img
          src="https://gateway.pinata.cloud/ipfs/QmeeXqY7pgRg1KvmDjSgw191oEG1wkxncq5RrAt6XK4h1p"
          alt="content" 
          width="270"
          height="270"
        />
        <div className={styles.textContainer}>
          <div className={styles.titleContainer}>
            <span className={styles.title}>{post.title}</span>
            <span className={styles.number}>#{id}</span>
          </div>
          <div className={styles.contentContainer}>
            <div className={styles.content}>
              {fixedContent}...
            </div>
            <span className={styles.date}>{format(post.createdAt)}</span>
          </div>
        </div>
      </Link>
    </section>
  )
}