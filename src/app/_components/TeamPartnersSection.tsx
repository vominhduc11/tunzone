import Image from 'next/image';

import { getMostTrustedPartners } from '@/services/parnerService';

export default async function TeamPartnersSection() {
    const partners = await getMostTrustedPartners();

    return (
        <section className="bg-gray-900 text-white py-16">
            <div className="container mx-auto px-4">
                {/* Partners */}
                <h2 className="text-3xl font-bold text-center mb-8">Đối Tác & Nhà Phân Phối</h2>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 items-center mb-16">
                    {partners.map(({ id, name, logo }) => (
                        <div
                            key={id}
                            className="flex justify-center items-center p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition"
                        >
                            <Image
                                src={logo}
                                alt={name}
                                width={120}
                                height={60}
                                objectFit="contain"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
