import Header from '../components/Header'
import Hero from '../components/Hero'
import Footer from '../components/Footer'

function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow flex flex-col items-center justify-center px-margin-mobile py-section-padding">
        <div className="max-w-[1120px] w-full text-center space-y-stack-lg">
          <Hero />
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default LandingPage