import { Copy } from "lucide-react"

interface RunDownCardProps {
    type: string;
    initiator: string;
    contract?: string;
    assets?: string[];
}

export function RunDownCard({ type, initiator, contract, assets }: RunDownCardProps) {
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
                    <div className="flex items-center gap-2">
                        <code className="font-mono text-sm text-accent truncate max-w-[150px]">{initiator}</code>
                        <Copy className="w-3 h-3 text-muted-foreground cursor-pointer hover:text-foreground" />
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
