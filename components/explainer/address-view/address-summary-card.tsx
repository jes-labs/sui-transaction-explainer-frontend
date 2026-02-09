"use client"

import { SummaryData } from "@/types/api"
import { Wallet, ArrowUpRight, ArrowDownLeft } from "lucide-react"

interface AddressSummaryCardProps {
    data: SummaryData
}

export function AddressSummaryCard({ data }: AddressSummaryCardProps) {
    return (
        <div className="w-full bg-card border border-border rounded-xl p-6 md:p-8 shadow-sm">
            <h3 className="text-xl font-bold mb-6 font-[var(--font-bebas)] tracking-wide flex items-center gap-2">
                <Wallet className="w-5 h-5 text-accent" />
                Account Overview
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-background/50 p-4 rounded-lg border border-border/50">
                    <label className="text-xs text-muted-foreground uppercase tracking-wider block mb-1">Total Balance</label>
                    <div className="text-2xl font-mono font-bold text-foreground">
                        {parseFloat(data.balance.totalBalance).toFixed(4)} <span className="text-sm text-muted-foreground">SUI</span>
                    </div>
                </div>

                <div className="bg-background/50 p-4 rounded-lg border border-border/50">
                    <label className="text-xs text-muted-foreground uppercase tracking-wider block mb-1">Gas Spent</label>
                    <div className="text-lg font-mono text-foreground">
                        {data.stats.totalGasSpent}
                    </div>
                </div>

                <div className="bg-background/50 p-4 rounded-lg border border-border/50 col-span-1 md:col-span-2">
                    <label className="text-xs text-muted-foreground uppercase tracking-wider block mb-3">Activity Summary</label>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-green-500/10 rounded-full">
                                <ArrowDownLeft className="w-4 h-4 text-green-500" />
                            </div>
                            <div>
                                <div className="text-xs text-muted-foreground">Received</div>
                                <div className="font-mono text-sm">{data.stats.suiReceived}</div>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-red-500/10 rounded-full">
                                <ArrowUpRight className="w-4 h-4 text-red-500" />
                            </div>
                            <div>
                                <div className="text-xs text-muted-foreground">Sent</div>
                                <div className="font-mono text-sm">{data.stats.suiSent}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
