'use client';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import ChooseCardoSection from './_components/ChooseCardoSection';
import RevolutionTechSection from './_components/RevolutionTechSection';
import HeroSections from './_components/HeroSections';
import DealerPartnershipSection from './_components/DealerPartnershipSection';
import TestimonialsStatsSection from './_components/TestimonialsStatsSection';
import BlogSection from './_components/BlogSection';
import TeamPartnersSection from './_components/TeamPartnersSection';
import WeRecommendSection from './_components/WeRecommendSection';
import BannerSwiper from './_components/BannerSwiper';

import image from '@/assets/images/tai-nghe-cardo-BOLD-2-removebg-preview.png';
import { StaticImageData } from 'next/image';

interface Product {
    id: string;
    title: string;
    imageSrc: StaticImageData;
    link: string;
}
const products: Product[] = [
    { id: 't2', title: 'T2', imageSrc: image, link: '/productDetail/t2' },
    { id: 'g7plus', title: 'G7+', imageSrc: image, link: '/productDetail/g7plus' },
    { id: 's9xm', title: 'S9XM', imageSrc: image, link: '/productDetail/s9xm' },
    { id: 's9x', title: 'S9X', imageSrc: image, link: '/productDetail/s9x' },
    { id: 's7evo', title: 'S7EVO', imageSrc: image, link: '/productDetail/s7evo' }
];

function Home() {
    const banners = [
        'https://cardosystems.com/cdn/shop/files/BAN01060_New_banner_for_the_website.webp?v=1746625640&width=2000',
        'https://cardosystems.com/cdn/shop/files/WEB01022_Size_adjustment_-_main_banner_for_the_website.webp?v=1749023428&width=2000'
    ];
    return (
        <div>
            <BannerSwiper banners={banners} />

            <WeRecommendSection products={products} />

            <HeroSections />

            <ChooseCardoSection />

            <DealerPartnershipSection />

            <RevolutionTechSection />

            <TestimonialsStatsSection />

            <BlogSection />

            <TeamPartnersSection />
        </div>
    );
}

export default Home;
