"use client"

import { ScanEye } from "lucide-react"
import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

interface NavbarProps {
    onNetworkChange?: (network: "mainnet" | "testnet") => void
    currentNetwork?: "mainnet" | "testnet"
}

export function Navbar({ onNetworkChange, currentNetwork }: NavbarProps) {
    const [isScrolled, setIsScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20)
        }
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    return (
        <header
            className={cn(
                "sticky top-0 z-[999] w-full border-b border-transparent transition-all duration-300",
                isScrolled ? "bg-background/80 backdrop-blur-md border-border/50" : "bg-transparent"
            )}
        >
            <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                {/* Logo */}
                <Link
                    className="flex items-center justify-center gap-2"
                    href="/"
                >
                    <div className="text-foreground rounded-full size-8 w-8 flex items-center justify-center bg-accent/10">
                        <ScanEye className="w-5 h-5 text-accent" />
                    </div>
                    <span className="font-display font-medium text-lg tracking-wider text-foreground">SUILENZ</span>
                </Link>

                {/* Right Side Actions */}
                <div className="flex items-center gap-3">
                    {/* Network Switcher */}
                    <div className="flex bg-muted/20 rounded-full p-1 border border-border/20">
                        <button
                            onClick={() => onNetworkChange?.("mainnet")}
                            className={cn(
                                "px-3 py-1 rounded-full text-xs font-mono transition-colors",
                                currentNetwork === "mainnet" ? "bg-foreground text-background font-bold" : "text-muted-foreground hover:text-foreground"
                            )}
                        >
                            Mainnet
                        </button>
                        <button
                            onClick={() => onNetworkChange?.("testnet")}
                            className={cn(
                                "px-3 py-1 rounded-full text-xs font-mono transition-colors",
                                currentNetwork === "testnet" ? "bg-foreground text-background font-bold" : "text-muted-foreground hover:text-foreground"
                            )}
                        >
                            Testnet
                        </button>
                    </div>

                    <ThemeToggle />
                </div>
            </div>
        </header>
    )
}
