import React from 'react'
import { useState, useEffect } from 'react';
import axios from "axios"
import styles from './Feed.module.scss';
import Post from "../post/Post";



export default function MarketFeed() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await axios.get("/klaytn/info/all")
        .catch(function (error) {
          if (error && error.respone)
            alert(error.response.data);
        })
      setPosts(
        response.data.sort((p1, p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt);
        })
      );
    }
    fetchPosts();
  }, []);

  let idx = 0;

  return (
    <section className={styles.container}>
      <div className={styles.title}>
        Klayklay Feed
      </div>
      <div className={styles.postContainer}>
        {posts.map((p) => (
          <Post key={p._id} index={idx++} post={p} />
        ))}
      </div>
    </section>
  )
}