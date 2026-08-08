import React from 'react';
import Navbar from './pages/nav';
import Footer from './pages/footer';

function Layout() {
    return (
        <>
            <Navbar />
            <Outlet />
            <Footer />
        </>
    )
}

export default Layout;