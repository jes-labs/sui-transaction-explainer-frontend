"use client"

import { Cpu, Search, CheckCircle, Zap } from "lucide-react"

const features = [
    {
        title: "RPC-Level Precision",
        description: "Parsing raw RPC responses directly. No indexing delays, just real-time truth from the chain.",
        icon: Zap,
    },
    {
        title: "Human Readable",
        description: "Complex Move calls translated into plain English. Know exactly what your transaction did.",
        icon: Search,
    },
    {
        title: "Object Lifecycle",
        description: "Track every object created, mutated, or deleted. Visualized matrix of state changes.",
        icon: Cpu,
    },
    {
        title: "Gas Analysis",
        description: "Granular breakdown of computation and storage costs. Optimize your smart contracts.",
        icon: CheckCircle,
    },
]

export function Features() {
    return (
        <section id="features" className="py-24 border-t border-border/50 bg-background relative">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                <div className="mb-16">
                    <span className="font-mono text-xs text-accent uppercase tracking-widest mb-4 block">
                        System Capabilities
                    </span>
                    <h2 className="font-[var(--font-bebas)] text-4xl md:text-6xl text-foreground">
                        Core Features
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-border/50 border border-border/50">
                    {features.map((feature, idx) => (
                        <div key={idx} className="bg-background p-8 hover:bg-muted/5 transition-colors group">
                            <feature.icon className="w-8 h-8 text-muted-foreground mb-6 group-hover:text-accent transition-colors duration-300" />
                            <h3 className="font-mono text-sm uppercase tracking-widest text-foreground mb-3">
                                {feature.title}
                            </h3>
                            <p className="font-sans text-sm text-muted-foreground leading-relaxed">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
