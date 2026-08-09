import { createContext, useContext, useMemo, useState } from 'react';

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
    const [toasts, setToasts] = useState([]);

    const addToast = (message, type = 'info') => {
        const id = `${Date.now()}-${Math.random().toString(16).slice(2)}`;
        setToasts((current) => [...current, { id, message, type }]);
        window.setTimeout(() => {
            setToasts((current) => current.filter((toast) => toast.id !== id));
        }, 3000);
    };

    const value = useMemo(() => ({ addToast }), []);

    return (
        <ToastContext.Provider value={value}>
            {children}
            <div className="fixed right-4 top-20 z-[60] flex w-[min(92vw,360px)] flex-col gap-2">
                {toasts.map((toast) => (
                    <div
                        key={toast.id}
                        className={`rounded-2xl border px-4 py-3 text-sm shadow-lg ${toast.type === 'error' ? 'border-[#ff6b7a]/40 bg-[#ff6b7a]/10 text-[#ff6b7a]' : toast.type === 'success' ? 'border-[#38c895]/40 bg-[#38c895]/10 text-[#38c895]' : 'border-[#2d3850] bg-[#11182b] text-[#f4f7ff]'}`}
                    >
                        {toast.message}
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    );
}

export function useToast() {
    return useContext(ToastContext);
}
