"use client";
import React from "react";

interface TextInputProps {
    id: string;
    name: string;
    type: string;
    value: string;
    label: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    required?: boolean;
}

export const TextInput: React.FC<TextInputProps> = ({
    id,
    name,
    type,
    value,
    label,
    onChange,
    required,
}) => (
    <div className="relative w-full">
        <input
            id={id}
            name={name}
            type={type}
            value={value}
            onChange={onChange}
            className="peer w-full p-4 border border-gray-300 rounded-md text-gray-800 focus:ring-1 focus:ring-blue-400 focus:outline-none"
            required={required}
        />
        <label
            htmlFor={id}
            className={`absolute left-3 transition-all duration-200 px-1 bg-white
            ${value || document.activeElement === document.getElementById(id) ? "-top-3 text-slate-500" : "top-3 p-1 text-gray-500"}`}
        >
            {label}
        </label>
    </div>

);