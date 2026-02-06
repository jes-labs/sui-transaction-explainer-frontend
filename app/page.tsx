"use client"

import { Navbar } from "@/components/layout/navbar"
import { Hero } from "@/components/landing/hero"
import { Features } from "@/components/landing/features"
import { CliSection } from "@/components/landing/cli-section"
import { HowItWorks } from "@/components/landing/how-it-works"
import { TestimonialsSection } from "@/components/testimonials"

import { FAQSection } from "@/components/landing/faq-section"
import { StickyFooter } from "@/components/sticky-footer"

export default function Home() {
  // Mobile menu state is handled inside Navbar now, or we can lift it up if needed.
  // The user's code had state in Home, but our ported Navbar handles it internally or we can adapt.
  // Our ported Navbar handles its own state.

  return (
    <div className="min-h-screen w-full relative bg-background selection:bg-accent selection:text-accent-foreground">
      {/* Background Noise is in Layout, but user code had a radial gradient here too. Let's add it. */}
      {/* Pearl Mist Background with Top Glow - Adapted to our colors */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 50% 35% at 50% 0%, rgba(6, 182, 212, 0.05), transparent 60%)",
        }}
      />

      <Navbar />

      <Hero />

      <HowItWorks />

      <Features />

      <CliSection />

      <div id="testimonials">
        <TestimonialsSection />
      </div>

      <div id="faq">
        <FAQSection />
      </div>

      <StickyFooter />
    </div>
  )
}
