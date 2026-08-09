import React from 'react';

function Button({
    text = "",
    className = "",
    onClick,
    disabled = false,
    type = 'button',
    ...props
}) {
    return (
        <button
            type={type}
            disabled={disabled}
            className={`rounded-xl border border-transparent bg-[#6d7cff] px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:brightness-110 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 ${className}`}
            onClick={onClick}
            {...props}>
            {text}
        </button>
    );
}

export default Button;