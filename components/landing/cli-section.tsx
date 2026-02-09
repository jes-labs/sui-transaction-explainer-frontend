"use client"

import { useState } from "react"
import { Check, Copy, Terminal } from "lucide-react"
import { motion } from "framer-motion"

export function CliSection() {
    const [copied, setCopied] = useState(false)

    const installCmd = "npm install -g @suilenz/cli"
    const runCmd = "suilenz explain 0x76a9...8e32"

    const handleCopy = () => {
        navigator.clipboard.writeText(installCmd)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <section className="py-24 border-t border-border/50 bg-background relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center gap-12 md:gap-24">

                {/* Left Content */}
                <div className="flex-1 space-y-8">
                    <div>
                        <span className="font-mono text-xs text-accent uppercase tracking-widest mb-4 block">
                            Developer Module
                        </span>
                        <h2 className="font-[var(--font-bebas)] text-4xl md:text-6xl text-foreground leading-none">
                            The CLI Experience
                            <span className="ml-4 align-middle text-sm font-sans tracking-normal bg-accent/20 text-accent px-3 py-1 rounded-full border border-accent/20 inline-block">
                                Coming Soon
                            </span>
                        </h2>
                        <h3 className="font-[var(--font-bebas)] text-2xl md:text-3xl text-muted-foreground mt-2">
                            Built for the Power User.
                        </h3>
                    </div>

                    <p className="font-sans text-muted-foreground leading-relaxed max-w-md">
                        Don&apos;t leave your terminal. Analyze transactions directly from your command line environment with full feature parity.
                    </p>

                    <div className="flex items-center gap-4">
                        <div className="h-px bg-border flex-1" />
                        <Terminal className="w-5 h-5 text-accent" />
                        <div className="h-px bg-border flex-1" />
                    </div>
                </div>

                {/* Right Terminal Visual */}
                <div className="flex-1 w-full max-w-lg">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="w-full rounded-xl overflow-hidden bg-[#0c0c0c] border border-border/50 shadow-2xl"
                    >
                        {/* Window Bar */}
                        <div className="bg-[#1a1a1a] px-4 py-3 flex items-center justify-between border-b border-border/20">
                            <div className="flex gap-2">
                                <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
                                <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                                <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
                            </div>
                            <div className="text-xs text-muted-foreground font-mono">zsh — 80x24</div>
                            <div className="w-14" /> {/* Spacer for centering */}
                        </div>

                        {/* Terminal Body */}
                        <div className="p-6 font-mono text-sm leading-relaxed relative group">
                            {/* Copy Button */}
                            <button
                                onClick={handleCopy}
                                className="absolute right-4 top-4 p-2 rounded-md hover:bg-white/10 text-muted-foreground hover:text-white transition-all opacity-0 group-hover:opacity-100"
                                title="Copy commands"
                            >
                                {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                            </button>

                            <div className="flex gap-2 text-white/90">
                                <span className="text-green-500">$</span>
                                <span>{installCmd}</span>
                            </div>
                            <div className="text-white/50 mb-4 text-xs italic">
                                + @suilenz/cli@1.0.2 installed
                            </div>

                            <div className="flex gap-2 text-white/90">
                                <span className="text-green-500">$</span>
                                <span className="typing-cursor relative">{runCmd}</span>
                            </div>

                            <div className="mt-4 p-3 bg-white/5 rounded border-l-2 border-accent text-xs space-y-1">
                                <div className="text-accent font-bold">Transaction Digest: 0x76a9...8e32</div>
                                <div className="text-white/70">Network: Mainnet</div>
                                <div className="text-white/70">Status: <span className="text-green-500">Success</span></div>
                                <div className="text-white/70">Gas Used: 0.003 SUI</div>
                            </div>
                        </div>
                    </motion.div>
                </div>

            </div>
        </section>
    )
}
