import TopNavBar from './components/TopNavBar'
import Hero from './components/Hero'
import Footer from './components/Footer'

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <TopNavBar />
      <Hero />
      <Footer />
    </div>
  )
}

export default App
