"use client"

export function StickyFooter() {
    return (
        <footer className="border-t border-border/50 bg-background py-12">
            <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-6">
                <div>
                    <span className="font-[var(--font-bebas)] text-xl tracking-wide text-foreground block">
                        SUILENZ
                    </span>
                    <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest mt-1 block">
                        © {new Date().getFullYear()} SuiLenz
                    </span>
                </div>

                <div className="flex gap-6">
                    <a href="#" className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground hover:text-accent transition-colors">
                        Twitter
                    </a>
                    <a href="#" className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground hover:text-accent transition-colors">
                        GitHub
                    </a>
                    <a href="#" className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground hover:text-accent transition-colors">
                        Discord
                    </a>
                </div>
            </div>
        </footer>
    )
}
