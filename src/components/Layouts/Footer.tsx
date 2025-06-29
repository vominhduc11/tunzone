import { FaFacebookF, FaInstagram, FaYoutube } from 'react-icons/fa';
import { SiTiktok } from 'react-icons/si';
import Link from 'next/link';

const companyLinks = [
    'À Propos de Cardo',
    'Parcours de Cardo Systems',
    'Durabilité',
    "Se joindre à l'équipe",
    'Presse',
    'Média',
    { label: 'Điều khoản & Chính sách', href: '/policy' }
];

const infoLinks = [
    'Service client',
    'Comparatif des produits',
    'Riser',
    'Mettez à jour votre appareil',
    'Cardo Connect',
    'Localisateur de revendeurs',
    'Blog Cardo',
    'Mentions légales et réglementations'
];

const partnerLinks = [
    'Zone réservée aux distributeurs et aux revendeurs',
    'Collaborations OEM',
    'Assistance aux revendeurs (US, DE, IT, FR uniquement)',
    'Inscription des revendeurs (États-Unis uniquement)',
    'Inscription des revendeurs Outdoor (États-Unis uniquement)',
    'Premiers Intervenants et Militaires'
];

const additionalSites = [
    { label: 'CN - China', href: '#' },
    { label: 'JP - Japan', href: '#' },
    { label: 'KR - South Korea', href: '#' }
];

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-gray-300 border-t border-gray-700">
            <div className="container mx-auto px-4 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8">
                {/* Company Column */}
                <div>
                    <h3 className="text-white font-semibold uppercase mb-4">Entreprise</h3>
                    <ul className="space-y-2">
                        {companyLinks.map((link) =>
                            typeof link === 'string' ? (
                                <li key={link}>
                                    <a href="#" className="hover:underline">
                                        {link}
                                    </a>
                                </li>
                            ) : (
                                <li key={link.label}>
                                    <Link
                                        href={link.href}
                                        className="hover:underline text-cyan-400"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            )
                        )}
                    </ul>
                </div>

                {/* Information Column */}
                <div>
                    <h3 className="text-white font-semibold uppercase mb-4">Information</h3>
                    <ul className="space-y-2">
                        {infoLinks.map((link) => (
                            <li key={link}>
                                <a href="#" className="hover:underline">
                                    {link}
                                </a>
                            </li>
                        ))}
                        {/* Warranty Checking Link */}
                        <li>
                            <Link
                                href="/warrantyChecking"
                                className="hover:underline text-cyan-400"
                            >
                                Tra cứu bảo hành
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Partnerships Column */}
                <div>
                    <h3 className="text-white font-semibold uppercase mb-4">Partenariats</h3>
                    <ul className="space-y-2">
                        {partnerLinks.map((link) => (
                            <li key={link}>
                                <a href="#" className="hover:underline">
                                    {link}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Social Media Column */}
                <div>
                    <h3 className="text-white font-semibold uppercase mb-4">Nos Médias Sociaux</h3>
                    <p className="mb-4">
                        Rejoignez <span className="font-semibold text-white">#CardoFam</span> dès
                        aujourd&#39;hui !
                    </p>
                    <div className="flex space-x-4">
                        <a
                            href="#"
                            className="p-2 border border-gray-700 rounded hover:bg-gray-800"
                        >
                            <FaFacebookF className="h-5 w-5" />
                        </a>
                        <a
                            href="#"
                            className="p-2 border border-gray-700 rounded hover:bg-gray-800"
                        >
                            <FaInstagram className="h-5 w-5" />
                        </a>
                        <a
                            href="#"
                            className="p-2 border border-gray-700 rounded hover:bg-gray-800"
                        >
                            <FaYoutube className="h-5 w-5" />
                        </a>
                        <a
                            href="#"
                            className="p-2 border border-gray-700 rounded hover:bg-gray-800"
                        >
                            <SiTiktok className="h-5 w-5" />
                        </a>
                    </div>
                </div>

                {/* Additional Sites Column */}
                <div>
                    <h3 className="text-white font-semibold uppercase mb-4">Additional Sites</h3>
                    <ul className="space-y-2">
                        {additionalSites.map(({ label, href }) => (
                            <li key={label}>
                                <a href={href} className="hover:underline">
                                    {label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Bottom selectors */}
            <div className="border-t border-gray-700 pt-6 pb-4">
                <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                    <select className="bg-gray-800 text-gray-300 py-2 px-4 rounded focus:outline-none">
                        <option>Việt Nam (USD $)</option>
                        <option>France (EUR €)</option>
                        {/* Thêm các lựa chọn khác nếu cần */}
                    </select>
                    <select className="bg-gray-800 text-gray-300 py-2 px-4 rounded focus:outline-none">
                        <option>Français</option>
                        <option>English</option>
                        {/* Thêm các ngôn ngữ khác nếu cần */}
                    </select>
                </div>
            </div>
        </footer>
    );
}
