"use client";
import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    variant?: "primary" | "secondary" | "outline" | "ghost";
}

export default function Button({ children, variant = "primary", className = "", ...props }: ButtonProps) {
    const baseStyles = "inline-flex items-center justify-center rounded-full px-8 py-4 text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/20 focus:ring-offset-2 focus:ring-offset-background disabled:opacity-50 disabled:cursor-not-allowed";

    const variants = {
        // Clean white button with subtle shadow
        primary: "bg-white text-black hover:bg-gray-100 shadow-sm hover:shadow-md",
        secondary: "bg-gray-900 text-white hover:bg-gray-800 border border-white/10",
        // Refined outline with smooth transitions
        outline: "border border-white/20 bg-transparent text-white hover:bg-white/5 hover:border-white/30",
        ghost: "bg-transparent text-gray-400 hover:text-white hover:bg-white/5",
    };

    const variantStyles = variants[variant] || variants.primary;

    return (
        <button className={`${baseStyles} ${variantStyles} ${className}`} {...props}>
            {children}
        </button>
    );
}
