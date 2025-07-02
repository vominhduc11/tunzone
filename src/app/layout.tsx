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
    title: 'TuneZone - Đỉnh cao âm thanh',
    description: 'TuneZone - Thương hiệu âm thanh hàng đầu Việt Nam, chuyên cung cấp tai nghe chất lượng cao với công nghệ tiên tiến và thiết kế đẳng cấp.',
    keywords: 'TuneZone, tai nghe, âm thanh, headphones, audio, bluetooth, gaming, studio',
    authors: [{ name: 'TuneZone Team' }],
    creator: 'TuneZone',
    publisher: 'TuneZone',
    icons: {
        icon: '/images/logo-4t.png',
        shortcut: '/images/logo-4t.png',
        apple: '/images/logo-4t.png',
    }
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
