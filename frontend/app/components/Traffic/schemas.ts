import { z } from 'zod';

export const trafficFilterSchema = z
    .object({
        fromDate: z.string().optional(),
        toDate: z.string().optional(),
        minVisits: z.number().min(0, "Min visits must be ≥ 0").optional(),
        maxVisits: z.number().min(0, "Max visits must be ≥ 0").optional(),
    })
    .refine(
        (data) => {
            if (data.fromDate && data.toDate) {
                return new Date(data.fromDate) <= new Date(data.toDate);
            }
            return true;
        },
        {
            message: "'From' date cannot be after 'To' date",
            path: ['toDate'],
        }
    )
    .refine(
        (data) => {
            if (data.minVisits !== undefined && data.maxVisits !== undefined) {
                return data.minVisits <= data.maxVisits;
            }
            return true;
        },
        {
            message: "Min visits cannot be greater than max visits",
            path: ['maxVisits'],
        }
    );

export const trafficFormSchema = z.object({
    date: z.string().min(1, "Date is required"),
    visits: z.number().min(0, "Visits must be 0 or more"),
    id: z.string().optional(),
});

export type TrafficFormData = z.infer<typeof trafficFormSchema>;
