import React from 'react';
import { Link } from 'react-router-dom';
import styles from './NotFound.module.scss';

export default function NotFound() {
  return (
    <div className={styles.container}>
      <div className={styles.inner}>
        <div className={styles.title}>Page</div>
        <div className={styles.description}><span>Not</span> Found</div>
      </div>
      <Link className={styles.homeButton} to="/" >Home</Link>
    </div>
  )
}