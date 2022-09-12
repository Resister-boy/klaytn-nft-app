import React, { useContext } from 'react'
import LoginButton from '../loginButton/LoginButton'
import UserButton from '../userButton/UserButton'
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
            <Link to="/market">
              <span className={styles.navItem}>Market</span>
            </Link>
            <Link to="/posting">
              <span className={styles.navItem}>Posting</span>
            </Link>
          </nav>
          <div className={styles.walletContainer}>
            {user
              ? <UserButton />
              : <LoginButton className={styles.modalButton} />
            }
          </div>
        </div>
      </header>
    </ModalContextProvider>
  )
}

export default Header