import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
} from 'recharts';
import { useState } from 'react';
import { ButtonGroup, Button, Backdrop, CircularProgress } from '@mui/material';
import { aggregateData } from './aggregateData';
import type { Traffic } from '~/api/api';

type ViewMode = 'daily' | 'weekly' | 'monthly';

interface Props {
    data: Traffic[];
    loading?: boolean;
}

const TrafficChart: React.FC<Props> = ({ data,loading = false }) => {
    const [mode, setMode] = useState<ViewMode>('daily');
    const aggregated = aggregateData(data, mode);

    return (
        <div>
            {loading && (
                <Backdrop open sx={{ position: 'absolute', zIndex: 1 }}>
                    <CircularProgress />
                </Backdrop>
            )}
            <ButtonGroup variant="outlined" size="small" sx={{ mb: 2 }}>
                {['daily', 'weekly', 'monthly'].map((view) => (
                    <Button
                        key={view}
                        variant={mode === view ? 'contained' : 'outlined'}
                        onClick={() => setMode(view as ViewMode)}
                    >
                        {view}
                    </Button>
                ))}
            </ButtonGroup>

            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={aggregated}>
                    <CartesianGrid stroke="#ccc" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="visits" stroke="#1976d2" />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default TrafficChart;
  