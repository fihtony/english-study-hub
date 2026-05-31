import React from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import Hero from './components/Hero'

function App() {
  return (
    <div class="flex flex-col min-h-screen">
      <Header />
      <Hero />
      <Footer />
    </div>
  )
}

export default App