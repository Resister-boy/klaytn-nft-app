import "./userPage.css"
import Post from "../../components/post/Post";
import { useEffect, useState } from "react";
import axios from "axios";

export default function UserPage(props) {
  // Post
  const [posts, setPosts] = useState([]);
  // User
  const {userProps} = props;

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await axios.get("/posts/user/" + userProps.user._id);
      if (response && response.data)
      {
        setPosts(
          response.data.sort((p1, p2) => {
            return new Date(p2.createdAt) - new Date(p1.createdAt);
          })
        );
      }
    }
    fetchPosts();
  }, []);

  if (!userProps.user)
  {
    return (<div>{alert("NO USER")}</div>);
  }
  return (
    <div className="feed">
      <div className="feedWrapper">
        {posts.map((p) => {
          if (p.isNFT === false)
            return (
              <Post key={p._id} post={p} isOwner={true} userProps={userProps} />
            );
        })}
      </div>  
    </div>
  );
}
