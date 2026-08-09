import React, { useEffect, useState } from 'react';
import { Button, Input } from '../components';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { account } from '../lib/appwrite';
import { getDefaultSettings, getPlannerData, savePlannerData } from '../lib/plannerData';

function Settings() {
    const { user, refreshUser, logout } = useAuth();
    const { addToast } = useToast();
    const [name, setName] = useState(user?.name || '');
    const [settings, setSettings] = useState(getDefaultSettings());
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const stored = getPlannerData(user?.$id).settings;
        setSettings(stored);
        setName(user?.name || '');
    }, [user?.$id, user?.name]);

    const handleUpdate = async (event) => {
        event.preventDefault();
        setLoading(true);
        setMessage('');
        setError('');

        try {
            await account.updateName(name);
            await refreshUser();
            savePlannerData(user?.$id, 'settings', settings);
            setMessage('Profile updated successfully.');
            addToast('Profile updated.', 'success');
        } catch (err) {
            setError(err?.message || 'Unable to update your profile right now.');
            addToast('Unable to update profile.', 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        await logout();
        addToast('Signed out.', 'success');
    };

    return (
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            <div className="rounded-[24px] border border-[#2d3850] bg-[#11182b] p-6 shadow-[0_16px_45px_rgba(0,0,0,0.26)] sm:p-8">
                <p className="text-sm font-medium uppercase tracking-[0.3em] text-[#6d7cff]">Settings</p>
                <h1 className="mt-2 text-2xl font-semibold text-[#f4f7ff]">Profile and preferences</h1>
                <p className="mt-2 text-sm text-[#9ba8c3]">Keep your planner identity and preferences up to date.</p>

                <div className="mt-6 grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
                    <div className="rounded-[20px] border border-[#2d3850] bg-[#171f33] p-5">
                        <p className="text-sm text-[#9ba8c3]">Account details</p>
                        <div className="mt-4 space-y-3 text-sm text-[#f4f7ff]">
                            <div>
                                <p className="text-[#9ba8c3]">Name</p>
                                <p className="mt-1 font-medium">{user?.name || '—'}</p>
                            </div>
                            <div>
                                <p className="text-[#9ba8c3]">Email</p>
                                <p className="mt-1 font-medium">{user?.email || '—'}</p>
                            </div>
                            <div>
                                <p className="text-[#9ba8c3]">Account ID</p>
                                <p className="mt-1 font-medium">{user?.$id || '—'}</p>
                            </div>
                        </div>
                    </div>

                    <form onSubmit={handleUpdate} className="rounded-[20px] border border-[#2d3850] bg-[#171f33] p-5">
                        <p className="text-sm text-[#9ba8c3]">Edit profile</p>
                        <div className="mt-4 space-y-3">
                            <Input value={name} onChange={(event) => setName(event.target.value)} placeholder="Full name" />
                            <Input value={settings.collegeName} onChange={(event) => setSettings((current) => ({ ...current, collegeName: event.target.value }))} placeholder="College name" />
                            <Input value={settings.studyGoal} onChange={(event) => setSettings((current) => ({ ...current, studyGoal: event.target.value }))} placeholder="Study goal" />
                            <Button text={loading ? 'Saving...' : 'Update profile'} className="w-full" />
                        </div>
                        {message ? <p className="mt-3 text-sm text-[#38c895]">{message}</p> : null}
                        {error ? <p className="mt-3 text-sm text-[#ff6b7a]">{error}</p> : null}
                    </form>
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                    <Button text="Sign out" className="bg-[#ff6b7a] hover:bg-[#ff6b7a]/90" onClick={handleLogout} />
                </div>
            </div>
        </div>
    );
}

export default Settings;
