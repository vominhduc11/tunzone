'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiShield, FiLock, FiRefreshCw, FiMail, FiFileText, FiEye, FiUsers, FiCheckCircle } from 'react-icons/fi';

export default function PolicyPage() {
    const fadeInUp = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

    return (
        <div className="scroll-smooth min-h-screen bg-gray-900 text-white">
            {/* Hero Section */}
            <motion.section
                initial="hidden"
                animate="visible"
                variants={fadeInUp}
                className="relative bg-gradient-to-br from-blue-900 via-purple-900 to-gray-900 py-20"
            >
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="relative w-full max-w-[1280px] mx-auto px-4 text-center">
                    <motion.div variants={fadeInUp} className="mb-6">
                        <div className="inline-flex items-center gap-2 bg-blue-500/20 text-blue-400 px-4 py-2 rounded-full text-sm font-medium mb-4">
                            <FiFileText className="w-4 h-4" />
                            Điều khoản & Chính sách
                        </div>
                    </motion.div>
                    
                    <motion.h1 
                        variants={fadeInUp}
                        className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
                    >
                        Điều Khoản & Chính Sách
                    </motion.h1>
                    
                    <motion.p 
                        variants={fadeInUp}
                        className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
                    >
                        Tìm hiểu về các điều khoản sử dụng, chính sách bảo mật và quyền lợi của bạn khi sử dụng dịch vụ TuneZone
                    </motion.p>
                </div>
            </motion.section>

            {/* Main Content */}
            <div className="w-full max-w-[1280px] mx-auto px-4 py-16">
                {/* Table of Contents */}
                <motion.nav 
                    initial="hidden"
                    animate="visible"
                    variants={staggerContainer}
                    className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 mb-12 border border-gray-700"
                >
                    <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                        <div className="bg-blue-500/20 p-2 rounded-lg">
                            <FiFileText className="w-6 h-6 text-blue-400" />
                        </div>
                        Mục lục
                    </h2>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                        {[
                            { id: 'terms', label: 'Điều khoản sử dụng', icon: FiShield, desc: 'Quy định về việc sử dụng dịch vụ' },
                            { id: 'privacy', label: 'Chính sách bảo mật', icon: FiLock, desc: 'Cách chúng tôi bảo vệ thông tin của bạn' },
                            { id: 'warranty', label: 'Chính sách bảo hành', icon: FiCheckCircle, desc: 'Quy định về bảo hành sản phẩm' },
                            { id: 'contact', label: 'Thông tin liên hệ', icon: FiMail, desc: 'Cách liên hệ khi có thắc mắc' }
                        ].map((item, index) => (
                            <motion.div key={item.id} variants={fadeInUp}>
                                <Link
                                    href={`#${item.id}`}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        const el = document.getElementById(item.id);
                                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                                    }}
                                    className="group block p-4 bg-gray-700/30 hover:bg-gray-700/50 rounded-xl transition-all duration-300 hover:scale-[1.02] border border-gray-600 hover:border-blue-500/50"
                                >
                                    <div className="flex items-start gap-4">
                                        <div className="bg-blue-500/20 p-2 rounded-lg group-hover:bg-blue-500/30 transition-colors">
                                            <item.icon className="w-5 h-5 text-blue-400" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-white group-hover:text-blue-400 transition-colors">
                                                {index + 1}. {item.label}
                                            </h3>
                                            <p className="text-sm text-gray-400 mt-1">{item.desc}</p>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </motion.nav>

                {/* Terms of Service */}
                <motion.section
                    id="terms"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={fadeInUp}
                    className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 mb-12 border border-gray-700"
                >
                    <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                        <div className="bg-blue-500/20 p-2 rounded-lg">
                            <FiShield className="w-6 h-6 text-blue-400" />
                        </div>
                        1. Điều khoản sử dụng
                    </h2>
                    
                    <div className="space-y-6 text-gray-300 leading-relaxed">
                        <p className="text-lg">
                            Chào mừng bạn đến với TuneZone! Khi truy cập và sử dụng website này, bạn đồng ý tuân thủ các điều khoản và chính sách được quy định sau đây:
                        </p>
                        
                        <div className="space-y-4">
                            <h3 className="text-xl font-semibold text-white">Điều kiện sử dụng:</h3>
                            <ul className="space-y-3">
                                {[
                                    'Người dùng phải từ 18 tuổi trở lên hoặc có sự đồng ý của người giám hộ hợp pháp',
                                    'Bạn cam kết không sử dụng dịch vụ cho các hoạt động bất hợp pháp hoặc vi phạm pháp luật',
                                    'Mọi nội dung bạn đăng tải phải tuân thủ luật pháp và không vi phạm quyền sở hữu trí tuệ',
                                    'TuneZone có quyền thay đổi, tạm ngừng hoặc chấm dứt dịch vụ khi cần thiết',
                                    'Bạn chịu trách nhiệm bảo mật thông tin tài khoản và mật khẩu của mình'
                                ].map((item, index) => (
                                    <li key={index} className="flex items-start gap-3">
                                        <FiCheckCircle className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </motion.section>

                {/* Privacy Policy */}
                <motion.section
                    id="privacy"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={fadeInUp}
                    className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 mb-12 border border-gray-700"
                >
                    <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                        <div className="bg-blue-500/20 p-2 rounded-lg">
                            <FiLock className="w-6 h-6 text-blue-400" />
                        </div>
                        2. Chính sách bảo mật
                    </h2>
                    
                    <div className="space-y-6 text-gray-300 leading-relaxed">
                        <p className="text-lg">
                            TuneZone cam kết bảo vệ thông tin cá nhân của bạn. Chúng tôi thu thập và sử dụng thông tin một cách minh bạch và có trách nhiệm.
                        </p>
                        
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                                    <FiEye className="w-5 h-5 text-blue-400" />
                                    Thu thập thông tin
                                </h3>
                                <ul className="space-y-2 text-sm">
                                    <li>• Thông tin cá nhân: Họ tên, email, số điện thoại</li>
                                    <li>• Thông tin giao dịch: Lịch sử mua hàng, thanh toán</li>
                                    <li>• Thông tin kỹ thuật: IP, trình duyệt, thiết bị</li>
                                    <li>• Cookies và dữ liệu phiên làm việc</li>
                                </ul>
                            </div>
                            
                            <div className="space-y-4">
                                <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                                    <FiUsers className="w-5 h-5 text-blue-400" />
                                    Sử dụng thông tin
                                </h3>
                                <ul className="space-y-2 text-sm">
                                    <li>• Xử lý đơn hàng và giao hàng</li>
                                    <li>• Hỗ trợ khách hàng và bảo hành</li>
                                    <li>• Gửi thông tin khuyến mãi (nếu đồng ý)</li>
                                    <li>• Cải thiện chất lượng dịch vụ</li>
                                </ul>
                            </div>
                        </div>
                        
                        <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-6">
                            <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                                <FiShield className="w-5 h-5 text-blue-400" />
                                Cam kết bảo mật
                            </h4>
                            <ul className="space-y-2 text-sm">
                                <li>• Thông tin được mã hóa và lưu trữ an toàn</li>
                                <li>• Không chia sẻ thông tin cho bên thứ ba trừ khi có yêu cầu pháp lý</li>
                                <li>• Bạn có quyền truy cập, chỉnh sửa hoặc xóa thông tin cá nhân</li>
                                <li>• Tuân thủ các quy định về bảo vệ dữ liệu cá nhân</li>
                            </ul>
                        </div>
                    </div>
                </motion.section>

                {/* Warranty Policy */}
                <motion.section
                    id="warranty"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={fadeInUp}
                    className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 mb-12 border border-gray-700"
                >
                    <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                        <div className="bg-blue-500/20 p-2 rounded-lg">
                            <FiCheckCircle className="w-6 h-6 text-blue-400" />
                        </div>
                        3. Chính sách bảo hành
                    </h2>
                    
                    <div className="space-y-6 text-gray-300 leading-relaxed">
                        <p className="text-lg">
                            TuneZone cung cấp chính sách bảo hành toàn diện cho tất cả sản phẩm nhằm đảm bảo quyền lợi tốt nhất cho khách hàng.
                        </p>
                        
                        <div className="grid md:grid-cols-3 gap-6">
                            <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-6">
                                <h4 className="font-semibold text-white mb-3">Bảo hành cơ bản</h4>
                                <ul className="space-y-2 text-sm">
                                    <li>• Thời gian: 12-24 tháng</li>
                                    <li>• Bao gồm: Lỗi kỹ thuật, linh kiện</li>
                                    <li>• Miễn phí sửa chữa/thay thế</li>
                                </ul>
                            </div>
                            
                            <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-6">
                                <h4 className="font-semibold text-white mb-3">Bảo hành mở rộng</h4>
                                <ul className="space-y-2 text-sm">
                                    <li>• Thời gian: Lên đến 36 tháng</li>
                                    <li>• Bao gồm: Tai nạn, rơi vỡ</li>
                                    <li>• Dịch vụ tận nơi</li>
                                </ul>
                            </div>
                            
                            <div className="bg-purple-500/10 border border-purple-500/20 rounded-xl p-6">
                                <h4 className="font-semibold text-white mb-3">Hỗ trợ kỹ thuật</h4>
                                <ul className="space-y-2 text-sm">
                                    <li>• Hỗ trợ 24/7</li>
                                    <li>• Tư vấn sử dụng</li>
                                    <li>• Cập nhật firmware</li>
                                </ul>
                            </div>
                        </div>
                        
                        <div className="space-y-4">
                            <h3 className="text-xl font-semibold text-white">Điều kiện bảo hành:</h3>
                            <ul className="space-y-2">
                                {[
                                    'Sản phẩm còn trong thời hạn bảo hành',
                                    'Có hóa đơn mua hàng hoặc phiếu bảo hành hợp lệ',
                                    'Lỗi do nhà sản xuất, không phải do người dùng',
                                    'Sản phẩm chưa bị tháo dỡ hoặc sửa chữa bởi bên thứ ba'
                                ].map((item, index) => (
                                    <li key={index} className="flex items-start gap-3">
                                        <FiCheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </motion.section>

                {/* Updates Policy */}
                <motion.section
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={fadeInUp}
                    className="bg-yellow-500/10 border border-yellow-500/20 rounded-2xl p-8 mb-12"
                >
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-3 text-yellow-400">
                        <FiRefreshCw className="w-6 h-6" />
                        Cập nhật điều khoản
                    </h3>
                    <p className="text-gray-300 leading-relaxed">
                        Chúng tôi có thể cập nhật các điều khoản và chính sách này theo thời gian. 
                        Khi có thay đổi quan trọng, chúng tôi sẽ thông báo qua email hoặc thông báo trên website. 
                        Việc bạn tiếp tục sử dụng dịch vụ sau khi có thông báo đồng nghĩa với việc chấp nhận các điều khoản mới.
                    </p>
                </motion.section>

                {/* Contact Section */}
                <motion.section
                    id="contact"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={fadeInUp}
                    className="text-center bg-gradient-to-r from-blue-600/10 to-purple-600/10 border border-blue-500/20 rounded-2xl p-8"
                >
                    <h2 className="text-3xl font-bold mb-6 flex items-center justify-center gap-3">
                        <div className="bg-blue-500/20 p-2 rounded-lg">
                            <FiMail className="w-6 h-6 text-blue-400" />
                        </div>
                        4. Liên hệ hỗ trợ
                    </h2>
                    
                    <p className="text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
                        Nếu bạn có bất kỳ thắc mắc nào về các điều khoản và chính sách này, 
                        đừng ngần ngại liên hệ với đội ngũ hỗ trợ của chúng tôi.
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <a
                            href="mailto:support@tunezone.vn"
                            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-xl transition-colors flex items-center gap-2"
                        >
                            <FiMail className="w-5 h-5" />
                            support@tunezone.vn
                        </a>
                        
                        <Link
                            href="/contact"
                            className="bg-transparent border-2 border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white font-semibold py-3 px-8 rounded-xl transition-colors"
                        >
                            Trang liên hệ
                        </Link>
                    </div>
                    
                    <div className="mt-8 pt-8 border-t border-gray-700">
                        <p className="text-sm text-gray-400">
                            Cập nhật lần cuối: Tháng 7, 2025 | TuneZone - Đỉnh cao âm thanh
                        </p>
                    </div>
                </motion.section>
            </div>
        </div>
    );
}
