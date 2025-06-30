'use client';

import { FC, useState, useMemo } from 'react';
import { FaSearch } from 'react-icons/fa';
import Select from 'react-select';

interface Dealer {
    id: number;
    name: string;
    province: string;
    district: string;
    street: string;
    coord: { lat: number; lng: number };
}

const dealers: Dealer[] = [
    {
        id: 1,
        name: 'Đại lý SCS Hà Nội',
        province: 'Hà Nội',
        district: 'Hoàn Kiếm',
        street: 'Phố Huế',
        coord: { lat: 21.0285, lng: 105.8542 }
    },
    {
        id: 2,
        name: 'Đại lý SCS TP.HCM',
        province: 'TP.HCM',
        district: 'Quận 1',
        street: 'Lê Lợi',
        coord: { lat: 10.7758, lng: 106.7001 }
    },
    {
        id: 3,
        name: 'Đại lý SCS Đà Nẵng',
        province: 'Đà Nẵng',
        district: 'Hải Châu',
        street: 'Nguyễn Văn Linh',
        coord: { lat: 16.0544, lng: 108.2022 }
    }
];

const provinces = ['Tất cả', ...Array.from(new Set(dealers.map((d) => d.province)))];

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
    const mapLink = `https://www.google.com/maps?q=${selectedDealer.coord.lat},${selectedDealer.coord.lng}&z=12&output=embed`;

    // Chuẩn bị options cho react-select
    const provinceOptions = provinces.map((p) => ({ value: p, label: p }));
    const districtOptions = districts.map((d) => ({ value: d, label: d }));

    return (
        <div className="min-h-screen bg-[#181f2a] text-[#b0d0f9] flex flex-col font-sans">
            {/* Bộ lọc tìm kiếm */}
            <section className="w-full px-4 pb-4 bg-[#232c3b]">
                <div className="mx-auto w-full max-w-[1280px] grid grid-cols-1 md:grid-cols-3 gap-4 p-6">
                    {/* Chọn tỉnh */}
                    <div>
                        <Select
                            instanceId="province-select"
                            options={provinceOptions}
                            defaultValue={provinceOptions[0]}
                            onChange={(opt) => {
                                const val = (opt as { value: string }).value;
                                setSelectedProvince(val);
                                setSelectedDistrict('Tất cả');
                            }}
                            styles={{
                                control: (provided) => ({
                                    ...provided,
                                    backgroundColor: '#232c3b',
                                    borderColor: '#1cb6ff',
                                    borderRadius: '1rem',
                                    padding: '4px'
                                }),
                                singleValue: (provided) => ({ ...provided, color: '#b0d0f9' }),
                                menu: (provided) => ({ ...provided, backgroundColor: '#232c3b' }),
                                option: (provided, state) => ({
                                    ...provided,
                                    backgroundColor: state.isFocused ? '#1cb6ff22' : 'transparent',
                                    color: '#b0d0f9'
                                })
                            }}
                        />
                    </div>

                    {/* Chọn quận/huyện */}
                    <div>
                        <Select
                            instanceId="district-select"
                            options={districtOptions}
                            defaultValue={districtOptions[0]}
                            isDisabled={districtOptions.length === 1}
                            onChange={(opt) =>
                                setSelectedDistrict((opt as { value: string }).value)
                            }
                            styles={{
                                control: (provided) => ({
                                    ...provided,
                                    backgroundColor: '#232c3b',
                                    borderColor: '#1cb6ff',
                                    borderRadius: '1rem',
                                    padding: '4px'
                                }),
                                singleValue: (provided) => ({ ...provided, color: '#b0d0f9' }),
                                menu: (provided) => ({ ...provided, backgroundColor: '#232c3b' }),
                                option: (provided, state) => ({
                                    ...provided,
                                    backgroundColor: state.isFocused ? '#1cb6ff22' : 'transparent',
                                    color: '#b0d0f9'
                                })
                            }}
                        />
                    </div>

                    {/* Tìm kiếm địa chỉ */}
                    <div className="flex items-center border border-[#1cb6ff] rounded-2xl px-4 bg-[#232c3b] shadow-[0_4px_18px_0_rgba(28,182,255,0.11)]">
                        <FaSearch className="text-cyan-400 mr-2" />
                        <input
                            type="text"
                            value={searchAddress}
                            onChange={(e) => setSearchAddress(e.target.value)}
                            placeholder="Tìm kiếm địa chỉ"
                            className="w-full py-2 bg-transparent text-[#b0d0f9] placeholder-[#86cfff] focus:outline-none"
                        />
                    </div>
                </div>
            </section>

            {/* Danh sách + Bản đồ */}
            <main className="w-full max-w-[1280px] mx-auto flex flex-col md:flex-row flex-1 overflow-hidden py-6 px-4 space-y-4 md:space-y-0 md:space-x-6">
                <aside className="w-full md:w-1/3 bg-[#232c3b] border border-[#1cb6ff44] rounded-2xl overflow-y-auto p-4 shadow-[0_8px_32px_0_rgba(28,182,255,0.18)]">
                    {filteredDealers.length > 0 ? (
                        filteredDealers.map((d) => (
                            <div
                                key={d.id}
                                onClick={() => setSelectedDealer(d)}
                                className={`cursor-pointer p-4 mb-3 rounded-xl transition-all duration-200 border-2 ${
                                    d.id === selectedDealer.id
                                        ? 'bg-cyan-400 text-[#181f2a] border-cyan-400 scale-105 shadow-lg'
                                        : 'bg-[#25344b] hover:bg-[#1cb6ff22] border-[#1cb6ff33] text-[#b0d0f9]'
                                }`}
                            >
                                <h3 className="font-semibold text-lg">{d.name}</h3>
                                <p className="text-sm opacity-80">{`${d.province} - ${d.district}, ${d.street}`}</p>
                            </div>
                        ))
                    ) : (
                        <p className="text-[#7cb4e6]">Không tìm thấy đại lý nào.</p>
                    )}
                </aside>
                <section className="flex-1 rounded-2xl overflow-hidden shadow-[0_8px_32px_0_rgba(28,182,255,0.11)] border border-[#1cb6ff22] bg-[#232c3b] min-h-[440px]">
                    <iframe
                        src={mapLink}
                        className="w-full h-full min-h-[440px] rounded-2xl"
                        frameBorder="0"
                        loading="lazy"
                    />
                </section>
            </main>
        </div>
    );
};

export default DealerSystemPage;
