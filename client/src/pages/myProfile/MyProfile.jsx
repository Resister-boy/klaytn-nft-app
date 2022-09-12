import Post from "../../components/post/Post";
import * as CaverAPI from "../../api/UseCaver";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import UserDetail from "../../components/userDetail/UserDetail";
import styles from "./MyProfile.module.scss"

export default function MyProfile() {
  // User
  const { user: currentUser, myAddress: walletAddress, setMyBalance } = useContext(AuthContext);
  let idx = 0;

  // Post
  const [myPosts, setMyPosts] = useState([]);
  // NFTs
  const [myNFTs, setMyNFTs] = useState([]);
  // User
  const { user } = useContext(AuthContext);
  // Tab
  const [tab, setTab] = useState("My Posts");

  useEffect(() => {
    // fetch DB posts
    const fetchMyPosts = async () => {
      const response = await axios.get("/posts/user/" + user._id);
      if (response && response.data) {
        setMyPosts(
          response.data.sort((p1, p2) => {
            return new Date(p2.createdAt) - new Date(p1.createdAt);
          })
        );
      }
    }

    // fetch NFT posts
    const fetchMyNFTs = async () => {
      if (!user) {
        alert("fetch nfts error: no user");
        return ;
      }
      const _nftURLs = await axios.put("/klaytn/info/" + walletAddress);
      let _nftPosts = [];
      for (let i = 0; i < _nftURLs.data.length; i++) {
        const _nft = await axios.get(_nftURLs.data[i].uri)
        if (_nft.data == null) {
          continue;
        } else {
          _nftPosts.push(_nft.data)
        }
      }
      // console.log(_nftPosts)
      setMyNFTs(_nftPosts)
    }
    // const fetchMyNFTs = async () => {
    //   if (!user) {
    //     alert("fetch nfts error: no user");
    //     return;
    //   }
    //   const _nfts = await CaverAPI.fetchCardOf(user.walletAddress);
    //   let _nftPosts = [];
    //   for (let i = 0; i < _nfts.length; i++) {
    //     const response = await axios.get(_nfts[i].uri)
    //       .catch(function (error) {
    //       })
    //     if (response && response.data) {
    //       _nftPosts.push(response.data);
    //     }
    //   }
    //   setMyNFTs(_nftPosts);
    //   console.log(_nftPosts);
    // }

    fetchMyPosts();
    fetchMyNFTs();
  }, []);

  if (!user) {
    return (<div>{alert("NO USER")}</div>);
  }

  return (
    <div className={styles.container}>
      <div className="userProfile">
        <UserDetail user={user} />
      </div>
      <div className={styles.tabContainer}>
        <button className={styles.tabButton} onClick={() => { setTab("My Posts") }}> My Posts </button>
        <button className={styles.tabButton} onClick={() => { setTab("My NFTs") }}> My NFTs </button>
      </div>
      {
        // (
        //   <Post key={p._id} index={idx++} post={p} />
        // )
        tab === "My Posts" ?
          <div className={styles.postContainer}>
            {myPosts.map((p) => {
              if (p.isNFT === false)
                return (<Post key={p._id} index={idx++} post={p} />);
            })}
          </div> : null
      }
      {
        tab === "My NFTs" ?
          <div className={styles.postContainer}>
            {myNFTs.map((p) => (
              <Post key={p._id} index={idx++} post={p} />
            ))}
          </div> : null
      }
    </div>
  );
}
