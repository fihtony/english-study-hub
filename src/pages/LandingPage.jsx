import TopNavBar from '../components/TopNavBar'
import Hero from '../components/Hero'
import Footer from '../components/Footer'

function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-on-background font-body-ui">
      <TopNavBar />
      <main className="flex-grow flex flex-col items-center justify-center px-margin-mobile py-section-padding">
        <div className="max-w-container-max w-full text-center space-y-stack-lg">
          <Hero />
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default LandingPage