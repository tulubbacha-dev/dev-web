import AnimatedBackground from '@/components/AnimatedBackground'
import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'
import Services from '@/components/Services'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="w-full bg-ttb-dark">
      <div className="relative">
        <AnimatedBackground />
        <Navigation />
        <Hero />
      </div>
      <Services />
      <Footer />
    </main>
  )
}