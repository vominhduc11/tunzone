'use client';

import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react';

// Định nghĩa kiểu shape của theme context
type Theme = 'light' | 'dark';

interface ThemeContextValue {
    theme: Theme;
    toggleTheme: () => void;
}

// Tạo context mới với giá trị mặc định
const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

interface ThemeProviderProps {
    children: ReactNode;
}

// Provider component cho theme
export function ThemeProvider({ children }: ThemeProviderProps) {
    const [theme, setTheme] = useState<Theme>('light');

    // Khi mount, đọc theme đã lưu hoặc theo setting hệ thống
    useEffect(() => {
        const saved = localStorage.getItem('theme') as Theme | null;
        if (saved) setTheme(saved);
        else if (window.matchMedia('(prefers-color-scheme: dark)').matches) setTheme('dark');
    }, []);

    // Áp dụng class và lưu theme mỗi khi thay đổi
    useEffect(() => {
        document.documentElement.classList.toggle('dark', theme === 'dark');
        localStorage.setItem('theme', theme);
    }, [theme]);

    // Hàm chuyển đổi theme
    const toggleTheme = () => setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));

    return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
}

// Hook tiện dụng để dùng context
export function useThemeContext(): ThemeContextValue {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useThemeContext must be used within a ThemeProvider');
    }
    return context;
}
