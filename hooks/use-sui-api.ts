import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import { 
  SummaryData, 
  ActivityData, 
  BalanceData, 
  NftsData, 
  ApiResponse,
  ExplainResponse,
  DetailedResponse,
  PlainResponse,
  FullTransactionDetails,
  GasUsed
} from "@/types/api";

// --- Fetcher Functions ---

const fetchAddressSummary = async (address: string): Promise<SummaryData> => {
  const response = await apiClient.post<ApiResponse<SummaryData>>("/summary", { address });
  return response.data.data;
};

const fetchAddressActivity = async (address: string, limit = 10, includeFailures = true): Promise<ActivityData> => {
  const response = await apiClient.post<ApiResponse<ActivityData>>("/activity", { 
    address, 
    "limit?": limit, 
    "includeFailures?": includeFailures 
  });
  return response.data.data;
};

const fetchAddressBalance = async (address: string): Promise<BalanceData> => {
  const response = await apiClient.post<ApiResponse<BalanceData>>("/balance", { address });
  return response.data.data;
};

const fetchAddressNfts = async (address: string): Promise<NftsData> => {
  const response = await apiClient.post<ApiResponse<NftsData>>("/nfts", { address });
  return response.data.data;
};

// Explain Digest (Basic)
const fetchExplainDigest = async (digest: string): Promise<ExplainResponse> => {
  const response = await apiClient.post<ApiResponse<ExplainResponse>>("/explain", { digest });
  return response.data.data;
};

// Explain Digest (Detailed)
const fetchDetailedDigest = async (digest: string): Promise<DetailedResponse> => {
    const response = await apiClient.post<ApiResponse<DetailedResponse>>("/digest/detailed", { digest });
    return response.data.data;
};

// Explain Digest (Plain English)
const fetchPlainDigest = async (digest: string): Promise<PlainResponse> => {
    const response = await apiClient.post<ApiResponse<PlainResponse>>("/digest/plain", { digest });
    return response.data.data;
};

// --- Hooks ---

export const useSuiAddressSummary = (address: string | null) => {
  return useQuery({
    queryKey: ["address", "summary", address],
    queryFn: () => fetchAddressSummary(address!),
    enabled: !!address && isValidSuiAddress(address),
    staleTime: 1000 * 60, // 1 minute
  });
};

export const useSuiAddressActivity = (address: string | null, limit = 10) => {
  return useQuery({
    queryKey: ["address", "activity", address, limit],
    queryFn: () => fetchAddressActivity(address!, limit),
    enabled: !!address && isValidSuiAddress(address),
    staleTime: 1000 * 30, // 30 seconds
  });
};

export const useSuiAddressBalance = (address: string | null) => {
  return useQuery({
    queryKey: ["address", "balance", address],
    queryFn: () => fetchAddressBalance(address!),
    enabled: !!address && isValidSuiAddress(address),
    staleTime: 1000 * 60, // 1 minute
  });
};

export const useSuiAddressNfts = (address: string | null) => {
  return useQuery({
    queryKey: ["address", "nfts", address],
    queryFn: () => fetchAddressNfts(address!),
    enabled: !!address && isValidSuiAddress(address),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

import { getJsonRpcFullnodeUrl, SuiJsonRpcClient } from '@mysten/sui/jsonRpc';

// Initialize Client (Mainnet)
const suiClient = new SuiJsonRpcClient({ 
    network: 'mainnet',
    url: getJsonRpcFullnodeUrl('mainnet') 
});

export const useSuiTransactionExplain = (digest: string | null): UseQueryResult<FullTransactionDetails, Error> => {
    return useQuery({
        queryKey: ["transaction", "full-explain", digest],
        queryFn: async () => {
            if (!digest) throw new Error("No digest provided");

            // Fetch from all 3 endpoints concurrently AND Fetch full tx from Sui Network
            const [explainRes, detailedRes, plainRes, fullTxRes] = await Promise.allSettled([
                fetchExplainDigest(digest),
                fetchDetailedDigest(digest),
                fetchPlainDigest(digest),
                suiClient.getTransactionBlock({ digest, options: { showInput: true } })
            ]);

            // Helper to get value or null
            const getValue = <T>(result: PromiseSettledResult<T>) => 
                result.status === "fulfilled" ? result.value : null;

            const explainData = getValue(explainRes);
            const detailedData = getValue(detailedRes);
            const plainData = getValue(plainRes);
            const fullTxData = getValue(fullTxRes);

            // Construct FullTransactionDetails with fallback logic
            // We prioritize 'plainData' for narrative, 'explainData' for technicals, 'detailedData' for assets
            
            // Base fields (prefer explainData, fallback to plainData/detailedData)
            const timestamp = explainData?.timestamp || plainData?.timestamp || "Unknown Time";
            
            // Prefer full address from Sui Network, fallback to API
            const sender = fullTxData?.transaction?.data.sender || explainData?.sender || plainData?.sender || "Unknown Sender";
            
            const status = explainData?.status || plainData?.status || "Unknown";

            // Narrative
            const narrative = plainData?.plain_english || explainData?.summary || "No narrative available.";
            const summary = plainData?.simple_summary || detailedData?.summary || "";

            // Gas
            let totalGas = "Unknown";
            let gasBreakdown: GasUsed | undefined = undefined;

            if (explainData?.gasUsed && typeof explainData.gasUsed !== 'string') {
                totalGas = explainData.gasUsed.totalSUI;
                gasBreakdown = explainData.gasUsed;
            } else if (plainData?.gas_used) {
                totalGas = plainData.gas_used;
            } else if (typeof explainData?.gasUsed === 'string') {
                totalGas = explainData.gasUsed;
            }

            return {
                digest: digest,
                timestamp,
                sender,
                status,
                narrative,
                summary,
                gas: {
                    total: totalGas,
                    breakdown: gasBreakdown
                },
                actions: explainData?.actions || [],
                events: explainData?.events || [],
                assets: {
                    nfts: detailedData?.assetBreakdown?.nfts || [],
                    tokens: detailedData?.assetBreakdown?.tokens || []
                },
                details: detailedData?.details || [],
                tips: detailedData?.tips || [],
                objectChanges: explainData?.objects
            };
        },
        enabled: !!digest && isValidSuiDigest(digest),
        staleTime: Infinity,
    });
};

// Helper to determine search type
export const getSearchType = (input: string): "address" | "digest" | "invalid" => {
    if (isValidSuiAddress(input)) return "address";
    if (isValidSuiDigest(input)) return "digest";
    return "invalid";
};

// --- Validators ---

const isValidSuiAddress = (address: string): boolean => {
  return /^0x[a-fA-F0-9]{64}$/.test(address);
};

const isValidSuiDigest = (digest: string): boolean => {
  // Base58 check (simplified length check for now, typically 32-44 chars)
  return /^[1-9A-HJ-NP-Za-km-z]{32,48}$/.test(digest);
};
