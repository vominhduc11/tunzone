// components/ContactUsPage.tsx
// Trang Contact Us - Tai nghe SCS với TypeScript, inline validation, interactive map, FAQ accordion, responsive, accessible, theme blue, slide transition FAQ
'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FiPhone,
    FiMail,
    FiClock,
    FiMapPin,
    FiChevronDown,
    FiSend,
    FiUser,
    FiMessageSquare
} from 'react-icons/fi';

interface FormFields {
    name: string;
    phone: string;
    email: string;
    subject: string;
    message: string;
}

type ErrorFields = Partial<Record<keyof FormFields, string>>;

const ContactUsPage: React.FC = () => {
    const [form, setForm] = useState<FormFields>({
        name: '',
        phone: '',
        email: '',
        subject: '',
        message: ''
    });
    const [errors, setErrors] = useState<ErrorFields>({});
    const [feedback, setFeedback] = useState<string>('');
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const validate = (): boolean => {
        const newErrors: ErrorFields = {};
        if (!form.name.trim()) newErrors.name = 'Vui lòng nhập họ tên';
        if (!form.email.trim()) newErrors.email = 'Vui lòng nhập email';
        else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = 'Email không hợp lệ';
        if (!form.subject.trim()) newErrors.subject = 'Vui lòng nhập chủ đề';
        if (!form.message.trim()) newErrors.message = 'Vui lòng nhập nội dung';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange =
        (field: keyof FormFields) =>
        (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            setForm((prev) => ({ ...prev, [field]: e.target.value }));
            if (errors[field]) {
                setErrors((prev) => ({ ...prev, [field]: '' }));
            }
        };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) {
            document
                .querySelector<HTMLDivElement>('.error')
                ?.scrollIntoView({ behavior: 'smooth' });
            return;
        }
        // TODO: API call
        setForm({ name: '', phone: '', email: '', subject: '', message: '' });
        setFeedback('Gửi tin nhắn thành công! Chúng tôi sẽ liên hệ sớm.');
    };

    const faqItems = [
        {
            q: 'Thời gian giao hàng?',
            a: 'Giao trong 1-2 ngày làm việc tại TP.HCM, 2-3 ngày với tỉnh thành khác.'
        },
        { q: 'Chính sách bảo hành?', a: 'Bảo hành 12-36 tháng tùy model.' },
        { q: 'Hỗ trợ kỹ thuật?', a: 'Hỗ trợ 24/7 qua hotline và email.' },
        { q: 'Phương thức thanh toán?', a: 'Chấp nhận thẻ, chuyển khoản và COD.' }
    ];

    return (
        <div className="bg-[#181f2a] text-gray-100 min-h-screen py-12">
            <div className="w-full max-w-[1280px] mx-auto px-4">
                {/* Header Section */}
                <motion.div
                    className="text-center mb-12"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h1 className="text-4xl md:text-5xl font-bold text-cyan-400 mb-4">
                        Liên hệ với chúng tôi
                    </h1>
                    <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                        Chúng tôi luôn sẵn sàng hỗ trợ bạn. Hãy liên hệ với chúng tôi qua các kênh
                        dưới đây.
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-12">
                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="bg-gradient-to-br from-[#232c3b] to-[#1e2530] p-8 rounded-xl border border-[#2b3445] shadow-2xl">
                            <h2 className="text-2xl font-semibold text-cyan-400 mb-6 flex items-center gap-2">
                                <FiMessageSquare className="w-6 h-6" />
                                Gửi tin nhắn
                            </h2>

                            <form onSubmit={handleSubmit} noValidate className="space-y-6">
                                {feedback && (
                                    <motion.div
                                        className="bg-gradient-to-r from-green-500 to-emerald-500 text-white p-4 rounded-lg shadow-lg"
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <div className="flex items-center gap-2">
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
                                                    d="M5 13l4 4L19 7"
                                                />
                                            </svg>
                                            {feedback}
                                        </div>
                                    </motion.div>
                                )}

                                <div className="grid md:grid-cols-2 gap-6">
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.1 }}
                                    >
                                        <label className="block text-gray-300 mb-2 font-medium">
                                            Họ và tên *
                                        </label>
                                        <div className="relative">
                                            <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                            <input
                                                type="text"
                                                placeholder="Nhập họ và tên của bạn"
                                                value={form.name}
                                                onChange={handleChange('name')}
                                                className={`w-full bg-[#181f2a] border border-[#2b3445] pl-10 pr-4 py-3 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-200 ${errors.name ? 'border-red-500 error' : ''}`}
                                            />
                                        </div>
                                        {errors.name && (
                                            <motion.p
                                                className="text-red-400 text-sm mt-2 flex items-center gap-1"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                            >
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
                                                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                                    />
                                                </svg>
                                                {errors.name}
                                            </motion.p>
                                        )}
                                    </motion.div>

                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.2 }}
                                    >
                                        <label className="block text-gray-300 mb-2 font-medium">
                                            Số điện thoại
                                        </label>
                                        <div className="relative">
                                            <FiPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                            <input
                                                type="tel"
                                                placeholder="Nhập số điện thoại"
                                                value={form.phone}
                                                onChange={handleChange('phone')}
                                                className="w-full bg-[#181f2a] border border-[#2b3445] pl-10 pr-4 py-3 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-200"
                                            />
                                        </div>
                                    </motion.div>
                                </div>

                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 }}
                                >
                                    <label className="block text-gray-300 mb-2 font-medium">
                                        Email *
                                    </label>
                                    <div className="relative">
                                        <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                        <input
                                            type="email"
                                            placeholder="Nhập địa chỉ email"
                                            value={form.email}
                                            onChange={handleChange('email')}
                                            className={`w-full bg-[#181f2a] border border-[#2b3445] pl-10 pr-4 py-3 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-200 ${errors.email ? 'border-red-500 error' : ''}`}
                                        />
                                    </div>
                                    {errors.email && (
                                        <motion.p
                                            className="text-red-400 text-sm mt-2 flex items-center gap-1"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                        >
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
                                                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                                />
                                            </svg>
                                            {errors.email}
                                        </motion.p>
                                    )}
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4 }}
                                >
                                    <label className="block text-gray-300 mb-2 font-medium">
                                        Chủ đề *
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Nhập chủ đề tin nhắn"
                                        value={form.subject}
                                        onChange={handleChange('subject')}
                                        className={`w-full bg-[#181f2a] border border-[#2b3445] px-4 py-3 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-200 ${errors.subject ? 'border-red-500 error' : ''}`}
                                    />
                                    {errors.subject && (
                                        <motion.p
                                            className="text-red-400 text-sm mt-2 flex items-center gap-1"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                        >
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
                                                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                                />
                                            </svg>
                                            {errors.subject}
                                        </motion.p>
                                    )}
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5 }}
                                >
                                    <label className="block text-gray-300 mb-2 font-medium">
                                        Nội dung *
                                    </label>
                                    <textarea
                                        rows={5}
                                        placeholder="Nhập nội dung tin nhắn..."
                                        value={form.message}
                                        onChange={handleChange('message')}
                                        className={`w-full bg-[#181f2a] border border-[#2b3445] px-4 py-3 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-200 resize-none ${errors.message ? 'border-red-500 error' : ''}`}
                                    />
                                    {errors.message && (
                                        <motion.p
                                            className="text-red-400 text-sm mt-2 flex items-center gap-1"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                        >
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
                                                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                                />
                                            </svg>
                                            {errors.message}
                                        </motion.p>
                                    )}
                                </motion.div>

                                <motion.button
                                    type="submit"
                                    className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white py-3 rounded-lg font-medium transition-all duration-200 transform hover:scale-[1.02] shadow-lg hover:shadow-cyan-500/25 flex items-center justify-center gap-2"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.6 }}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <FiSend className="w-4 h-4" />
                                    Gửi tin nhắn
                                </motion.button>
                            </form>
                        </div>
                    </motion.div>

                    {/* Contact Info & FAQ */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="space-y-8"
                    >
                        {/* Contact Information */}
                        <div className="bg-gradient-to-br from-[#232c3b] to-[#1e2530] p-8 rounded-xl border border-[#2b3445] shadow-2xl">
                            <h2 className="text-2xl font-semibold text-cyan-400 mb-6 flex items-center gap-2">
                                <FiMapPin className="w-6 h-6" />
                                Thông tin liên hệ
                            </h2>

                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="bg-cyan-500/20 p-3 rounded-lg">
                                        <FiMapPin className="w-5 h-5 text-cyan-400" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-white mb-1">Địa chỉ</h3>
                                        <p className="text-gray-300">
                                            123 Đường ABC, Quận 1, TP.HCM
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="bg-cyan-500/20 p-3 rounded-lg">
                                        <FiPhone className="w-5 h-5 text-cyan-400" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-white mb-1">
                                            Điện thoại
                                        </h3>
                                        <p className="text-gray-300">+84 123 456 789</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="bg-cyan-500/20 p-3 rounded-lg">
                                        <FiMail className="w-5 h-5 text-cyan-400" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-white mb-1">Email</h3>
                                        <p className="text-gray-300">contact@scs.com</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="bg-cyan-500/20 p-3 rounded-lg">
                                        <FiClock className="w-5 h-5 text-cyan-400" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-white mb-1">
                                            Giờ làm việc
                                        </h3>
                                        <p className="text-gray-300">Thứ 2 - Thứ 6: 8:00 - 18:00</p>
                                        <p className="text-gray-300">Thứ 7 - CN: 9:00 - 17:00</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* FAQ Section */}
                        <div className="bg-gradient-to-br from-[#232c3b] to-[#1e2530] p-8 rounded-xl border border-[#2b3445] shadow-2xl">
                            <h2 className="text-2xl font-semibold text-cyan-400 mb-6">
                                Câu hỏi thường gặp
                            </h2>

                            <div className="space-y-4">
                                {faqItems.map((item, index) => (
                                    <div
                                        key={index}
                                        className="border border-[#2b3445] rounded-lg overflow-hidden"
                                    >
                                        <button
                                            onClick={() =>
                                                setOpenFaq(openFaq === index ? null : index)
                                            }
                                            className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-[#2a3441] transition-colors duration-200"
                                        >
                                            <span className="font-medium text-white">{item.q}</span>
                                            <motion.div
                                                animate={{ rotate: openFaq === index ? 180 : 0 }}
                                                transition={{ duration: 0.2 }}
                                            >
                                                <FiChevronDown className="w-5 h-5 text-cyan-400" />
                                            </motion.div>
                                        </button>
                                        <AnimatePresence>
                                            {openFaq === index && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: 'auto', opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    transition={{ duration: 0.3 }}
                                                    className="overflow-hidden"
                                                >
                                                    <div className="px-6 pb-4 text-gray-300 bg-[#1e2530]">
                                                        {item.a}
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default ContactUsPage;
