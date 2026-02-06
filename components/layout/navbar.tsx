"use client"

import { useState, useEffect } from "react"
import { ScanEye } from "lucide-react"
import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"

export function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 100)
        }

        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    const handleMobileNavClick = (elementId: string) => {
        setIsMobileMenuOpen(false)
        setTimeout(() => {
            const element = document.getElementById(elementId)
            if (element) {
                const headerOffset = 120 // Account for sticky header height + margin
                const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
                const offsetPosition = elementPosition - headerOffset

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth",
                })
            }
        }, 100)
    }

    const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
        e.preventDefault()
        const element = document.getElementById(id)
        if (element) {
            const headerOffset = 120
            const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
            const offsetPosition = elementPosition - headerOffset

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth",
            })
        }
    }

    return (
        <>
            {/* Desktop Header */}
            <header
                className={`fixed top-4 z-[9999] inset-x-0 mx-auto hidden w-full flex-row items-center justify-between self-start rounded-full bg-background/80 md:flex backdrop-blur-sm border border-border/50 shadow-lg transition-all duration-300 ${isScrolled ? "max-w-3xl px-2" : "max-w-5xl px-4"
                    } py-2`}
                style={{
                    willChange: "transform",
                    transform: "translateZ(0)",
                    backfaceVisibility: "hidden",
                    perspective: "1000px",
                }}
            >
                <Link
                    className={`z-50 flex items-center justify-center gap-2 transition-all duration-300 ${isScrolled ? "ml-4" : ""
                        }`}
                    href="/"
                >
                    <div className="text-foreground rounded-full size-8 w-8 flex items-center justify-center bg-accent/10">
                        <ScanEye className="w-5 h-5 text-accent" />
                    </div>
                    <span className="font-display font-medium text-lg tracking-wider text-foreground">SUILENZ</span>
                </Link>

                <div className="absolute inset-0 hidden flex-1 flex-row items-center justify-center space-x-2 text-sm font-medium text-muted-foreground transition duration-200 hover:text-foreground md:flex md:space-x-2">
                    <a
                        className="relative px-4 py-2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                        onClick={(e) => handleScrollTo(e, "how-it-works")}
                    >
                        <span className="relative z-20">How it Works</span>
                    </a>
                    <a
                        className="relative px-4 py-2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                        onClick={(e) => handleScrollTo(e, "features")}
                    >
                        <span className="relative z-20">Features</span>
                    </a>
                    <a
                        className="relative px-4 py-2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                        onClick={(e) => handleScrollTo(e, "faq")}
                    >
                        <span className="relative z-20">FAQ</span>
                    </a>
                </div>

                <div className="flex items-center gap-4">
                    <ThemeToggle />
                    <Link
                        href="/explainer"
                        className=" rounded-2xl font-bold relative cursor-pointer hover:-translate-y-0.5 transition duration-200 inline-block text-center bg-gradient-to-b from-primary to-primary/80 text-primary-foreground shadow-[0px_2px_0px_0px_rgba(255,255,255,0.3)_inset] px-4 py-2 text-sm"
                    >
                        Launch App
                    </Link>
                </div>
            </header>

            {/* Mobile Header */}
            <header className="sticky top-4 z-[9999] mx-4 flex w-auto flex-row items-center justify-between rounded-full bg-background/80 backdrop-blur-sm border border-border/50 shadow-lg md:hidden px-4 py-3">
                <Link
                    className="flex items-center justify-center gap-2"
                    href="/"
                >
                    <div className="text-foreground rounded-full size-7 w-7 flex items-center justify-center bg-accent/10">
                        <ScanEye className="w-5 h-5 text-accent" />
                    </div>
                    <span className="font-display font-medium text-lg tracking-wider text-foreground">SUILENZ</span>
                </Link>

                <div className="flex items-center gap-2">
                    <ThemeToggle />
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="flex items-center justify-center w-10 h-10 rounded-full bg-background/50 border border-border/50 transition-colors hover:bg-background/80"
                        aria-label="Toggle menu"
                    >
                        <div className="flex flex-col items-center justify-center w-5 h-5 space-y-1">
                            <span
                                className={`block w-4 h-0.5 bg-foreground transition-all duration-300 ${isMobileMenuOpen ? "rotate-45 translate-y-1.5" : ""}`}
                            ></span>
                            <span
                                className={`block w-4 h-0.5 bg-foreground transition-all duration-300 ${isMobileMenuOpen ? "opacity-0" : ""}`}
                            ></span>
                            <span
                                className={`block w-4 h-0.5 bg-foreground transition-all duration-300 ${isMobileMenuOpen ? "-rotate-45 -translate-y-1.5" : ""}`}
                            ></span>
                        </div>
                    </button>
                </div>
            </header>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div className="fixed inset-0 z-[9998] bg-black/50 backdrop-blur-sm md:hidden">
                    <div className="absolute top-20 left-4 right-4 bg-background/95 backdrop-blur-md border border-border/50 rounded-2xl shadow-2xl p-6">
                        <nav className="flex flex-col space-y-2">
                            <button
                                onClick={() => handleMobileNavClick("how-it-works")}
                                className="text-left px-4  text-lg font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-background/50"
                            >
                                How it Works
                            </button>
                            <button
                                onClick={() => handleMobileNavClick("features")}
                                className="text-left px-4  text-lg font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-background/50"
                            >
                                Features
                            </button>
                            <button
                                onClick={() => handleMobileNavClick("faq")}
                                className="text-left px-4  text-lg font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-background/50"
                            >
                                FAQ
                            </button>
                            <div className="border-t border-border/50 pt-4 mt-4 flex flex-col space-y-3">
                                <Link
                                    href="/explainer"
                                    className="px-4 py-2 rounded-2xl text-lg font-bold text-center bg-gradient-to-b from-primary to-primary/80 text-primary-foreground shadow-lg hover:-translate-y-0.5 transition-all duration-200"
                                >
                                    Launch App
                                </Link>
                            </div>
                        </nav>
                    </div>
                </div>
            )}
        </>
    )
}
