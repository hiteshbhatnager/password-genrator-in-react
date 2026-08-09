import React, { useEffect, useMemo, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { Button, Input } from '../components';
import { createEvent, getEvents } from '../services/eventService';

function Calendar() {
    const { user } = useAuth();
    const { addToast } = useToast();
    const [month, setMonth] = useState(new Date().getMonth());
    const [year, setYear] = useState(new Date().getFullYear());
    const [form, setForm] = useState({ title: '', date: '' });
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        let active = true;

        const loadEvents = async () => {
            if (!user) return;
            setLoading(true);
            try {
                const nextEvents = await getEvents();
                if (active) setEvents(nextEvents);
            } catch {
                if (active) setEvents([]);
            } finally {
                if (active) setLoading(false);
            }
        };

        loadEvents();

        return () => {
            active = false;
        };
    }, [user?.$id]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!form.title.trim() || !form.date) {
            addToast('Please add an event title and date.', 'error');
            return;
        }

        try {
            const nextEvent = await createEvent({ title: form.title.trim(), date: form.date });
            setEvents((current) => [...current, nextEvent]);
            setForm({ title: '', date: '' });
            addToast('Event added.', 'success');
        } catch (error) {
            addToast(error?.message || 'Unable to save event.', 'error');
        }
    };

    const date = new Date(year, month, 1);
    const startDay = (date.getDay() + 6) % 7;
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const cells = Array.from({ length: startDay + daysInMonth }, (_, index) => index + 1 - startDay);
    const today = new Date();

    const eventMap = useMemo(() => events.reduce((map, event) => {
        map[event.date] = event;
        return map;
    }, {}), [events]);

    return (
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            <div className="rounded-[24px] border border-[#2d3850] bg-[#11182b] p-6 shadow-[0_16px_45px_rgba(0,0,0,0.26)] sm:p-8">
                <h1 className="text-2xl font-semibold text-[#f4f7ff]">Calendar</h1>
                <p className="mt-2 text-sm text-[#9ba8c3]">Keep important dates and milestones front and center.</p>
            </div>

            <div className="mt-6 grid gap-4 xl:grid-cols-[0.95fr_1.05fr]">
                <form onSubmit={handleSubmit} className="rounded-[20px] border border-[#2d3850] bg-[#171f33] p-5">
                    <h2 className="text-lg font-semibold text-[#f4f7ff]">Add event</h2>
                    <div className="mt-4 space-y-3">
                        <Input value={form.title} onChange={(event) => setForm((current) => ({ ...current, title: event.target.value }))} placeholder="Event title" />
                        <Input type="date" value={form.date} onChange={(event) => setForm((current) => ({ ...current, date: event.target.value }))} />
                        <Button type="submit" text="Save event" className="w-full" />
                    </div>
                </form>

                <div className="rounded-[20px] border border-[#2d3850] bg-[#171f33] p-5">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <button onClick={() => { if (month === 0) { setMonth(11); setYear((prev) => prev - 1); } else setMonth((prev) => prev - 1); }} className="rounded-full border border-[#2d3850] bg-[#0f1424] px-3 py-1 text-sm text-[#f4f7ff]">←</button>
                            <button onClick={() => { if (month === 11) { setMonth(0); setYear((prev) => prev + 1); } else setMonth((prev) => prev + 1); }} className="rounded-full border border-[#2d3850] bg-[#0f1424] px-3 py-1 text-sm text-[#f4f7ff]">→</button>
                        </div>
                        <p className="text-sm font-semibold text-[#f4f7ff]">{date.toLocaleString('default', { month: 'long' })} {year}</p>
                    </div>
                    <div className="mt-4 grid grid-cols-7 gap-2 text-center text-xs uppercase tracking-[0.2em] text-[#9ba8c3]">
                        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => <div key={day}>{day}</div>)}
                    </div>
                    <div className="mt-2 grid grid-cols-7 gap-2">
                        {loading ? <div className="col-span-7 rounded-2xl border border-dashed border-[#2d3850] px-4 py-8 text-center text-sm text-[#9ba8c3]">Loading events…</div> : cells.map((cell) => {
                            const isCurrentMonth = cell > 0 && cell <= daysInMonth;
                            const safeDate = new Date(year, month, cell);
                            const key = safeDate.toISOString().slice(0, 10);
                            const isToday = safeDate.toDateString() === today.toDateString();
                            const event = eventMap[key];
                            return (
                                <div key={cell} className={`min-h-16 rounded-2xl border p-2 text-sm ${isCurrentMonth ? 'border-[#2d3850] bg-[#0f1424]' : 'border-transparent bg-transparent opacity-40'} ${isToday ? 'border-[#6d7cff] bg-[#6d7cff]/10' : ''}`}>
                                    <p className="text-xs text-[#9ba8c3]">{isCurrentMonth ? safeDate.getDate() : ''}</p>
                                    {event ? <p className="mt-2 rounded-full bg-[#6d7cff]/15 px-2 py-1 text-[11px] text-[#6d7cff]">{event.title}</p> : null}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Calendar;
