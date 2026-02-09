"use client"

import { useState } from "react"
import { SearchBanner } from "@/components/explainer/search-banner"
import { NarrativeCard } from "@/components/explainer/narrative-card"
import { RunDownCard } from "@/components/explainer/run-down-card"
import { MermaidCard } from "@/components/explainer/mermaid-card"
import { AddressSummaryCard } from "@/components/explainer/address-view/address-summary-card"
import { TokenListCard } from "@/components/explainer/address-view/token-list-card"
import { NftListCard } from "@/components/explainer/address-view/nft-list-card"
import { TransactionFeedCard } from "@/components/explainer/address-view/transaction-feed-card"

import { Navbar } from "@/components/layout/explainer-navbar"
import { StickyFooter } from "@/components/sticky-footer"
import {
    useSuiAddressSummary,
    useSuiAddressActivity,
    useSuiAddressBalance,
    useSuiAddressNfts,
    useSuiTransactionExplain,
    getSearchType
} from "@/hooks/use-sui-api"
import { AlertCircle, Loader2 } from "lucide-react"

export function ExplainerPage() {
    const [network, setNetwork] = useState<"mainnet" | "testnet">("mainnet")
    const [searchTerm, setSearchTerm] = useState<string>("")
    const [searchType, setSearchType] = useState<"address" | "digest" | "invalid" | null>(null)
    const [error, setError] = useState<string | null>(null)

    // Address Hooks
    const addressSummary = useSuiAddressSummary(searchType === "address" ? searchTerm : null)
    const addressActivity = useSuiAddressActivity(searchType === "address" ? searchTerm : null)
    const addressBalance = useSuiAddressBalance(searchType === "address" ? searchTerm : null)
    const addressNfts = useSuiAddressNfts(searchType === "address" ? searchTerm : null)

    // Transaction Hook
    const transactionExplain = useSuiTransactionExplain(searchType === "digest" ? searchTerm : null)

    const handleSearch = (term: string) => {
        setError(null)
        setSearchTerm(term)

        if (network === "testnet") {
            // Logic handled in render
            return;
        }

        const type = getSearchType(term)
        setSearchType(type)

        if (type === "invalid") {
            setError("Invalid input. Please enter a valid Sui Address (0x...) or Transaction Digest (Base58).")
        }
    }

    // Determine loading state
    const isLoading = searchType === "address"
        ? (addressSummary.isLoading || addressActivity.isLoading || addressBalance.isLoading || addressNfts.isLoading)
        : (searchType === "digest" ? transactionExplain.isLoading : false)

    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col">

            <Navbar onNetworkChange={setNetwork} currentNetwork={network} />

            <SearchBanner onSearch={handleSearch} isSearching={isLoading} />

            <main className="max-w-7xl mx-auto px-4 md:px-8 mt-12 space-y-8 flex-1 w-full pb-20">

                {/* Testnet Warning */}
                {network === "testnet" && searchTerm && (
                    <div className="w-full p-8 border border-accent/20 bg-accent/5 rounded-xl text-center">
                        <div className="inline-flex items-center justify-center p-3 bg-accent/10 rounded-full mb-4">
                            <AlertCircle className="w-8 h-8 text-accent" />
                        </div>
                        <h2 className="text-2xl font-bold mb-2">Testnet Support Coming Soon</h2>
                        <p className="text-muted-foreground max-w-md mx-auto">
                            We are currently polishing the Testnet experience. Please switch to Mainnet to explore SuiLenz features.
                        </p>
                    </div>
                )}

                {/* Error State */}
                {error && (
                    <div className="w-full p-6 border border-red-500/20 bg-red-500/5 rounded-xl text-center text-red-500">
                        {error}
                    </div>
                )}

                {/* Loading State */}
                {isLoading && !error && network !== "testnet" && (
                    <div className="w-full py-20 flex flex-col items-center justify-center text-muted-foreground">
                        <Loader2 className="w-10 h-10 animate-spin mb-4 text-accent" />
                        <p>Analyzing On-Chain Data...</p>
                    </div>
                )}

                {/* Address View */}
                {searchType === "address" && !isLoading && !error && network === "mainnet" && (
                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        {addressSummary.data && <AddressSummaryCard data={addressSummary.data} />}
                        {addressBalance.data && <TokenListCard coins={addressBalance.data.coins} />}
                        {addressNfts.data && <NftListCard nfts={addressNfts.data.nfts} />}
                        {addressActivity.data && <TransactionFeedCard transactions={addressActivity.data.transactions} />}
                    </div>
                )}

                {/* Transaction Digest View */}
                {searchType === "digest" && !isLoading && !error && network === "mainnet" && transactionExplain.data && (
                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <NarrativeCard
                            digest={transactionExplain.data.digest}
                            status={transactionExplain.data.status}
                            narrative={transactionExplain.data.narrative}
                            gasUsed={transactionExplain.data.gas.total}
                        />

                        <RunDownCard
                            type="Transaction"
                            initiator={transactionExplain.data.sender}
                            contract={
                                transactionExplain.data.actions && transactionExplain.data.actions.length > 0
                                    ? `${transactionExplain.data.actions[0].packageId}::${transactionExplain.data.actions[0].module}`
                                    : undefined
                            }
                            assets={
                                [
                                    ...transactionExplain.data.assets.tokens.map(t => t.symbol || "Token"),
                                    ...transactionExplain.data.assets.nfts.map(n => n.name || "NFT")
                                ]
                            }
                        />

                        {transactionExplain.data.actions && transactionExplain.data.actions.length > 0 && (
                            <MermaidCard chart={`graph TD
                                A["${transactionExplain.data.sender.slice(0, 6)}..."] --> B["Sui Network"]
                                B --> C["Status: ${transactionExplain.data.status}"]
                                ${transactionExplain.data.actions.map((action, i) => `C --> Action${i}["${action.description}"]`).join("\n")}
                             `} />
                        )}
                    </div>
                )}

                {/* Empty State / Initial View */}
                {!searchTerm && !isLoading && !error && (
                    <div className="text-center py-20 opacity-50">
                        <p className="text-xl text-muted-foreground font-[var(--font-bebas)] tracking-wide">
                            Enter an Address or Transaction Digest to begin
                        </p>
                    </div>
                )}

            </main>

            <StickyFooter />

        </div>
    )
}
