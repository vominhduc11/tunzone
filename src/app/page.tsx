import ChooseCardoSection from './_components/ChooseCardoSection';
import RevolutionTechSection from './_components/RevolutionTechSection';
import HeroSections from './_components/HeroSections';
import DealerPartnershipSection from './_components/DealerPartnershipSection';
import TestimonialsStatsSection from './_components/TestimonialsStatsSection';
import BlogSection from './_components/BlogSection';
import TeamPartnersSection from './_components/TeamPartnersSection';
import WeRecommendSection from './_components/WeRecommendSection';
import BannerSwiper from './_components/BannerSwiper';

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
