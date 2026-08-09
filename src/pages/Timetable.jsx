import React, { useEffect, useMemo, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { Button, Input } from '../components';
import { createClass, deleteClass, getClasses } from '../services/timetableService';

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

function Timetable() {
    const { user } = useAuth();
    const { addToast } = useToast();
    const [form, setForm] = useState({ subject: '', day: 'Mon', time: '', room: '' });
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        let active = true;

        const loadClasses = async () => {
            if (!user) return;
            setLoading(true);
            try {
                const nextItems = await getClasses();
                if (active) setItems(nextItems);
            } catch {
                if (active) setItems([]);
            } finally {
                if (active) setLoading(false);
            }
        };

        loadClasses();

        return () => {
            active = false;
        };
    }, [user?.$id]);

    const handleChange = (event) => {
        setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!form.subject.trim() || !form.time.trim()) {
            addToast('Please provide a subject and time.', 'error');
            return;
        }

        try {
            const nextItem = await createClass({ ...form, subject: form.subject.trim(), room: form.room.trim() || 'TBD' });
            setItems((current) => [...current, nextItem]);
            setForm({ subject: '', day: 'Mon', time: '', room: '' });
            addToast('Class added.', 'success');
        } catch (error) {
            addToast(error?.message || 'Unable to save class.', 'error');
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteClass(id);
            setItems((current) => current.filter((item) => item.$id !== id && item.id !== id));
            addToast('Class removed.', 'success');
        } catch (error) {
            addToast(error?.message || 'Unable to remove class.', 'error');
        }
    };

    const grouped = useMemo(() => days.map((day) => ({ day, classes: items.filter((item) => item.day === day) })), [items]);

    return (
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            <div className="rounded-[24px] border border-[#2d3850] bg-[#11182b] p-6 shadow-[0_16px_45px_rgba(0,0,0,0.26)] sm:p-8">
                <h1 className="text-2xl font-semibold text-[#f4f7ff]">Timetable</h1>
                <p className="mt-2 text-sm text-[#9ba8c3]">Plan your week and keep each class visible.</p>
            </div>

            <div className="mt-6 grid gap-4 xl:grid-cols-[0.8fr_1.2fr]">
                <form onSubmit={handleSubmit} className="rounded-[20px] border border-[#2d3850] bg-[#171f33] p-5">
                    <h2 className="text-lg font-semibold text-[#f4f7ff]">Add class</h2>
                    <div className="mt-4 space-y-3">
                        <Input name="subject" value={form.subject} onChange={handleChange} placeholder="Subject" />
                        <select name="day" value={form.day} onChange={handleChange} className="w-full rounded-2xl border border-[#2d3850] bg-[#0f1424] px-4 py-2.5 text-sm text-[#f4f7ff] outline-none">
                            {days.map((day) => <option key={day} value={day}>{day}</option>)}
                        </select>
                        <Input name="time" value={form.time} onChange={handleChange} placeholder="Time" />
                        <Input name="room" value={form.room} onChange={handleChange} placeholder="Room" />
                        <Button type="submit" text="Save class" className="w-full" />
                    </div>
                </form>

                <div className="overflow-hidden rounded-[20px] border border-[#2d3850] bg-[#171f33] p-5">
                    <div className="overflow-x-auto">
                        <div className="min-w-[560px] space-y-3">
                            {loading ? <p className="rounded-[16px] border border-dashed border-[#2d3850] px-4 py-8 text-center text-sm text-[#9ba8c3]">Loading timetable…</p> : grouped.map((group) => (
                                <div key={group.day} className="rounded-[16px] border border-[#2d3850] bg-[#0f1424] p-3">
                                    <p className="text-sm font-semibold text-[#f4f7ff]">{group.day}</p>
                                    <div className="mt-2 space-y-2">
                                        {group.classes.length ? group.classes.map((item) => {
                                            const itemId = item.$id || item.id;
                                            return (
                                                <div key={itemId} className="flex items-center justify-between rounded-2xl border border-[#2d3850] bg-[#171f33] px-3 py-3">
                                                    <div>
                                                        <p className="text-sm font-medium text-[#f4f7ff]">{item.subject}</p>
                                                        <p className="text-xs text-[#9ba8c3]">{item.time} · {item.room}</p>
                                                    </div>
                                                    <button onClick={() => handleDelete(itemId)} className="text-sm text-[#ff6b7a]">Delete</button>
                                                </div>
                                            );
                                        }) : <p className="rounded-2xl border border-dashed border-[#2d3850] px-3 py-3 text-sm text-[#9ba8c3]">No classes for this day.</p>}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Timetable;
