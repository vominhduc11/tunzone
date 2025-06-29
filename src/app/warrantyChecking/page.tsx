'use client';

import { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import SharedModal from '@/components/shared/SharedModal';

export default function WarrantyCheckingPage() {
    const [serial, setSerial] = useState('');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<{
        status: string;
        purchaseDate?: string;
        expiryDate?: string;
        details?: string;
    } | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [showLogin, setShowLogin] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleCheck = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setResult(null);
        setError(null);
        try {
            const response = await axios.get(`/api/warranty?serial=${encodeURIComponent(serial)}`);
            setResult(response.data);
        } catch (err: unknown) {
            setError(
                axios.isAxiosError(err)
                    ? err.response?.data?.message || 'Không tìm thấy thông tin bảo hành'
                    : 'Lỗi hệ thống'
            );
        } finally {
            setLoading(false);
        }
    };

    const handleLoginSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: thực hiện login API
        console.log('Login', { username, password });
        setShowLogin(false);
    };

    return (
        <section className="bg-[#181f2a] py-12">
            <div className="container mx-auto px-4">
                {/* Đăng nhập button */}
                <div className="flex justify-end mb-6">
                    <button
                        onClick={() => setShowLogin(true)}
                        className="border border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-[#181f2a] px-4 py-2 rounded-full font-medium transition-transform hover:scale-105"
                    >
                        Đăng nhập
                    </button>
                </div>

                {/* Login Modal using SharedModal */}
                <SharedModal
                    isOpen={showLogin}
                    onClose={() => setShowLogin(false)}
                    contentLabel="Đăng nhập"
                >
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="bg-[#232c3b] rounded-2xl p-8 w-full max-w-md shadow-lg"
                    >
                        <h2 className="text-2xl text-cyan-400 mb-4">Đăng nhập</h2>
                        <form onSubmit={handleLoginSubmit} className="space-y-4">
                            <div>
                                <label className="block text-gray-300 mb-1">Tên đăng nhập</label>
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                    className="w-full px-4 py-2 rounded-lg bg-[#181f2a] text-white focus:ring-2 focus:ring-cyan-400 transition"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-300 mb-1">Mật khẩu</label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="w-full px-4 py-2 rounded-lg bg-[#181f2a] text-white focus:ring-2 focus:ring-cyan-400 transition"
                                />
                            </div>
                            <div className="flex justify-end space-x-4 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setShowLogin(false)}
                                    className="px-4 py-2 text-gray-300 hover:text-white transition"
                                >
                                    Hủy
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-cyan-400 hover:bg-cyan-300 text-[#181f2a] rounded-full transition"
                                >
                                    Đăng nhập
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </SharedModal>

                <h1 className="text-3xl md:text-4xl font-semibold text-cyan-400 mb-6">
                    Tra Cứu Bảo Hành
                </h1>
                <div className="bg-[#232c3b] rounded-2xl shadow-lg p-8 grid grid-cols-1 md:grid-cols-2 gap-8 transition-transform hover:scale-[1.01] hover:shadow-2xl">
                    {/* Form */}
                    <div className="transition hover:shadow-inner hover:bg-[#2a2f3d] rounded-lg p-4">
                        <form onSubmit={handleCheck} className="space-y-4">
                            <label htmlFor="serial" className="block text-gray-300">
                                Mã Số Seri / Số Phiếu
                            </label>
                            <input
                                id="serial"
                                type="text"
                                value={serial}
                                onChange={(e) => setSerial(e.target.value)}
                                required
                                placeholder="ABC123456"
                                className="w-full px-4 py-2 rounded-lg bg-[#181f2a] text-white focus:ring-2 focus:ring-cyan-400 hover:ring-2 hover:ring-cyan-500 transition"
                            />
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-cyan-400 hover:bg-cyan-300 text-[#181f2a] py-2 rounded-full font-medium transition-transform hover:scale-105"
                            >
                                {loading ? 'Đang kiểm tra...' : 'Kiểm tra'}
                            </button>
                        </form>
                        {error && (
                            <motion.div
                                className="mt-4 bg-red-600 text-white p-4 rounded-lg"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.3 }}
                            >
                                {error}
                            </motion.div>
                        )}
                    </div>

                    {/* Result */}
                    <div className="transition hover:shadow-inner hover:bg-[#2a2f3d] rounded-lg p-4">
                        {result ? (
                            <motion.div
                                className="bg-[#181f2a] p-6 rounded-lg transition-transform hover:scale-105"
                                initial={{ x: 20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ duration: 0.5 }}
                            >
                                <p className="text-cyan-400 font-semibold mb-4">
                                    Kết quả kiểm tra:
                                </p>
                                <ul className="space-y-2 text-gray-200">
                                    <li>
                                        <span className="font-medium">Trạng thái:</span>{' '}
                                        {result.status}
                                    </li>
                                    {result.purchaseDate && (
                                        <li>
                                            <span className="font-medium">Ngày mua:</span>{' '}
                                            {result.purchaseDate}
                                        </li>
                                    )}
                                    {result.expiryDate && (
                                        <li>
                                            <span className="font-medium">Hết hạn:</span>{' '}
                                            {result.expiryDate}
                                        </li>
                                    )}
                                    {result.details && <li>{result.details}</li>}
                                </ul>
                            </motion.div>
                        ) : (
                            <div className="h-full flex items-center justify-center text-gray-500">
                                Chưa có kết quả
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
