"use client"

import { useEffect, useRef } from "react"
import mermaid from "mermaid"

interface MermaidCardProps {
    chart: string;
}

export function MermaidCard({ chart }: MermaidCardProps) {
    const chartRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (chartRef.current && chart) {
            mermaid.initialize({
                startOnLoad: true,
                theme: 'dark',
                securityLevel: 'loose',
                fontFamily: 'var(--font-ibm-plex-mono)'
            })

            const renderChart = async () => {
                try {
                    chartRef.current!.innerHTML = ''
                    const { svg } = await mermaid.render(`mermaid-${Date.now()}`, chart)
                    chartRef.current!.innerHTML = svg
                } catch (error) {
                    console.error("Mermaid rendering failed:", error)
                    chartRef.current!.innerHTML = '<div class="text-red-500 text-sm p-4">Failed to render visualization</div>'
                }
            }

            renderChart()
        }
    }, [chart])

    return (
        <div className="w-full bg-card border border-border rounded-xl p-6 md:p-8 shadow-sm overflow-hidden">
            <h3 className="text-xl font-bold mb-6 font-[var(--font-bebas)] tracking-wide">Flow Visualization</h3>
            <div ref={chartRef} className="w-full overflow-x-auto flex justify-center py-4 text-sm" />
        </div>
    )
}
