/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ApiResponse<T> {
  success: boolean;
  data: T;
}

// --- Common Types ---

export interface CoinBalance {
  coinType: string;
  symbol: string;
  balance: string;
  count: number;
}

export interface NftItem {
  name?: string;
  collection?: string;
  url?: string;
  objectId?: string;
  description?: string;
  // Add other fields as discovered/needed
}

export interface ActivityTransaction {
  digest: string;
  timestamp: string;
  summary: string;
  status: "success" | "failure";
  gas?: string; // Sometimes returned as 'Gas: ...' in summary, sometimes explict
}

export interface ExtendedActivityTransaction extends ActivityTransaction {
  type?: "received" | "sent" | string;
  plainEnglish?: string;
  from?: string;
  assets?: {
    nfts: any[];
    tokens: any[];
    sui: string;
  };
  gasUsed?: string;
  value?: string; // present in /api/transactions
}

// --- Endpoint Response Data Types ---

export interface SummaryData {
  address: string;
  formattedAddress: string;
  balance: {
    totalBalance: string;
    coins: CoinBalance[];
  };
  nfts: {
    count: number;
    items: NftItem[];
  };
  recentActivity: {
    totalTransactions: number;
    last10: ActivityTransaction[];
  };
  stats: {
    nftsSent: number;
    nftsReceived: number;
    suiSent: string;
    suiReceived: string;
    totalGasSpent: string;
  };
}

export interface ActivityData {
  address: string;
  formattedAddress?: string;
  totalTransactions?: number;
  count?: number; // In /api/transactions
  transactions: ExtendedActivityTransaction[];
}

export interface BalanceData {
  totalBalance: string;
  coins: CoinBalance[];
}

export interface NftsData {
  address: string;
  count: number;
  nfts: NftItem[];
}

// --- Transaction Explanation Types ---

export interface Action {
  type: string;
  description: string;
  from?: string;
  to?: string;
  amount?: string;
  asset?: string;
  module?: string;
  packageId?: string;
  [key: string]: any;
}

export interface GasUsed {
  computationCost: string;
  storageCost: string;
  storageRebate: string;
  total: string;
  totalSUI: string;
}

// Individual Endpoint Responses
export interface ExplainResponse {
  digest: string;
  summary: string;
  timestamp: string;
  sender: string;
  status: string;
  gasUsed: GasUsed | string; 
  actions?: Action[];
  objects?: {
    created: number;
    mutated: number;
    transferred: number;
    deleted: number;
  };
  events?: any[];
}

export interface DetailedResponse {
    summary: string;
    details: string[];
    assetBreakdown: {
        nfts: any[];
        tokens: any[];
    };
    tips: string[];
}

export interface PlainResponse {
    digest: string;
    plain_english: string;
    simple_summary: string;
    timestamp: string;
    sender: string;
    gas_used: string;
    status: string;
}

// Combined Type for UI
export interface FullTransactionDetails {
    digest: string;
    timestamp: string;
    sender: string;
    status: string;
    
    // Narrative
    narrative: string; // from plain.plain_english
    summary: string;   // from plain.simple_summary
    
    // Gas
    gas: {
        total: string;
        breakdown?: GasUsed;
    };
    
    // Actions & Events
    actions: Action[];
    events: any[];
    
    // Asset Breakdown
    assets: {
        nfts: any[];
        tokens: any[];
    };
    
    // Textual Details
    details: string[];
    tips: string[];
    
    // Object Stats
    objectChanges?: {
        created: number;
        mutated: number;
        transferred: number;
        deleted: number;
    };
}
