export type ViewMode = 'daily' | 'weekly' | 'monthly';
export type direction = 'asc' | 'desc';
export interface TrafficFilter  {
    fromDate?: string;
    toDate?: string;
    minVisits?: number;
    maxVisits?: number;
}

