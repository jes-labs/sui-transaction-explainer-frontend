"use client"

import { Search, ArrowRight } from "lucide-react"

export function SearchBanner() {
    return (
        <div className="relative py-12 md:py-20 overflow-hidden border-b border-border/50">
            {/* Subtle Gradient Background */}
            <div
                className="absolute inset-0 z-0 opacity-20 pointer-events-none"
                style={{
                    background: "linear-gradient(180deg, rgba(6, 182, 212, 0) 0%, rgba(6, 182, 212, 0.05) 100%)"
                }}
            />

            <div className="max-w-4xl mx-auto px-6 relative z-10 w-full">
                <h1 className="font-[var(--font-bebas)] text-3xl md:text-5xl text-foreground text-center mb-8">
                    Sui Transaction Explainer
                </h1>

                <div className="relative group max-w-2xl mx-auto">
                    <div className="absolute inset-0 bg-gradient-to-r from-accent/20 to-purple-500/20 rounded-full blur-md opacity-50 group-hover:opacity-100 transition-opacity duration-500" />

                    <div className="relative bg-background/80 backdrop-blur-xl border border-border rounded-full flex items-center p-1.5 shadow-xl transition-all duration-200 group-hover:border-accent/50 focus-within:border-accent focus-within:ring-1 focus-within:ring-accent/50">
                        <div className="pl-4 pr-3 text-muted-foreground">
                            <Search className="w-5 h-5" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search by Address / Transaction / Object / Package"
                            className="flex-1 bg-transparent border-none outline-none text-foreground placeholder:text-muted-foreground/50  h-10 w-full"
                        />
                        <button className="bg-accent text-accent-foreground rounded-full p-2.5 hover:bg-accent/90 transition-colors">
                            <ArrowRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                <div className="text-center mt-4">
                    <span className="text-xs font-mono text-muted-foreground/60 uppercase tracking-widest">
                        Powered By Sui Network
                    </span>
                </div>
            </div>
        </div>
    )
}
