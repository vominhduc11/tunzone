'use client';

import { Tabs, TabList, Tab, TabPanel } from 'react-tabs';
import { FiSettings, FiPlay, FiFileText, FiPackage, FiHelpCircle } from 'react-icons/fi';

import 'react-tabs/style/react-tabs.css';

interface ProductTabsProps {
    description: string;
    specs: Record<string, string>;
    boxItems: string[];
    faqs: { q: string; a: string }[];
    videoUrl?: string;
}

export default function ProductTabs({
    description,
    specs,
    boxItems,
    faqs,
    videoUrl
}: ProductTabsProps) {
    const tabData = [
        { label: 'Thông số kỹ thuật', icon: FiSettings },
        { label: 'Video', icon: FiPlay },
        { label: 'Mô tả', icon: FiFileText },
        { label: 'Trong hộp', icon: FiPackage },
        { label: 'FAQ', icon: FiHelpCircle }
    ];

    return (
        <div className="bg-gray-800 rounded-2xl shadow-2xl overflow-hidden border border-gray-700">
            <Tabs>
                <TabList className="flex bg-gray-900 border-b border-gray-700 overflow-x-auto">
                    {tabData.map(({ label, icon: Icon }) => (
                        <Tab
                            key={label}
                            className="flex-1 min-w-max py-4 px-6 text-center text-sm font-medium text-gray-400 cursor-pointer hover:text-white hover:bg-gray-800 transition-all duration-200 flex items-center justify-center gap-2 border-b-2 border-transparent"
                            selectedClassName="text-white bg-gray-800 border-blue-500"
                        >
                            <Icon className="w-4 h-4" />
                            <span className="hidden sm:inline">{label}</span>
                        </Tab>
                    ))}
                </TabList>

                {/* Specs Tab */}
                <TabPanel className="p-0">
                    <div className="p-8">
                        <h3 className="text-2xl font-bold mb-6 text-white">Thông số kỹ thuật</h3>
                        <div className="bg-gray-900 rounded-xl overflow-hidden">
                            <table className="w-full">
                                <tbody>
                                    {Object.entries(specs).map(([key, val], idx) => (
                                        <tr
                                            key={key}
                                            className={`${
                                                idx % 2 === 0 ? 'bg-gray-900' : 'bg-gray-800'
                                            } hover:bg-gray-700 transition-colors duration-200`}
                                        >
                                            <td className="px-6 py-4 font-semibold text-gray-300 w-1/3">
                                                {key}
                                            </td>
                                            <td className="px-6 py-4 text-white">{val}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </TabPanel>

                {/* Video Tab */}
                <TabPanel className="p-0">
                    <div className="p-8">
                        <h3 className="text-2xl font-bold mb-6 text-white">Video sản phẩm</h3>
                        {videoUrl ? (
                            <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-2xl bg-gray-900">
                                <video
                                    src={videoUrl}
                                    title="Product video"
                                    className="w-full h-full object-cover"
                                    controls
                                    poster="/video-placeholder.jpg"
                                />
                            </div>
                        ) : (
                            <div className="flex items-center justify-center h-64 bg-gray-900 rounded-xl">
                                <div className="text-center text-gray-400">
                                    <FiPlay className="w-12 h-12 mx-auto mb-4 opacity-50" />
                                    <p>Video sản phẩm đang được cập nhật</p>
                                </div>
                            </div>
                        )}
                    </div>
                </TabPanel>

                {/* Description Tab */}
                <TabPanel className="p-0">
                    <div className="p-8">
                        <h3 className="text-2xl font-bold mb-6 text-white">Mô tả sản phẩm</h3>
                        <div className="prose prose-invert max-w-none">
                            <div className="text-gray-300 leading-relaxed whitespace-pre-line text-lg">
                                {description}
                            </div>
                        </div>
                    </div>
                </TabPanel>

                {/* Box Items Tab */}
                <TabPanel className="p-0">
                    <div className="p-8">
                        <h3 className="text-2xl font-bold mb-6 text-white">Trong hộp sản phẩm</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {boxItems.map((item, i) => (
                                <div
                                    key={i}
                                    className="bg-gray-900 p-6 rounded-xl hover:bg-gray-700 transition-all duration-300 border border-gray-700 hover:border-gray-600 group"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="bg-blue-500/20 p-2 rounded-lg group-hover:bg-blue-500/30 transition">
                                            <FiPackage className="w-5 h-5 text-blue-400" />
                                        </div>
                                        <span className="text-white font-medium">{item}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </TabPanel>

                {/* FAQ Tab */}
                <TabPanel className="p-0">
                    <div className="p-8">
                        <h3 className="text-2xl font-bold mb-6 text-white">Câu hỏi thường gặp</h3>
                        <div className="space-y-6">
                            {faqs.map(({ q, a }, i) => (
                                <div
                                    key={i}
                                    className="bg-gray-900 p-6 rounded-xl hover:bg-gray-700 transition-all duration-300 border border-gray-700 hover:border-gray-600"
                                >
                                    <div className="flex items-start gap-4">
                                        <div className="bg-blue-500/20 p-2 rounded-lg flex-shrink-0">
                                            <FiHelpCircle className="w-5 h-5 text-blue-400" />
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="font-semibold text-white mb-3 text-lg">
                                                {q}
                                            </h4>
                                            <p className="text-gray-300 leading-relaxed">{a}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </TabPanel>
            </Tabs>
        </div>
    );
}
