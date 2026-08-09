import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { Button, Input } from '../components';
import { createSubject, deleteSubject, getSubjects, updateSubject } from '../services/subjectService';

function Subjects() {
    const { user } = useAuth();
    const { addToast } = useToast();
    const [subjects, setSubjects] = useState([]);
    const [form, setForm] = useState({ name: '', teacher: '', room: '', attendance: '' });
    const [editSubjectId, setEditSubjectId] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        let active = true;

        const loadSubjects = async () => {
            if (!user) return;
            setLoading(true);
            try {
                const nextSubjects = await getSubjects();
                if (active) setSubjects(nextSubjects);
            } catch {
                if (active) setSubjects([]);
            } finally {
                if (active) setLoading(false);
            }
        };

        loadSubjects();

        return () => {
            active = false;
        };
    }, [user?.$id]);

    const handleChange = (event) => {
        setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!form.name.trim() || !form.teacher.trim()) {
            addToast('Please enter a subject name and teacher.', 'error');
            return;
        }

        const payload = {
            name: form.name.trim(),
            teacher: form.teacher.trim(),
            room: form.room.trim() || 'TBD',
            attendance: Number(form.attendance) || 0
        };

        try {
            if (editSubjectId) {
                const updated = await updateSubject(editSubjectId, payload);
                setSubjects((current) => current.map((subject) => (subject.$id === editSubjectId ? { ...subject, ...updated } : subject)));
                setEditSubjectId(null);
                addToast('Subject updated.', 'success');
            } else {
                const nextSubject = await createSubject(payload);
                setSubjects((current) => [...current, nextSubject]);
                addToast('Subject added.', 'success');
            }
            setForm({ name: '', teacher: '', room: '', attendance: '' });
        } catch (error) {
            addToast(error?.message || 'Unable to save subject.', 'error');
        }
    };

    const handleEdit = (subject) => {
        setEditSubjectId(subject.$id || subject.id);
        setForm({
            name: subject.name || '',
            teacher: subject.teacher || '',
            room: subject.room || '',
            attendance: String(subject.attendance || '')
        });
    };

    const handleDelete = async (id) => {
        try {
            await deleteSubject(id);
            setSubjects((current) => current.filter((subject) => subject.$id !== id && subject.id !== id));
            addToast('Subject removed.', 'success');
        } catch (error) {
            addToast(error?.message || 'Unable to delete subject.', 'error');
        }
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
                        <Button type="submit" text="Save subject" className="w-full" />
                    </div>
                </form>

                <div className="rounded-[20px] border border-[#2d3850] bg-[#171f33] p-5">
                    {loading ? <p className="rounded-[18px] border border-dashed border-[#2d3850] px-4 py-10 text-center text-sm text-[#9ba8c3]">Loading subjects…</p> : subjects.length ? (
                        <div className="grid gap-3 md:grid-cols-2">
                            {subjects.map((subject) => (
                                <div key={subject.$id || subject.id} className="rounded-[18px] border border-[#2d3850] bg-[#0f1424] p-4">
                                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                                        <div>
                                            <h3 className="text-lg font-semibold text-[#f4f7ff]">{subject.name}</h3>
                                            <p className="mt-2 text-sm text-[#9ba8c3]">Teacher: {subject.teacher}</p>
                                            <p className="text-sm text-[#9ba8c3]">Room: {subject.room}</p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="rounded-full border border-[#2d3850] bg-[#202a40] px-2.5 py-1 text-xs text-[#9ba8c3]">{subject.attendance}%</span>
                                            <button onClick={() => handleEdit(subject)} className="rounded-full border border-[#6d7cff] px-3 py-1 text-xs text-[#6d7cff]">Edit</button>
                                            <button onClick={() => handleDelete(subject.$id || subject.id)} className="rounded-full border border-[#ff6b7a] px-3 py-1 text-xs text-[#ff6b7a]">Delete</button>
                                        </div>
                                    </div>
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
