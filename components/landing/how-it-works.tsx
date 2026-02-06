"use client"

import { BitmapChevron } from "@/components/bitmap-chevron"

const steps = [
    {
        num: "01",
        title: "Input Digest",
        desc: "Paste any transaction digest (hash) from the Sui network.",
    },
    {
        num: "02",
        title: "Deep Parsing",
        desc: "We query the Fullnode RPC to retrieve raw transaction blocks and object changes.",
    },
    {
        num: "03",
        title: "Translation",
        desc: "Our engine maps Move calls to human-readable narratives using signed ABI data.",
    },
    {
        num: "04",
        title: "Verification",
        desc: "Verify the output against the raw JSON payload. Trust, but verify.",
    },
]

export function HowItWorks() {
    return (
        <section id="how-it-works" className="py-24 border-t border-border/50 bg-background">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                    <div>
                        <span className="font-mono text-xs text-accent uppercase tracking-widest mb-4 block">
                            Workflow
                        </span>
                        <h2 className="font-[var(--font-bebas)] text-4xl md:text-6xl text-foreground">
                            How It Works
                        </h2>
                    </div>

                    <p className="font-mono text-sm text-muted-foreground max-w-md text-right md:text-left">
                        From raw bytes to clarity in four automated steps.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {steps.map((step, idx) => (
                        <div key={idx} className="relative group">
                            <div className="border-l border-border pl-6 py-2 relative h-full">
                                {/* Active marker */}
                                <div className="absolute left-[-1px] top-0 h-0 w-[2px] bg-accent transition-all duration-500 group-hover:h-full" />

                                <span className="font-mono text-4xl text-muted-foreground/20 font-bold absolute -top-4 right-0 select-none">
                                    {step.num}
                                </span>

                                <h3 className="font-mono text-sm uppercase tracking-widest text-foreground mb-4 pt-2">
                                    {step.title}
                                </h3>
                                <p className="font-sans text-sm text-muted-foreground leading-relaxed">
                                    {step.desc}
                                </p>

                                {idx < steps.length - 1 && (
                                    <div className="hidden md:block absolute -right-4 top-1/2 -translate-y-1/2 text-border/50">
                                        <BitmapChevron className="-rotate-90 w-4 h-4 opacity-50" />
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
