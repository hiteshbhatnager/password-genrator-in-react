import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function ProtectedRoute({ children }) {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-[#0b1020] px-4 text-[#f4f7ff]">
                <div className="rounded-[24px] border border-[#2d3850] bg-[#11182b] px-6 py-5 text-center shadow-[0_16px_45px_rgba(0,0,0,0.26)]">
                    <p className="text-sm uppercase tracking-[0.3em] text-[#6d7cff]">Loading</p>
                    <p className="mt-2 text-lg font-semibold">Preparing your planner…</p>
                </div>
            </div>
        );
    }

    if (!user) {
        return <Navigate to="/login" replace state={{ from: location }} />;
    }

    return children;
}

export default ProtectedRoute;
