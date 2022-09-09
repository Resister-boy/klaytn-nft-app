import Post from "../post/Post";
import Upload from "../upload/Upload";
import "./feed.css";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Feed(props) {
  const {userProps} = props;
  const [posts, setPosts] = useState([]);  

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
  }, []);

  return (
    <div className="feed">
      <div className="feedWrapper">
        <Upload />
        {posts.map((p) => (
          <Post key={p._id} post={p} userProps={userProps} isOwner={false}/>
        ))}
      </div>
    </div>
  );
}
