import React from 'react';
import { Sidebar, Button } from '../components';

function Home() {
    return (
        <>
            <Sidebar />
            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
                <section className="overflow-hidden rounded-[24px] border border-[#2d3850] bg-[#11182b] shadow-[0_16px_45px_rgba(0,0,0,0.26)]">
                    <div className="flex flex-col gap-6 p-6 sm:p-8 lg:flex-row lg:items-end lg:justify-between">
                        <div>
                            <p className="text-sm font-medium uppercase tracking-[0.3em] text-[#6d7cff]">Today&apos;s focus</p>
                            <h1 className="mt-2 text-2xl font-semibold text-[#f4f7ff] sm:text-3xl">College planner dashboard</h1>
                            <p className="mt-3 max-w-2xl text-sm text-[#9ba8c3] sm:text-base">
                                Keep your classes, deadlines and attendance in one polished view without losing momentum.
                            </p>
                        </div>
                        <div className="flex flex-wrap gap-3">
                            <Button text="View schedule" className="px-4" />
                            <Button text="Review tasks" className="border border-[#2d3850] bg-[#171f33] px-4 text-[#f4f7ff] hover:bg-[#202a40]" />
                        </div>
                    </div>
                </section>

                <div className="mt-6 grid gap-4 xl:grid-cols-[1.4fr_0.9fr]">
                    <div className="space-y-4">
                        <div className="grid gap-4 md:grid-cols-3">
                            <div className="rounded-[18px] border border-[#2d3850] bg-[#171f33] p-4">
                                <p className="text-sm text-[#9ba8c3]">Classes today</p>
                                <p className="mt-2 text-2xl font-semibold text-[#f4f7ff]">5</p>
                            </div>
                            <div className="rounded-[18px] border border-[#2d3850] bg-[#171f33] p-4">
                                <p className="text-sm text-[#9ba8c3]">Tasks due</p>
                                <p className="mt-2 text-2xl font-semibold text-[#f4f7ff]">12</p>
                            </div>
                            <div className="rounded-[18px] border border-[#2d3850] bg-[#171f33] p-4">
                                <p className="text-sm text-[#9ba8c3]">Attendance</p>
                                <p className="mt-2 text-2xl font-semibold text-[#38c895]">92%</p>
                            </div>
                        </div>

                        <div className="rounded-[20px] border border-[#2d3850] bg-[#171f33] p-4 sm:p-5">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h2 className="text-lg font-semibold text-[#f4f7ff]">Weekly timetable</h2>
                                    <p className="text-sm text-[#9ba8c3]">A clean view of your week.</p>
                                </div>
                                <span className="rounded-full border border-[#2d3850] bg-[#202a40] px-3 py-1 text-xs text-[#9ba8c3]">This week</span>
                            </div>
                            <div className="mt-4 overflow-x-auto">
                                <div className="min-w-[560px] rounded-[16px] border border-[#2d3850] bg-[#0f1424] p-3">
                                    <div className="grid grid-cols-5 gap-2 text-center text-xs uppercase tracking-[0.2em] text-[#9ba8c3]">
                                        <div className="rounded-xl bg-[#171f33] p-2">Mon</div>
                                        <div className="rounded-xl bg-[#171f33] p-2">Tue</div>
                                        <div className="rounded-xl bg-[#171f33] p-2">Wed</div>
                                        <div className="rounded-xl bg-[#171f33] p-2">Thu</div>
                                        <div className="rounded-xl border border-[#6d7cff]/30 bg-[#6d7cff]/10 p-2 text-[#6d7cff]">Fri</div>
                                    </div>
                                    <div className="mt-3 grid grid-cols-5 gap-2">
                                        {['Math', 'Physics', 'English', 'Chem', 'Design'].map((subject, index) => (
                                            <div key={subject} className={`rounded-2xl border border-[#2d3850] bg-[#171f33] p-3 text-sm text-[#f4f7ff] ${index === 4 ? 'border-[#6d7cff]/30 bg-[#6d7cff]/10' : ''}`}>
                                                <p className="font-medium">{subject}</p>
                                                <p className="mt-1 text-xs text-[#9ba8c3]">09:00</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="rounded-[20px] border border-[#2d3850] bg-[#171f33] p-4 sm:p-5">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h2 className="text-lg font-semibold text-[#f4f7ff]">Pending tasks</h2>
                                    <p className="text-sm text-[#9ba8c3]">Priority kept clear and compact.</p>
                                </div>
                                <span className="rounded-full border border-[#2d3850] bg-[#202a40] px-3 py-1 text-xs text-[#9ba8c3]">4 active</span>
                            </div>
                            <div className="mt-4 space-y-2">
                                {[
                                    ['Submit lab report', 'High'],
                                    ['Review notes', 'Medium'],
                                    ['Group project', 'Low']
                                ].map(([title, priority]) => (
                                    <div key={title} className="flex items-center justify-between rounded-2xl border border-[#2d3850] bg-[#0f1424] px-3 py-3">
                                        <div>
                                            <p className="text-sm font-medium text-[#f4f7ff]">{title}</p>
                                            <p className="text-xs text-[#9ba8c3]">Due soon</p>
                                        </div>
                                        <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${priority === 'High' ? 'bg-[#ff6b7a]/15 text-[#ff6b7a]' : priority === 'Medium' ? 'bg-[#f4b844]/15 text-[#f4b844]' : 'bg-[#38c895]/15 text-[#38c895]'}`}>
                                            {priority}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="rounded-[20px] border border-[#2d3850] bg-[#171f33] p-4 sm:p-5">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h2 className="text-lg font-semibold text-[#f4f7ff]">Subjects</h2>
                                    <p className="text-sm text-[#9ba8c3]">Progress stays visible.</p>
                                </div>
                                <a href="#" className="text-sm text-[#6d7cff] transition-colors hover:text-[#9b6cff]">View details</a>
                            </div>
                            <div className="mt-4 space-y-3">
                                {[
                                    ['Calculus', '88%', 'bg-[#6d7cff]'],
                                    ['UI Design', '76%', 'bg-[#9b6cff]'],
                                    ['History', '94%', 'bg-[#38c895]']
                                ].map(([name, percent, color]) => (
                                    <div key={name} className="rounded-2xl border border-[#2d3850] bg-[#0f1424] p-3">
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="font-medium text-[#f4f7ff]">{name}</span>
                                            <span className="text-[#9ba8c3]">{percent}</span>
                                        </div>
                                        <div className="mt-2 h-2 overflow-hidden rounded-full bg-[#202a40]">
                                            <div className={`h-full rounded-full ${color}`} style={{ width: percent }} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home;