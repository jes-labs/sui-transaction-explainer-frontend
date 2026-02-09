"use client"

import { ExtendedActivityTransaction } from "@/types/api"
import { AlertCircle, Check, Copy, ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { useState } from "react"

interface TransactionFeedProps {
    transactions: ExtendedActivityTransaction[]
}

export function TransactionFeedCard({ transactions }: TransactionFeedProps) {
    const [currentPage, setCurrentPage] = useState(1)
    const [copiedId, setCopiedId] = useState<string | null>(null)
    const itemsPerPage = 5
    const totalPages = Math.ceil(transactions.length / itemsPerPage)

    const paginatedTransactions = transactions.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    )

    const handleCopy = async (text: string, id: string) => {
        await navigator.clipboard.writeText(text)
        setCopiedId(id)
        setTimeout(() => setCopiedId(null), 2000)
    }

    if (!transactions || transactions.length === 0) return null;

    return (
        <div className="w-full bg-card border border-border rounded-xl p-6 md:p-8 shadow-sm">
            <h3 className="text-xl font-bold mb-6 font-[var(--font-bebas)] tracking-wide">
                Recent Activity
            </h3>

            <div className="space-y-4">
                {paginatedTransactions.map((tx, index) => {
                    const isSuccess = tx.status?.toLowerCase() === "success" || tx.summary?.includes("successful");

                    return (
                        <div key={index} className="flex gap-4 p-4 rounded-lg bg-muted/30 border border-border/50 hover:bg-muted/50 transition-colors">
                            <div className={cn("mt-1 min-w-[32px] h-8 rounded-full flex items-center justify-center shrink-0",
                                isSuccess ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500"
                            )}>
                                {isSuccess ? <Check className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                            </div>

                            <div className="flex-1 space-y-2 min-w-0">
                                <div className="flex items-center gap-2">
                                    <span className="font-mono text-sm font-medium truncate bg-muted px-2 py-0.5 rounded cursor-pointer hover:bg-muted/80 transition-colors" title={tx.digest}>
                                        {tx.digest ? `${tx.digest.slice(0, 6)}...${tx.digest.slice(-4)}` : "Unknown Digest"}
                                    </span>
                                    <button
                                        onClick={() => tx.digest && handleCopy(tx.digest, tx.digest)}
                                        className="text-muted-foreground hover:text-foreground transition-colors p-1"
                                        title="Copy Digest"
                                    >
                                        {copiedId === tx.digest ? (
                                            <Check className="w-3.5 h-3.5 text-green-500" />
                                        ) : (
                                            <Copy className="w-3.5 h-3.5" />
                                        )}
                                    </button>
                                    <span className="text-xs text-muted-foreground ml-auto whitespace-nowrap">
                                        {tx.timestamp || "Unknown Date"}
                                    </span>
                                </div>

                                <p className="text-sm text-muted-foreground leading-relaxed break-words">
                                    {tx.summary}
                                </p>

                                <div className="flex flex-wrap items-center gap-2 pt-1">
                                    <span className={cn("text-xs font-mono px-2 py-0.5 rounded border",
                                        isSuccess
                                            ? "bg-green-500/5 text-green-600 border-green-500/20"
                                            : "bg-red-500/5 text-red-600 border-red-500/20"
                                    )}>
                                        {isSuccess ? "SUCCESS" : "FAILED"}
                                    </span>

                                    {tx.gasUsed && (
                                        <span className="text-xs font-mono text-muted-foreground bg-muted px-2 py-0.5 rounded">
                                            Gas: {tx.gasUsed}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
                <div className="flex items-center justify-center gap-4 mt-8">
                    <button
                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                        className="p-2 rounded-lg hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                    <span className="text-sm font-medium">
                        Page {currentPage} of {totalPages}
                    </span>
                    <button
                        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                        disabled={currentPage === totalPages}
                        className="p-2 rounded-lg hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </div>
            )}
        </div>
    )
}
