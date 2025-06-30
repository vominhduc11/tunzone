'use client';

import { useState } from 'react';
import { Tabs, TabList, Tab, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { motion } from 'framer-motion';
import SharedModal from '@/components/shared/SharedModal';

// Dữ liệu mẫu các sản phẩm và đơn bảo hành
const demoProducts = [
    {
        serial: 'ABC123456',
        name: 'SCS Studio Pro',
        purchaseDate: '2025-04-01',
        expiryDate: '2025-08-15',
        status: 'Còn hạn',
        canRenew: true
    },
    {
        serial: 'DEF654321',
        name: 'SCS Gaming Elite',
        purchaseDate: '2020-05-10',
        expiryDate: '2023-05-09',
        status: 'Hết hạn',
        canRenew: false
    },
    {
        serial: 'UVW333111',
        name: 'SCS Wireless ANC',
        purchaseDate: '2022-07-10',
        expiryDate: '2025-07-25',
        status: 'Còn hạn',
        canRenew: false
    }
];

const demoOrders = [
    {
        id: 1,
        serial: 'ABC123456',
        type: 'Gia hạn',
        date: '2025-07-01',
        duration: '12 tháng',
        price: '800.000đ',
        status: 'Hoàn tất'
    },
    {
        id: 2,
        serial: 'DEF654321',
        type: 'Bảo hành',
        date: '2023-04-11',
        duration: '12 tháng',
        price: 'Miễn phí',
        status: 'Đã xử lý'
    }
];

export default function WarrantyDashboard() {
    const [renewOpen, setRenewOpen] = useState(false);
    const [selectedSerial, setSelectedSerial] = useState<string | null>(null);

    // Gia hạn bảo hành (giả lập): chọn serial rồi mở modal chọn thời gian
    const handleRenew = (serial: string) => {
        setSelectedSerial(serial);
        setRenewOpen(true);
    };

    // Animation cho panel
    const panelVariants = {
        hidden: {
            opacity: 0,
            y: 20,
            scale: 0.98
        },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1
        },
        exit: {
            opacity: 0,
            y: -10,
            scale: 0.98
        }
    };

    return (
        <section className="bg-[#181f2a] min-h-[80vh] py-12">
            <div className="w-full max-w-[1280px] mx-auto px-4">
                <h1 className="text-3xl md:text-4xl font-semibold text-cyan-400 mb-8">
                    Quản lý bảo hành
                </h1>

                <Tabs>
                    <TabList className="flex gap-2 mb-8 p-1 bg-[#232c3b] rounded-xl border border-[#2b3445]">
                        <Tab className="flex-1 px-6 py-3 text-sm font-medium rounded-lg transition-all duration-300 cursor-pointer focus:outline-none text-gray-400 hover:text-gray-200 hover:bg-[#2a3441] data-[selected]:bg-gradient-to-r data-[selected]:from-cyan-500 data-[selected]:to-blue-500 data-[selected]:text-white data-[selected]:shadow-lg data-[selected]:shadow-cyan-500/25 data-[selected]:transform data-[selected]:scale-[1.02]">
                            <span className="flex items-center justify-center gap-2">
                                <svg
                                    className="w-4 h-4"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                    />
                                </svg>
                                Thiết bị của tôi
                            </span>
                        </Tab>
                        <Tab className="flex-1 px-6 py-3 text-sm font-medium rounded-lg transition-all duration-300 cursor-pointer focus:outline-none text-gray-400 hover:text-gray-200 hover:bg-[#2a3441] data-[selected]:bg-gradient-to-r data-[selected]:from-cyan-500 data-[selected]:to-blue-500 data-[selected]:text-white data-[selected]:shadow-lg data-[selected]:shadow-cyan-500/25 data-[selected]:transform data-[selected]:scale-[1.02]">
                            <span className="flex items-center justify-center gap-2">
                                <svg
                                    className="w-4 h-4"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                    />
                                </svg>
                                Lịch sử đơn bảo hành
                            </span>
                        </Tab>
                        <Tab className="flex-1 px-6 py-3 text-sm font-medium rounded-lg transition-all duration-300 cursor-pointer focus:outline-none text-gray-400 hover:text-gray-200 hover:bg-[#2a3441] data-[selected]:bg-gradient-to-r data-[selected]:from-cyan-500 data-[selected]:to-blue-500 data-[selected]:text-white data-[selected]:shadow-lg data-[selected]:shadow-cyan-500/25 data-[selected]:transform data-[selected]:scale-[1.02]">
                            <span className="flex items-center justify-center gap-2">
                                <svg
                                    className="w-4 h-4"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                                Gửi yêu cầu bảo hành
                            </span>
                        </Tab>
                    </TabList>

                    {/* TabPanel 1: Thiết bị của tôi */}
                    <TabPanel>
                        <motion.div
                            variants={panelVariants}
                            initial="hidden"
                            animate="visible"
                            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                            className="relative"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-blue-500/5 rounded-xl"></div>
                            <div className="relative overflow-x-auto rounded-xl shadow-2xl bg-[#232c3b] border border-[#2b3445]">
                                <div className="bg-gradient-to-r from-[#202837] to-[#232c3b] px-6 py-4 border-b border-[#2b3445]">
                                    <h2 className="text-xl font-semibold text-cyan-400 flex items-center gap-2">
                                        <svg
                                            className="w-5 h-5"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                            />
                                        </svg>
                                        Danh sách thiết bị
                                    </h2>
                                </div>
                                <table className="min-w-full text-sm">
                                    <thead>
                                        <tr className="text-gray-300 bg-[#1e2530]">
                                            <th className="p-4 text-left font-semibold">
                                                Sản phẩm
                                            </th>
                                            <th className="p-4 text-left font-semibold">Serial</th>
                                            <th className="p-4 text-left font-semibold">
                                                Ngày mua
                                            </th>
                                            <th className="p-4 text-left font-semibold">Hết hạn</th>
                                            <th className="p-4 text-left font-semibold">
                                                Trạng thái
                                            </th>
                                            <th className="p-4 text-left font-semibold">Tác vụ</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {demoProducts.map((p, index) => (
                                            <motion.tr
                                                key={p.serial}
                                                className="border-b border-[#303850] last:border-0 hover:bg-[#2a3441] transition-all duration-200"
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: index * 0.1 }}
                                            >
                                                <td className="p-4 font-medium text-white">
                                                    {p.name}
                                                </td>
                                                <td className="p-4">
                                                    <span className="px-2 py-1 bg-cyan-500/20 text-cyan-300 rounded-md font-mono text-xs">
                                                        {p.serial}
                                                    </span>
                                                </td>
                                                <td className="p-4 text-gray-300">
                                                    {p.purchaseDate}
                                                </td>
                                                <td className="p-4 text-gray-300">
                                                    {p.expiryDate}
                                                </td>
                                                <td className="p-4">
                                                    <span
                                                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                                            p.status === 'Còn hạn'
                                                                ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                                                                : 'bg-red-500/20 text-red-400 border border-red-500/30'
                                                        }`}
                                                    >
                                                        {p.status}
                                                    </span>
                                                </td>
                                                <td className="p-4">
                                                    {p.canRenew ? (
                                                        <button
                                                            onClick={() => handleRenew(p.serial)}
                                                            className="px-4 py-2 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-lg font-medium text-gray-900 hover:from-yellow-300 hover:to-orange-300 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-yellow-400/25"
                                                        >
                                                            Gia hạn
                                                        </button>
                                                    ) : p.status === 'Còn hạn' ? (
                                                        <span className="text-gray-400 text-xs">
                                                            Chưa đến thời gian gia hạn
                                                        </span>
                                                    ) : (
                                                        <span className="text-gray-500 text-xs">
                                                            Không thể gia hạn
                                                        </span>
                                                    )}
                                                </td>
                                            </motion.tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </motion.div>
                    </TabPanel>

                    {/* TabPanel 2: Lịch sử đơn bảo hành */}
                    <TabPanel>
                        <motion.div
                            variants={panelVariants}
                            initial="hidden"
                            animate="visible"
                            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                            className="relative"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-xl"></div>
                            <div className="relative rounded-xl shadow-2xl bg-[#232c3b] border border-[#2b3445] overflow-hidden">
                                <div className="bg-gradient-to-r from-[#202837] to-[#232c3b] px-6 py-4 border-b border-[#2b3445]">
                                    <h2 className="text-xl font-semibold text-cyan-400 flex items-center gap-2">
                                        <svg
                                            className="w-5 h-5"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                            />
                                        </svg>
                                        Lịch sử gia hạn/bảo hành
                                    </h2>
                                </div>
                                <div className="p-6">
                                    <table className="min-w-full text-sm">
                                        <thead>
                                            <tr className="text-gray-300 bg-[#1e2530] rounded-lg">
                                                <th className="p-4 text-left font-semibold rounded-l-lg">
                                                    Mã đơn
                                                </th>
                                                <th className="p-4 text-left font-semibold">
                                                    Serial
                                                </th>
                                                <th className="p-4 text-left font-semibold">
                                                    Loại
                                                </th>
                                                <th className="p-4 text-left font-semibold">
                                                    Thời gian
                                                </th>
                                                <th className="p-4 text-left font-semibold">
                                                    Thời hạn
                                                </th>
                                                <th className="p-4 text-left font-semibold">Giá</th>
                                                <th className="p-4 text-left font-semibold rounded-r-lg">
                                                    Trạng thái
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="space-y-2">
                                            {demoOrders.map((o, index) => (
                                                <motion.tr
                                                    key={o.id}
                                                    className="border-b border-[#303850] last:border-0 hover:bg-[#2a3441] transition-all duration-200 rounded-lg"
                                                    initial={{ opacity: 0, x: -20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: index * 0.1 }}
                                                >
                                                    <td className="p-4">
                                                        <span className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded-md font-mono text-xs">
                                                            #{o.id}
                                                        </span>
                                                    </td>
                                                    <td className="p-4">
                                                        <span className="px-2 py-1 bg-cyan-500/20 text-cyan-300 rounded-md font-mono text-xs">
                                                            {o.serial}
                                                        </span>
                                                    </td>
                                                    <td className="p-4">
                                                        <span
                                                            className={`px-2 py-1 rounded-md text-xs font-medium ${
                                                                o.type === 'Gia hạn'
                                                                    ? 'bg-orange-500/20 text-orange-300'
                                                                    : 'bg-green-500/20 text-green-300'
                                                            }`}
                                                        >
                                                            {o.type}
                                                        </span>
                                                    </td>
                                                    <td className="p-4 text-gray-300">{o.date}</td>
                                                    <td className="p-4 text-gray-300">
                                                        {o.duration}
                                                    </td>
                                                    <td className="p-4">
                                                        <span className="font-semibold text-yellow-400">
                                                            {o.price}
                                                        </span>
                                                    </td>
                                                    <td className="p-4">
                                                        <span
                                                            className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                                                o.status === 'Hoàn tất'
                                                                    ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                                                                    : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                                                            }`}
                                                        >
                                                            {o.status}
                                                        </span>
                                                    </td>
                                                </motion.tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </motion.div>
                    </TabPanel>

                    {/* TabPanel 3: Gửi yêu cầu bảo hành */}
                    <TabPanel>
                        <motion.div
                            variants={panelVariants}
                            initial="hidden"
                            animate="visible"
                            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                            className="relative"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-pink-500/5 rounded-xl"></div>
                            <div className="relative rounded-xl shadow-2xl bg-[#232c3b] border border-[#2b3445] max-w-2xl mx-auto overflow-hidden">
                                <div className="bg-gradient-to-r from-[#202837] to-[#232c3b] px-6 py-4 border-b border-[#2b3445]">
                                    <h2 className="text-xl font-semibold text-cyan-400 flex items-center gap-2">
                                        <svg
                                            className="w-5 h-5"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                                            />
                                        </svg>
                                        Gửi yêu cầu bảo hành
                                    </h2>
                                    <p className="text-gray-400 text-sm mt-1">
                                        Điền thông tin chi tiết để được hỗ trợ nhanh nhất
                                    </p>
                                </div>
                                <div className="p-6">
                                    <form className="space-y-6">
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.1 }}
                                        >
                                            <label className="block text-gray-300 mb-2 font-medium">
                                                Chọn thiết bị
                                            </label>
                                            <div className="relative">
                                                <select className="w-full px-4 py-3 rounded-lg bg-[#181f2a] text-white border border-[#2b3445] focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-200 appearance-none">
                                                    {demoProducts.map((p) => (
                                                        <option key={p.serial} value={p.serial}>
                                                            {p.name} ({p.serial})
                                                        </option>
                                                    ))}
                                                </select>
                                                <svg
                                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M19 9l-7 7-7-7"
                                                    />
                                                </svg>
                                            </div>
                                        </motion.div>

                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.2 }}
                                        >
                                            <label className="block text-gray-300 mb-2 font-medium">
                                                Mô tả vấn đề
                                            </label>
                                            <textarea
                                                rows={4}
                                                className="w-full px-4 py-3 rounded-lg bg-[#181f2a] text-white border border-[#2b3445] focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-200 resize-none"
                                                placeholder="Mô tả chi tiết vấn đề bạn gặp phải..."
                                            ></textarea>
                                        </motion.div>

                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.3 }}
                                        >
                                            <label className="block text-gray-300 mb-2 font-medium">
                                                Tải lên hình ảnh (tuỳ chọn)
                                            </label>
                                            <div className="relative border-2 border-dashed border-[#2b3445] rounded-lg p-6 hover:border-cyan-400 transition-colors duration-200">
                                                <input
                                                    type="file"
                                                    multiple
                                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                                />
                                                <div className="text-center">
                                                    <svg
                                                        className="mx-auto h-12 w-12 text-gray-400"
                                                        stroke="currentColor"
                                                        fill="none"
                                                        viewBox="0 0 48 48"
                                                    >
                                                        <path
                                                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                                            strokeWidth={2}
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        />
                                                    </svg>
                                                    <p className="mt-2 text-sm text-gray-400">
                                                        <span className="font-medium text-cyan-400">
                                                            Nhấp để tải lên
                                                        </span>{' '}
                                                        hoặc kéo thả tệp vào đây
                                                    </p>
                                                    <p className="text-xs text-gray-500">
                                                        PNG, JPG, GIF tối đa 10MB
                                                    </p>
                                                </div>
                                            </div>
                                        </motion.div>

                                        <motion.button
                                            type="submit"
                                            className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white py-3 rounded-lg font-medium transition-all duration-200 transform hover:scale-[1.02] shadow-lg hover:shadow-cyan-500/25"
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.4 }}
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            <span className="flex items-center justify-center gap-2">
                                                <svg
                                                    className="w-4 h-4"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                                                    />
                                                </svg>
                                                Gửi yêu cầu
                                            </span>
                                        </motion.button>
                                    </form>
                                </div>
                            </div>
                        </motion.div>
                    </TabPanel>
                </Tabs>

                {/* Modal gia hạn bảo hành */}
                <SharedModal
                    isOpen={renewOpen}
                    onClose={() => setRenewOpen(false)}
                    contentLabel="Gia hạn bảo hành"
                >
                    <motion.div
                        className="bg-gradient-to-br from-[#232c3b] to-[#1e2530] rounded-2xl p-8 w-full max-w-md mx-auto border border-[#2b3445] shadow-2xl"
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="text-center mb-6">
                            <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg
                                    className="w-8 h-8 text-gray-900"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                            </div>
                            <h2 className="text-2xl font-bold text-cyan-400 mb-2">
                                Gia hạn bảo hành
                            </h2>
                            <p className="text-gray-300">
                                Vui lòng chọn thời gian gia hạn cho thiết bị
                            </p>
                            <div className="mt-2 px-3 py-1 bg-yellow-400/20 text-yellow-300 rounded-full text-sm font-mono inline-block">
                                {selectedSerial}
                            </div>
                        </div>

                        <form className="space-y-6">
                            <div>
                                <label className="block text-gray-300 mb-2 font-medium">
                                    Thời gian gia hạn
                                </label>
                                <div className="relative">
                                    <select className="w-full px-4 py-3 rounded-lg bg-[#181f2a] text-white border border-[#2b3445] focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-200 appearance-none">
                                        <option value="12">12 tháng - 800.000đ</option>
                                        <option value="24">24 tháng - 1.500.000đ</option>
                                        <option value="36">36 tháng - 2.100.000đ</option>
                                    </select>
                                    <svg
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M19 9l-7 7-7-7"
                                        />
                                    </svg>
                                </div>
                            </div>

                            <div className="flex gap-3">
                                <button
                                    type="button"
                                    onClick={() => setRenewOpen(false)}
                                    className="flex-1 px-4 py-3 bg-gray-600 hover:bg-gray-500 text-white rounded-lg font-medium transition-all duration-200"
                                >
                                    Hủy
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setRenewOpen(false);
                                        alert('Gửi yêu cầu gia hạn thành công!');
                                    }}
                                    className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white py-3 rounded-lg font-medium transition-all duration-200 transform hover:scale-[1.02] shadow-lg hover:shadow-cyan-500/25"
                                >
                                    Xác nhận
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </SharedModal>
            </div>
        </section>
    );
}
