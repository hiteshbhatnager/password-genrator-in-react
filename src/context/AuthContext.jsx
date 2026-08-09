import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { getCurrentUser, login as loginService, logout as logoutService, signup as signupService } from '../services/authService';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const refreshUser = async () => {
        try {
            const currentUser = await getCurrentUser();
            setUser(currentUser);
            return currentUser;
        } catch {
            setUser(null);
            return null;
        }
    };

    useEffect(() => {
        let mounted = true;

        const initAuth = async () => {
            try {
                const currentUser = await getCurrentUser();
                if (mounted) {
                    setUser(currentUser);
                }
            } catch {
                if (mounted) {
                    setUser(null);
                }
            } finally {
                if (mounted) {
                    setLoading(false);
                }
            }
        };

        initAuth();

        return () => {
            mounted = false;
        };
    }, []);

    const login = async (email, password) => {
        await loginService({ email, password });
        return refreshUser();
    };

    const signup = async ({ name, email, password }) => {
        await signupService({ name, email, password });
        return refreshUser();
    };

    const logout = async () => {
        try {
            await logoutService();
        } finally {
            setUser(null);
        }
    };

    const value = useMemo(
        () => ({ user, loading, login, signup, logout, refreshUser }),
        [user, loading]
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    return useContext(AuthContext);
}
