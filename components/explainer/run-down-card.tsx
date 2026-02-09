import { Copy, Check } from "lucide-react"
import { useState } from "react"

interface RunDownCardProps {
    type: string;
    initiator: string;
    contract?: string;
    assets?: string[];
}

export function RunDownCard({ type, initiator, contract, assets }: RunDownCardProps) {
    const [copied, setCopied] = useState(false)

    const handleCopy = () => {
        if (!initiator) return
        navigator.clipboard.writeText(initiator)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <div className="w-full bg-card border border-border rounded-xl p-6 md:p-8 shadow-sm">
            <h3 className="text-xl font-bold mb-6 font-[var(--font-bebas)] tracking-wide">Transaction Details</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div>
                    <label className="text-xs text-muted-foreground uppercase tracking-wider block mb-2">Type</label>
                    <div className="font-mono text-sm">{type}</div>
                </div>

                <div>
                    <label className="text-xs text-muted-foreground uppercase tracking-wider block mb-2">Initiator</label>
                    <div
                        className="flex items-center gap-2 cursor-pointer group hover:bg-muted/50 p-1 -ml-1 rounded transition-colors"
                        onClick={handleCopy}
                        title="Click to copy address"
                    >
                        <code className="font-mono text-sm text-accent truncate max-w-[150px]">{initiator}</code>
                        {copied ? (
                            <Check className="w-3 h-3 text-green-500 scale-110 transition-all" />
                        ) : (
                            <Copy className="w-3 h-3 text-muted-foreground group-hover:text-foreground transition-colors" />
                        )}
                    </div>
                </div>

                {contract && (
                    <div className="lg:col-span-2">
                        <label className="text-xs text-muted-foreground uppercase tracking-wider block mb-2">Contract Called</label>
                        <div className="font-mono text-sm break-all">{contract}</div>
                    </div>
                )}

                {assets && assets.length > 0 && (
                    <div className="lg:col-span-4 border-t border-border pt-4 mt-2">
                        <label className="text-xs text-muted-foreground uppercase tracking-wider block mb-2">Assets Involved</label>
                        <div className="flex flex-wrap gap-2">
                            {assets.map((asset, i) => (
                                <span key={i} className="px-2 py-1 bg-muted rounded text-xs font-mono">{asset}</span>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
