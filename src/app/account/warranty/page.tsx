'use client';

import { useState } from 'react';
import { Tabs, TabList, Tab, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { motion } from 'framer-motion';
import { FiShield, FiClock, FiCheck, FiX, FiPlus, FiFileText, FiAlertTriangle, FiRefreshCw, FiUser, FiMail, FiPhone } from 'react-icons/fi';
import SharedModal from '@/components/shared/SharedModal';

interface Product {
    serial: string;
    name: string;
    purchaseDate: string;
    expiryDate: string;
    status: 'active' | 'expired' | 'expiring';
    canRenew: boolean;
    warrantyType: string;
    remainingDays?: number;
}

interface WarrantyRequest {
    id: string;
    serial: string;
    productName: string;
    issueType: string;
    description: string;
    status: 'pending' | 'processing' | 'completed' | 'rejected';
    createdDate: string;
    updatedDate: string;
}

const demoProducts: Product[] = [
    {
        serial: 'TZ123456789',
        name: 'TuneZone Pro X1',
        purchaseDate: '2024-01-15',
        expiryDate: '2026-01-15',
        status: 'active',
        canRenew: false,
        warrantyType: 'Bảo hành chính hãng 24 tháng',
        remainingDays: 365
    },
    {
        serial: 'TZ987654321',
        name: 'TuneZone Studio Pro',
        purchaseDate: '2023-08-10',
        expiryDate: '2025-08-10',
        status: 'expiring',
        canRenew: true,
        warrantyType: 'Bảo hành chính hãng 24 tháng',
        remainingDays: 45
    },
    {
        serial: 'TZ000000000',
        name: 'TuneZone Classic',
        purchaseDate: '2021-05-20',
        expiryDate: '2023-05-20',
        status: 'expired',
        canRenew: false,
        warrantyType: 'Bảo hành chính hãng 24 tháng',
        remainingDays: 0
    }
];

const demoRequests: WarrantyRequest[] = [
    {
        id: 'WR001',
        serial: 'TZ123456789',
        productName: 'TuneZone Pro X1',
        issueType: 'Lỗi âm thanh',
        description: 'Tai nghe bên trái không có tiếng',
        status: 'processing',
        createdDate: '2025-06-15',
        updatedDate: '2025-06-20'
    },
    {
        id: 'WR002',
        serial: 'TZ987654321',
        productName: 'TuneZone Studio Pro',
        issueType: 'Lỗi kết nối',
        description: 'Bluetooth không kết nối được',
        status: 'completed',
        createdDate: '2025-05-10',
        updatedDate: '2025-05-25'
    }
];

export default function WarrantyDashboard() {
    const [renewOpen, setRenewOpen] = useState(false);
    // const [requestOpen, setRequestOpen] = useState(false);
    const [selectedSerial, setSelectedSerial] = useState<string | null>(null);
    const [newRequest, setNewRequest] = useState({
        serial: '',
        issueType: '',
        description: '',
        customerName: '',
        email: '',
        phone: ''
    });

    const handleRenew = (serial: string) => {
        setSelectedSerial(serial);
        setRenewOpen(true);
    };

    const handleSubmitRequest = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle warranty request submission
        console.log('Warranty request:', newRequest);
        // setRequestOpen(false);
        setNewRequest({
            serial: '',
            issueType: '',
            description: '',
            customerName: '',
            email: '',
            phone: ''
        });
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'active': return 'text-green-400';
            case 'expiring': return 'text-yellow-400';
            case 'expired': return 'text-red-400';
            case 'pending': return 'text-yellow-400';
            case 'processing': return 'text-blue-400';
            case 'completed': return 'text-green-400';
            case 'rejected': return 'text-red-400';
            default: return 'text-gray-400';
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'active': return <FiCheck className="w-4 h-4" />;
            case 'expiring': return <FiAlertTriangle className="w-4 h-4" />;
            case 'expired': return <FiX className="w-4 h-4" />;
            case 'pending': return <FiClock className="w-4 h-4" />;
            case 'processing': return <FiRefreshCw className="w-4 h-4" />;
            case 'completed': return <FiCheck className="w-4 h-4" />;
            case 'rejected': return <FiX className="w-4 h-4" />;
            default: return <FiShield className="w-4 h-4" />;
        }
    };

    const getStatusText = (status: string) => {
        switch (status) {
            case 'active': return 'Còn hiệu lực';
            case 'expiring': return 'Sắp hết hạn';
            case 'expired': return 'Đã hết hạn';
            case 'pending': return 'Chờ xử lý';
            case 'processing': return 'Đang xử lý';
            case 'completed': return 'Hoàn thành';
            case 'rejected': return 'Từ chối';
            default: return 'Không xác định';
        }
    };

    return (
        <div className="bg-gray-900 text-white min-h-screen py-12">
            <div className="w-full max-w-[1280px] mx-auto px-4">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                        Quản lý bảo hành
                    </h1>
                    <p className="text-gray-300">
                        Theo dõi và quản lý bảo hành cho tất cả sản phẩm TuneZone của bạn
                    </p>
                </motion.div>

                {/* Tabs */}
                <Tabs>
                    <TabList className="flex gap-2 mb-8 p-1 bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700">
                        <Tab className="flex-1 px-6 py-4 text-sm font-medium rounded-xl transition-all duration-300 cursor-pointer focus:outline-none text-gray-400 hover:text-white hover:bg-gray-700/50 data-[selected]:bg-gradient-to-r data-[selected]:from-blue-600 data-[selected]:to-purple-600 data-[selected]:text-white data-[selected]:shadow-lg data-[selected]:shadow-blue-500/25">
                            <span className="flex items-center justify-center gap-2">
                                <FiShield className="w-4 h-4" />
                                Thiết bị của tôi
                            </span>
                        </Tab>
                        <Tab className="flex-1 px-6 py-4 text-sm font-medium rounded-xl transition-all duration-300 cursor-pointer focus:outline-none text-gray-400 hover:text-white hover:bg-gray-700/50 data-[selected]:bg-gradient-to-r data-[selected]:from-blue-600 data-[selected]:to-purple-600 data-[selected]:text-white data-[selected]:shadow-lg data-[selected]:shadow-blue-500/25">
                            <span className="flex items-center justify-center gap-2">
                                <FiFileText className="w-4 h-4" />
                                Yêu cầu bảo hành
                            </span>
                        </Tab>
                        <Tab className="flex-1 px-6 py-4 text-sm font-medium rounded-xl transition-all duration-300 cursor-pointer focus:outline-none text-gray-400 hover:text-white hover:bg-gray-700/50 data-[selected]:bg-gradient-to-r data-[selected]:from-blue-600 data-[selected]:to-purple-600 data-[selected]:text-white data-[selected]:shadow-lg data-[selected]:shadow-blue-500/25">
                            <span className="flex items-center justify-center gap-2">
                                <FiPlus className="w-4 h-4" />
                                Gửi yêu cầu mới
                            </span>
                        </Tab>
                    </TabList>

                    {/* Tab 1: My Devices */}
                    <TabPanel>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="space-y-6"
                        >
                            <div className="flex justify-between items-center">
                                <h2 className="text-2xl font-bold">Thiết bị đã đăng ký</h2>
                                <span className="text-gray-400">{demoProducts.length} thiết bị</span>
                            </div>

                            <div className="grid gap-6">
                                {demoProducts.map((product, index) => (
                                    <motion.div
                                        key={product.serial}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 hover:border-blue-500/50 transition-all duration-300"
                                    >
                                        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                                            <div className="flex-1">
                                                <div className="flex items-start justify-between mb-4">
                                                    <div>
                                                        <h3 className="text-xl font-bold text-white mb-2">{product.name}</h3>
                                                        <p className="text-gray-400 text-sm">Serial: {product.serial}</p>
                                                    </div>
                                                    <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${
                                                        product.status === 'active' ? 'bg-green-500/20 text-green-400' :
                                                        product.status === 'expiring' ? 'bg-yellow-500/20 text-yellow-400' :
                                                        'bg-red-500/20 text-red-400'
                                                    }`}>
                                                        {getStatusIcon(product.status)}
                                                        {getStatusText(product.status)}
                                                    </div>
                                                </div>

                                                <div className="grid md:grid-cols-2 gap-4 text-sm">
                                                    <div className="space-y-2">
                                                        <div className="flex justify-between">
                                                            <span className="text-gray-400">Ngày mua:</span>
                                                            <span className="text-white">{product.purchaseDate}</span>
                                                        </div>
                                                        <div className="flex justify-between">
                                                            <span className="text-gray-400">Hết hạn:</span>
                                                            <span className="text-white">{product.expiryDate}</span>
                                                        </div>
                                                    </div>
                                                    <div className="space-y-2">
                                                        <div className="flex justify-between">
                                                            <span className="text-gray-400">Loại bảo hành:</span>
                                                            <span className="text-white text-right">{product.warrantyType}</span>
                                                        </div>
                                                        {product.remainingDays !== undefined && product.remainingDays > 0 && (
                                                            <div className="flex justify-between">
                                                                <span className="text-gray-400">Còn lại:</span>
                                                                <span className="text-white">{product.remainingDays} ngày</span>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex flex-col gap-3 lg:w-48">
                                                {product.canRenew && (
                                                    <button
                                                        onClick={() => handleRenew(product.serial)}
                                                        className="bg-yellow-600 hover:bg-yellow-700 text-white py-2 px-4 rounded-xl font-medium transition-colors flex items-center justify-center gap-2"
                                                    >
                                                        <FiRefreshCw className="w-4 h-4" />
                                                        Gia hạn
                                                    </button>
                                                )}
                                                <button
                                                    // onClick={() => setRequestOpen(true)}
                                                    className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-xl font-medium transition-colors flex items-center justify-center gap-2"
                                                >
                                                    <FiPlus className="w-4 h-4" />
                                                    Yêu cầu bảo hành
                                                </button>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </TabPanel>

                    {/* Tab 2: Warranty Requests */}
                    <TabPanel>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="space-y-6"
                        >
                            <div className="flex justify-between items-center">
                                <h2 className="text-2xl font-bold">Lịch sử yêu cầu bảo hành</h2>
                                <span className="text-gray-400">{demoRequests.length} yêu cầu</span>
                            </div>

                            <div className="space-y-4">
                                {demoRequests.map((request, index) => (
                                    <motion.div
                                        key={request.id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700"
                                    >
                                        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                                            <div className="flex-1">
                                                <div className="flex items-start justify-between mb-4">
                                                    <div>
                                                        <h3 className="text-lg font-bold text-white mb-1">#{request.id}</h3>
                                                        <p className="text-gray-400 text-sm">{request.productName} - {request.serial}</p>
                                                    </div>
                                                    <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(request.status).replace('text-', 'text-')} ${
                                                        request.status === 'completed' ? 'bg-green-500/20' :
                                                        request.status === 'processing' ? 'bg-blue-500/20' :
                                                        request.status === 'pending' ? 'bg-yellow-500/20' :
                                                        'bg-red-500/20'
                                                    }`}>
                                                        {getStatusIcon(request.status)}
                                                        {getStatusText(request.status)}
                                                    </div>
                                                </div>

                                                <div className="grid md:grid-cols-2 gap-4 text-sm">
                                                    <div>
                                                        <p className="text-gray-400 mb-1">Vấn đề:</p>
                                                        <p className="text-white font-medium">{request.issueType}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-gray-400 mb-1">Ngày tạo:</p>
                                                        <p className="text-white">{request.createdDate}</p>
                                                    </div>
                                                </div>

                                                <div className="mt-3">
                                                    <p className="text-gray-400 text-sm mb-1">Mô tả:</p>
                                                    <p className="text-gray-300 text-sm">{request.description}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </TabPanel>

                    {/* Tab 3: New Request */}
                    <TabPanel>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="max-w-2xl mx-auto"
                        >
                            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700">
                                <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                                    <div className="bg-blue-500/20 p-2 rounded-lg">
                                        <FiPlus className="w-6 h-6 text-blue-400" />
                                    </div>
                                    Gửi yêu cầu bảo hành mới
                                </h2>

                                <form onSubmit={handleSubmitRequest} className="space-y-6">
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-gray-300 mb-3 font-medium">Họ và tên *</label>
                                            <div className="relative">
                                                <FiUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                                <input
                                                    type="text"
                                                    required
                                                    value={newRequest.customerName}
                                                    onChange={(e) => setNewRequest({...newRequest, customerName: e.target.value})}
                                                    className="w-full bg-gray-700/50 border border-gray-600 pl-12 pr-4 py-4 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                                    placeholder="Nhập họ và tên"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-gray-300 mb-3 font-medium">Email *</label>
                                            <div className="relative">
                                                <FiMail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                                <input
                                                    type="email"
                                                    required
                                                    value={newRequest.email}
                                                    onChange={(e) => setNewRequest({...newRequest, email: e.target.value})}
                                                    className="w-full bg-gray-700/50 border border-gray-600 pl-12 pr-4 py-4 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                                    placeholder="Nhập địa chỉ email"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-gray-300 mb-3 font-medium">Số điện thoại</label>
                                            <div className="relative">
                                                <FiPhone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                                <input
                                                    type="tel"
                                                    value={newRequest.phone}
                                                    onChange={(e) => setNewRequest({...newRequest, phone: e.target.value})}
                                                    className="w-full bg-gray-700/50 border border-gray-600 pl-12 pr-4 py-4 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                                    placeholder="Nhập số điện thoại"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-gray-300 mb-3 font-medium">Mã Serial *</label>
                                            <div className="relative">
                                                <FiShield className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                                <input
                                                    type="text"
                                                    required
                                                    value={newRequest.serial}
                                                    onChange={(e) => setNewRequest({...newRequest, serial: e.target.value})}
                                                    className="w-full bg-gray-700/50 border border-gray-600 pl-12 pr-4 py-4 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                                    placeholder="VD: TZ123456789"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-gray-300 mb-3 font-medium">Loại vấn đề *</label>
                                        <select
                                            required
                                            value={newRequest.issueType}
                                            onChange={(e) => setNewRequest({...newRequest, issueType: e.target.value})}
                                            className="w-full bg-gray-700/50 border border-gray-600 px-4 py-4 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                        >
                                            <option value="">Chọn loại vấn đề</option>
                                            <option value="Lỗi âm thanh">Lỗi âm thanh</option>
                                            <option value="Lỗi kết nối">Lỗi kết nối</option>
                                            <option value="Lỗi phần cứng">Lỗi phần cứng</option>
                                            <option value="Lỗi pin">Lỗi pin</option>
                                            <option value="Khác">Khác</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-gray-300 mb-3 font-medium">Mô tả chi tiết *</label>
                                        <textarea
                                            required
                                            rows={4}
                                            value={newRequest.description}
                                            onChange={(e) => setNewRequest({...newRequest, description: e.target.value})}
                                            className="w-full bg-gray-700/50 border border-gray-600 px-4 py-4 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                                            placeholder="Mô tả chi tiết vấn đề bạn gặp phải..."
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-4 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-3"
                                    >
                                        <FiPlus className="w-5 h-5" />
                                        Gửi yêu cầu bảo hành
                                    </button>
                                </form>
                            </div>
                        </motion.div>
                    </TabPanel>
                </Tabs>

                {/* Renew Modal */}
                <SharedModal
                    isOpen={renewOpen}
                    onClose={() => setRenewOpen(false)}
                    contentLabel="Gia hạn bảo hành"
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-gray-800 rounded-2xl p-8 w-full max-w-md mx-auto border border-gray-700"
                    >
                        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                            <div className="bg-yellow-500/20 p-2 rounded-lg">
                                <FiRefreshCw className="w-6 h-6 text-yellow-400" />
                            </div>
                            Gia hạn bảo hành
                        </h2>
                        
                        <div className="space-y-4 mb-6">
                            <p className="text-gray-300">
                                Bạn muốn gia hạn bảo hành cho sản phẩm có serial: <strong className="text-white">{selectedSerial}</strong>
                            </p>
                            
                            <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4">
                                <h4 className="font-semibold text-white mb-2">Gói gia hạn có sẵn:</h4>
                                <ul className="space-y-2 text-sm text-gray-300">
                                    <li>• Gia hạn 12 tháng: 500.000₫</li>
                                    <li>• Gia hạn 24 tháng: 900.000₫</li>
                                    <li>• Bảo hành mở rộng: 1.200.000₫</li>
                                </ul>
                            </div>
                        </div>
                        
                        <div className="flex gap-3">
                            <button
                                onClick={() => setRenewOpen(false)}
                                className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-3 rounded-xl font-medium transition-colors"
                            >
                                Hủy
                            </button>
                            <button
                                onClick={() => {
                                    // Handle renewal
                                    setRenewOpen(false);
                                }}
                                className="flex-1 bg-yellow-600 hover:bg-yellow-700 text-white py-3 rounded-xl font-medium transition-colors"
                            >
                                Tiếp tục
                            </button>
                        </div>
                    </motion.div>
                </SharedModal>
            </div>
        </div>
    );
}
