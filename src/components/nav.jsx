import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Input } from './index';
import { useAuth } from '../context/AuthContext';

function Navbar() {
    const navigate = useNavigate();
    const { user, logout, loading } = useAuth();

    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };

    return (
        <nav className="sticky top-0 z-40 w-full border-b border-[#2d3850] bg-[#0f1424]/90 backdrop-blur-xl">
            <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
                <div className="flex flex-1 items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-[#2d3850] bg-[#171f33] text-sm font-semibold text-[#6d7cff]">
                        CP
                    </div>
                    <div className="hidden flex-1 sm:block">
                        <Input placeholder="Search planner" className="max-w-md" />
                    </div>
                </div>

                <div className="flex items-center gap-2 sm:gap-3">
                    {user ? (
                        <div className="flex items-center gap-3 rounded-2xl border border-[#2d3850] bg-[#171f33] px-3 py-2">
                            <div className="leading-tight">
                                <p className="text-sm font-medium text-[#f4f7ff]">{user.name || 'Student'}</p>
                                <p className="text-xs text-[#9ba8c3]">{user.email || ''}</p>
                            </div>
                            <Button text={loading ? '...' : 'Logout'} className="px-3 py-1.5 text-xs" onClick={handleLogout} />
                        </div>
                    ) : (
                        <>
                            <Button text="Login" className="bg-transparent px-3.5 py-2 text-sm text-[#f4f7ff] hover:bg-[#171f33]" onClick={() => navigate('/login')} />
                            <Button text="Sign up" className="px-3.5 py-2 text-sm" onClick={() => navigate('/signup')} />
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;