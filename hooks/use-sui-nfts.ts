import { getJsonRpcFullnodeUrl, SuiJsonRpcClient } from '@mysten/sui/jsonRpc';
import { useState, useEffect } from 'react';

// Initialize Client (Mainnet)
const client = new SuiJsonRpcClient({ 
    network: 'mainnet',
    url: getJsonRpcFullnodeUrl('mainnet') 
});

export interface SuiNftImage {
    id: string;
    imageUrl: string;
    name?: string;
}

export function useSuiNFTImages(objectIds: string[]) {
    const [data, setData] = useState<SuiNftImage[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;
        
        async function fetchImages() {
            if (!objectIds || objectIds.length === 0) {
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                const results = await client.multiGetObjects({
                    ids: objectIds,
                    options: { showDisplay: true }
                });

                if (!isMounted) return;

                const formatted = results.map(res => {
                    const display = res.data?.display?.data;
                    let url = display?.image_url || display?.url || '';

                    // Basic IPFS gateway conversion
                    if (url.startsWith('ipfs://')) {
                        url = url.replace('ipfs://', 'https://ipfs.io/ipfs/');
                    }

                    return {
                        id: res.data?.objectId || '',
                        imageUrl: url,
                        name: display?.name
                    };
                });

                setData(formatted);
            } catch (err) {
                console.error("Failed to fetch Sui NFTs:", err);
            } finally {
                if (isMounted) setLoading(false);
            }
        }

        fetchImages();
        
        return () => {
             isMounted = false;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [JSON.stringify(objectIds)]); 

    return { data, loading };
}
