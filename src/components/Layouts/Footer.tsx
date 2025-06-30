// components/Footer.tsx
import { FaFacebookF, FaInstagram, FaYoutube } from 'react-icons/fa';
import { SiTiktok } from 'react-icons/si';
import Link from 'next/link';

const companyLinks = [
  { label: 'Về Hitech', href: '/about' },
  { label: 'Hành trình Hitech', href: '/journey' },
  { label: 'Phát triển bền vững', href: '/sustainability' },
  { label: 'Gia nhập đội ngũ', href: '/careers' },
  { label: 'Điều khoản & Chính sách', href: '/policy' },
];

const infoLinks = [
  { label: 'Dịch vụ khách hàng', href: '/customer-service' },
  { label: 'Cập nhật thiết bị của bạn', href: '/device-update' },
  { label: 'Hitech Connect', href: '/hitech-connect' },
  { label: 'Tìm đại lý', href: '/dealers' },
  { label: 'Blog', href: '/blogs' },
  { label: 'Tra cứu bảo hành', href: '/warrantyChecking' },
];

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 border-t border-gray-700">
      <div className="w-full max-w-[1280px] mx-auto px-4 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {/* Cột Công ty */}
        <div>
          <h3 className="text-white font-semibold uppercase mb-4">Công ty</h3>
          <ul className="space-y-2">
            {companyLinks.map(({ label, href }) => (
              <li key={href}>
                <Link href={href} className="hover:underline text-cyan-400">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Cột Thông tin */}
        <div>
          <h3 className="text-white font-semibold uppercase mb-4">Thông tin</h3>
          <ul className="space-y-2">
            {infoLinks.map(({ label, href }) => (
              <li key={href}>
                <Link href={href} className="hover:underline text-cyan-400">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Cột Mạng xã hội */}
        <div>
          <h3 className="text-white font-semibold uppercase mb-4">Mạng xã hội</h3>
          <p className="mb-4">
            Tham gia <span className="font-semibold text-white">#HitechFam</span> ngay hôm nay!
          </p>
          <div className="flex space-x-4">
            <a
              href="https://www.facebook.com/yourpage"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 border border-gray-700 rounded hover:bg-gray-800"
            >
              <FaFacebookF className="h-5 w-5" />
            </a>
            <a
              href="https://www.instagram.com/yourpage"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 border border-gray-700 rounded hover:bg-gray-800"
            >
              <FaInstagram className="h-5 w-5" />
            </a>
            <a
              href="https://www.youtube.com/yourchannel"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 border border-gray-700 rounded hover:bg-gray-800"
            >
              <FaYoutube className="h-5 w-5" />
            </a>
            <a
              href="https://www.tiktok.com/@yourpage"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 border border-gray-700 rounded hover:bg-gray-800"
            >
              <SiTiktok className="h-5 w-5" />
            </a>
          </div>
        </div>

        {/* Cột Ngôn ngữ & Tiền tệ */}
        <div>
          <h3 className="text-white font-semibold uppercase mb-4">Ngôn ngữ & Tiền tệ</h3>
          <div className="flex flex-col sm:flex-row gap-4">
            <select className="bg-gray-800 text-gray-300 py-2 px-4 rounded focus:outline-none">
              <option>Việt Nam (VND ₫)</option>
              <option>Pháp (EUR €)</option>
              <option>Hoa Kỳ (USD $)</option>
            </select>
            <select className="bg-gray-800 text-gray-300 py-2 px-4 rounded focus:outline-none">
              <option>Tiếng Việt</option>
              <option>English</option>
              <option>Français</option>
            </select>
          </div>
        </div>
      </div>
    </footer>
  );
}
