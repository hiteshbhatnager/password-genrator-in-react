import React from 'react';
import { NavLink } from 'react-router-dom';

const links = [
    { to: '/dashboard', label: 'Dashboard', icon: '🏠' },
    { to: '/timetable', label: 'Timetable', icon: '📅' },
    { to: '/subjects', label: 'Subjects', icon: '📚' },
    { to: '/tasks', label: 'Tasks', icon: '✓' },
    { to: '/attendance', label: 'Attendance', icon: '📈' },
    { to: '/calendar', label: 'Calendar', icon: '🗓️' },
    { to: '/settings', label: 'Settings', icon: '⚙️' }
];

function Sidebar() {
    return (
        <aside className="fixed left-0 top-0 flex h-screen w-16 flex-col items-center border-r border-[#2d3850] bg-[#11182b] py-5 shadow-[0_10px_40px_rgba(0,0,0,0.24)]">
            <div className="mb-8 flex h-10 w-10 items-center justify-center rounded-2xl bg-[#6d7cff] text-sm font-semibold text-white shadow-lg shadow-[#6d7cff]/20">
                CP
            </div>

            <div className="flex flex-col items-center gap-3">
                {links.map((link) => (
                    <NavLink
                        key={link.to}
                        to={link.to}
                        className={({ isActive }) => `flex h-11 w-11 items-center justify-center rounded-2xl text-lg transition-all duration-200 ${isActive ? 'bg-[#6d7cff]/15 text-[#f4f7ff] shadow-inner after:absolute after:left-0 after:top-1/2 after:h-6 after:w-1 after:-translate-y-1/2 after:rounded-full after:bg-[#6d7cff]' : 'text-[#9ba8c3] hover:bg-[#171f33] hover:text-[#f4f7ff]'}`}
                        aria-label={link.label}
                        title={link.label}
                    >
                        {link.icon}
                    </NavLink>
                ))}
            </div>
        </aside>
    );
}

export default Sidebar;