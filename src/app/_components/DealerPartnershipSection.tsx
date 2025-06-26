import React from 'react';
import { FiUsers, FiTrendingUp, FiPackage } from 'react-icons/fi';

export default function DealerPartnershipSection() {
  return (
    <section
      className="relative bg-fixed bg-center bg-cover h-screen flex items-center justify-center text-white"
      style={{
        backgroundImage: "url('https://www.scsetc.com/wp-content/uploads/2025/04/daili.jpg')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-60" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 space-y-6 max-w-2xl">
        <h2 className="text-4xl md:text-5xl font-bold">
          Trở Thành Đại Lý Chính Thức
        </h2>
        <p className="text-lg text-gray-200">
          Chương trình đại lý hấp dẫn, hỗ trợ marketing và hậu mãi toàn cầu. Nhận ưu đãi chiết khấu cao, đào tạo chuyên sâu và tài liệu bán hàng đầy đủ.
        </p>
        <button className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-gray-900 font-semibold py-3 px-8 rounded-lg shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-yellow-300">
          Đăng Ký Ngay
        </button>

        <div className="mt-8 flex flex-col sm:flex-row sm:space-x-8 space-y-4 sm:space-y-0 text-gray-300">
          <div className="flex items-center space-x-2 hover:text-white transition-colors duration-300">
            <FiUsers className="w-6 h-6" />
            <span>Hỗ trợ 24/7</span>
          </div>
          <div className="flex items-center space-x-2 hover:text-white transition-colors duration-300">
            <FiTrendingUp className="w-6 h-6" />
            <span>Chiết khấu lên tới 30%</span>
          </div>
          <div className="flex items-center space-x-2 hover:text-white transition-colors duration-300">
            <FiPackage className="w-6 h-6" />
            <span>Giao hàng nhanh toàn cầu</span>
          </div>
        </div>

        {/* Testimonial */}
        <blockquote className="mt-8 italic text-gray-300">
          “Hợp tác cùng Cardo giúp tôi tăng doanh số 120% trong 6 tháng.”
        </blockquote>
      </div>
    </section>
  );
}
