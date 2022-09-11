import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import styles from './UserDetail.module.scss'

export default function UserDetail({ user }) {
  const { user: currentUser, myBalance } = useContext(AuthContext);

  return (
    <section className={styles.container}>
      <div className={styles.profileContainer}>
        {
          user?.profilePicture ?
            <img
              src={user.profilePicture}
              alt="profile"
              width={`200`}
              height={`200`}
              className={styles.profileImageContent}
            /> : null
        }
        <div className={styles.textContainer}>
          <div className={styles.textItems}>
            <div className={styles.textBox}>
              <span className={styles.userName}>{user.username}</span>
              <span className={styles.userAddress}>{user.walletAddress}</span>
              <span className={styles.userAddress}>{user === currentUser ? myBalance : null}</span>
            </div>
            {
              user !== currentUser ?
                <div className={styles.socialContainer}>
                  <button>Follow</button>
                  <button>Following</button>
                </div> : null
            }
          </div>
          <div className={styles.description}>{user.desc}</div>
        </div>
      </div>
    </section>
  );
}