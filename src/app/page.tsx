import { Hero } from '@/components/landing/Hero'
import { FAQ } from '@/components/landing/FAQ'
import { Testimonials } from '@/components/landing/Testimonials'
import { HowItWorks } from '@/components/landing/HowItWorks'
import { Footer } from '@/components/landing/Footer'


export default function Home() {
  return <>
    <Hero />
    <Testimonials />
    <HowItWorks />
    <FAQ />
    <Footer />
  </>
}
