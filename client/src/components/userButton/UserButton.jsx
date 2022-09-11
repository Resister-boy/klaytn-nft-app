import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import styles from './UserButton.module.scss'
import { Link } from 'react-router-dom'


export default function UserButton() {
  // User
  const { user } = useContext(AuthContext);

  return (
    <div className={styles.container}>
      <Link to={`/myprofile`}>
        <button className={styles.modalButton}>
          {user.username}
        </button>
      </Link>
    </div>
  );
}