import React, { useMemo } from 'react';
import { useAuth } from '../context/AuthContext';
import { getPlannerData } from '../lib/plannerData';

function Dashboard() {
    const { user } = useAuth();
    const data = useMemo(() => getPlannerData(user?.$id), [user?.$id]);

    const completedTasks = data.tasks.filter((task) => task.completed).length;
    const pendingTasks = data.tasks.length - completedTasks;
    const attendancePct = data.timetable.length ? Math.round((completedTasks / Math.max(data.timetable.length, 1)) * 100) : 92;

    return (
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            <div className="rounded-[24px] border border-[#2d3850] bg-[#11182b] p-6 shadow-[0_16px_45px_rgba(0,0,0,0.26)] sm:p-8">
                <p className="text-sm font-medium uppercase tracking-[0.3em] text-[#6d7cff]">Dashboard</p>
                <h1 className="mt-2 text-2xl font-semibold text-[#f4f7ff]">Welcome back, {user?.name || 'student'}.</h1>
                <p className="mt-3 text-sm text-[#9ba8c3]">Keep your classes, tasks and goals aligned from one calm view.</p>
            </div>

            <div className="mt-6 grid gap-4 lg:grid-cols-3">
                <div className="rounded-[20px] border border-[#2d3850] bg-[#171f33] p-5">
                    <p className="text-sm text-[#9ba8c3]">Classes scheduled</p>
                    <p className="mt-2 text-3xl font-semibold text-[#f4f7ff]">{data.timetable.length}</p>
                </div>
                <div className="rounded-[20px] border border-[#2d3850] bg-[#171f33] p-5">
                    <p className="text-sm text-[#9ba8c3]">Pending tasks</p>
                    <p className="mt-2 text-3xl font-semibold text-[#f4f7ff]">{pendingTasks}</p>
                </div>
                <div className="rounded-[20px] border border-[#2d3850] bg-[#171f33] p-5">
                    <p className="text-sm text-[#9ba8c3]">Attendance</p>
                    <p className="mt-2 text-3xl font-semibold text-[#38c895]">{attendancePct}%</p>
                </div>
            </div>

            <div className="mt-6 grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
                <div className="rounded-[20px] border border-[#2d3850] bg-[#171f33] p-5">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-lg font-semibold text-[#f4f7ff]">Today&apos;s plan</h2>
                            <p className="text-sm text-[#9ba8c3]">A quick snapshot of your day.</p>
                        </div>
                    </div>
                    <div className="mt-4 space-y-2">
                        {data.timetable.length ? data.timetable.slice(0, 3).map((item) => (
                            <div key={item.id} className="flex items-center justify-between rounded-2xl border border-[#2d3850] bg-[#0f1424] px-3 py-3">
                                <div>
                                    <p className="text-sm font-medium text-[#f4f7ff]">{item.subject}</p>
                                    <p className="text-xs text-[#9ba8c3]">{item.day} · {item.time}</p>
                                </div>
                                <span className="rounded-full border border-[#6d7cff]/30 bg-[#6d7cff]/10 px-2.5 py-1 text-[11px] font-semibold text-[#6d7cff]">{item.room}</span>
                            </div>
                        )) : <p className="rounded-2xl border border-dashed border-[#2d3850] px-4 py-6 text-sm text-[#9ba8c3]">No classes added yet.</p>}
                    </div>
                </div>

                <div className="rounded-[20px] border border-[#2d3850] bg-[#171f33] p-5">
                    <h2 className="text-lg font-semibold text-[#f4f7ff]">Upcoming tasks</h2>
                    <div className="mt-4 space-y-2">
                        {data.tasks.length ? data.tasks.slice(0, 4).map((task) => (
                            <div key={task.id} className="rounded-2xl border border-[#2d3850] bg-[#0f1424] px-3 py-3">
                                <p className="text-sm font-medium text-[#f4f7ff]">{task.title}</p>
                                <p className="mt-1 text-xs text-[#9ba8c3]">{task.priority} · {task.completed ? 'Done' : 'Pending'}</p>
                            </div>
                        )) : <p className="rounded-2xl border border-dashed border-[#2d3850] px-4 py-6 text-sm text-[#9ba8c3]">No tasks yet. Add your first one.</p>}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
