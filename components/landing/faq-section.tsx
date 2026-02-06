"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, Minus } from "lucide-react"

const faqs = [
    {
        question: "Is SuiLenz free to use?",
        answer: "Yes, SuiLenz is currently in public beta and free for all users. We plan to introduce pro developer features in the future."
    },
    {
        question: "Which networks do you support?",
        answer: "We support both Sui Mainnet and Testnet. You can toggle between networks in the app interface."
    },
    {
        question: "Do you store my data?",
        answer: "No. We process transactions client-side or ephemerally. No personal data or search history is persisted."
    },
    {
        question: "Can I verify the translation?",
        answer: "Absolutely. We provide a 'Raw View' toggle that shows the original JSON RPC response alongside our translation."
    }
]

export function FAQSection() {
    const [openIndex, setOpenIndex] = useState<number | null>(null)

    return (
        <section id="faq" className="py-24 border-t border-border/50 bg-background">
            <div className="max-w-4xl mx-auto px-6 md:px-12">
                <h2 className="font-[var(--font-bebas)] text-4xl md:text-6xl text-foreground mb-12 text-center">
                    FAQ
                </h2>

                <div className="space-y-px bg-border/50 border border-border/50">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className="bg-background overflow-hidden"
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className="w-full flex items-center justify-between p-6 text-left hover:bg-muted/5 transition-colors group"
                                aria-expanded={openIndex === index}
                            >
                                <span className="font-mono text-sm text-foreground uppercase tracking-wider group-hover:text-accent transition-colors">
                                    {faq.question}
                                </span>
                                <span className="text-muted-foreground group-hover:text-foreground transition-colors">
                                    {openIndex === index ? (
                                        <Minus className="w-4 h-4" />
                                    ) : (
                                        <Plus className="w-4 h-4" />
                                    )}
                                </span>
                            </button>

                            <AnimatePresence>
                                {openIndex === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                                    >
                                        <div className="p-6 pt-0 font-sans text-sm text-muted-foreground leading-relaxed max-w-2xl">
                                            {faq.answer}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
