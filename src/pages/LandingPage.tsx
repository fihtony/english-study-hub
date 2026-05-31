import TopNavBar from '../components/TopNavBar';
import HeroSection from '../components/HeroSection';
import Footer from '../components/Footer';

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <TopNavBar />
      <HeroSection />
      <Footer />
    </div>
  );
}