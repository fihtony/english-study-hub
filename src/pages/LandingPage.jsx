import TopNavBar from '../components/TopNavBar'
import Hero from '../components/Hero'
import Footer from '../components/Footer'

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <TopNavBar />
      <main className="flex-grow flex flex-col items-center justify-center px-[16px] py-[80px]">
        <div className="max-w-[1120px] w-full text-center space-y-[48px]">
          <Hero />
        </div>
      </main>
      <Footer />
    </div>
  )
}