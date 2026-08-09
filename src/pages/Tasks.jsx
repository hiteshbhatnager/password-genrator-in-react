import React, { useMemo, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { getPlannerData, savePlannerData } from '../lib/plannerData';
import { Button, Input } from '../components';

function Tasks() {
    const { user } = useAuth();
    const { addToast } = useToast();
    const [tasks, setTasks] = useState(() => getPlannerData(user?.$id).tasks);
    const [filter, setFilter] = useState('All');
    const [query, setQuery] = useState('');
    const [form, setForm] = useState({ title: '', priority: 'Medium' });

    const saveTasks = (nextTasks) => {
        setTasks(nextTasks);
        savePlannerData(user?.$id, 'tasks', nextTasks);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!form.title.trim()) {
            addToast('Please enter a task title.', 'error');
            return;
        }
        const nextTask = { id: `${Date.now()}`, title: form.title.trim(), priority: form.priority, completed: false };
        saveTasks([...tasks, nextTask]);
        setForm({ title: '', priority: 'Medium' });
        addToast('Task added.', 'success');
    };

    const toggleTask = (id) => {
        const nextTasks = tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task));
        saveTasks(nextTasks);
        addToast('Task updated.', 'success');
    };

    const deleteTask = (id) => {
        saveTasks(tasks.filter((task) => task.id !== id));
        addToast('Task removed.', 'success');
    };

    const visibleTasks = useMemo(() => tasks.filter((task) => {
        const matchesQuery = task.title.toLowerCase().includes(query.toLowerCase());
        const matchesFilter = filter === 'All' ? true : filter === 'Completed' ? task.completed : !task.completed;
        return matchesQuery && matchesFilter;
    }), [filter, query, tasks]);

    return (
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            <div className="rounded-[24px] border border-[#2d3850] bg-[#11182b] p-6 shadow-[0_16px_45px_rgba(0,0,0,0.26)] sm:p-8">
                <h1 className="text-2xl font-semibold text-[#f4f7ff]">Tasks</h1>
                <p className="mt-2 text-sm text-[#9ba8c3]">Manage assignments and deadlines without losing momentum.</p>
            </div>

            <div className="mt-6 grid gap-4 xl:grid-cols-[0.8fr_1.2fr]">
                <form onSubmit={handleSubmit} className="rounded-[20px] border border-[#2d3850] bg-[#171f33] p-5">
                    <h2 className="text-lg font-semibold text-[#f4f7ff]">Add task</h2>
                    <div className="mt-4 space-y-3">
                        <Input value={form.title} onChange={(event) => setForm((current) => ({ ...current, title: event.target.value }))} placeholder="Task title" />
                        <select value={form.priority} onChange={(event) => setForm((current) => ({ ...current, priority: event.target.value }))} className="w-full rounded-2xl border border-[#2d3850] bg-[#0f1424] px-4 py-2.5 text-sm text-[#f4f7ff] outline-none">
                            <option value="High">High</option>
                            <option value="Medium">Medium</option>
                            <option value="Low">Low</option>
                        </select>
                        <Button text="Save task" className="w-full" />
                    </div>
                </form>

                <div className="rounded-[20px] border border-[#2d3850] bg-[#171f33] p-5">
                    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                        <Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search tasks" className="md:max-w-xs" />
                        <div className="flex gap-2">
                            {['All', 'Pending', 'Completed'].map((option) => (
                                <button key={option} onClick={() => setFilter(option)} className={`rounded-full px-3 py-1.5 text-sm ${filter === option ? 'bg-[#6d7cff] text-white' : 'bg-[#202a40] text-[#9ba8c3]'}`}>
                                    {option}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="mt-4 space-y-2">
                        {visibleTasks.length ? visibleTasks.map((task) => (
                            <div key={task.id} className={`flex flex-col gap-3 rounded-2xl border px-3 py-3 sm:flex-row sm:items-center sm:justify-between ${task.completed ? 'border-[#38c895]/30 bg-[#38c895]/10' : 'border-[#2d3850] bg-[#0f1424]'}`}>
                                <div className="flex items-center gap-3">
                                    <input type="checkbox" checked={task.completed} onChange={() => toggleTask(task.id)} className="h-4 w-4 rounded border-[#2d3850] bg-[#171f33]" />
                                    <div>
                                        <p className={`text-sm font-medium ${task.completed ? 'text-[#38c895]' : 'text-[#f4f7ff]'}`}>{task.title}</p>
                                        <p className="text-xs text-[#9ba8c3]">{task.priority} priority</p>
                                    </div>
                                </div>
                                <button onClick={() => deleteTask(task.id)} className="text-sm text-[#ff6b7a]">Delete</button>
                            </div>
                        )) : <p className="rounded-2xl border border-dashed border-[#2d3850] px-4 py-8 text-center text-sm text-[#9ba8c3]">No tasks match this view.</p>}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Tasks;
