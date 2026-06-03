import TopNavBar from './components/TopNavBar'
import Hero from './components/Hero'
import Footer from './components/Footer'

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <TopNavBar />
      <main className="flex-grow flex flex-col items-center justify-center px-margin-mobile py-section-padding">
        <Hero />
      </main>
      <Footer />
    </div>
  )
}

export default App
