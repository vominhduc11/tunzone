/** @type {import('next').NextConfig} */
const nextConfig = {
    // Các cấu hình khác của bạn ở đây

    images: {
        // Bật unoptimized nếu bạn muốn Next.js không xử lý ảnh (dùng URL gốc)
        unoptimized: true,
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'cardosystems.com',
                port: '',
                // Cho phép tất cả đường dẫn dưới /cdn/shop/files
                pathname: '/cdn/shop/files/**'
            }
        ]
    }
};

module.exports = nextConfig;
