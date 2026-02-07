"use client"

import { useEffect, useRef } from "react"
import { ScrambleTextOnHover } from "@/components/scramble-text"
import { SplitFlapText, SplitFlapAudioProvider } from "@/components/split-flap-text"
import { AnimatedNoise } from "@/components/animated-noise"
import { BitmapChevron } from "@/components/bitmap-chevron"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Link from "next/link"

gsap.registerPlugin(ScrollTrigger)

export function Hero() {
    const sectionRef = useRef<HTMLElement>(null)
    const contentRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!sectionRef.current || !contentRef.current) return

        const ctx = gsap.context(() => {
            gsap.to(contentRef.current, {
                y: -100,
                opacity: 0,
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: 1,
                },
            })
        }, sectionRef)

        return () => ctx.revert()
    }, [])

    return (
        <section ref={sectionRef} id="hero" className="relative min-h-screen flex items-center justify-center pl-6 md:pl-28 pr-6 md:pr-12 pt-20">
            <AnimatedNoise opacity={0.03} />

            {/* Left vertical labels */}
            <div className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 hidden md:block">
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground -rotate-90 origin-left block whitespace-nowrap">
                    SUILENZ
                </span>
            </div>

            {/* Main content */}
            <div ref={contentRef} className="max-w-7xl flex flex-col items-center">
                <SplitFlapAudioProvider>
                    <div className="relative">
                        <SplitFlapText text="SUILENZ" speed={80} />
                    </div>
                </SplitFlapAudioProvider>

                <h2 className="font-[var(--font-bebas)] text-muted-foreground/60 text-[clamp(1rem,3vw,2rem)] mt-4 tracking-wide">
                    SEE EXACTLY WHAT HAPPENED
                </h2>

                <p className="md:mt-12 mt-8 max-w-md font-mono text-base text-muted-foreground leading-relaxed">
                    Transaction digests are built for machines. SuiLenz is built for you. Decode complex Move calls, object mutations, and gas consumption into a clear, simple story.
                </p>

                <div className="mt-4">
                    <span className="text-xs font-mono text-accent uppercase tracking-widest">
                        Powered By Sui Network
                    </span>
                </div>

                <div className="mt-16 flex flex-wrap items-center gap-8">
                    <Link
                        href="/explainer"
                        className="group inline-flex items-center gap-3 border border-foreground/20 px-6 py-3 font-mono text-xs uppercase tracking-widest text-foreground hover:border-accent hover:text-accent transition-all duration-200"
                    >
                        <ScrambleTextOnHover text="Launch App" as="span" duration={0.6} />
                        <BitmapChevron className="transition-transform duration-[400ms] ease-in-out group-hover:rotate-45" />
                    </Link>
                    <a
                        href="#how-it-works"
                        className="font-mono text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors duration-200"
                    >
                        See how it works
                    </a>
                </div>
            </div>

            {/* Floating info tag */}
            <div className="absolute bottom-8 right-8 md:bottom-12 md:right-12">
                <div className="border border-border px-4 py-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                    v.1.0 / Public Beta
                </div>
            </div>
        </section>
    )
}
