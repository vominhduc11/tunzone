'use client';

import { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

export default function WarrantyCheckingPage() {
  const [serial, setSerial] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    status: string;
    purchaseDate?: string;
    expiryDate?: string;
    details?: string;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  /**
   * Handle warranty check with example logic
   */
  const handleCheck = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setResult(null);

    // Example serials
    if (serial === 'ABC123456') {
      setResult({
        status: 'Còn hạn',
        purchaseDate: '2023-01-15',
        expiryDate: '2026-01-14',
        details: 'Sản phẩm đang còn trong thời gian bảo hành.'
      });
      return;
    }
    if (serial === 'XYZ000000') {
      setError('Không tìm thấy thông tin bảo hành');
      return;
    }
    if (serial === 'DEF654321') {
      setResult({
        status: 'Hết hạn',
        purchaseDate: '2020-05-10',
        expiryDate: '2023-05-09',
        details: 'Thời gian bảo hành đã kết thúc.'
      });
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get(
        `/api/warranty?serial=${encodeURIComponent(serial)}`
      );
      setResult(response.data);
    } catch (err: unknown) {
      setError(
        axios.isAxiosError(err)
          ? err.response?.data?.message || 'Không tìm thấy thông tin bảo hành'
          : 'Lỗi hệ thống'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-[#181f2a] py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl md:text-4xl font-semibold text-cyan-400 mb-6">
          Tra Cứu Bảo Hành
        </h1>
        <div className="bg-[#232c3b] rounded-2xl shadow-lg p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Form */}
          <div className="rounded-lg p-4">
            <p className="text-gray-400 mb-2">
              Ví dụ serial:
              <span className="font-medium text-white ml-2">ABC123456</span> (đúng),
              <span className="font-medium text-white ml-2">XYZ000000</span> (không đúng),
              <span className="font-medium text-white ml-2">DEF654321</span> (hết hạn).
            </p>
            <form onSubmit={handleCheck} className="space-y-4">
              <label htmlFor="serial" className="block text-gray-300">
                Mã Số Seri / Số Phiếu
              </label>
              <input
                id="serial"
                type="text"
                value={serial}
                onChange={(e) => setSerial(e.target.value)}
                required
                placeholder="ABC123456"
                className="w-full px-4 py-2 rounded-lg bg-[#181f2a] text-white focus:ring-2 focus:ring-cyan-400 transition"
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-cyan-400 hover:bg-cyan-300 text-[#181f2a] py-2 rounded-full font-medium transition-transform hover:scale-105"
              >
                {loading ? 'Đang kiểm tra...' : 'Kiểm tra'}
              </button>
            </form>
            {error && (
              <motion.div
                className="mt-4 bg-red-600 text-white p-4 rounded-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                {error}
              </motion.div>
            )}
          </div>

          {/* Result */}
          <div className="rounded-lg p-4">
            {result ? (
              <motion.div
                className="bg-[#181f2a] p-6 rounded-lg"
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <p className="text-cyan-400 font-semibold mb-4">Kết quả kiểm tra:</p>
                <ul className="space-y-2 text-gray-200">
                  <li>
                    <span className="font-medium">Trạng thái:</span> {result.status}
                  </li>
                  {result.purchaseDate && (
                    <li>
                      <span className="font-medium">Ngày mua:</span> {result.purchaseDate}
                    </li>
                  )}
                  {result.expiryDate && (
                    <li>
                      <span className="font-medium">Hết hạn:</span> {result.expiryDate}
                    </li>
                  )}
                  {result.details && <li>{result.details}</li>}
                </ul>
              </motion.div>
            ) : (
              <div className="h-full flex items-center justify-center text-gray-500">
                Chưa có kết quả
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
