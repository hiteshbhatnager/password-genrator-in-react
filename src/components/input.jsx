import React from 'react';

function Input({
    type = 'text',
    placeholder = '',
    className = '',
    value,
    onChange,
    name,
    id,
    required = false,
    disabled = false,
    readOnly = false,
    ...props
}) {
    return (
        <input
            type={type}
            name={name}
            id={id}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            required={required}
            disabled={disabled}
            readOnly={readOnly}
            className={`w-full rounded-2xl border border-[#2d3850] bg-[#171f33] px-4 py-2.5 text-sm text-[#f4f7ff] placeholder-[#9ba8c3] outline-none transition-all duration-200 focus:border-[#6d7cff] focus:ring-2 focus:ring-[#6d7cff]/20 ${className}`}
            {...props}
        />
    );
}

export default Input;