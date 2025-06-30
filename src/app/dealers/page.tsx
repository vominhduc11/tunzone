'use client';

import { FC, useState, useMemo } from 'react';
import { FaSearch, FaMapMarkerAlt, FaPhone, FaClock } from 'react-icons/fa';
import { motion } from 'framer-motion';
import Select from 'react-select';

interface Dealer {
    id: number;
    name: string;
    province: string;
    district: string;
    street: string;
    fullAddress: string;
    phone: string;
    hours: string;
    coord: { lat: number; lng: number };
    services: string[];
    rating: number;
}

const dealers: Dealer[] = [
    {
        id: 1,
        name: 'SCS Headphones Hà Nội',
        province: 'Hà Nội',
        district: 'Hoàn Kiếm',
        street: 'Phố Huế',
        fullAddress: '123 Phố Huế, Hoàn Kiếm, Hà Nội',
        phone: '024 3825 1234',
        hours: '8:00 - 22:00',
        coord: { lat: 21.0285, lng: 105.8542 },
        services: ['Bán hàng', 'Bảo hành', 'Tư vấn kỹ thuật'],
        rating: 4.8
    },
    {
        id: 2,
        name: 'SCS Headphones TP.HCM',
        province: 'TP.HCM',
        district: 'Quận 1',
        street: 'Lê Lợi',
        fullAddress: '456 Lê Lợi, Quận 1, TP.HCM',
        phone: '028 3822 5678',
        hours: '8:30 - 21:30',
        coord: { lat: 10.7758, lng: 106.7001 },
        services: ['Bán hàng', 'Bảo hành', 'Sửa chữa', 'Tư vấn kỹ thuật'],
        rating: 4.9
    },
    {
        id: 3,
        name: 'SCS Headphones Đà Nẵng',
        province: 'Đà Nẵng',
        district: 'Hải Châu',
        street: 'Nguyễn Văn Linh',
        fullAddress: '789 Nguyễn Văn Linh, Hải Châu, Đà Nẵng',
        phone: '0236 3567 890',
        hours: '8:00 - 21:00',
        coord: { lat: 16.0544, lng: 108.2022 },
        services: ['Bán hàng', 'Bảo hành', 'Tư vấn kỹ thuật'],
        rating: 4.7
    },
    {
        id: 4,
        name: 'SCS Headphones Cần Thơ',
        province: 'Cần Thơ',
        district: 'Ninh Kiều',
        street: 'Hai Bà Trưng',
        fullAddress: '321 Hai Bà Trưng, Ninh Kiều, Cần Thơ',
        phone: '0292 3876 543',
        hours: '8:00 - 21:00',
        coord: { lat: 10.0452, lng: 105.7469 },
        services: ['Bán hàng', 'Bảo hành'],
        rating: 4.6
    }
];

const provinces = ['Tất cả', ...Array.from(new Set(dealers.map((d) => d.province)))];

const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { 
        opacity: 1, 
        y: 0,
        transition: { duration: 0.6 }
    }
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

const DealerSystemPage: FC = () => {
    const [selectedProvince, setSelectedProvince] = useState<string>('Tất cả');
    const [selectedDistrict, setSelectedDistrict] = useState<string>('Tất cả');
    const [searchAddress, setSearchAddress] = useState<string>('');
    const [selectedDealer, setSelectedDealer] = useState<Dealer>(dealers[0]);

    // Lọc theo tỉnh
    const filteredByProvince = useMemo(
        () =>
            selectedProvince === 'Tất cả'
                ? dealers
                : dealers.filter((d) => d.province === selectedProvince),
        [selectedProvince]
    );
    
    // Lấy danh sách quận huyện từ kết quả lọc tỉnh
    const districts = useMemo(
        () => ['Tất cả', ...Array.from(new Set(filteredByProvince.map((d) => d.district)))],
        [filteredByProvince]
    );
    
    // Lọc theo quận huyện
    const filteredByDistrict = useMemo(
        () =>
            selectedDistrict === 'Tất cả'
                ? filteredByProvince
                : filteredByProvince.filter((d) => d.district === selectedDistrict),
        [filteredByProvince, selectedDistrict]
    );
    
    // Lọc theo ô tìm kiếm
    const filteredDealers = useMemo(() => {
        if (!searchAddress.trim()) return filteredByDistrict;
        const q = searchAddress.toLowerCase();
        return filteredByDistrict.filter((d) =>
            `${d.name} ${d.province} ${d.district} ${d.street}`.toLowerCase().includes(q)
        );
    }, [filteredByDistrict, searchAddress]);

    // Link nhúng bản đồ
    const mapLink = `https://www.google.com/maps?q=${selectedDealer.coord.lat},${selectedDealer.coord.lng}&z=15&output=embed`;

    // Chuẩn bị options cho react-select với style phù hợp
    const selectStyles = {
        control: (provided: Record<string, unknown>) => ({
            ...provided,
            backgroundColor: '#374151',
            borderColor: '#06b6d4',
            borderRadius: '0.75rem',
            padding: '4px 8px',
            minHeight: '48px',
            boxShadow: 'none',
            '&:hover': {
                borderColor: '#67e8f9'
            }
        }),
        singleValue: (provided: Record<string, unknown>) => ({ 
            ...provided, 
            color: '#f3f4f6',
            fontSize: '14px',
            fontWeight: '500'
        }),
        menu: (provided: Record<string, unknown>) => ({ 
            ...provided, 
            backgroundColor: '#374151',
            border: '1px solid #06b6d4',
            borderRadius: '0.75rem',
            overflow: 'hidden'
        }),
        option: (provided: Record<string, unknown>, state: { isFocused: boolean }) => ({
            ...provided,
            backgroundColor: state.isFocused ? '#06b6d4' : 'transparent',
            color: state.isFocused ? '#111827' : '#f3f4f6',
            padding: '12px 16px',
            cursor: 'pointer',
            '&:hover': {
                backgroundColor: '#06b6d4',
                color: '#111827'
            }
        }),
        placeholder: (provided: Record<string, unknown>) => ({
            ...provided,
            color: '#9ca3af'
        }),
        input: (provided: Record<string, unknown>) => ({
            ...provided,
            color: '#f3f4f6'
        })
    };

    const provinceOptions = provinces.map((p) => ({ value: p, label: p }));
    const districtOptions = districts.map((d) => ({ value: d, label: d }));

    return (
        <div className="min-h-screen bg-gray-900 text-white">
            {/* Hero Section */}
            <motion.section 
                initial="hidden"
                animate="visible"
                variants={fadeInUp}
                className="bg-gradient-to-r from-gray-800 to-gray-900 py-16"
            >
                <div className="w-full max-w-[1280px] mx-auto px-4 text-center">
                    <motion.h1 
                        variants={fadeInUp}
                        className="text-4xl md:text-5xl font-bold mb-4 text-cyan-400"
                    >
                        Hệ Thống Đại Lý SCS
                    </motion.h1>
                    <motion.p 
                        variants={fadeInUp}
                        className="text-xl text-gray-300 mb-8"
                    >
                        Tìm đại lý SCS Headphones gần bạn nhất
                    </motion.p>
                    <motion.div 
                        variants={fadeInUp}
                        className="flex justify-center space-x-8 text-sm text-gray-400"
                    >
                        <span>🏪 {dealers.length} Đại lý</span>
                        <span>📍 {provinces.length - 1} Tỉnh thành</span>
                        <span>⭐ Đánh giá cao</span>
                    </motion.div>
                </div>
            </motion.section>

            {/* Bộ lọc tìm kiếm */}
            <motion.section 
                initial="hidden"
                animate="visible"
                variants={staggerContainer}
                className="bg-gray-800 border-b border-gray-700 py-8"
            >
                <div className="w-full max-w-[1280px] mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Chọn tỉnh */}
                        <motion.div variants={fadeInUp}>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Tỉnh/Thành phố
                            </label>
                            <Select
                                instanceId="province-select"
                                options={provinceOptions}
                                defaultValue={provinceOptions[0]}
                                onChange={(opt) => {
                                    const val = (opt as { value: string }).value;
                                    setSelectedProvince(val);
                                    setSelectedDistrict('Tất cả');
                                }}
                                styles={selectStyles}
                                placeholder="Chọn tỉnh/thành phố"
                            />
                        </motion.div>

                        {/* Chọn quận/huyện */}
                        <motion.div variants={fadeInUp}>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Quận/Huyện
                            </label>
                            <Select
                                instanceId="district-select"
                                options={districtOptions}
                                value={districtOptions.find(opt => opt.value === selectedDistrict)}
                                isDisabled={districtOptions.length === 1}
                                onChange={(opt) =>
                                    setSelectedDistrict((opt as { value: string }).value)
                                }
                                styles={selectStyles}
                                placeholder="Chọn quận/huyện"
                            />
                        </motion.div>

                        {/* Tìm kiếm địa chỉ */}
                        <motion.div variants={fadeInUp}>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Tìm kiếm
                            </label>
                            <div className="relative">
                                <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-cyan-400" />
                                <input
                                    type="text"
                                    value={searchAddress}
                                    onChange={(e) => setSearchAddress(e.target.value)}
                                    placeholder="Tìm kiếm theo tên hoặc địa chỉ..."
                                    className="w-full pl-12 pr-4 py-3 bg-gray-700 border border-cyan-500 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-300"
                                />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </motion.section>

            {/* Danh sách + Bản đồ */}
            <main className="w-full max-w-[1280px] mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Danh sách đại lý */}
                    <motion.aside 
                        initial="hidden"
                        animate="visible"
                        variants={staggerContainer}
                        className="lg:col-span-1"
                    >
                        <h2 className="text-2xl font-bold text-cyan-400 mb-6">
                            Danh sách đại lý ({filteredDealers.length})
                        </h2>
                        <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
                            {filteredDealers.length > 0 ? (
                                filteredDealers.map((dealer) => (
                                    <motion.div
                                        key={dealer.id}
                                        variants={fadeInUp}
                                        onClick={() => setSelectedDealer(dealer)}
                                        className={`cursor-pointer p-6 rounded-xl transition-all duration-300 border-2 ${
                                            dealer.id === selectedDealer.id
                                                ? 'bg-cyan-500 text-gray-900 border-cyan-400 shadow-lg transform scale-105'
                                                : 'bg-gray-800 hover:bg-gray-700 border-gray-600 hover:border-cyan-500 text-white'
                                        }`}
                                    >
                                        <div className="flex justify-between items-start mb-3">
                                            <h3 className="font-bold text-lg">{dealer.name}</h3>
                                            <div className="flex items-center">
                                                <span className="text-yellow-400 mr-1">⭐</span>
                                                <span className="text-sm font-medium">{dealer.rating}</span>
                                            </div>
                                        </div>
                                        
                                        <div className="space-y-2 text-sm">
                                            <div className="flex items-center">
                                                <FaMapMarkerAlt className="mr-2 text-red-400" />
                                                <span>{dealer.fullAddress}</span>
                                            </div>
                                            <div className="flex items-center">
                                                <FaPhone className="mr-2 text-green-400" />
                                                <span>{dealer.phone}</span>
                                            </div>
                                            <div className="flex items-center">
                                                <FaClock className="mr-2 text-blue-400" />
                                                <span>{dealer.hours}</span>
                                            </div>
                                        </div>

                                        <div className="mt-4">
                                            <div className="flex flex-wrap gap-2">
                                                {dealer.services.map((service, idx) => (
                                                    <span 
                                                        key={idx}
                                                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                                                            dealer.id === selectedDealer.id
                                                                ? 'bg-gray-900 text-cyan-400'
                                                                : 'bg-cyan-500/20 text-cyan-400'
                                                        }`}
                                                    >
                                                        {service}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </motion.div>
                                ))
                            ) : (
                                <motion.div 
                                    variants={fadeInUp}
                                    className="text-center py-12 text-gray-400"
                                >
                                    <FaMapMarkerAlt className="mx-auto text-4xl mb-4" />
                                    <p className="text-lg">Không tìm thấy đại lý nào</p>
                                    <p className="text-sm">Vui lòng thử lại với từ khóa khác</p>
                                </motion.div>
                            )}
                        </div>
                    </motion.aside>

                    {/* Bản đồ */}
                    <motion.section 
                        initial="hidden"
                        animate="visible"
                        variants={fadeInUp}
                        className="lg:col-span-2"
                    >
                        <div className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700 shadow-xl">
                            <div className="p-4 bg-gray-700 border-b border-gray-600">
                                <h3 className="text-lg font-semibold text-cyan-400">
                                    📍 {selectedDealer.name}
                                </h3>
                                <p className="text-gray-300 text-sm">{selectedDealer.fullAddress}</p>
                            </div>
                            <div className="relative">
                                <iframe
                                    src={mapLink}
                                    className="w-full h-[500px]"
                                    frameBorder="0"
                                    loading="lazy"
                                    allowFullScreen
                                />
                                <div className="absolute top-4 right-4 bg-gray-900/90 backdrop-blur-sm rounded-lg p-3 text-white">
                                    <div className="text-xs space-y-1">
                                        <div>📞 {selectedDealer.phone}</div>
                                        <div>🕒 {selectedDealer.hours}</div>
                                        <div>⭐ {selectedDealer.rating}/5</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.section>
                </div>
            </main>

            {/* Call to Action */}
            <motion.section 
                initial="hidden"
                animate="visible"
                variants={fadeInUp}
                className="bg-gradient-to-r from-cyan-500 to-blue-600 py-16 mt-16"
            >
                <div className="w-full max-w-[1280px] mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold text-white mb-4">
                        Muốn trở thành đại lý SCS?
                    </h2>
                    <p className="text-xl text-blue-100 mb-8">
                        Tham gia mạng lưới đại lý SCS Headphones trên toàn quốc
                    </p>
                    <motion.a
                        href="/dealerRegistration"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-flex items-center gap-3 bg-white text-cyan-600 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:shadow-xl"
                    >
                        Đăng ký ngay
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </motion.a>
                </div>
            </motion.section>
        </div>
    );
};

export default DealerSystemPage;
