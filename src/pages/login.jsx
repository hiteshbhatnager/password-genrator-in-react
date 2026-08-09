import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button, Input } from '../components';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

function Login() {
    const navigate = useNavigate();
    const { login } = useAuth();
    const { addToast } = useToast();
    const [form, setForm] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (event) => {
        setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError('');

        try {
            await login(form.email, form.password);
            addToast('Welcome back.', 'success');
            navigate('/dashboard');
        } catch (err) {
            const message = err?.message || 'Unable to sign in right now.';
            setError(message.includes('Invalid') ? 'Invalid email or password.' : message);
            addToast('Login failed.', 'error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-[70vh] items-center justify-center px-4 py-10 sm:px-6 lg:px-8">
            <div className="w-full max-w-md rounded-[24px] border border-[#2d3850] bg-[#11182b] p-6 shadow-[0_16px_45px_rgba(0,0,0,0.26)] sm:p-8">
                <p className="text-sm font-medium uppercase tracking-[0.3em] text-[#6d7cff]">Welcome back</p>
                <h1 className="mt-2 text-2xl font-semibold text-[#f4f7ff]">Login</h1>
                <p className="mt-2 text-sm text-[#9ba8c3]">Access your planner and keep your goals in sync.</p>
                <form onSubmit={handleSubmit} className="mt-6 space-y-3">
                    <label className="block text-sm text-[#9ba8c3]" htmlFor="login-email">Email</label>
                    <Input id="login-email" name="email" type="email" placeholder="Email address" value={form.email} onChange={handleChange} required />
                    <label className="block text-sm text-[#9ba8c3]" htmlFor="login-password">Password</label>
                    <Input id="login-password" name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} required />
                    <Button type="submit" disabled={loading} text={loading ? 'Signing in...' : 'Continue'} className="w-full" />
                </form>
                {error ? <p className="mt-3 text-sm text-[#ff6b7a]">{error}</p> : null}
                <p className="mt-4 text-sm text-[#9ba8c3]">
                    New here?{' '}
                    <Link to="/signup" className="font-medium text-[#6d7cff] transition-colors hover:text-[#9b6cff]">
                        Create an account
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default Login;