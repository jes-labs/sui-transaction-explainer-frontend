"use client"

import { CoinBalance } from "@/types/api"
import { Coins, ChevronLeft, ChevronRight } from "lucide-react"
import { useState } from "react"

interface TokenListCardProps {
    coins: CoinBalance[]
}

export function TokenListCard({ coins }: TokenListCardProps) {
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 5
    const totalPages = Math.ceil(coins.length / itemsPerPage)

    const paginatedCoins = coins.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    )

    if (!coins || coins.length === 0) return null;

    return (
        <div className="w-full bg-card border border-border rounded-xl p-6 md:p-8 shadow-sm">
            <h3 className="text-xl font-bold mb-6 font-[var(--font-bebas)] tracking-wide flex items-center gap-2">
                <Coins className="w-5 h-5 text-accent" />
                Token Holdings
            </h3>

            <div className="overflow-x-auto">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="border-b border-border/50 text-left">
                            <th className="pb-3 text-xs font-mono text-muted-foreground uppercase tracking-wider">Symbol</th>
                            <th className="pb-3 text-xs font-mono text-muted-foreground uppercase tracking-wider">Balance</th>
                            <th className="pb-3 text-xs font-mono text-muted-foreground uppercase tracking-wider">Type</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border/20">
                        {paginatedCoins.map((coin, index) => (
                            <tr key={index} className="group hover:bg-muted/30 transition-colors">
                                <td className="py-3 font-medium text-foreground">{coin.symbol}</td>
                                <td className="py-3 font-mono">{coin.balance}</td>
                                <td className="py-3 text-muted-foreground font-mono text-xs max-w-[200px] truncate" title={coin.coinType}>
                                    {coin.coinType.split("::").pop()}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
                <div className="flex items-center justify-center gap-4 mt-6">
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
