import React from 'react'
import { Link } from 'react-router-dom'
import styles from './Footer.module.scss'

export default function Footer() {
  return (
    <footer className={styles.container}>
      <div className={styles.inner}>
        <div className={styles.informationContainer}>
          <div className={styles.information}>
            <span className={styles.logo}>Klayklay</span>
            <p className={styles.description}>
              descriptiondescriptiondescription <br />
              descriptiondescriptiondescription <br />
              descriptiondescriptiondescription <br />
              descriptiondescriptiondescription <br />
              descriptiondescriptiondescription
            </p>
          </div>
        </div>
        <div className={styles.linkContainer}>
          <div className={styles.linkItem}>
            <span className={styles.linkTitle}>Title</span>
            <Link to="/">Link</Link>
          </div>
          <div className={styles.linkItem}>
            <span className={styles.linkTitle}>Title</span>
            <Link to="/">Link</Link>
          </div>
          <div className={styles.linkItem}>
            <span className={styles.linkTitle}>Title</span>
            <Link to="/">Link</Link>
          </div>
          <div className={styles.linkItem}>
            <span className={styles.linkTitle}>Title</span>
            <Link to="/">Link</Link>
          </div>
        </div>
      </div>
      <div className={styles.copyrightContainer}>
        <div className={styles.copyright}>Klayklay ⓒ{ new Date().getFullYear() } All Right Resolved.</div>
      </div>
    </footer>
  )
}