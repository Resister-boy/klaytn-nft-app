import React from 'react'
import { Link } from 'react-router-dom'
import styles from './Logo.module.scss'

export default function Logo() {
  return (
    <div>
      <Link to="/">
        <span className={styles.title}>
          Klayklay
        </span>
      </Link>
    </div>
  )
}
