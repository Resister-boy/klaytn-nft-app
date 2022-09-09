import Post from "../post/Post";
import "./feed.css";
import "./Feed.module.scss";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

export default function Feed() {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await axios.get("/posts/timeline/all");
      setPosts(
        response.data.sort((p1, p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt);
        })
      );
    }
    fetchPosts();
  }, [user._id]);

  let idx = 0;

  return (
    <div className="feed">
      <div className="feedWrapper">
        {posts.map((p) => (
          <Post key={p._id} index={idx++} post={p} />
        ))}
      </div>
    </div>
  );
}
