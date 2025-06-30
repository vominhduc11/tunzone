import ChooseCardoSection from '@/app/_components/ChooseCardoSection/ChooseCardoSection';
import RevolutionTechSection from '@/app/_components/RevolutionTechSection';
import HeroSections from '@/app/_components/HeroSections/HeroSections';
import DealerPartnershipSection from '@/app/_components/DealerPartnershipSection';
import TestimonialsStatsSection from '@/app/_components/TestimonialsStatsSection/TestimonialsStatsSection';
import BlogSection from '@/app/_components/BlogSection/BlogSection';
import TeamPartnersSection from '@/app/_components/TeamPartnersSection';
import WeRecommendSection from '@/app/_components/WeRecommendSection/WeRecommendSection';
import BannerSwiper from '@/app/_components/BannerSwiper';

function Home() {
    return (
        <div>
            <BannerSwiper />

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
