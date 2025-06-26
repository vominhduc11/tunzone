import React from 'react';
import { FiHeadphones, FiBattery, FiCloudRain } from 'react-icons/fi';

export default function HeroSections() {
  return (
    <>
      {/* Section 1: Hero Overview */}
      <section
        className="relative bg-fixed bg-center bg-cover h-screen flex items-center justify-center text-white"
        style={{
          backgroundImage:
            "url('https://www.scsetc.com/wp-content/uploads/2025/04/oemodm.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black opacity-60" />
        <div className="relative z-10 flex flex-col items-center text-center px-6 space-y-6">
          <h1 className="text-5xl font-bold">Khám Phá Giải Pháp Liên Lạc Thế Hệ Mới</h1>
          <p className="text-lg max-w-2xl">
            Hệ thống mạng lưới độc quyền, đảm bảo kết nối xuyên suốt, an toàn và tiện nghi cho mọi chuyến đi.
          </p>
          <a
            href="/features"
            className="inline-block bg-blue-500 text-white font-semibold py-3 px-8 rounded-lg shadow-md transform transition duration-300 hover:bg-blue-600 hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Khám Phá Ngay
          </a>
          <p className="text-sm text-gray-300">Bảo hành 2 năm | Hỗ trợ 24/7</p>
        </div>
      </section>

      {/* Section 2: Use Cases & Benefits */}
      <section
        className="relative bg-fixed bg-center bg-cover h-screen flex items-center justify-center text-white"
        style={{
          backgroundImage:
            "url('https://www.scsetc.com/wp-content/uploads/2025/04/daili.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black opacity-60" />
        <div className="relative z-10 flex flex-col items-center text-center px-6 space-y-6">
          <h2 className="text-4xl font-semibold">Ứng Dụng Đa Năng Cho Mọi Hành Trình</h2>
          <p className="text-md max-w-2xl">
            Từ thành phố đến địa hình đồi núi, một thiết bị – vô số tính năng: âm thanh chất lượng, pin lâu dài, kháng nước IP67.
          </p>
          <a
            href="/use-cases"
            className="inline-block bg-green-500 text-white font-semibold py-3 px-8 rounded-lg shadow-md transform transition duration-300 hover:bg-green-600 hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-green-400"
          >
            Bắt Đầu Hành Trình
          </a>
          <div className="mt-6 flex flex-wrap justify-center gap-8 text-gray-200">
            <div className="flex items-center space-x-2">
              <FiHeadphones className="w-5 h-5 transition-transform duration-300 hover:scale-110" />
              <span>Chất lượng âm thanh</span>
            </div>
            <div className="flex items-center space-x-2">
              <FiBattery className="w-5 h-5 transition-transform duration-300 hover:scale-110" />
              <span>Pin 13h</span>
            </div>
            <div className="flex items-center space-x-2">
              <FiCloudRain className="w-5 h-5 transition-transform duration-300 hover:scale-110" />
              <span>Kháng nước IP67</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
