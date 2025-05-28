import { useEffect, useState } from 'react';
import { TextField, Button } from '@mui/material';
import { z } from 'zod';
import { trafficFormSchema, type TrafficFormData } from './schemas';
import type { Traffic } from '~/api/api';

interface Props {
    onSubmit: (entry: Traffic) => void;
    selectedEntry: Traffic | null;
    onClear: () => void;
}

const TrafficForm: React.FC<Props> = ({ onSubmit, selectedEntry, onClear }) => {
    const [form, setForm] = useState<TrafficFormData>({ date: '', visits: 0 });
    const [errors, setErrors] = useState<Partial<Record<keyof TrafficFormData, string>>>({});

    useEffect(() => {
        if (selectedEntry) {
            setForm(selectedEntry);
        } else {
            setForm({ date: '', visits: 0 });
        }
        setErrors({});
    }, [selectedEntry]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: name === 'visits' ? parseInt(value, 10) : value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const validation = trafficFormSchema.safeParse(form);
        if (!validation.success) {
            const fieldErrors: typeof errors = {};
            for (const err of validation.error.errors) {
                const field = err.path[0] as keyof TrafficFormData;
                fieldErrors[field] = err.message;
            }
            setErrors(fieldErrors);
            return;
        }

        const validData = validation.data;
        const newEntry: Traffic = {
            id: validData.id ?? Date.now().toString(),
            date: validData.date,
            visits: validData.visits,
        };

        onSubmit(newEntry);
        setForm({ date: '', visits: 0 });
        setErrors({});
        onClear();
    };

    return (
        <form
            onSubmit={handleSubmit}
            style={{
                marginBottom: '1rem',
                display: 'flex',
                gap: '1rem',
                flexWrap: 'wrap',
            }}
        >
            <TextField
                name="date"
                label="Date"
                type="date"
                value={form.date}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
                required
                error={!!errors.date}
                helperText={errors.date}
            />
            <TextField
                name="visits"
                label="Visits"
                type="number"
                value={form.visits}
                onChange={handleChange}
                required
                error={!!errors.visits}
                helperText={errors.visits}
            />
            <Button variant="contained" type="submit">
                {form.id ? 'Update' : 'Add'}
            </Button>
        </form>
    );
};

export default TrafficForm;
