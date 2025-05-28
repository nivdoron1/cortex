import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
import type { ViewMode } from './types';
import type { Traffic } from '~/api/api';
dayjs.extend(isoWeek);


export function aggregateData(
    data: Traffic[],
    mode: ViewMode
): Array<{ date: string; visits: number }> {
    if (mode === 'daily') return data;

    const map = new Map<string, number>();

    for (const entry of data) {
        const d = dayjs(entry.date);
        let key: string;

        if (mode === 'weekly') {
            key = `${d.year()}-W${d.isoWeek().toString().padStart(2, '0')}`;
        } else {
            key = d.format('YYYY-MM');
        }

        map.set(key, (map.get(key) ?? 0) + entry.visits);
    }

    return Array.from(map.entries()).map(([date, visits]) => ({
        date,
        visits,
    }));
}
  
