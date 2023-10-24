import React from 'react';
import Link from 'next/link';

const Layout = ({ children }) => {
return (
    <div>
    {/* Add your header here */}
    <header>
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
};

export default Layout;
