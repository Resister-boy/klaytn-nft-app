import React, { useContext } from 'react'
import LoginButton from '../loginButton/LoginButton'
import Logo from '../logo/Logo'
import { Link } from 'react-router-dom'
import styles from './Header.module.scss'
import { ModalContextProvider } from '../../context/ModalContext'
import { AuthContext } from '../../context/AuthContext'

function Header() {
  const { user } = useContext(AuthContext);

  return (
    <ModalContextProvider>
      <header className={styles.container}>
        <div className={styles.inner}>
          <div className={styles.logoContainer}>
            <Logo />
          </div>
          <nav className={styles.navContainer}>
            <Link to="/feed">
              <span className={styles.navItem}>Feed</span>
            </Link>
            <Link to="/dashboard">
              <span className={styles.navItem}>Dashboard</span>
            </Link>
          </nav>
          <div className={styles.walletContainer}>
            {user
              ? <span className={styles.connected}>{user.username}</span>
              : <LoginButton className={styles.modalButton} />
            }
          </div>
        </div>
      </header>
    </ModalContextProvider>
  )
}

export default Header