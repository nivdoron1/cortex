import { Box, TextField, Button } from '@mui/material';
import { useState, useRef } from 'react';
import type { TrafficFilter } from './types';
import { trafficFilterSchema } from './schemas';

interface Props {
  onFilter: (filters: TrafficFilter) => void;
  onClear: () => void;
}

const TrafficFilters: React.FC<Props> = ({ onFilter, onClear }) => {
  const [fromDate, setFromDate] = useState<string>('');
  const [toDate, setToDate] = useState<string>('');
  const [minVisits, setMinVisits] = useState<number | undefined>(undefined);
  const [maxVisits, setMaxVisits] = useState<number | undefined>(undefined);
  const [error, setError] = useState<string | null>(null);

  const previousFilterRef = useRef<TrafficFilter>({});

  const handleApply = () => {
    const newFilters: TrafficFilter = {
      fromDate: fromDate || undefined,
      toDate: toDate || undefined,
      minVisits,
      maxVisits,
    };

    const result = trafficFilterSchema.safeParse(newFilters);

    if (!result.success) {
      const firstError = result.error.errors[0]?.message || 'Invalid filter';
      setError(firstError);
      return;
    }

    const prev = previousFilterRef.current;
    const changed =
      prev.fromDate !== newFilters.fromDate ||
      prev.toDate !== newFilters.toDate ||
      prev.minVisits !== newFilters.minVisits ||
      prev.maxVisits !== newFilters.maxVisits;

    if (changed) {
      previousFilterRef.current = newFilters;
      setError(null);
      onFilter(newFilters);
    }
  };

  const handleClear = () => {
    const isAlreadyEmpty = !fromDate && !toDate && minVisits === undefined && maxVisits === undefined;

    if (isAlreadyEmpty) return;

    setFromDate('');
    setToDate('');
    setMinVisits(undefined);
    setMaxVisits(undefined);
    setError(null);
    previousFilterRef.current = {};
    onClear();
  };

  return (
    <Box display="flex" alignItems="center" gap={2} mb={2} flexWrap="wrap">
      <TextField
        type="date"
        label="From"
        InputLabelProps={{ shrink: true }}
        value={fromDate}
        onChange={(e) => setFromDate(e.target.value)}
        error={Boolean(error?.includes('From'))}
      />
      <TextField
        type="date"
        label="To"
        InputLabelProps={{ shrink: true }}
        value={toDate}
        onChange={(e) => setToDate(e.target.value)}
        error={Boolean(error?.includes('To'))}
        helperText={error?.includes('date') ? error : ''}
      />
      <TextField
        type="number"
        label="Min Visits"
        value={minVisits ?? ''}
        onChange={(e) => setMinVisits(e.target.value ? Number(e.target.value) : undefined)}
        error={Boolean(error?.includes('Min'))}
        helperText={error?.includes('Min') ? error : ''}
      />
      <TextField
        type="number"
        label="Max Visits"
        value={maxVisits ?? ''}
        onChange={(e) => setMaxVisits(e.target.value ? Number(e.target.value) : undefined)}
        error={Boolean(error?.includes('Max'))}
        helperText={error?.includes('Max') ? error : ''}
      />
      <Button variant="contained" onClick={handleApply}>
        Apply
      </Button>
      <Button onClick={handleClear}>
        Clear
      </Button>
    </Box>
  );
};

export default TrafficFilters;
