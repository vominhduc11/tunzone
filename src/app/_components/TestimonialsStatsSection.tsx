import React from 'react';
import Image from 'next/image';
import { FiStar, FiUsers, FiGlobe, FiShoppingCart } from 'react-icons/fi';

const stats = [
  { icon: FiUsers, value: '10,000+', label: 'Khách Hàng Hài Lòng' },
  { icon: FiGlobe, value: '30', label: 'Quốc Gia Phủ Sóng' },
  { icon: FiShoppingCart, value: '50,000+', label: 'Sản Phẩm Đã Bán' },
];

const testimonials = [
  {
    name: 'Nguyễn Văn A',
    role: 'Biker Chuyên Nghiệp',
    avatar: '/avatars/avatar1.jpg',
    feedback:
      'Thiết bị của Cardo thực sự thay đổi cách tôi di chuyển. Âm thanh rõ nét, kết nối ổn định trong mọi điều kiện.',
    rating: 5,
  },
  {
    name: 'Trần Thị B',
    role: 'Đại Lý Miền Bắc',
    avatar: '/avatars/avatar2.jpg',
    feedback:
      'Chương trình đại lý rất chuyên nghiệp, hỗ trợ tận tình và mức chiết khấu hấp dẫn giúp doanh thu tăng nhanh.',
    rating: 4,
  },
  {
    name: 'Lê Văn C',
    role: 'Khách Hàng',
    avatar: '/avatars/avatar3.jpg',
    feedback:
      'Tôi đã dùng sản phẩm được 6 tháng, pin bền, kháng nước tốt, đi phượt thoải mái cả ngày.',
    rating: 5,
  },
];

export default function TestimonialsStatsSection() {
  return (
    <section className="bg-gray-900 py-16">
      <div className="container mx-auto px-4">
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center mb-12">
          {stats.map(({ icon: Icon, value, label }) => (
            <div key={label} className="flex flex-col items-center">
              <Icon className="w-12 h-12 text-blue-400 mb-2" />
              <span className="text-3xl font-bold text-white">{value}</span>
              <span className="text-gray-400">{label}</span>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map(({ name, role, avatar, feedback, rating }) => (
            <div
              key={name}
              className="bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-2xl transform transition duration-300 hover:-translate-y-2"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                  <Image src={avatar} alt={name} width={48} height={48} />
                </div>
                <div>
                  <h4 className="font-semibold text-white">{name}</h4>
                  <p className="text-sm text-gray-400">{role}</p>
                </div>
              </div>
              <p className="text-gray-200 mb-4">“{feedback}”</p>
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <FiStar
                    key={i}
                    className={`w-5 h-5 ${i < rating ? 'text-yellow-400' : 'text-gray-600'}`}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
