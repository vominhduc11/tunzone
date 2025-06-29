'use client';

import Link from 'next/link';

export default function PolicyPage() {
    const termsIntro = `Chào mừng bạn đến với SCS! Khi truy cập và sử dụng trang web này, bạn đồng ý tuân thủ các điều khoản và chính sách được quy định sau đây:`;
    const updatesIntro = `Chúng tôi có thể cập nhật hoặc thay đổi điều khoản này vào bất kỳ thời điểm nào. Khi có sửa đổi, chúng tôi sẽ thông báo qua email hoặc thông báo trên trang web. Việc bạn tiếp tục sử dụng dịch vụ sau khi có thông báo sửa đổi đồng nghĩa bạn đã chấp nhận các điều khoản mới.`;

    return (
        <div className="min-h-screen bg-[#181f2a] text-[#b0d0f9] font-sans py-12 px-4">
            <div className="max-w-4xl mx-auto space-y-12">
                {/* Page Title */}
                <header>
                    <h1 className="text-4xl md:text-5xl font-bold text-cyan-400 mb-2 text-center">
                        Điều khoản &amp; Chính sách
                    </h1>
                </header>

                {/* Table of Contents */}
                <nav aria-label="Mục lục chính sách" className="max-w-md mx-auto mb-12">
                    <ul className="list-none space-y-3 text-lg text-left">
                        {[
                            { idx: 1, id: 'terms', label: 'Điều khoản sử dụng' },
                            { idx: 2, id: 'privacy', label: 'Chính sách bảo mật' },
                            { idx: 3, id: 'updates', label: 'Thay đổi điều khoản' },
                            { idx: 4, id: 'contact', label: 'Liên hệ' }
                        ].map(({ idx, id, label }) => (
                            <li key={id}>
                                <Link
                                    href={`#${id}`}
                                    className="flex items-center gap-2 hover:text-cyan-300 transition-colors"
                                >
                                    <span className="font-medium text-cyan-300">{idx}.</span>
                                    <span>{label}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* Điều khoản sử dụng */}
                <section
                    id="terms"
                    className="bg-[#232c3b] p-8 rounded-2xl shadow-lg space-y-6 hover:shadow-xl hover:scale-[1.02] transition-transform duration-200"
                >
                    <h2 className="text-4xl font-semibold text-[#86cfff] leading-tight">
                        1. Điều khoản sử dụng
                    </h2>
                    <p className="text-base leading-relaxed">{termsIntro}</p>
                    <ul className="list-disc list-inside space-y-3 text-base leading-relaxed marker:text-cyan-300">
                        <li>
                            Người dùng phải ở độ tuổi từ 18 trở lên hoặc có sự đồng ý của người giám
                            hộ.
                        </li>
                        <li>Bạn cam kết không sử dụng dịch vụ cho các hoạt động bất hợp pháp.</li>
                        <li>
                            Mọi nội dung bạn đăng tải phải tuân thủ luật pháp và không vi phạm quyền
                            sở hữu trí tuệ.
                        </li>
                        <li>
                            SCS có quyền thay đổi, ngừng hoặc chấm dứt dịch vụ bất cứ lúc nào mà
                            không cần thông báo trước.
                        </li>
                    </ul>
                </section>

                {/* Chính sách bảo mật */}
                <section
                    id="privacy"
                    className="bg-[#232c3b] p-8 rounded-2xl shadow-lg space-y-6 hover:shadow-xl hover:scale-[1.02] transition-transform duration-200"
                >
                    <h2 className="text-4xl font-semibold text-[#86cfff] leading-tight">
                        2. Chính sách bảo mật
                    </h2>
                    <ul className="list-disc list-inside space-y-3 text-base leading-relaxed marker:text-cyan-300">
                        <li>
                            <strong>Thu thập thông tin:</strong> Chúng tôi thu thập email, tên, số
                            điện thoại khi bạn đăng ký.
                        </li>
                        <li>
                            <strong>Sử dụng thông tin:</strong> Thông tin dùng để liên hệ, cải thiện
                            dịch vụ và gửi tin khuyến mãi (nếu bạn đồng ý).
                        </li>
                        <li>
                            <strong>Bảo mật:</strong> Thông tin được lưu trữ trên máy chủ được mã
                            hóa.
                        </li>
                        <li>
                            <strong>Chia sẻ thông tin:</strong> Chúng tôi không bán hoặc chia sẻ
                            thông tin cho bên thứ ba trừ khi có yêu cầu pháp lý.
                        </li>
                        <li>
                            <strong>Quyền của bạn:</strong> Bạn có quyền truy cập, chỉnh sửa hoặc
                            xóa thông tin cá nhân bằng cách liên hệ với chúng tôi.
                        </li>
                    </ul>
                </section>

                {/* Thay đổi điều khoản */}
                <section
                    id="updates"
                    className="bg-[#232c3b] p-8 rounded-2xl shadow-lg space-y-6 hover:shadow-xl hover:scale-[1.02] transition-transform duration-200"
                >
                    <h2 className="text-4xl font-semibold text-[#86cfff] leading-tight">
                        3. Thay đổi điều khoản
                    </h2>
                    <p className="text-base leading-relaxed">{updatesIntro}</p>
                </section>

                {/* Liên hệ */}
                <section
                    id="contact"
                    className="border-t border-[#1cb6ff22] pt-12 text-center space-y-4"
                >
                    <h2 className="text-3xl font-semibold text-[#86cfff]">4. Liên hệ</h2>
                    <p className="text-base leading-relaxed">
                        Nếu bạn có thắc mắc về điều khoản hoặc chính sách, vui lòng liên hệ với
                        chúng tôi tại:
                    </p>
                    <a
                        href="mailto:support@scs.vn"
                        className="inline-block bg-cyan-400 text-[#181f2a] font-medium py-2 px-6 rounded-full hover:bg-cyan-300 transition-colors"
                    >
                        support@scs.vn
                    </a>
                </section>
            </div>
        </div>
    );
}
