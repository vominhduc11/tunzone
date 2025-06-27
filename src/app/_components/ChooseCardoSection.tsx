import { features } from '@/data/features';

export default function ChooseCardoSection() {
    return (
        <section className="bg-gray-900 text-white py-16">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold">Tại Sao Chọn Cardo?</h2>
                    <p className="mt-4 text-gray-300">
                        Chúng tôi không chỉ là về giao tiếp - chúng tôi tạo ra những kết nối làm cho
                        mỗi chuyến đi trở nên tốt đẹp hơn.
                    </p>
                </div>

                {/* Feature grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map(({ icon: Icon, title, description }) => (
                        <div
                            key={title}
                            className="group flex flex-col items-center text-center p-6 bg-gray-800 rounded-2xl transform transition-shadow transition-transform duration-300 hover:shadow-xl hover:bg-gray-700 hover:-translate-y-2"
                        >
                            <Icon className="w-12 h-12 text-blue-500 mb-4 group-hover:text-blue-400" />
                            <h3 className="text-xl font-semibold mb-2 text-white group-hover:text-white">
                                {title}
                            </h3>
                            <p className="text-gray-400 group-hover:text-gray-200">{description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
