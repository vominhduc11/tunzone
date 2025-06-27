import Image from 'next/image';
import { FiStar } from 'react-icons/fi';

import { stats } from '@/data/stats';
import { testimonials } from '@/data/testimonials';

export default function TestimonialsStatsSection() {
    return (
        <section className="bg-gray-900 py-16">
            <div className="container mx-auto px-4">
                {/* Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center mb-12">
                    {stats.map(({ icon: Icon, value, label }) => (
                        <div key={label} className="flex flex-col items-center">
                            <Icon className="w-12 h-12 text-blue-400 mb-2" />
                            <span className="text-3xl font-bold text-white">{value}</span>
                            <span className="text-gray-400">{label}</span>
                        </div>
                    ))}
                </div>

                {/* Testimonials */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map(({ name, role, avatar, feedback, rating }) => (
                        <div
                            key={name}
                            className="bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-2xl transform transition duration-300 hover:-translate-y-2"
                        >
                            <div className="flex items-center mb-4">
                                <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                                    <Image src={avatar} alt={name} width={48} height={48} />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-white">{name}</h4>
                                    <p className="text-sm text-gray-400">{role}</p>
                                </div>
                            </div>
                            <p className="text-gray-200 mb-4">“{feedback}”</p>
                            <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                    <FiStar
                                        key={i}
                                        className={`w-5 h-5 ${i < rating ? 'text-yellow-400' : 'text-gray-600'}`}
                                    />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
