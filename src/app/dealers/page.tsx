'use client';

import { FC, useState, useMemo } from 'react';
import { FiSearch, FiMapPin, FiPhone, FiClock, FiStar, FiUsers, FiTool, FiShield } from 'react-icons/fi';
import { motion, Variants } from 'framer-motion';
import Select from 'react-select';
import Link from 'next/link';

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
    image?: string;
}

const dealers: Dealer[] = [
    {
        id: 1,
        name: 'TuneZone Hà Nội',
        province: 'Hà Nội',
        district: 'Hoàn Kiếm',
        street: 'Phố Huế',
        fullAddress: '123 Phố Huế, Hoàn Kiếm, Hà Nội',
        phone: '024 3825 1234',
        hours: '8:00 - 22:00',
        coord: { lat: 21.0285, lng: 105.8542 },
        services: ['Bán hàng', 'Bảo hành', 'Tư vấn kỹ thuật', 'Trải nghiệm sản phẩm'],
        rating: 4.8,
        image: '/images/store-hanoi.jpg'
    },
    {
        id: 2,
        name: 'TuneZone TP.HCM',
        province: 'TP.HCM',
        district: 'Quận 1',
        street: 'Lê Lợi',
        fullAddress: '456 Lê Lợi, Quận 1, TP.HCM',
        phone: '028 3822 5678',
        hours: '8:30 - 21:30',
        coord: { lat: 10.7758, lng: 106.7001 },
        services: ['Bán hàng', 'Bảo hành', 'Sửa chữa', 'Tư vấn kỹ thuật', 'Trải nghiệm sản phẩm'],
        rating: 4.9,
        image: '/images/store-hcm.jpg'
    },
    {
        id: 3,
        name: 'TuneZone Đà Nẵng',
        province: 'Đà Nẵng',
        district: 'Hải Châu',
        street: 'Nguyễn Văn Linh',
        fullAddress: '789 Nguyễn Văn Linh, Hải Châu, Đà Nẵng',
        phone: '0236 3567 890',
        hours: '8:00 - 21:00',
        coord: { lat: 16.0544, lng: 108.2022 },
        services: ['Bán hàng', 'Bảo hành', 'Tư vấn kỹ thuật', 'Trải nghiệm sản phẩm'],
        rating: 4.7,
        image: '/images/store-danang.jpg'
    },
    {
        id: 4,
        name: 'TuneZone Cần Thơ',
        province: 'Cần Thơ',
        district: 'Ninh Kiều',
        street: 'Hai Bà Trưng',
        fullAddress: '321 Hai Bà Trưng, Ninh Kiều, Cần Thơ',
        phone: '0292 3876 543',
        hours: '8:00 - 21:00',
        coord: { lat: 10.0452, lng: 105.7469 },
        services: ['Bán hàng', 'Bảo hành', 'Tư vấn kỹ thuật'],
        rating: 4.6,
        image: '/images/store-cantho.jpg'
    },
    {
        id: 5,
        name: 'TuneZone Hải Phòng',
        province: 'Hải Phòng',
        district: 'Hồng Bàng',
        street: 'Điện Biên Phủ',
        fullAddress: '567 Điện Biên Phủ, Hồng Bàng, Hải Phòng',
        phone: '0225 3654 321',
        hours: '8:30 - 21:00',
        coord: { lat: 20.8449, lng: 106.6881 },
        services: ['Bán hàng', 'Bảo hành', 'Tư vấn kỹ thuật'],
        rating: 4.5,
        image: '/images/store-haiphong.jpg'
    }
];

const provinces = ['Tất cả', ...Array.from(new Set(dealers.map((d) => d.province)))];

const fadeInUp : Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
        opacity: 1, 
        y: 0,
        transition: { duration: 0.5, ease: "easeOut" }
    }
};

const staggerContainer : Variants = {
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

    // Custom styles cho react-select
    const selectStyles = {
        control: (provided: Record<string, unknown>) => ({
            ...provided,
            backgroundColor: '#1f2937',
            borderColor: '#3b82f6',
            borderRadius: '0.75rem',
            padding: '4px 8px',
            minHeight: '48px',
            boxShadow: 'none',
            '&:hover': {
                borderColor: '#60a5fa'
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
            backgroundColor: '#1f2937',
            border: '1px solid #3b82f6',
            borderRadius: '0.75rem',
            overflow: 'hidden'
        }),
        option: (provided: Record<string, unknown>, state: { isFocused: boolean }) => ({
            ...provided,
            backgroundColor: state.isFocused ? '#3b82f6' : 'transparent',
            color: state.isFocused ? '#ffffff' : '#f3f4f6',
            padding: '12px 16px',
            cursor: 'pointer',
            '&:hover': {
                backgroundColor: '#3b82f6',
                color: '#ffffff'
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
                className="relative bg-gradient-to-br from-blue-900 via-purple-900 to-gray-900 py-20"
            >
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="relative w-full max-w-[1280px] mx-auto px-4 text-center">
                    <motion.div variants={fadeInUp} className="mb-6">
                        <div className="inline-flex items-center gap-2 bg-blue-500/20 text-blue-400 px-4 py-2 rounded-full text-sm font-medium mb-4">
                            <FiMapPin className="w-4 h-4" />
                            Hệ thống cửa hàng
                        </div>
                    </motion.div>
                    
                    <motion.h1 
                        variants={fadeInUp}
                        className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
                    >
                        Hệ Thống Đại Lý TuneZone
                    </motion.h1>
                    
                    <motion.p 
                        variants={fadeInUp}
                        className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed"
                    >
                        Khám phá và trải nghiệm các sản phẩm âm thanh chất lượng cao tại các cửa hàng TuneZone trên toàn quốc
                    </motion.p>
                    
                    <motion.div 
                        variants={staggerContainer}
                        className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto"
                    >
                        <motion.div variants={fadeInUp} className="flex items-center justify-center gap-2 text-gray-300">
                            <FiUsers className="w-5 h-5 text-blue-400" />
                            <span>{dealers.length} Cửa hàng</span>
                        </motion.div>
                        <motion.div variants={fadeInUp} className="flex items-center justify-center gap-2 text-gray-300">
                            <FiMapPin className="w-5 h-5 text-blue-400" />
                            <span>{provinces.length - 1} Tỉnh thành</span>
                        </motion.div>
                        <motion.div variants={fadeInUp} className="flex items-center justify-center gap-2 text-gray-300">
                            <FiStar className="w-5 h-5 text-blue-400" />
                            <span>Đánh giá cao</span>
                        </motion.div>
                    </motion.div>
                </div>
            </motion.section>

            {/* Search & Filter Section */}
            <motion.section 
                initial="hidden"
                animate="visible"
                variants={staggerContainer}
                className="bg-gray-800/50 backdrop-blur-sm border-b border-gray-700 py-8 sticky top-16 z-30"
            >
                <div className="w-full max-w-[1280px] mx-auto px-4">
                    <motion.h2 variants={fadeInUp} className="text-2xl font-bold mb-6 text-center">
                        Tìm kiếm cửa hàng gần bạn
                    </motion.h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Province Select */}
                        <motion.div variants={fadeInUp}>
                            <label className="block text-sm font-medium text-gray-300 mb-3">
                                <FiMapPin className="inline w-4 h-4 mr-2" />
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

                        {/* District Select */}
                        <motion.div variants={fadeInUp}>
                            <label className="block text-sm font-medium text-gray-300 mb-3">
                                <FiMapPin className="inline w-4 h-4 mr-2" />
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

                        {/* Search Input */}
                        <motion.div variants={fadeInUp}>
                            <label className="block text-sm font-medium text-gray-300 mb-3">
                                <FiSearch className="inline w-4 h-4 mr-2" />
                                Tìm kiếm
                            </label>
                            <div className="relative">
                                <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-400 w-5 h-5" />
                                <input
                                    type="text"
                                    value={searchAddress}
                                    onChange={(e) => setSearchAddress(e.target.value)}
                                    placeholder="Tìm kiếm theo tên hoặc địa chỉ..."
                                    className="w-full pl-12 pr-4 py-3 bg-gray-700 border border-blue-500 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300"
                                />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </motion.section>

            {/* Main Content - Store List & Map */}
            <main className="w-full max-w-[1280px] mx-auto px-4 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                    {/* Store List */}
                    <motion.aside 
                        initial="hidden"
                        animate="visible"
                        variants={staggerContainer}
                        className="lg:col-span-2"
                    >
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold">
                                Danh sách cửa hàng
                            </h2>
                            <span className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-sm font-medium">
                                {filteredDealers.length} kết quả
                            </span>
                        </div>
                        
                        <div className="space-y-4 max-h-[700px] overflow-y-auto pr-2 custom-scrollbar relative z-10">
                            {filteredDealers.length > 0 ? (
                                filteredDealers.map((dealer) => (
                                    <motion.div
                                        key={dealer.id}
                                        variants={fadeInUp}
                                        onClick={() => setSelectedDealer(dealer)}
                                        className={`group cursor-pointer p-6 rounded-2xl transition-all duration-300 border-2 relative z-10 ${
                                            dealer.id === selectedDealer.id
                                                ? 'bg-blue-500/10 border-blue-500 shadow-lg shadow-blue-500/20'
                                                : 'bg-gray-800/50 backdrop-blur-sm border-gray-700 hover:border-blue-500/50 hover:bg-gray-800/80'
                                        }`}
                                    >
                                        <div className="flex justify-between items-start mb-4">
                                            <h3 className={`font-bold text-lg ${
                                                dealer.id === selectedDealer.id ? 'text-blue-400' : 'text-white'
                                            }`}>
                                                {dealer.name}
                                            </h3>
                                            <div className="flex items-center gap-1">
                                                <FiStar className="w-4 h-4 text-yellow-400 fill-current" />
                                                <span className="text-sm font-medium text-yellow-400">{dealer.rating}</span>
                                            </div>
                                        </div>
                                        
                                        <div className="space-y-3 text-sm">
                                            <div className="flex items-start gap-3">
                                                <FiMapPin className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                                                <span className="text-gray-300">{dealer.fullAddress}</span>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <FiPhone className="w-4 h-4 text-green-400 flex-shrink-0" />
                                                <span className="text-gray-300">{dealer.phone}</span>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <FiClock className="w-4 h-4 text-purple-400 flex-shrink-0" />
                                                <span className="text-gray-300">{dealer.hours}</span>
                                            </div>
                                        </div>

                                        {/* Services */}
                                        <div className="mt-4">
                                            <div className="flex flex-wrap gap-2">
                                                {dealer.services.map((service, idx) => (
                                                    <span 
                                                        key={idx}
                                                        className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                                                            dealer.id === selectedDealer.id
                                                                ? 'bg-blue-500/20 text-blue-300'
                                                                : 'bg-gray-700/50 text-gray-400 group-hover:bg-blue-500/10 group-hover:text-blue-400'
                                                        }`}
                                                    >
                                                        {service}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Quick Actions */}
                                        <div className="flex gap-2 mt-4 pt-4 border-t border-gray-700">
                                            <a
                                                href={`tel:${dealer.phone}`}
                                                className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-3 rounded-lg text-xs font-medium transition-colors flex items-center justify-center gap-1"
                                                onClick={(e) => e.stopPropagation()}
                                            >
                                                <FiPhone className="w-3 h-3" />
                                                Gọi ngay
                                            </a>
                                            <a
                                                href={`https://maps.google.com/?q=${dealer.coord.lat},${dealer.coord.lng}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-3 rounded-lg text-xs font-medium transition-colors flex items-center justify-center gap-1"
                                                onClick={(e) => e.stopPropagation()}
                                            >
                                                <FiMapPin className="w-3 h-3" />
                                                Chỉ đường
                                            </a>
                                        </div>
                                    </motion.div>
                                ))
                            ) : (
                                <motion.div 
                                    variants={fadeInUp}
                                    className="text-center py-12 text-gray-400"
                                >
                                    <FiMapPin className="mx-auto text-4xl mb-4 opacity-50" />
                                    <p className="text-lg font-medium mb-2">Không tìm thấy cửa hàng nào</p>
                                    <p className="text-sm">Vui lòng thử lại với từ khóa khác hoặc mở rộng khu vực tìm kiếm</p>
                                </motion.div>
                            )}
                        </div>
                    </motion.aside>

                    {/* Map Section */}
                    <motion.section 
                        initial="hidden"
                        animate="visible"
                        variants={fadeInUp}
                        className="lg:col-span-3"
                    >
                        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-700 shadow-2xl relative z-10">
                            {/* Map Header */}
                            <div className="p-6 bg-gray-800/80 border-b border-gray-700 relative z-20">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <h3 className="text-xl font-bold text-blue-400 mb-2">
                                            {selectedDealer.name}
                                        </h3>
                                        <p className="text-gray-300 text-sm mb-3">{selectedDealer.fullAddress}</p>
                                        <div className="flex items-center gap-4 text-sm">
                                            <div className="flex items-center gap-1">
                                                <FiStar className="w-4 h-4 text-yellow-400 fill-current" />
                                                <span className="text-yellow-400 font-medium">{selectedDealer.rating}/5</span>
                                            </div>
                                            <div className="flex items-center gap-1 text-gray-400">
                                                <FiClock className="w-4 h-4" />
                                                <span>{selectedDealer.hours}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <a
                                            href={`tel:${selectedDealer.phone}`}
                                            className="bg-green-600 hover:bg-green-700 text-white p-2 rounded-lg transition-colors"
                                            title="Gọi điện"
                                        >
                                            <FiPhone className="w-4 h-4" />
                                        </a>
                                        <a
                                            href={`https://maps.google.com/?q=${selectedDealer.coord.lat},${selectedDealer.coord.lng}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg transition-colors"
                                            title="Mở trong Google Maps"
                                        >
                                            <FiMapPin className="w-4 h-4" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Map Embed */}
                            <div className="relative">
                                <iframe
                                    src={mapLink}
                                    className="w-full h-[500px]"
                                    frameBorder="0"
                                    loading="lazy"
                                    allowFullScreen
                                    referrerPolicy="no-referrer-when-downgrade"
                                />
                                
                                {/* Map Overlay Info */}
                                <div className="absolute bottom-4 left-4 bg-gray-900/90 backdrop-blur-sm rounded-xl p-4 text-white max-w-xs z-20">
                                    <div className="text-sm space-y-2">
                                        <div className="flex items-center gap-2">
                                            <FiPhone className="w-4 h-4 text-green-400" />
                                            <span>{selectedDealer.phone}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <FiClock className="w-4 h-4 text-purple-400" />
                                            <span>{selectedDealer.hours}</span>
                                        </div>
                                        <div className="flex flex-wrap gap-1 mt-2">
                                            {selectedDealer.services.slice(0, 2).map((service, idx) => (
                                                <span key={idx} className="bg-blue-500/20 text-blue-300 px-2 py-1 rounded text-xs">
                                                    {service}
                                                </span>
                                            ))}
                                            {selectedDealer.services.length > 2 && (
                                                <span className="text-gray-400 text-xs">+{selectedDealer.services.length - 2}</span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.section>
                </div>
            </main>

            {/* Services Section */}
            <section className="w-full max-w-[1280px] mx-auto px-4 py-12">
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={staggerContainer}
                    className="text-center mb-12"
                >
                    <motion.h2 variants={fadeInUp} className="text-3xl font-bold mb-4">
                        Dịch vụ tại cửa hàng TuneZone
                    </motion.h2>
                    <motion.p variants={fadeInUp} className="text-gray-300 max-w-2xl mx-auto">
                        Trải nghiệm dịch vụ chuyên nghiệp và tận tâm tại tất cả các cửa hàng TuneZone
                    </motion.p>
                </motion.div>

                <motion.div
                    variants={staggerContainer}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                >
                    <motion.div variants={fadeInUp} className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-2xl border border-gray-700 text-center">
                        <div className="bg-blue-500/20 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                            <FiUsers className="w-6 h-6 text-blue-400" />
                        </div>
                        <h3 className="font-semibold mb-2">Tư vấn chuyên nghiệp</h3>
                        <p className="text-sm text-gray-400">Đội ngũ chuyên gia âm thanh tư vấn sản phẩm phù hợp</p>
                    </motion.div>

                    <motion.div variants={fadeInUp} className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-2xl border border-gray-700 text-center">
                        <div className="bg-green-500/20 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                            <FiShield className="w-6 h-6 text-green-400" />
                        </div>
                        <h3 className="font-semibold mb-2">Bảo hành chính hãng</h3>
                        <p className="text-sm text-gray-400">Dịch vụ bảo hành và hỗ trợ kỹ thuật toàn diện</p>
                    </motion.div>

                    <motion.div variants={fadeInUp} className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-2xl border border-gray-700 text-center">
                        <div className="bg-purple-500/20 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                            <FiTool className="w-6 h-6 text-purple-400" />
                        </div>
                        <h3 className="font-semibold mb-2">Sửa chữa chuyên nghiệp</h3>
                        <p className="text-sm text-gray-400">Dịch vụ sửa chữa và bảo trì thiết bị âm thanh</p>
                    </motion.div>

                    <motion.div variants={fadeInUp} className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-2xl border border-gray-700 text-center">
                        <div className="bg-yellow-500/20 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                            <FiStar className="w-6 h-6 text-yellow-400" />
                        </div>
                        <h3 className="font-semibold mb-2">Trải nghiệm sản phẩm</h3>
                        <p className="text-sm text-gray-400">Thử nghiệm và so sánh sản phẩm trước khi mua</p>
                    </motion.div>
                </motion.div>
            </section>

            {/* Call to Action */}
            <motion.section 
                initial="hidden"
                animate="visible"
                variants={fadeInUp}
                className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 py-16 mt-16"
            >
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="relative w-full max-w-[1280px] mx-auto px-4 text-center">
                    <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold text-white mb-4">
                        Muốn trở thành đại lý TuneZone?
                    </motion.h2>
                    <motion.p variants={fadeInUp} className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                        Tham gia mạng lưới đại lý TuneZone và mang âm thanh chất lượng cao đến khách hàng trên toàn quốc
                    </motion.p>
                    
                    <motion.div variants={staggerContainer} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <motion.div variants={fadeInUp}>
                            <Link
                                href="/dealerRegistration"
                                className="inline-flex items-center gap-3 bg-white text-blue-600 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:shadow-xl hover:scale-105"
                            >
                                Đăng ký đại lý
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </Link>
                        </motion.div>
                        
                        <motion.div variants={fadeInUp}>
                            <Link
                                href="/contact"
                                className="inline-flex items-center gap-3 bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:bg-white hover:text-blue-600"
                            >
                                Liên hệ tư vấn
                                <FiPhone className="w-5 h-5" />
                            </Link>
                        </motion.div>
                    </motion.div>

                    {/* Benefits */}
                    <motion.div variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 max-w-4xl mx-auto">
                        <motion.div variants={fadeInUp} className="text-center">
                            <div className="bg-white/20 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                                <FiUsers className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="font-semibold text-white mb-2">Hỗ trợ toàn diện</h3>
                            <p className="text-blue-100 text-sm">Đào tạo, marketing và hỗ trợ kỹ thuật</p>
                        </motion.div>

                        <motion.div variants={fadeInUp} className="text-center">
                            <div className="bg-white/20 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                                <FiStar className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="font-semibold text-white mb-2">Sản phẩm chất lượng</h3>
                            <p className="text-blue-100 text-sm">Độc quyền phân phối sản phẩm cao cấp</p>
                        </motion.div>

                        <motion.div variants={fadeInUp} className="text-center">
                            <div className="bg-white/20 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                                <FiTool className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="font-semibold text-white mb-2">Lợi nhuận hấp dẫn</h3>
                            <p className="text-blue-100 text-sm">Chính sách giá và chiết khấu cạnh tranh</p>
                        </motion.div>
                    </motion.div>
                </div>
            </motion.section>

            {/* Custom Scrollbar Styles */}
            <style jsx global>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: #374151;
                    border-radius: 3px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #3b82f6;
                    border-radius: 3px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: #60a5fa;
                }
            `}</style>
        </div>
    );
};

export default DealerSystemPage;
