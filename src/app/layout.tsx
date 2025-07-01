import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';

import Header from '@/components/Layouts/Header';
import Footer from '@/components/Layouts/Footer';
import Breadcrumb from '@/components/shared/Breadcrumb';
import { ThemeProvider } from '@/context/themeContext';

import '@/styles/globals.css';
import '@/styles/theme.css';

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin']
});

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin']
});

export const metadata: Metadata = {
    title: 'SCS Headphones - Âm thanh đỉnh cao',
    description: 'Tai nghe SCS chất lượng cao với công nghệ âm thanh tiên tiến'
};

export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="vi">
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
                <ThemeProvider>
                    <Header />
                    <Breadcrumb />
                    {children}
                    <Footer />
                </ThemeProvider>
            </body>
        </html>
    );
}
