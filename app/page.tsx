import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { WhatsAppCTA } from "@/components/whatsapp-cta"
import { StarField } from "@/components/star-field"
import { HeroSection } from "@/components/home/hero-section"
import { CelebratingSection } from "@/components/home/celebrating-section"
import { ServicesSection } from "@/components/home/services-section"
import { ProcessSection } from "@/components/home/process-section"
import { PortfolioSection } from "@/components/home/portfolio-section"
import { TestimonialsSection } from "@/components/home/testimonials-section"
import { ClientsSection } from "@/components/home/clients-section"
import { CTASection } from "@/components/home/cta-section"

export default function HomePage() {
  return (
    <>
      <StarField />
      <Navigation />
      <main className="relative z-10">
        <HeroSection />
        <CelebratingSection />
        <ServicesSection />
        <ProcessSection />
        <PortfolioSection />
        <TestimonialsSection />
        <ClientsSection />
        <CTASection />
      </main>
      <Footer />
      <WhatsAppCTA />
    </>
  )
}
