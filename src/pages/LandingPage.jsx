import TopNavBar from '../components/TopNavBar'
import Hero from '../components/Hero'
import Footer from '../components/Footer'

function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-on-background font-body-ui">
      <TopNavBar />
      <Hero />
      <Footer />
    </div>
  )
}

export default LandingPage