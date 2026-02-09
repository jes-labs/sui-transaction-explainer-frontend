"use client"

import { NftItem } from "@/types/api"
import { Image as ImageIcon, Box, ChevronLeft, ChevronRight } from "lucide-react"
import { useState } from "react"
import { useSuiNFTImages } from "@/hooks/use-sui-nfts"

interface NftListCardProps {
    nfts: NftItem[]
}

const NFTImage = ({ src, alt, className }: { src: string, alt: string, className?: string }) => {
    const [error, setError] = useState(false);

    if (error) {
        return (
            <div className={`w-full h-full flex items-center justify-center bg-muted text-muted-foreground ${className}`}>
                <Box className="w-8 h-8 opacity-50" />
            </div>
        );
    }

    // Use standard img tag for maximum compatibility with external/IPFS URLs
    return (
        <img
            src={src}
            alt={alt}
            className={`w-full h-full object-cover ${className || ''}`}
            onError={() => setError(true)}
            loading="lazy"
        />
    );
};

export function NftListCard({ nfts }: NftListCardProps) {
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 8

    // Extract IDs to fetch metadata/images
    const objectIds = nfts.map(n => n.objectId).filter(Boolean) as string[]
    const { data: enrichedNfts, loading } = useSuiNFTImages(objectIds)

    // Merge API data with Enriched data
    const mergedNfts = nfts.map(nft => {
        const enriched = enrichedNfts.find(e => e.id === nft.objectId)
        return {
            ...nft,
            url: enriched?.imageUrl || nft.url,
            name: enriched?.name || nft.name
        }
    })

    const totalPages = Math.ceil(mergedNfts.length / itemsPerPage)

    const paginatedNfts = mergedNfts.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    )

    if (!nfts || nfts.length === 0) return null;

    return (
        <div className="w-full bg-card border border-border rounded-xl p-6 md:p-8 shadow-sm">
            <h3 className="text-xl font-bold mb-6 font-[var(--font-bebas)] tracking-wide flex items-center gap-2">
                <ImageIcon className="w-5 h-5 text-accent" />
                NFT Collections ({nfts.length})
            </h3>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {paginatedNfts.map((nft, index) => (
                    <div key={index} className="bg-background/50 border border-border/50 rounded-lg overflow-hidden group hover:border-accent/50 transition-all">
                        <div className="aspect-square bg-muted flex items-center justify-center relative overflow-hidden">
                            {nft.url ? (
                                <NFTImage
                                    src={nft.url}
                                    alt={nft.name || "NFT"}
                                    className="object-cover transition-transform group-hover:scale-105"
                                />
                            ) : (
                                <Box className="w-10 h-10 text-muted-foreground/30" />
                            )}
                            {loading && !nft.url && (
                                <div className="absolute inset-0 bg-muted/80 flex items-center justify-center">
                                    <div className="w-4 h-4 border-2 border-accent border-t-transparent rounded-full animate-spin"></div>
                                </div>
                            )}
                        </div>
                        <div className="p-3">
                            <div className="font-medium truncate text-sm">{nft.name || "Unknown NFT"}</div>
                            <div className="text-xs text-muted-foreground truncate">{nft.collection || "No Collection"}</div>
                        </div>
                    </div>
                ))}
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
