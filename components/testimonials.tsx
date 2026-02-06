"use client"

export function TestimonialsSection() {
    return (
        <section id="testimonials" className="py-24 border-t border-border/50 bg-background text-center">
            <div className="max-w-4xl mx-auto px-6">
                <span className="font-mono text-xs text-muted-foreground uppercase tracking-widest mb-4 block">
                    Community Signals
                </span>
                <blockquote className="font-[var(--font-bebas)] text-3xl md:text-5xl text-foreground leading-tight">
                    &quot;Finally, a Sui explorer that speaks human. The narrative parsing is a game changer for debugging complex PTBs.&quot;
                </blockquote>
                <cite className="mt-8 block font-mono text-sm text-accent not-italic">
                    — @SuiDeveloper
                </cite>
            </div>
        </section>
    )
}
