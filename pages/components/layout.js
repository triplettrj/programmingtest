import React from 'react'
import Link from 'next/link'
import styles from '../../styles/layout.module.css'

const Layout = ({ children }) => {
return (
    <div className={styles['layout-container']}>
    {/* Add your header here */}
    <header className={styles.container}>
        <nav>
        <Link href="/">Home</Link>
        <Link href="/Loginpage">Login</Link>
        <Link href="/Projectupload">Project Upload</Link>
        <Link href="/Spaghetti">Spaghetti diagram</Link>
        </nav>
    </header>
    <main>{children}</main>
    </div>
    )
}

export default Layout
