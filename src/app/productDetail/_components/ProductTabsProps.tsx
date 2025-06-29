'use client';

import { Tabs, TabList, Tab, TabPanel } from 'react-tabs';

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
    const tabLabels = ['Thông số kỹ thuật', 'Video', 'Mô tả', 'Trong hộp', 'Câu hỏi thường gặp'];

    return (
        <div className="mt-12 bg-gray-800 rounded-lg shadow-lg overflow-hidden">
            <Tabs>
                <TabList className="flex border-b border-gray-700 bg-gray-900">
                    {tabLabels.map((label) => (
                        <Tab
                            key={label}
                            className="flex-1 py-4 text-center text-sm font-semibold text-gray-400 cursor-pointer hover:text-white transition-colors duration-200"
                            selectedClassName="text-white border-b-4 border-blue-500"
                        >
                            {label}
                        </Tab>
                    ))}
                </TabList>

                {/* TabPanel: Specs */}
                <TabPanel
                    className="opacity-0 transition-opacity duration-500 ease-in-out"
                    selectedClassName="opacity-100"
                >
                    <div className="p-6">
                        <table className="w-full divide-y divide-gray-700">
                            <tbody>
                                {Object.entries(specs).map(([key, val], idx) => (
                                    <tr
                                        key={key}
                                        className={`${idx % 2 === 0 ? 'bg-gray-800' : 'bg-gray-900'} hover:bg-gray-700 transition-colors duration-200`}
                                    >
                                        <td className="px-4 py-3 font-medium">{key}</td>
                                        <td className="px-4 py-3">{val}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </TabPanel>

                {/* TabPanel: Video */}
                <TabPanel
                    className="opacity-0 transition-opacity duration-500 ease-in-out"
                    selectedClassName="opacity-100"
                >
                    <div className="p-6">
                        {videoUrl && (
                            <div className="relative w-full aspect-video rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-200">
                                <video
                                    src={videoUrl}
                                    title="Product video"
                                    className="w-full h-full"
                                    controls
                                />
                            </div>
                        )}
                    </div>
                </TabPanel>

                {/* TabPanel: Description */}
                <TabPanel
                    className="opacity-0 transition-opacity duration-500 ease-in-out"
                    selectedClassName="opacity-100"
                >
                    <div className="p-6 text-gray-300 hover:text-gray-100 transition-colors duration-200">
                        {description}
                    </div>
                </TabPanel>

                {/* TabPanel: Box Items */}
                <TabPanel
                    className="opacity-0 transition-opacity duration-500 ease-in-out"
                    selectedClassName="opacity-100"
                >
                    <div className="p-6">
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {boxItems.map((item, i) => (
                                <li
                                    key={i}
                                    className="bg-gray-900 p-4 rounded-lg hover:bg-gray-800 transition-colors duration-200"
                                >
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                </TabPanel>

                {/* TabPanel: FAQs */}
                <TabPanel
                    className="opacity-0 transition-opacity duration-500 ease-in-out"
                    selectedClassName="opacity-100"
                >
                    <div className="p-6 space-y-6">
                        {faqs.map(({ q, a }, i) => (
                            <div
                                key={i}
                                className="p-4 rounded-lg hover:bg-gray-800 transition-colors duration-200"
                            >
                                <h4 className="font-semibold text-white mb-2 hover:text-blue-400 transition-colors duration-200">
                                    {q}
                                </h4>
                                <p className="text-gray-400">{a}</p>
                            </div>
                        ))}
                    </div>
                </TabPanel>
            </Tabs>
        </div>
    );
}
