import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button, Input } from '../components';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

function Signup() {
    const navigate = useNavigate();
    const { signup } = useAuth();
    const { addToast } = useToast();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (event) => {
        const { name, value } = event.target;
        if (name === 'name') setName(value);
        if (name === 'email') setEmail(value);
        if (name === 'password') setPassword(value);
        if (name === 'confirmPassword') setConfirmPassword(value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError('');

        if (!name.trim() || !email.trim() || !password || !confirmPassword) {
            setError('Please fill in every field.');
            setLoading(false);
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setError('Please enter a valid email address.');
            setLoading(false);
            return;
        }

        if (password.length < 8) {
            setError('Password must be at least 8 characters long.');
            setLoading(false);
            return;
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            setLoading(false);
            return;
        }

        try {
            await signup({ name, email, password });
            addToast('Account created successfully.', 'success');
            navigate('/dashboard');
        } catch (err) {
            const message = err?.message || 'Unable to create your account right now.';
            setError(message.includes('already') ? 'This email is already registered.' : message);
            addToast('Signup failed.', 'error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-[70vh] items-center justify-center px-4 py-10 sm:px-6 lg:px-8">
            <div className="w-full max-w-md rounded-[24px] border border-[#2d3850] bg-[#11182b] p-6 shadow-[0_16px_45px_rgba(0,0,0,0.26)] sm:p-8">
                <p className="text-sm font-medium uppercase tracking-[0.3em] text-[#9b6cff]">New account</p>
                <h1 className="mt-2 text-2xl font-semibold text-[#f4f7ff]">Sign up</h1>
                <p className="mt-2 text-sm text-[#9ba8c3]">Start organizing your semester in a calmer way.</p>
                <form onSubmit={handleSubmit} className="mt-6 space-y-3">
                    <label className="block text-sm text-[#9ba8c3]" htmlFor="signup-name">Name</label>
                    <Input id="signup-name" name="name" placeholder="Full name" value={name} onChange={handleChange} required />
                    <label className="block text-sm text-[#9ba8c3]" htmlFor="signup-email">Email</label>
                    <Input id="signup-email" name="email" type="email" placeholder="Email address" value={email} onChange={handleChange} required />
                    <label className="block text-sm text-[#9ba8c3]" htmlFor="signup-password">Password</label>
                    <Input id="signup-password" name="password" type="password" placeholder="Create password" value={password} onChange={handleChange} required />
                    <label className="block text-sm text-[#9ba8c3]" htmlFor="signup-confirm">Confirm password</label>
                    <Input id="signup-confirm" name="confirmPassword" type="password" placeholder="Confirm password" value={confirmPassword} onChange={handleChange} required />
                    <Button type="submit" disabled={loading} text={loading ? 'Creating account...' : 'Create account'} className="w-full" />
                </form>
                {error ? <p className="mt-3 text-sm text-[#ff6b7a]">{error}</p> : null}
                <p className="mt-4 text-sm text-[#9ba8c3]">
                    Already have an account?{' '}
                    <Link to="/login" className="font-medium text-[#6d7cff] transition-colors hover:text-[#9b6cff]">
                        Sign in
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default Signup;