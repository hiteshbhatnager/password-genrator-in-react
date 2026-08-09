import React, { useEffect, useMemo, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { getSubjects, updateSubject } from '../services/subjectService';

function Attendance() {
    const { user } = useAuth();
    const [subjects, setSubjects] = useState([]);
    const [editingAttendance, setEditingAttendance] = useState(null);
    const [attendanceValue, setAttendanceValue] = useState('');
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

    const totalPresent = subjects.reduce((sum, subject) => sum + Math.max(0, Number(subject.attendance) || 0), 0);
    const totalSubjects = subjects.length;
    const attendancePct = totalSubjects ? Math.round(totalPresent / totalSubjects) : 0;

    const handleStartEdit = (subject) => {
        setEditingAttendance(subject.$id || subject.id);
        setAttendanceValue(String(subject.attendance || 0));
    };

    const handleSaveAttendance = async (subjectId) => {
        const value = Math.max(0, Math.min(100, Number(attendanceValue) || 0));
        try {
            const updated = await updateSubject(subjectId, { attendance: value });
            setSubjects((current) => current.map((subject) => (subject.$id === subjectId || subject.id === subjectId ? { ...subject, ...updated } : subject)));
            setEditingAttendance(null);
            setAttendanceValue('');
        } catch (error) {
            console.error('Attendance update failed:', error);
        }
    };

    return (
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            <div className="rounded-[24px] border border-[#2d3850] bg-[#11182b] p-6 shadow-[0_16px_45px_rgba(0,0,0,0.26)] sm:p-8">
                <h1 className="text-2xl font-semibold text-[#f4f7ff]">Attendance</h1>
                <p className="mt-2 text-sm text-[#9ba8c3]">Monitor your class presence at a glance.</p>
            </div>

            <div className="mt-6 grid gap-4 lg:grid-cols-3">
                <div className="rounded-[20px] border border-[#2d3850] bg-[#171f33] p-5">
                    <p className="text-sm text-[#9ba8c3]">Attendance</p>
                    <p className={`mt-2 text-3xl font-semibold ${attendancePct >= 85 ? 'text-[#38c895]' : 'text-[#f4b844]'}`}>{attendancePct}%</p>
                </div>
                <div className="rounded-[20px] border border-[#2d3850] bg-[#171f33] p-5">
                    <p className="text-sm text-[#9ba8c3]">Classes tracked</p>
                    <p className="mt-2 text-3xl font-semibold text-[#f4f7ff]">{subjects.length}</p>
                </div>
                <div className="rounded-[20px] border border-[#2d3850] bg-[#171f33] p-5">
                    <p className="text-sm text-[#9ba8c3]">Consistency score</p>
                    <p className="mt-2 text-3xl font-semibold text-[#6d7cff]">{Math.max(0, 100 - totalClasses)}%</p>
                </div>
            </div>

            <div className="mt-6 rounded-[20px] border border-[#2d3850] bg-[#171f33] p-5">
                {loading ? <p className="rounded-[16px] border border-dashed border-[#2d3850] px-4 py-8 text-center text-sm text-[#9ba8c3]">Loading attendance data…</p> : subjects.length ? subjects.map((subject) => (
                    <div key={subject.$id || subject.id} className="mb-3 rounded-[16px] border border-[#2d3850] bg-[#0f1424] p-4 last:mb-0">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-[#f4f7ff]">{subject.name}</p>
                                <p className="text-xs text-[#9ba8c3]">{subject.teacher}</p>
                            </div>
                            <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${Number(subject.attendance) >= 85 ? 'bg-[#38c895]/15 text-[#38c895]' : 'bg-[#f4b844]/15 text-[#f4b844]'}`}>{subject.attendance}%</span>
                        </div>
                        <div className="mt-3 h-2 overflow-hidden rounded-full bg-[#202a40]">
                            <div className={`h-full rounded-full ${Number(subject.attendance) >= 85 ? 'bg-[#38c895]' : 'bg-[#f4b844]'}`} style={{ width: `${Math.min(100, Number(subject.attendance) || 0)}%` }} />
                        </div>
                    </div>
                )) : <p className="rounded-[16px] border border-dashed border-[#2d3850] px-4 py-8 text-center text-sm text-[#9ba8c3]">No attendance data yet. Add subjects to start tracking.</p>}
            </div>
        </div>
    );
}

export default Attendance;
