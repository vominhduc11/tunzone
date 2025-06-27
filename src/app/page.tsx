'use client'

import ChooseCardoSection from './_components/ChooseCardoSection';
import RevolutionTechSection from './_components/RevolutionTechSection';
import HeroSections from './_components/HeroSections';
import DealerPartnershipSection from './_components/DealerPartnershipSection';
import TestimonialsStatsSection from './_components/TestimonialsStatsSection';
import BlogSection from './_components/BlogSection';
import TeamPartnersSection from './_components/TeamPartnersSection';
import WeRecommendSection from './_components/WeRecommendSection';
import BannerSwiper from './_components/BannerSwiper';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

function Home() {
    const banners = [
        'https://cardosystems.com/cdn/shop/files/BAN01060_New_banner_for_the_website.webp?v=1746625640&width=2000',
        'https://cardosystems.com/cdn/shop/files/WEB01022_Size_adjustment_-_main_banner_for_the_website.webp?v=1749023428&width=2000'
    ];
    return (
        <div>
            <BannerSwiper banners={banners} />

            <WeRecommendSection />

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
