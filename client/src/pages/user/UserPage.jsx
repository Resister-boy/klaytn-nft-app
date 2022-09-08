import "./userPage.css"
import Post from "../../components/post/Post";
import * as CaverAPI from "../../api/UseCaver";
import { useEffect, useState } from "react";
import axios from "axios";

export default function UserPage(props) {
  // Post
  const [myPosts, setMyPosts] = useState([]);
  // NFTs
  const [myNFTs, setMyNFTs] = useState([]);
  // User
  const {userProps} = props;
  const user = userProps.user;

  useEffect(() => {
    // fetch DB posts
    const fetchMyPosts = async () => {
      const response = await axios.get("/posts/user/" + userProps.user._id);
      if (response && response.data)
      {
        setMyPosts(
          response.data.sort((p1, p2) => {
            return new Date(p2.createdAt) - new Date(p1.createdAt);
          })
        );
      }
    }

    // fetch NFT posts
    const fetchMyNFTs = async () => {
      if (!user)
      {
        alert("fetch nfts error: no user");
        return ;
      }
      const _nfts = await CaverAPI.fetchCardOf(user.walletAddress);
		  setMyNFTs(_nfts);
    }

    fetchMyPosts();
    fetchMyNFTs();
  }, []);

  if (!userProps.user)
  {
    return (<div>{alert("NO USER")}</div>);
  }
  return (
    <div className="feed">
      <div className="feedWrapper">
        <div className="leftPosts">
          {myPosts.map((p) => {
            if (p.isNFT === false)
              return (
                <Post key={p._id} post={p} isOwner={true} userProps={userProps} />
              );
          })}
        </div>
        <div className="rightPosts">
          
        </div>
      </div>
    </div>
  );
}
