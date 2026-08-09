import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { getPlannerData, savePlannerData } from '../lib/plannerData';
import { Button, Input } from '../components';

function Subjects() {
    const { user } = useAuth();
    const { addToast } = useToast();
    const [subjects, setSubjects] = useState(() => getPlannerData(user?.$id).subjects);
    const [form, setForm] = useState({ name: '', teacher: '', room: '', attendance: '' });

    const saveSubjects = (nextSubjects) => {
        setSubjects(nextSubjects);
        savePlannerData(user?.$id, 'subjects', nextSubjects);
    };

    const handleChange = (event) => {
        setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!form.name.trim() || !form.teacher.trim()) {
            addToast('Please enter a subject name and teacher.', 'error');
            return;
        }
        const nextSubject = {
            id: `${Date.now()}`,
            name: form.name.trim(),
            teacher: form.teacher.trim(),
            room: form.room.trim() || 'TBD',
            attendance: Number(form.attendance) || 0
        };
        saveSubjects([...subjects, nextSubject]);
        setForm({ name: '', teacher: '', room: '', attendance: '' });
        addToast('Subject added.', 'success');
    };

    return (
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            <div className="rounded-[24px] border border-[#2d3850] bg-[#11182b] p-6 shadow-[0_16px_45px_rgba(0,0,0,0.26)] sm:p-8">
                <h1 className="text-2xl font-semibold text-[#f4f7ff]">Subjects</h1>
                <p className="mt-2 text-sm text-[#9ba8c3]">Track your classes with teacher, room and attendance details.</p>
            </div>

            <div className="mt-6 grid gap-4 xl:grid-cols-[0.8fr_1.2fr]">
                <form onSubmit={handleSubmit} className="rounded-[20px] border border-[#2d3850] bg-[#171f33] p-5">
                    <h2 className="text-lg font-semibold text-[#f4f7ff]">Add subject</h2>
                    <div className="mt-4 space-y-3">
                        <Input name="name" value={form.name} onChange={handleChange} placeholder="Subject name" />
                        <Input name="teacher" value={form.teacher} onChange={handleChange} placeholder="Teacher" />
                        <Input name="room" value={form.room} onChange={handleChange} placeholder="Room" />
                        <Input name="attendance" type="number" value={form.attendance} onChange={handleChange} placeholder="Attendance %" />
                        <Button text="Save subject" className="w-full" />
                    </div>
                </form>

                <div className="rounded-[20px] border border-[#2d3850] bg-[#171f33] p-5">
                    {subjects.length ? (
                        <div className="grid gap-3 md:grid-cols-2">
                            {subjects.map((subject) => (
                                <div key={subject.id} className="rounded-[18px] border border-[#2d3850] bg-[#0f1424] p-4">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-lg font-semibold text-[#f4f7ff]">{subject.name}</h3>
                                        <span className="rounded-full border border-[#2d3850] bg-[#202a40] px-2.5 py-1 text-xs text-[#9ba8c3]">{subject.attendance}%</span>
                                    </div>
                                    <p className="mt-2 text-sm text-[#9ba8c3]">Teacher: {subject.teacher}</p>
                                    <p className="text-sm text-[#9ba8c3]">Room: {subject.room}</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="rounded-[18px] border border-dashed border-[#2d3850] px-4 py-10 text-center text-sm text-[#9ba8c3]">No subjects yet. Add your first lesson.</div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Subjects;
