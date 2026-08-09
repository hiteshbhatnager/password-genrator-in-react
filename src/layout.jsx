import React from 'react';
import { Navbar, Footer, Sidebar } from './components';
import { Outlet } from 'react-router-dom';

function Layout() {
    return (
        <div className="min-h-screen bg-[#0b1020] text-[#f4f7ff]">
            <Navbar />
            <Sidebar />
            <div className="min-h-screen md:pl-16">
                <main className="min-h-screen">
                    <Outlet />
                </main>
                <Footer />
            </div>
        </div>
    )
}

export default Layout;