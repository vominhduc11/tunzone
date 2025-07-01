'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
    buttonMotion, 
    fieldVariants, 
    formWrapper, 
    titleMotion, 
    containerVariants, 
    cardVariants 
} from './_configs/config';
import { 
    FiUser, 
    FiMail, 
    FiHome,
    FiPhone, 
    FiMapPin, 
    FiMessageSquare,
    FiCheck,
    FiStar,
    FiTrendingUp,
    FiUsers,
    FiAward
} from 'react-icons/fi';

interface FormData {
    name: string;
    email: string;
    company: string;
    phone: string;
    region: string;
    businessType: string;
    experience: string;
    message: string;
}

export default function DealerRegistrationPage() {
    const router = useRouter();
    const [form, setForm] = useState<FormData>({
        name: '',
        email: '',
        company: '',
        phone: '',
        region: '',
        businessType: '',
        experience: '',
        message: ''
    });
    const [submitting, setSubmitting] = useState(false);
    const [errors, setErrors] = useState<Partial<FormData>>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
        
        // Clear error when user starts typing
        if (errors[name as keyof FormData]) {
            setErrors({ ...errors, [name]: '' });
        }
    };

    const validateForm = (): boolean => {
        const newErrors: Partial<FormData> = {};
        
        if (!form.name.trim()) newErrors.name = 'Full name is required';
        if (!form.email.trim()) newErrors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = 'Email is invalid';
        if (!form.company.trim()) newErrors.company = 'Company name is required';
        if (!form.phone.trim()) newErrors.phone = 'Phone number is required';
        if (!form.region.trim()) newErrors.region = 'Region is required';
        if (!form.businessType) newErrors.businessType = 'Business type is required';
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!validateForm()) return;
        
        setSubmitting(true);
        try {
            // TODO: add API call to submit registration
            console.log('Submitting dealer registration', form);
            
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Redirect to success page
            router.push('/dealers?registered=true');
        } catch (err) {
            console.error('Registration failed:', err);
            setSubmitting(false);
        }
    };

    const benefits = [
        {
            icon: FiTrendingUp,
            title: 'High Profit Margins',
            description: 'Competitive pricing with attractive profit margins for our dealer partners'
        },
        {
            icon: FiAward,
            title: 'Premium Brand',
            description: 'Represent TuneZone, a trusted name in professional audio equipment'
        },
        {
            icon: FiUsers,
            title: 'Marketing Support',
            description: 'Comprehensive marketing materials and promotional support'
        },
        {
            icon: FiStar,
            title: 'Training & Support',
            description: 'Product training and ongoing technical support for your team'
        }
    ];

    const formFields = [
        {
            label: 'Full Name',
            name: 'name',
            type: 'text',
            icon: FiUser,
            placeholder: 'Enter your full name',
            required: true
        },
        {
            label: 'Email Address',
            name: 'email',
            type: 'email',
            icon: FiMail,
            placeholder: 'your@email.com',
            required: true
        },
        {
            label: 'Company/Business Name',
            name: 'company',
            type: 'text',
            icon: FiHome,
            placeholder: 'Your company name',
            required: true
        },
        {
            label: 'Phone Number',
            name: 'phone',
            type: 'tel',
            icon: FiPhone,
            placeholder: '+1 (555) 123-4567',
            required: true
        },
        {
            label: 'Region/City',
            name: 'region',
            type: 'text',
            icon: FiMapPin,
            placeholder: 'Your business location',
            required: true
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
            <div className="container mx-auto px-4 py-16 max-w-7xl">
                {/* Header Section */}
                <motion.div 
                    className="text-center mb-16"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <motion.h1 
                        className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent mb-6"
                        variants={titleMotion}
                    >
                        Become a TuneZone Dealer
                    </motion.h1>
                    <motion.p 
                        className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
                        variants={cardVariants}
                    >
                        Join our network of authorized dealers and grow your business with premium audio equipment. 
                        Partner with TuneZone to offer your customers the best in professional audio solutions.
                    </motion.p>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-12 items-start">
                    {/* Benefits Section */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="space-y-8"
                    >
                        <motion.div variants={cardVariants}>
                            <h2 className="text-3xl font-bold text-white mb-8">Why Partner With Us?</h2>
                            <div className="space-y-6">
                                {benefits.map((benefit, index) => (
                                    <motion.div
                                        key={index}
                                        variants={cardVariants}
                                        className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 hover:border-blue-500/50 transition-all duration-300"
                                    >
                                        <div className="flex items-start gap-4">
                                            <div className="bg-blue-500/20 p-3 rounded-lg">
                                                <benefit.icon className="w-6 h-6 text-blue-400" />
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-semibold text-white mb-2">
                                                    {benefit.title}
                                                </h3>
                                                <p className="text-gray-300 leading-relaxed">
                                                    {benefit.description}
                                                </p>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Requirements */}
                        <motion.div 
                            variants={cardVariants}
                            className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6"
                        >
                            <h3 className="text-xl font-semibold text-white mb-4">Requirements</h3>
                            <ul className="space-y-3 text-gray-300">
                                {[
                                    'Established business with valid registration',
                                    'Experience in audio/electronics retail',
                                    'Dedicated showroom or retail space',
                                    'Commitment to customer service excellence'
                                ].map((requirement, index) => (
                                    <li key={index} className="flex items-center gap-3">
                                        <FiCheck className="w-5 h-5 text-green-400 flex-shrink-0" />
                                        <span>{requirement}</span>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    </motion.div>

                    {/* Registration Form */}
                    <motion.div
                        variants={formWrapper}
                        initial="initial"
                        animate="animate"
                        className="bg-gray-800/70 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 shadow-2xl"
                    >
                        <div className="text-center mb-8">
                            <h2 className="text-2xl font-bold text-white mb-2">
                                Dealer Registration Form
                            </h2>
                            <p className="text-gray-400">
                                Fill out the form below to start your partnership with TuneZone
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Basic Information */}
                            <div className="space-y-4">
                                {formFields.map((field, idx) => (
                                    <motion.div
                                        key={field.name}
                                        custom={idx}
                                        variants={fieldVariants}
                                        initial="hidden"
                                        animate="visible"
                                    >
                                        <label className="block text-sm font-medium text-gray-300 mb-2">
                                            {field.label} {field.required && <span className="text-red-400">*</span>}
                                        </label>
                                        <div className="relative">
                                            <field.icon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                            <input
                                                type={field.type}
                                                name={field.name}
                                                value={form[field.name as keyof FormData]}
                                                onChange={handleChange}
                                                placeholder={field.placeholder}
                                                className={`w-full pl-12 pr-4 py-3 rounded-lg bg-gray-700/50 border text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                                                    errors[field.name as keyof FormData] 
                                                        ? 'border-red-500' 
                                                        : 'border-gray-600 hover:border-gray-500'
                                                }`}
                                            />
                                        </div>
                                        {errors[field.name as keyof FormData] && (
                                            <p className="text-red-400 text-sm mt-1">
                                                {errors[field.name as keyof FormData]}
                                            </p>
                                        )}
                                    </motion.div>
                                ))}
                            </div>

                            {/* Business Type */}
                            <motion.div
                                custom={5}
                                variants={fieldVariants}
                                initial="hidden"
                                animate="visible"
                            >
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Business Type <span className="text-red-400">*</span>
                                </label>
                                <select
                                    name="businessType"
                                    value={form.businessType}
                                    onChange={handleChange}
                                    className={`w-full px-4 py-3 rounded-lg bg-gray-700/50 border text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                                        errors.businessType ? 'border-red-500' : 'border-gray-600 hover:border-gray-500'
                                    }`}
                                >
                                    <option value="">Select business type</option>
                                    <option value="retailer">Electronics Retailer</option>
                                    <option value="distributor">Distributor</option>
                                    <option value="installer">Audio Installer</option>
                                    <option value="rental">Equipment Rental</option>
                                    <option value="other">Other</option>
                                </select>
                                {errors.businessType && (
                                    <p className="text-red-400 text-sm mt-1">{errors.businessType}</p>
                                )}
                            </motion.div>

                            {/* Experience */}
                            <motion.div
                                custom={6}
                                variants={fieldVariants}
                                initial="hidden"
                                animate="visible"
                            >
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Years of Experience
                                </label>
                                <select
                                    name="experience"
                                    value={form.experience}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-lg bg-gray-700/50 border border-gray-600 hover:border-gray-500 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                >
                                    <option value="">Select experience level</option>
                                    <option value="0-2">0-2 years</option>
                                    <option value="3-5">3-5 years</option>
                                    <option value="6-10">6-10 years</option>
                                    <option value="10+">10+ years</option>
                                </select>
                            </motion.div>

                            {/* Message */}
                            <motion.div
                                custom={7}
                                variants={fieldVariants}
                                initial="hidden"
                                animate="visible"
                            >
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Additional Message
                                </label>
                                <div className="relative">
                                    <FiMessageSquare className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                                    <textarea
                                        name="message"
                                        value={form.message}
                                        onChange={handleChange}
                                        rows={4}
                                        placeholder="Tell us about your business and why you want to become a TuneZone dealer..."
                                        className="w-full pl-12 pr-4 py-3 rounded-lg bg-gray-700/50 border border-gray-600 hover:border-gray-500 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                                    />
                                </div>
                            </motion.div>

                            {/* Submit Button */}
                            <motion.button
                                type="submit"
                                disabled={submitting}
                                variants={buttonMotion}
                                whileHover="whileHover"
                                whileTap="whileTap"
                                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 disabled:from-gray-600 disabled:to-gray-700 text-white font-semibold py-4 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl disabled:cursor-not-allowed disabled:transform-none"
                            >
                                {submitting ? (
                                    <div className="flex items-center justify-center gap-2">
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                        Processing Application...
                                    </div>
                                ) : (
                                    'Submit Application'
                                )}
                            </motion.button>

                            <p className="text-sm text-gray-400 text-center">
                                By submitting this form, you agree to our terms and conditions. 
                                We&apos;ll review your application and contact you within 3-5 business days.
                            </p>
                        </form>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
