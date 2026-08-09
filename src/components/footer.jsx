import React from 'react';

function Footer() {
    return (
        <footer className="w-full border-t border-[#2d3850] bg-[#0f1424] text-[#9ba8c3]">
            <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-6 sm:px-6 lg:px-8 md:flex-row md:items-center md:justify-between">
                <div>
                    <h2 className="text-base font-semibold text-[#f4f7ff]">
                        College Planner
                    </h2>
                    <p className="mt-1 text-sm">
                        Plan less. Learn more.
                    </p>
                </div>

                <div className="flex flex-wrap gap-4 text-sm">
                    <a href="#" className="transition-colors hover:text-[#6d7cff]">
                        Home
                    </a>
                    <a href="#" className="transition-colors hover:text-[#6d7cff]">
                        About
                    </a>
                    <a href="#" className="transition-colors hover:text-[#6d7cff]">
                        Contact
                    </a>
                </div>
            </div>

            <div className="border-t border-[#202a40] px-4 py-4 text-center text-sm sm:px-6 lg:px-8">
                © {new Date().getFullYear()} College Planner. All rights reserved.
            </div>
        </footer>
    );
}

export default Footer;

