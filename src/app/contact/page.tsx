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
    FiMessageSquare,
    FiHeadphones,
    FiCheck
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
    const [isSubmitting, setIsSubmitting] = useState(false);
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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;
        
        setIsSubmitting(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setForm({ name: '', phone: '', email: '', subject: '', message: '' });
        setFeedback('Gửi tin nhắn thành công! Chúng tôi sẽ liên hệ với bạn trong 24 giờ.');
        setIsSubmitting(false);
        
        // Clear feedback after 5 seconds
        setTimeout(() => setFeedback(''), 5000);
    };

    const faqItems = [
        { 
            q: 'Thời gian giao hàng là bao lâu?', 
            a: 'Chúng tôi giao hàng trong 1-2 ngày làm việc tại TP.HCM và Hà Nội, 2-4 ngày với các tỉnh thành khác. Miễn phí giao hàng cho đơn hàng trên 500.000đ.'
        },
        { 
            q: 'Chính sách bảo hành như thế nào?', 
            a: 'Tất cả sản phẩm TuneZone đều được bảo hành chính hãng từ 12-36 tháng tùy theo dòng sản phẩm. Bảo hành bao gồm lỗi kỹ thuật và linh kiện.'
        },
        { 
            q: 'Tôi có thể trải nghiệm sản phẩm trước khi mua không?', 
            a: 'Có, bạn có thể đến các cửa hàng TuneZone để trải nghiệm trực tiếp. Chúng tôi cũng có chính sách đổi trả trong 7 ngày nếu không hài lòng.'
        },
        { 
            q: 'Các phương thức thanh toán được hỗ trợ?', 
            a: 'Chúng tôi chấp nhận thanh toán qua thẻ tín dụng, chuyển khoản ngân hàng, ví điện tử (Momo, ZaloPay) và thanh toán khi nhận hàng (COD).'
        },
        {
            q: 'Làm sao để được tư vấn sản phẩm phù hợp?',
            a: 'Bạn có thể liên hệ hotline, chat trực tuyến hoặc đến cửa hàng. Đội ngũ chuyên gia của chúng tôi sẽ tư vấn dựa trên nhu cầu và ngân sách của bạn.'
        }
    ];

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
                <div className="relative w-full max-w-[1280px] mx-auto px-4 text-center">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                        className="mb-6"
                    >
                        <div className="inline-flex items-center gap-2 bg-blue-500/20 text-blue-400 px-4 py-2 rounded-full text-sm font-medium mb-4">
                            <FiHeadphones className="w-4 h-4" />
                            Liên hệ với chúng tôi
                        </div>
                    </motion.div>
                    
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                        className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
                    >
                        Hãy kết nối với TuneZone
                    </motion.h1>
                    
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.6 }}
                        className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
                    >
                        Chúng tôi luôn sẵn sàng hỗ trợ bạn tìm được sản phẩm âm thanh hoàn hảo. 
                        Liên hệ ngay để được tư vấn miễn phí từ các chuyên gia.
                    </motion.p>
                </div>
            </motion.section>

            {/* Main Content */}
            <div className="w-full max-w-[1280px] mx-auto px-4 py-16">
                <div className="grid lg:grid-cols-2 gap-12">
                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-700 shadow-2xl">
                            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                                <div className="bg-blue-500/20 p-2 rounded-lg">
                                    <FiMessageSquare className="w-6 h-6 text-blue-400" />
                                </div>
                                Gửi tin nhắn cho chúng tôi
                            </h2>

                            <form onSubmit={handleSubmit} noValidate className="space-y-6">
                                {feedback && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="bg-green-500/20 border border-green-500/30 text-green-400 p-4 rounded-xl"
                                    >
                                        <div className="flex items-center gap-3">
                                            <FiCheck className="w-5 h-5" />
                                            <span>{feedback}</span>
                                        </div>
                                    </motion.div>
                                )}

                                <div className="grid md:grid-cols-2 gap-6">
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.1, duration: 0.5 }}
                                    >
                                        <label className="block text-gray-300 mb-3 font-medium">
                                            Họ và tên *
                                        </label>
                                        <div className="relative">
                                            <FiUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                            <input
                                                type="text"
                                                placeholder="Nhập họ và tên của bạn"
                                                value={form.name}
                                                onChange={handleChange('name')}
                                                className={`w-full bg-gray-700/50 border border-gray-600 pl-12 pr-4 py-4 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${errors.name ? 'border-red-500' : ''}`}
                                            />
                                        </div>
                                        {errors.name && (
                                            <motion.p
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                className="text-red-400 text-sm mt-2 flex items-center gap-2"
                                            >
                                                <span className="w-1 h-1 bg-red-400 rounded-full"></span>
                                                {errors.name}
                                            </motion.p>
                                        )}
                                    </motion.div>

                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.2, duration: 0.5 }}
                                    >
                                        <label className="block text-gray-300 mb-3 font-medium">
                                            Số điện thoại
                                        </label>
                                        <div className="relative">
                                            <FiPhone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                            <input
                                                type="tel"
                                                placeholder="Nhập số điện thoại"
                                                value={form.phone}
                                                onChange={handleChange('phone')}
                                                className="w-full bg-gray-700/50 border border-gray-600 pl-12 pr-4 py-4 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                            />
                                        </div>
                                    </motion.div>
                                </div>

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3, duration: 0.5 }}
                                >
                                    <label className="block text-gray-300 mb-3 font-medium">
                                        Email *
                                    </label>
                                    <div className="relative">
                                        <FiMail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                        <input
                                            type="email"
                                            placeholder="Nhập địa chỉ email"
                                            value={form.email}
                                            onChange={handleChange('email')}
                                            className={`w-full bg-gray-700/50 border border-gray-600 pl-12 pr-4 py-4 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${errors.email ? 'border-red-500' : ''}`}
                                        />
                                    </div>
                                    {errors.email && (
                                        <motion.p
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className="text-red-400 text-sm mt-2 flex items-center gap-2"
                                        >
                                            <span className="w-1 h-1 bg-red-400 rounded-full"></span>
                                            {errors.email}
                                        </motion.p>
                                    )}
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4, duration: 0.5 }}
                                >
                                    <label className="block text-gray-300 mb-3 font-medium">
                                        Chủ đề *
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Nhập chủ đề tin nhắn"
                                        value={form.subject}
                                        onChange={handleChange('subject')}
                                        className={`w-full bg-gray-700/50 border border-gray-600 px-4 py-4 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${errors.subject ? 'border-red-500' : ''}`}
                                    />
                                    {errors.subject && (
                                        <motion.p
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className="text-red-400 text-sm mt-2 flex items-center gap-2"
                                        >
                                            <span className="w-1 h-1 bg-red-400 rounded-full"></span>
                                            {errors.subject}
                                        </motion.p>
                                    )}
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5, duration: 0.5 }}
                                >
                                    <label className="block text-gray-300 mb-3 font-medium">
                                        Nội dung *
                                    </label>
                                    <textarea
                                        rows={5}
                                        placeholder="Nhập nội dung tin nhắn..."
                                        value={form.message}
                                        onChange={handleChange('message')}
                                        className={`w-full bg-gray-700/50 border border-gray-600 px-4 py-4 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none ${errors.message ? 'border-red-500' : ''}`}
                                    />
                                    {errors.message && (
                                        <motion.p
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className="text-red-400 text-sm mt-2 flex items-center gap-2"
                                        >
                                            <span className="w-1 h-1 bg-red-400 rounded-full"></span>
                                            {errors.message}
                                        </motion.p>
                                    )}
                                </motion.div>

                                <motion.button
                                    type="submit"
                                    disabled={isSubmitting}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.6, duration: 0.5 }}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-600 disabled:to-gray-700 text-white py-4 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-3"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                            Đang gửi...
                                        </>
                                    ) : (
                                        <>
                                            <FiSend className="w-5 h-5" />
                                            Gửi tin nhắn
                                        </>
                                    )}
                                </motion.button>
                            </form>
                        </div>
                    </motion.div>

                    {/* Contact Info & FAQ */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="space-y-8"
                    >
                        {/* Contact Information */}
                        <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-700 shadow-2xl">
                            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                                <div className="bg-blue-500/20 p-2 rounded-lg">
                                    <FiMapPin className="w-6 h-6 text-blue-400" />
                                </div>
                                Thông tin liên hệ
                            </h2>

                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="bg-blue-500/20 p-3 rounded-xl">
                                        <FiMapPin className="w-5 h-5 text-blue-400" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-white mb-2">Địa chỉ</h3>
                                        <p className="text-gray-300 leading-relaxed">
                                            123 Đường Nguyễn Huệ, Quận 1, TP.HCM<br />
                                            456 Phố Huế, Hoàn Kiếm, Hà Nội
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="bg-green-500/20 p-3 rounded-xl">
                                        <FiPhone className="w-5 h-5 text-green-400" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-white mb-2">Hotline</h3>
                                        <p className="text-gray-300">
                                            <a href="tel:+84123456789" className="hover:text-green-400 transition-colors">
                                                +84 123 456 789
                                            </a>
                                        </p>
                                        <p className="text-gray-300">
                                            <a href="tel:+84987654321" className="hover:text-green-400 transition-colors">
                                                +84 987 654 321
                                            </a>
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="bg-purple-500/20 p-3 rounded-xl">
                                        <FiMail className="w-5 h-5 text-purple-400" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-white mb-2">Email</h3>
                                        <p className="text-gray-300">
                                            <a href="mailto:contact@tunezone.vn" className="hover:text-purple-400 transition-colors">
                                                contact@tunezone.vn
                                            </a>
                                        </p>
                                        <p className="text-gray-300">
                                            <a href="mailto:support@tunezone.vn" className="hover:text-purple-400 transition-colors">
                                                support@tunezone.vn
                                            </a>
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="bg-yellow-500/20 p-3 rounded-xl">
                                        <FiClock className="w-5 h-5 text-yellow-400" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-white mb-2">Giờ làm việc</h3>
                                        <p className="text-gray-300">Thứ 2 - Thứ 6: 8:00 - 18:00</p>
                                        <p className="text-gray-300">Thứ 7 - CN: 9:00 - 17:00</p>
                                        <p className="text-sm text-yellow-400 mt-1">Hỗ trợ online 24/7</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* FAQ Section */}
                        <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-700 shadow-2xl">
                            <h2 className="text-2xl font-bold text-white mb-6">
                                Câu hỏi thường gặp
                            </h2>

                            <div className="space-y-4">
                                {faqItems.map((item, index) => (
                                    <div
                                        key={index}
                                        className="border border-gray-600 rounded-xl overflow-hidden"
                                    >
                                        <button
                                            onClick={() =>
                                                setOpenFaq(openFaq === index ? null : index)
                                            }
                                            className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-700/50 transition-colors duration-200"
                                        >
                                            <span className="font-medium text-white pr-4">{item.q}</span>
                                            <motion.div
                                                animate={{ rotate: openFaq === index ? 180 : 0 }}
                                                transition={{ duration: 0.2 }}
                                            >
                                                <FiChevronDown className="w-5 h-5 text-blue-400 flex-shrink-0" />
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
                                                    <div className="px-6 pb-4 text-gray-300 bg-gray-700/30 leading-relaxed">
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
