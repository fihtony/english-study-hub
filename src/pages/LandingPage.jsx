import React from 'react'
import TopNavBar from '../components/TopNavBar.jsx'
import Hero from '../components/Hero.jsx'
import Footer from '../components/Footer.jsx'

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-on-background font-body-ui">
      {/* stitch_node_id: nav-001 */}
      <TopNavBar />
      {/* stitch_node_id: main-001 */}
      <main className="flex-grow flex flex-col items-center justify-center px-margin-mobile py-section-padding">
        <Hero />
      </main>
      {/* stitch_node_id: footer-001 */}
      <Footer />
    </div>
  )
}