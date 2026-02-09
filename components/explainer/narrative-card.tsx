"use client"

import { useState } from "react"
import { Check, Copy } from "lucide-react"
import { cn } from "@/lib/utils"

interface NarrativeCardProps {
    narrative: string
    digest: string
    gasUsed: string
    status: string
}

export function NarrativeCard({ narrative, digest, gasUsed, status }: NarrativeCardProps) {
    const [copiedId, setCopiedId] = useState<string | null>(null)

    const copyToClipboard = async (text: string, id: string) => {
        await navigator.clipboard.writeText(text)
        setCopiedId(id)
        setTimeout(() => setCopiedId(null), 2000)
    }

    return (
        <div className="w-full mb-12 bg-card border border-border rounded-xl p-8 md:p-10 shadow-sm hover:shadow-md transition-shadow">
            <div className="mb-6">
                <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
                    Human Summary
                </span>
            </div>

            <h1 className="text-2xl md:text-2xl font-medium text-foreground mb-6 leading-tight font-satoshi">
                {narrative}
            </h1>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 pt-8 border-t border-border">
                <div>
                    <span className="text-xs text-muted-foreground uppercase tracking-wider">
                        Transaction Digest
                    </span>
                    <div className="flex items-center gap-2 mt-2 pt-2">
                        <code className="text-xs font-mono text-accent truncate max-w-[120px] md:max-w-[200px]">
                            {digest}
                        </code>
                        <button
                            onClick={() => copyToClipboard(digest, 'digest')}
                            className="p-1 hover:bg-muted rounded transition-colors"
                            title="Copy Digest"
                        >
                            {copiedId === 'digest' ? (
                                <Check className="w-4 h-4 text-accent" />
                            ) : (
                                <Copy className="w-4 h-4 text-muted-foreground" />
                            )}
                        </button>
                    </div>
                </div>

                <div>
                    <span className="text-xs text-muted-foreground uppercase tracking-wider">
                        Gas Used
                    </span>
                    <p className="text-xl font-semibold text-foreground mt-2 md:pt-2 font-mono">
                        {gasUsed}
                    </p>
                </div>
                <div>
                    <span className="text-xs text-muted-foreground uppercase tracking-wider">
                        Status
                    </span>
                    <div className="flex items-center gap-2 mt-2 pt-2">
                        <div className={cn("w-2 h-2 rounded-full", status === "success" ? "bg-green-500" : "bg-red-500")}></div>
                        <span className="text-foreground font-semibold">
                            {status}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}
