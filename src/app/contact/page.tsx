// components/ContactUsPage.tsx
// Trang Contact Us - Tai nghe SCS với TypeScript, inline validation, interactive map, FAQ accordion, responsive, accessible, theme blue, slide transition FAQ
'use client';

import React, { useState } from 'react';
import { FiPhone, FiMail, FiClock, FiMapPin, FiChevronDown } from 'react-icons/fi';

interface FormFields {
    name: string;
    phone: string;
    email: string;
    subject: string;
    message: string;
}

type ErrorFields = Partial<Record<keyof FormFields, string>>;

const ContactUsPage: React.FC = () => {
    const [form, setForm] = useState<FormFields>({
        name: '',
        phone: '',
        email: '',
        subject: '',
        message: ''
    });
    const [errors, setErrors] = useState<ErrorFields>({});
    const [feedback, setFeedback] = useState<string>('');

    const validate = (): boolean => {
        const newErrors: ErrorFields = {};
        if (!form.name.trim()) newErrors.name = 'Vui lòng nhập họ tên';
        if (!/^[^\s@]+@[^^\s@]+\.[^\s@]+$/.test(form.email)) newErrors.email = 'Email không hợp lệ';
        if (!form.message.trim()) newErrors.message = 'Vui lòng nhập nội dung';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange =
        (field: keyof FormFields) =>
        (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            setForm((prev) => ({ ...prev, [field]: e.target.value }));
            setErrors((prev) => ({ ...prev, [field]: '' }));
        };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!validate()) {
            document
                .querySelector<HTMLDivElement>('.error')
                ?.scrollIntoView({ behavior: 'smooth' });
            return;
        }
        // TODO: API call
        setFeedback('Gửi tin nhắn thành công! Chúng tôi sẽ liên hệ sớm.');
    };

    const faqItems = [
        {
            q: 'Thời gian giao hàng?',
            a: 'Giao trong 1-2 ngày làm việc tại TP.HCM, 2-3 ngày với tỉnh thành khác.'
        },
        { q: 'Chính sách bảo hành?', a: 'Bảo hành 12-36 tháng tùy model.' },
        { q: 'Hỗ trợ kỹ thuật?', a: 'Hỗ trợ 24/7 qua hotline và email.' },
        { q: 'Phương thức thanh toán?', a: 'Chấp nhận thẻ, chuyển khoản và COD.' }
    ];

    return (
        <div className="bg-gray-900 text-gray-100 min-h-screen py-12">
            <div className="container mx-auto px-4">
                {/* Hero */}
                <div className="text-center mb-12 animate-fadeIn">
                    <h1 className="text-4xl font-bold text-blue-500 mb-2">Liên Hệ Với Chúng Tôi</h1>
                    <p className="text-gray-300">
                        Bạn có thắc mắc? Gửi tin nhắn hoặc ghé thăm cửa hàng để được hỗ trợ ngay.
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                    {/* Form */}
                    <form
                        onSubmit={handleSubmit}
                        noValidate
                        className="bg-gray-800 p-6 rounded-lg space-y-4 transition-shadow duration-300 hover:shadow-xl"
                    >
                        {feedback && (
                            <div className="bg-green-600 text-white p-3 rounded animate-pulse">
                                {feedback}
                            </div>
                        )}

                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <input
                                    type="text"
                                    placeholder="Họ và tên*"
                                    value={form.name}
                                    onChange={handleChange('name')}
                                    className={`w-full bg-gray-700 p-3 rounded focus:ring-2 focus:ring-blue-500 transition transform focus:scale-105 ${errors.name ? 'border-red-500 error' : 'border-transparent'}`}
                                />
                                {errors.name && (
                                    <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                                )}
                            </div>
                            <div>
                                <input
                                    type="tel"
                                    placeholder="Số điện thoại"
                                    value={form.phone}
                                    onChange={handleChange('phone')}
                                    className="w-full bg-gray-700 p-3 rounded focus:ring-2 focus:ring-blue-500 transition transform focus:scale-105"
                                />
                            </div>
                        </div>

                        <div>
                            <input
                                type="email"
                                placeholder="Email*"
                                value={form.email}
                                onChange={handleChange('email')}
                                className={`w-full bg-gray-700 p-3 rounded focus:ring-2 focus:ring-blue-500 transition transform focus:scale-105 ${errors.email ? 'border-red-500 error' : 'border-transparent'}`}
                            />
                            {errors.email && (
                                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                            )}
                        </div>

                        <div>
                            <input
                                type="text"
                                placeholder="Chủ đề"
                                value={form.subject}
                                onChange={handleChange('subject')}
                                className="w-full bg-gray-700 p-3 rounded focus:ring-2 focus:ring-blue-500 transition transform focus:scale-105"
                            />
                        </div>

                        <div>
                            <textarea
                                placeholder="Nội dung*"
                                rows={5}
                                value={form.message}
                                onChange={handleChange('message')}
                                className={`w-full bg-gray-700 p-3 rounded focus:ring-2 focus:ring-blue-500 transition transform focus:scale-105 ${errors.message ? 'border-red-500 error' : 'border-transparent'}`}
                            />
                            {errors.message && (
                                <p className="text-red-500 text-sm mt-1">{errors.message}</p>
                            )}
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-blue-500 to-blue-700 py-3 rounded hover:opacity-90 transition transform hover:scale-105 duration-300"
                        >
                            Gửi Tin Nhắn
                        </button>
                    </form>

                    {/* Info & Map */}
                    <div className="bg-gray-800 p-6 rounded-lg space-y-4 transition-transform transform hover:scale-105 hover:shadow-lg duration-300">
                        <h3 className="text-xl font-semibold text-blue-500">Vị Trí Cửa Hàng</h3>
                        <div className="w-full h-48 overflow-hidden rounded border-2 border-blue-500 transition-shadow hover:shadow-xl duration-300">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.4774!2d106.6950!3d10.7730!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f45c8fb1289%3A0x2a2c4a3b3d1bb6e8!2s123%20%C4%90%C6%B0%E1%BB%9Dng%20C%C3%B4ng%20Ngh%E1%BB%8D!5e0!3m2!1svi!2s!4v1698471234567"
                                width="100%"
                                height="100%"
                                className="border-0"
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            />
                        </div>
                        <p className="flex items-center text-blue-100 transition-colors hover:text-white">
                            <FiMapPin className="mr-2 text-blue-400" />
                            123 Công Nghệ, Q1, TP.HCM
                        </p>
                        <p className="flex items-center text-blue-100 transition-colors hover:text-white">
                            <FiPhone className="mr-2 text-blue-400" />
                            <a href="tel:+84123456789" className="hover:underline">
                                +84 123 456 789
                            </a>
                        </p>
                        <p className="flex items-center text-blue-100 transition-colors hover:text-white">
                            <FiMail className="mr-2 text-blue-400" />
                            <a href="mailto:contact@scsheadphones.vn" className="hover:underline">
                                contact@scsheadphones.vn
                            </a>
                        </p>
                        <p className="flex items-center text-blue-100 transition-colors hover:text-white">
                            <FiClock className="mr-2 text-blue-400" />
                            Thứ 2-6: 8:00-18:00 | T7-CN: 9:00-17:00
                        </p>
                    </div>
                </div>

                {/* FAQ Accordion with slide transition */}
                <section className="mt-12">
                    <h2 className="text-2xl font-bold text-blue-500 mb-6 transition-opacity animate-fadeIn">
                        Câu Hỏi Thường Gặp
                    </h2>
                    <div className="space-y-4">
                        {faqItems.map((item, i) => (
                            <details key={i} className="group bg-gray-800 rounded">
                                <summary className="flex justify-between items-center p-4 cursor-pointer font-medium text-blue-400 bg-gray-800 transition-colors hover:bg-gray-700">
                                    {item.q}{' '}
                                    <FiChevronDown className="transition-transform duration-300 group-open:rotate-180" />
                                </summary>
                                <div className="overflow-hidden transition-all duration-500 ease-in-out max-h-0 group-open:max-h-40 p-4 text-gray-300 bg-gray-800">
                                    <p>{item.a}</p>
                                </div>
                            </details>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default ContactUsPage;
