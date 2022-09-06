import Post from "../post/Post";
import "./myPosts.css";
import { useState, useEffect } from "react";
import axios from "axios";

export default function MyPosts(props) {
  // Post
  const [posts, setPosts] = useState([]);

  const {user} = props;

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await axios.get("/posts/user/" + user._id);
      setPosts(
        response.data.sort((p1, p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt);
        })
      );
    }
    fetchPosts();
  }, []);

  return (
    <div className="feed">
      <div className="feedWrapper">
        {posts.map((p) => (
          <Post key={p._id} post={p} isOwner={true} user={user} />
        ))}
      </div>  
    </div>
  );
}
