'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiShield, FiSearch, FiCalendar, FiCheck, FiX, FiAlertTriangle, FiUser, FiLock, FiHeadphones } from 'react-icons/fi';
import SharedModal from '@/components/shared/SharedModal';
import { useRouter } from 'next/navigation';

interface WarrantyResult {
    status: 'active' | 'expired' | 'expiring';
    productName?: string;
    purchaseDate?: string;
    expiryDate?: string;
    remainingDays?: number;
    details?: string;
    warrantyType?: string;
}

export default function WarrantyCheckingPage() {
    const [serial, setSerial] = useState('');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<WarrantyResult | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [showLogin, setShowLogin] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState('');
    const [loadingLogin, setLoadingLogin] = useState(false);
    const router = useRouter();

    // Demo login
    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setLoginError('');
        setLoadingLogin(true);
        setTimeout(() => {
            if (username === 'user' && password === 'demo123') {
                setShowLogin(false);
                router.push('/account/warranty');
            } else {
                setLoginError('Tài khoản hoặc mật khẩu không đúng. Dùng user/demo123 để demo.');
            }
            setLoadingLogin(false);
        }, 800);
    };

    // Handle warranty check with example logic
    const handleCheck = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setResult(null);
        setLoading(true);

        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Example serials for demo
        if (serial.toUpperCase() === 'TZ123456789') {
            setResult({
                status: 'active',
                productName: 'TuneZone Pro X1',
                purchaseDate: '2024-01-15',
                expiryDate: '2026-01-15',
                remainingDays: 365,
                warrantyType: 'Bảo hành chính hãng 24 tháng',
                details: 'Sản phẩm đang trong thời gian bảo hành. Bạn có thể sử dụng dịch vụ bảo hành miễn phí.'
            });
        } else if (serial.toUpperCase() === 'TZ987654321') {
            setResult({
                status: 'expiring',
                productName: 'TuneZone Studio Pro',
                purchaseDate: '2023-08-10',
                expiryDate: '2025-08-10',
                remainingDays: 45,
                warrantyType: 'Bảo hành chính hãng 24 tháng',
                details: 'Bảo hành sắp hết hạn. Bạn có thể gia hạn bảo hành để tiếp tục được hỗ trợ.'
            });
        } else if (serial.toUpperCase() === 'TZ000000000') {
            setResult({
                status: 'expired',
                productName: 'TuneZone Classic',
                purchaseDate: '2021-05-20',
                expiryDate: '2023-05-20',
                remainingDays: 0,
                warrantyType: 'Bảo hành chính hãng 24 tháng',
                details: 'Thời gian bảo hành đã kết thúc. Bạn có thể sử dụng dịch vụ sửa chữa có phí.'
            });
        } else if (serial.trim() === '') {
            setError('Vui lòng nhập mã số serial');
        } else {
            setError('Không tìm thấy thông tin bảo hành cho mã serial này. Vui lòng kiểm tra lại hoặc liên hệ hỗ trợ.');
        }

        setLoading(false);
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'active': return 'text-green-400';
            case 'expiring': return 'text-yellow-400';
            case 'expired': return 'text-red-400';
            default: return 'text-gray-400';
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'active': return <FiCheck className="w-5 h-5" />;
            case 'expiring': return <FiAlertTriangle className="w-5 h-5" />;
            case 'expired': return <FiX className="w-5 h-5" />;
            default: return <FiShield className="w-5 h-5" />;
        }
    };

    const getStatusText = (status: string) => {
        switch (status) {
            case 'active': return 'Còn hiệu lực';
            case 'expiring': return 'Sắp hết hạn';
            case 'expired': return 'Đã hết hạn';
            default: return 'Không xác định';
        }
    };

    return (
        <div className="bg-gray-900 text-white min-h-screen">
            {/* Hero Section */}
            <motion.section
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="relative bg-gradient-to-br from-blue-900 via-purple-900 to-gray-900 py-20"
            >
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="relative w-full max-w-[1280px] mx-auto px-4">
                    <div className="flex justify-between items-start mb-8">
                        <div>
                            <motion.div 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2, duration: 0.6 }}
                                className="mb-6"
                            >
                                <div className="inline-flex items-center gap-2 bg-blue-500/20 text-blue-400 px-4 py-2 rounded-full text-sm font-medium mb-4">
                                    <FiShield className="w-4 h-4" />
                                    Tra cứu bảo hành
                                </div>
                            </motion.div>
                            
                            <motion.h1 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3, duration: 0.6 }}
                                className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
                            >
                                Kiểm Tra Bảo Hành
                            </motion.h1>
                            
                            <motion.p 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4, duration: 0.6 }}
                                className="text-xl text-gray-300 max-w-2xl leading-relaxed"
                            >
                                Tra cứu thông tin bảo hành sản phẩm TuneZone của bạn một cách nhanh chóng và chính xác
                            </motion.p>
                        </div>

                        <motion.button
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.5, duration: 0.6 }}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition-colors flex items-center gap-2"
                            onClick={() => setShowLogin(true)}
                        >
                            <FiUser className="w-4 h-4" />
                            Đăng nhập
                        </motion.button>
                    </div>
                </div>
            </motion.section>

            {/* Main Content */}
            <div className="w-full max-w-[1280px] mx-auto px-4 py-16">
                {/* Instructions */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-6 mb-8"
                >
                    <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                        <FiHeadphones className="w-5 h-5 text-blue-400" />
                        Hướng dẫn tra cứu
                    </h2>
                    <div className="grid md:grid-cols-2 gap-6 text-gray-300">
                        <div>
                            <h3 className="font-semibold text-white mb-2">Cách tìm mã serial:</h3>
                            <ul className="space-y-1 text-sm">
                                <li>• Kiểm tra trên hộp sản phẩm</li>
                                <li>• Xem trên nhãn dán sản phẩm</li>
                                <li>• Tìm trong phiếu bảo hành</li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-semibold text-white mb-2">Mã serial demo:</h3>
                            <ul className="space-y-1 text-sm">
                                <li>• <code className="bg-gray-800 px-2 py-1 rounded">TZ123456789</code> - Còn hạn</li>
                                <li>• <code className="bg-gray-800 px-2 py-1 rounded">TZ987654321</code> - Sắp hết hạn</li>
                                <li>• <code className="bg-gray-800 px-2 py-1 rounded">TZ000000000</code> - Đã hết hạn</li>
                            </ul>
                        </div>
                    </div>
                </motion.div>

                {/* Main Form */}
                <div className="grid lg:grid-cols-2 gap-8">
                    {/* Check Form */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                        className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700"
                    >
                        <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                            <div className="bg-blue-500/20 p-2 rounded-lg">
                                <FiSearch className="w-6 h-6 text-blue-400" />
                            </div>
                            Nhập thông tin kiểm tra
                        </h2>

                        <form onSubmit={handleCheck} className="space-y-6">
                            <div>
                                <label htmlFor="serial" className="block text-gray-300 mb-3 font-medium">
                                    Mã số Serial *
                                </label>
                                <div className="relative">
                                    <FiShield className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                    <input
                                        id="serial"
                                        type="text"
                                        value={serial}
                                        onChange={(e) => setSerial(e.target.value)}
                                        placeholder="Nhập mã serial (VD: TZ123456789)"
                                        className="w-full bg-gray-700/50 border border-gray-600 pl-12 pr-4 py-4 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                    />
                                </div>
                            </div>

                            <motion.button
                                type="submit"
                                disabled={loading}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-600 disabled:to-gray-700 text-white py-4 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-3"
                            >
                                {loading ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                        Đang kiểm tra...
                                    </>
                                ) : (
                                    <>
                                        <FiSearch className="w-5 h-5" />
                                        Kiểm tra bảo hành
                                    </>
                                )}
                            </motion.button>
                        </form>

                        {error && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="mt-6 bg-red-500/20 border border-red-500/30 text-red-400 p-4 rounded-xl flex items-start gap-3"
                            >
                                <FiX className="w-5 h-5 mt-0.5 flex-shrink-0" />
                                <span>{error}</span>
                            </motion.div>
                        )}
                    </motion.div>

                    {/* Result Display */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4, duration: 0.6 }}
                        className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700"
                    >
                        <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                            <div className="bg-blue-500/20 p-2 rounded-lg">
                                <FiCalendar className="w-6 h-6 text-blue-400" />
                            </div>
                            Kết quả kiểm tra
                        </h2>

                        {result ? (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                                className="space-y-6"
                            >
                                {/* Status */}
                                <div className={`flex items-center gap-3 p-4 rounded-xl border-2 ${
                                    result.status === 'active' ? 'bg-green-500/10 border-green-500/30' :
                                    result.status === 'expiring' ? 'bg-yellow-500/10 border-yellow-500/30' :
                                    'bg-red-500/10 border-red-500/30'
                                }`}>
                                    <div className={getStatusColor(result.status)}>
                                        {getStatusIcon(result.status)}
                                    </div>
                                    <div>
                                        <p className="font-semibold text-white">Trạng thái bảo hành</p>
                                        <p className={`${getStatusColor(result.status)} font-medium`}>
                                            {getStatusText(result.status)}
                                        </p>
                                    </div>
                                </div>

                                {/* Product Info */}
                                <div className="space-y-4">
                                    {result.productName && (
                                        <div className="flex justify-between items-center py-2 border-b border-gray-700">
                                            <span className="text-gray-400">Sản phẩm</span>
                                            <span className="font-medium text-white">{result.productName}</span>
                                        </div>
                                    )}
                                    {result.warrantyType && (
                                        <div className="flex justify-between items-center py-2 border-b border-gray-700">
                                            <span className="text-gray-400">Loại bảo hành</span>
                                            <span className="font-medium text-white">{result.warrantyType}</span>
                                        </div>
                                    )}
                                    {result.purchaseDate && (
                                        <div className="flex justify-between items-center py-2 border-b border-gray-700">
                                            <span className="text-gray-400">Ngày mua</span>
                                            <span className="font-medium text-white">{result.purchaseDate}</span>
                                        </div>
                                    )}
                                    {result.expiryDate && (
                                        <div className="flex justify-between items-center py-2 border-b border-gray-700">
                                            <span className="text-gray-400">Ngày hết hạn</span>
                                            <span className="font-medium text-white">{result.expiryDate}</span>
                                        </div>
                                    )}
                                    {result.remainingDays !== undefined && result.remainingDays > 0 && (
                                        <div className="flex justify-between items-center py-2 border-b border-gray-700">
                                            <span className="text-gray-400">Thời gian còn lại</span>
                                            <span className="font-medium text-white">{result.remainingDays} ngày</span>
                                        </div>
                                    )}
                                </div>

                                {/* Details */}
                                {result.details && (
                                    <div className="bg-gray-700/30 p-4 rounded-xl">
                                        <p className="text-gray-300 leading-relaxed">{result.details}</p>
                                    </div>
                                )}

                                {/* Actions */}
                                <div className="flex flex-col gap-3">
                                    {result.status === 'expiring' && (
                                        <button
                                            onClick={() => setShowLogin(true)}
                                            className="bg-yellow-600 hover:bg-yellow-700 text-white py-3 px-6 rounded-xl font-medium transition-colors"
                                        >
                                            Gia hạn bảo hành
                                        </button>
                                    )}
                                    {result.status === 'active' && (
                                        <button
                                            onClick={() => setShowLogin(true)}
                                            className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-xl font-medium transition-colors"
                                        >
                                            Xem chi tiết bảo hành
                                        </button>
                                    )}
                                </div>
                            </motion.div>
                        ) : (
                            <div className="h-64 flex items-center justify-center text-gray-500">
                                <div className="text-center">
                                    <FiShield className="w-16 h-16 mx-auto mb-4 opacity-50" />
                                    <p>Nhập mã serial để kiểm tra bảo hành</p>
                                </div>
                            </div>
                        )}
                    </motion.div>
                </div>
            </div>

            {/* Login Modal */}
            <SharedModal
                isOpen={showLogin}
                onClose={() => setShowLogin(false)}
                contentLabel="Đăng nhập"
            >
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-gray-800 rounded-2xl p-8 w-full max-w-md mx-auto border border-gray-700"
                >
                    <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                        <div className="bg-blue-500/20 p-2 rounded-lg">
                            <FiUser className="w-6 h-6 text-blue-400" />
                        </div>
                        Đăng nhập tài khoản
                    </h2>
                    
                    <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 mb-6">
                        <p className="text-blue-400 text-sm font-medium mb-2">Tài khoản demo:</p>
                        <p className="text-gray-300 text-sm">
                            Tài khoản: <code className="bg-gray-700 px-2 py-1 rounded text-white">user</code><br />
                            Mật khẩu: <code className="bg-gray-700 px-2 py-1 rounded text-white">demo123</code>
                        </p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div>
                            <label className="block text-gray-300 mb-3 font-medium">Tài khoản</label>
                            <div className="relative">
                                <FiUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type="text"
                                    className="w-full bg-gray-700/50 border border-gray-600 pl-12 pr-4 py-4 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    placeholder="Nhập tài khoản"
                                    autoFocus
                                    required
                                    autoComplete="username"
                                />
                            </div>
                        </div>
                        
                        <div>
                            <label className="block text-gray-300 mb-3 font-medium">Mật khẩu</label>
                            <div className="relative">
                                <FiLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type="password"
                                    className="w-full bg-gray-700/50 border border-gray-600 pl-12 pr-4 py-4 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Nhập mật khẩu"
                                    required
                                    autoComplete="current-password"
                                />
                            </div>
                        </div>
                        
                        {loginError && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="bg-red-500/20 border border-red-500/30 text-red-400 p-3 rounded-xl text-sm"
                            >
                                {loginError}
                            </motion.div>
                        )}
                        
                        <button
                            type="submit"
                            disabled={loadingLogin}
                            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-600 disabled:to-gray-700 text-white py-4 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-3"
                        >
                            {loadingLogin ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    Đang đăng nhập...
                                </>
                            ) : (
                                <>
                                    <FiUser className="w-5 h-5" />
                                    Đăng nhập
                                </>
                            )}
                        </button>
                    </form>
                </motion.div>
            </SharedModal>
        </div>
    );
}
