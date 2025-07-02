import { FaFacebookF, FaInstagram, FaYoutube, FaTwitter } from 'react-icons/fa';
import { FiMail, FiPhone, FiMapPin, FiHeart } from 'react-icons/fi';
import Link from 'next/link';
import Logo from '@/components/shared/Logo';

const companyLinks = [
  { label: 'Về TuneZone', href: '/about' },
  // { label: 'Tuyển dụng', href: '/careers' },
  { label: 'Tin tức', href: '/blogs' },
  { label: 'Điều khoản & Chính sách', href: '/policy' },
  { label: 'Chính sách bảo mật', href: '/policy#privacy' },
];

const productLinks = [
  { label: 'Tất cả sản phẩm', href: '/products' },
  { label: 'Tai nghe Gaming', href: '/products?category=gaming' },
  { label: 'Tai nghe Studio', href: '/products?category=studio' },
  { label: 'Tai nghe Bluetooth', href: '/products?category=wireless' },
  { label: 'Phụ kiện', href: '/products?category=accessories' },
];

const supportLinks = [
  { label: 'Hỗ trợ khách hàng', href: '/contact' },
  { label: 'Tra cứu bảo hành', href: '/warrantyChecking' },
  { label: 'Hướng dẫn sử dụng', href: '/blogs?category=guide' },
  { label: 'Tìm đại lý', href: '/dealers' },
  { label: 'Đăng ký đại lý', href: '/dealerRegistration' },
];

const socialLinks = [
  { 
    name: 'Facebook', 
    href: 'https://facebook.com/tunezone.vn', 
    icon: FaFacebookF,
    color: 'hover:text-blue-500'
  },
  { 
    name: 'Instagram', 
    href: 'https://instagram.com/tunezone.vn', 
    icon: FaInstagram,
    color: 'hover:text-pink-500'
  },
  { 
    name: 'YouTube', 
    href: 'https://youtube.com/@tunezone', 
    icon: FaYoutube,
    color: 'hover:text-red-500'
  },
  { 
    name: 'Twitter', 
    href: 'https://twitter.com/tunezone_vn', 
    icon: FaTwitter,
    color: 'hover:text-sky-500'
  },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 border-t border-gray-700">
      {/* Main Footer Content */}
      <div className="w-full max-w-[1280px] mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <Logo size="lg" showText={true} href="/" />
              <p className="text-sm text-gray-400 mt-2 ml-16">Đỉnh cao âm thanh</p>
            </div>
            
            <p className="text-gray-300 mb-6 leading-relaxed">
              TuneZone là thương hiệu âm thanh hàng đầu Việt Nam, chuyên cung cấp 
              các sản phẩm tai nghe chất lượng cao với công nghệ tiên tiến và 
              thiết kế đẳng cấp.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <FiMapPin className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <span className="text-sm">123 Nguyễn Huệ, Q.1, TP.HCM</span>
              </div>
              <div className="flex items-center gap-3">
                <FiPhone className="w-4 h-4 text-green-400 flex-shrink-0" />
                <a href="tel:+84123456789" className="text-sm hover:text-green-400 transition-colors">
                  +84 123 456 789
                </a>
              </div>
              <div className="flex items-center gap-3">
                <FiMail className="w-4 h-4 text-purple-400 flex-shrink-0" />
                <a href="mailto:contact@tunezone.vn" className="text-sm hover:text-purple-400 transition-colors">
                  contact@tunezone.vn
                </a>
              </div>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-6">Công ty</h3>
            <ul className="space-y-3">
              {companyLinks.map(({ label, href }) => (
                <li key={href}>
                  <Link 
                    href={href} 
                    className="text-gray-300 hover:text-blue-400 transition-colors duration-300 text-sm block py-1"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-6">Sản phẩm</h3>
            <ul className="space-y-3">
              {productLinks.map(({ label, href }) => (
                <li key={href}>
                  <Link 
                    href={href} 
                    className="text-gray-300 hover:text-blue-400 transition-colors duration-300 text-sm block py-1"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-6">Hỗ trợ</h3>
            <ul className="space-y-3">
              {supportLinks.map(({ label, href }) => (
                <li key={href}>
                  <Link 
                    href={href} 
                    className="text-gray-300 hover:text-blue-400 transition-colors duration-300 text-sm block py-1"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="mt-12 pt-8 border-t border-gray-700">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-xl font-bold text-white mb-2">
                Đăng ký nhận tin tức mới nhất
              </h3>
              <p className="text-gray-400 text-sm">
                Nhận thông tin về sản phẩm mới, khuyến mãi và tin tức công nghệ âm thanh
              </p>
            </div>
            <div className="flex gap-3">
              <input
                type="email"
                placeholder="Nhập email của bạn"
                className="flex-1 bg-gray-800 border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 hover:scale-105 flex items-center gap-2">
                <FiMail className="w-4 h-4" />
                Đăng ký
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-700 bg-gray-800/50">
        <div className="w-full max-w-[1280px] mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <span>© {currentYear} TuneZone. Tất cả quyền được bảo lưu.</span>
              <span>Made with</span>
              <FiHeart className="w-4 h-4 text-red-500 fill-current" />
              <span>in Vietnam</span>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-400 mr-2">Theo dõi chúng tôi:</span>
              {socialLinks.map(({ name, href, icon: Icon, color }) => (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-all duration-300 hover:scale-110 text-gray-400 ${color}`}
                  aria-label={name}
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>

            {/* Language & Currency */}
            <div className="flex items-center gap-3">
              <select className="bg-gray-700 text-gray-300 text-sm py-2 px-3 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="vi">🇻🇳 Tiếng Việt</option>
                <option value="en">🇺🇸 English</option>
              </select>
              <select className="bg-gray-700 text-gray-300 text-sm py-2 px-3 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="vnd">VND (₫)</option>
                <option value="usd">USD ($)</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
