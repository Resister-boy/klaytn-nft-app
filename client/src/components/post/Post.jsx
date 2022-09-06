import "./post.css";
import { MoreVert } from "@mui/icons-material";
import { Users } from "../../dummyData";
import { useState } from "react";

export default function Post({ post }) {
  const [like,setLike] = useState(post.like);
  const [isLiked,setIsLiked] = useState(false);

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
        </div>
      </div>
    </div>
  );
}
