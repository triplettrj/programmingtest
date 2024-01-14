import React from 'react'
import Link from 'next/link'
import styles from '../../styles/layout.module.css'

const navLinks = [
  { href: "/", text: "Home" },
  { href: "/Loginpage", text: "Login" },
  { href: "/Projectupload", text: "Project Upload" },
  { href: "/Spaghetti", text: "Spaghetti diagram" },
]

const Layout = ({children}) => {
  return (
    <div className={styles['layout-container']}>
      <header className={styles.container}>
        <nav>
          {navLinks.map((link, index) => (
            <Link key={index} href={link.href}>{link.text}</Link>
          ))}
        </nav>
      </header>
      <main>{children}</main>
    </div>
  )
}

export default Layout