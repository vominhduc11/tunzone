'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function DealerRegistrationPage() {
    const router = useRouter();
    const [form, setForm] = useState({
        name: '',
        email: '',
        company: '',
        phone: '',
        region: '',
        message: ''
    });
    const [submitting, setSubmitting] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            // TODO: add API call to submit registration
            console.log('Submitting dealer registration', form);
            setTimeout(() => {
                setSubmitting(false);
                router.push('/thank-you');
            }, 1000);
        } catch (err) {
            console.error(err);
            setSubmitting(false);
        }
    };

    const fieldVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: (i: number) => ({ opacity: 1, x: 0, transition: { delay: i * 0.1 } })
    };

    return (
        <div className="min-h-screen bg-[#181f2a] flex items-center justify-center p-4">
            <motion.form
                onSubmit={handleSubmit}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="bg-[#232c3b] p-8 rounded-2xl shadow-lg max-w-lg w-full text-[#b0d0f9]"
            >
                <motion.h1
                    className="text-2xl font-semibold mb-6 text-cyan-400 text-center"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.4 }}
                >
                    Đăng Ký Làm Đại Lý
                </motion.h1>

                <div className="space-y-4">
                    {[
                        { label: 'Họ và Tên', name: 'name', type: 'text' },
                        { label: 'Email', name: 'email', type: 'email' },
                        { label: 'Công Ty/Đơn Vị', name: 'company', type: 'text' },
                        { label: 'Số Điện Thoại', name: 'phone', type: 'text' },
                        { label: 'Khu vực/Thành Phố', name: 'region', type: 'text' }
                    ].map((field, idx) => (
                        <motion.div
                            key={field.name}
                            custom={idx}
                            variants={fieldVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            <label className="block mb-1 text-gray-300">{field.label}</label>
                            <input
                                type={field.type}
                                name={field.name}
                                value={form[field.name as keyof typeof form]}
                                onChange={handleChange}
                                required={field.name === 'name' || field.name === 'email'}
                                className="w-full px-4 py-2 rounded-lg bg-[#181f2a] text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
                            />
                        </motion.div>
                    ))}

                    <motion.div
                        custom={5}
                        variants={fieldVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <label className="block mb-1 text-gray-300">Lời nhắn</label>
                        <textarea
                            name="message"
                            value={form.message}
                            onChange={handleChange}
                            rows={4}
                            className="w-full px-4 py-2 rounded-lg bg-[#181f2a] text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
                        />
                    </motion.div>
                </div>

                <motion.button
                    type="submit"
                    disabled={submitting}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="mt-6 w-full bg-cyan-400 hover:bg-cyan-300 text-[#181f2a] font-semibold py-3 rounded-full transition"
                >
                    {submitting ? 'Đang gửi...' : 'Đăng ký ngay'}
                </motion.button>
            </motion.form>
        </div>
    );
}
