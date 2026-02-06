"use client"

import { useState } from "react"
import { SearchBanner } from "@/components/explainer/search-banner"
import { NarrativeCard } from "@/components/explainer/narrative-card"
import { RunDownCard } from "@/components/explainer/run-down-card"
import { MermaidCard } from "@/components/explainer/mermaid-card"

import { Navbar } from "@/components/layout/explainer-navbar"
import { StickyFooter } from "@/components/sticky-footer"

export function ExplainerPage() {
    const [network, setNetwork] = useState<"mainnet" | "testnet">("mainnet")

    // Mock data based on the real types we'll use later
    const sampleData = {
        digest: "5D2...9sX",
        status: "Success",
        summary: "Successfully executed a swap of 10 SUI for 450 USDC on Cetus Protocol.",
        gas: "0.0045 SUI",
        type: "Swap",
        initiator: "0x76a9...8e32",
        contract: "0x1e3...a2f::cetus_clmm::swap",
        assets: ["10 SUI", "450 USDC"],
        mermaidGraph: `graph TD
    A["0x76a9..."] --> B["Sui Network"]
    
    B --> C["Status: SUCCESS"]
    B --> D["Gas: 0.0045 SUI"]
    
    C --> Action1["Swapped 10 SUI"]
    C --> Action2["Received 450 USDC"]
    
    style A fill:#4CAF50,color:#fff,stroke-width:0px
    style B fill:#06B6D4,color:#fff,stroke-width:0px
    style C fill:#9C27B0,color:#fff,stroke-width:0px
    style D fill:#FF9800,color:#fff
    style Action1 fill:#2196F3,color:#fff
    style Action2 fill:#2196F3,color:#fff`
    }

    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col">

            <Navbar onNetworkChange={setNetwork} currentNetwork={network} />

            <SearchBanner />

            <main className="max-w-7xl mx-auto px-4 md:px-8 mt-12 space-y-8 flex-1 w-full pb-20">

                {/* 1. Human Narrative Card (Full Width) */}
                <NarrativeCard
                    digest={sampleData.digest}
                    status={sampleData.status}
                    narrative={sampleData.summary}
                    gasUsed={sampleData.gas}
                />

                {/* 2. Run Down Details Card (Full Width) */}
                <RunDownCard
                    type={sampleData.type}
                    initiator={sampleData.initiator}
                    contract={sampleData.contract}
                    assets={sampleData.assets}
                />

                {/* 3. Mermaid Visualization Card (Full Width) */}
                <MermaidCard chart={sampleData.mermaidGraph} />

            </main>

            <StickyFooter />

        </div>
    )
}
