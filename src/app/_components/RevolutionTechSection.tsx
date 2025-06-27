import Image from 'next/image';
import { FiCheckCircle } from 'react-icons/fi';

import image1 from '@/assets/images/ChatGPT Image 08_34_15 26 thg 6, 2025.png';
import image2 from '@/assets/images/ChatGPT Image 08_55_01 26 thg 6, 2025.png';

export default function RevolutionTechSection() {
    return (
        <section className="bg-gray-900 text-white py-16">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold">Công Nghệ Cách Mạng</h2>
                    <p className="mt-4 text-gray-300">
                        Những đổi mới tiên tiến giúp chúng tôi khác biệt so với đối thủ cạnh tranh.
                    </p>
                </div>

                {/* Feature blocks */}
                <div className="grid grid-cols-1 gap-16">
                    {/* First block */}
                    <div className="group flex flex-col lg:flex-row items-center lg:items-start gap-8 p-6 bg-gray-800 rounded-2xl shadow-lg transform transition duration-300 hover:shadow-2xl hover:bg-gray-700 hover:-translate-y-2">
                        {/* Text */}
                        <div className="lg:w-1/2">
                            <h3 className="text-2xl font-semibold mb-4 transition-colors duration-300 group-hover:text-blue-400">
                                Công Nghệ Mạng Lưới
                            </h3>
                            <p className="text-gray-300 mb-6">
                                Mạng lưới độc quyền của chúng tôi tạo ra một web kết nối các biker,
                                tự động quản lý kết nối và đảm bảo giao tiếp rõ ràng như pha lê ngay
                                cả khi các biker nằm ngoài phạm vi trực tiếp.
                            </p>
                            <ul className="space-y-3">
                                {[
                                    'Kết nối đồng thời lên đến 15 biker',
                                    'Quản lý kết nối tự động',
                                    'Mở rộng phạm vi thông qua relay mạng lưới',
                                    'Thêm và xóa biker một cách liền mạch'
                                ].map((text) => (
                                    <li
                                        key={text}
                                        className="flex items-start transition-colors duration-300 group-hover:text-gray-100"
                                    >
                                        <FiCheckCircle className="text-green-400 w-6 h-6 flex-shrink-0 mr-3 mt-1 transition-transform duration-300 group-hover:scale-110 group-hover:text-green-300" />
                                        <span>{text}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Image */}
                        <div className="lg:w-1/2">
                            <Image
                                src={image2}
                                alt="Công nghệ mạng lưới"
                                className="w-full h-64 lg:h-80 object-cover rounded-2xl shadow-lg transition-transform duration-300 group-hover:scale-105"
                            />
                        </div>
                    </div>

                    {/* Second block */}
                    <div className="group flex flex-col lg:flex-row-reverse items-center lg:items-start gap-8 p-6 bg-gray-800 rounded-2xl shadow-lg transform transition duration-300 hover:shadow-2xl hover:bg-gray-700 hover:-translate-y-2">
                        {/* Text */}
                        <div className="lg:w-1/2">
                            <h3 className="text-2xl font-semibold mb-4 transition-colors duration-300 group-hover:text-blue-400">
                                Trí Tuệ Âm Thanh Thích Ứng
                            </h3>
                            <p className="text-gray-300 mb-6">
                                Xử lý âm thanh thông minh tự động điều chỉnh âm lượng, giảm tiếng ồn
                                gió và tăng cường độ rõ của giọng nói dựa trên điều kiện lái xe và
                                môi trường của bạn.
                            </p>
                            <ul className="space-y-3">
                                {[
                                    'Khử tiếng ồn thời gian thực',
                                    'Điều chỉnh âm lượng tự động',
                                    'Giảm tiếng ồn gió',
                                    'Tăng cường độ rõ giọng nói'
                                ].map((text) => (
                                    <li
                                        key={text}
                                        className="flex items-start transition-colors duration-300 group-hover:text-gray-100"
                                    >
                                        <FiCheckCircle className="text-green-400 w-6 h-6 flex-shrink-0 mr-3 mt-1 transition-transform duration-300 group-hover:scale-110 group-hover:text-green-300" />
                                        <span>{text}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Image */}
                        <div className="lg:w-1/2">
                            <Image
                                src={image1}
                                alt="Trí tuệ âm thanh thích ứng"
                                className="w-full h-64 lg:h-80 object-cover rounded-2xl shadow-lg transition-transform duration-300 group-hover:scale-105"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
