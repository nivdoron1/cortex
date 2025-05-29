import { useEffect, useRef, useState } from "react";
import type { direction, TrafficFilter } from "./types";
import TrafficTable from "./TrafficTable";
import TrafficChart from "./TrafficChart";
import TrafficForm from "./TrafficForm";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { TrafficApi, type PaginationTraffic, type Traffic } from "~/api/api";
import TrafficFilters from "./TrafficFilters";
import { Config } from "~/config";
import { LinearProgress } from "@mui/material";
import { toast } from "react-toastify";

function TrafficContainer() {
    const [dataPagination, setDataPagination] = useState<PaginationTraffic>();
    const [data, setData] = useState<Traffic[]>([]);
    const [sortKey, setSortKey] = useState<keyof Traffic>("date");
    const [sortDirection, setSortDirection] = useState<direction>("asc");
    const [selectedEntry, setSelectedEntry] = useState<Traffic | null>(null);
    const [formDialogOpen, setFormDialogOpen] = useState<boolean>(false);
    const [page, setPage] = useState<number>(1);
    const [rowsPerPage, setRowsPerPage] = useState<number>(5);
    const [filters, setFilters] = useState<TrafficFilter>({});
    const [loading, setLoading] = useState<boolean>(false);

    const trafficAPIRef = useRef<TrafficApi | null>(new TrafficApi(Config.create().config));

    const fetchData = async () => {
        if (!trafficAPIRef.current) return;
        setLoading(true);
        try {
            const res = await trafficAPIRef.current.getAllTraffic(
                page,
                rowsPerPage,
                sortKey,
                sortDirection,
                JSON.stringify(filters)
            );
            setDataPagination(res.data);
            setData(res.data.data || []);
        } catch (err) {
            console.error("Failed to fetch:", err);
            toast.error("Failed to fetch traffic data");

        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (trafficAPIRef.current) {
            fetchData();
        }
    }, [page, rowsPerPage, filters, sortKey, sortDirection]);

    const handleSubmit = async (entry: Traffic) => {
        if (!trafficAPIRef.current) return;
        setLoading(true);
        try {
            if (entry.id) {
                await trafficAPIRef.current.updateTraffic(entry.id, entry);
                setData((prev) =>
                    prev.map((item) => (item.id === entry.id ? entry : item))
                );
            } else {
                const res = await trafficAPIRef.current.createTraffic(entry);
                const newEntry = res.data as Traffic;
                setData((prev) => [newEntry, ...prev]);
            }
        } catch (err) {
            console.error("Submit failed:", err);
            toast.error("Failed to submit entry! check if you have permission with the admin");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!trafficAPIRef.current) return;
        setLoading(true);
        try {
            await trafficAPIRef.current.deleteTraffic(id);
            setData((prev) => prev.filter((item) => item.id !== id));
        } catch (err) {
            console.error("Delete failed:", err);
            toast.error("Failed to delete entry! check if you have permission with the admin");
        } finally {
            setLoading(false);
        }
    };

    const handleFilter = (filters: TrafficFilter) => {
        setFilters(filters);
        setPage(1);
    };

    const clearFilters = () => {
        setFilters({});
        setPage(1);
    };

    const sortData = (key: keyof Traffic) => {
        const direction = sortKey === key && sortDirection === "asc" ? "desc" : "asc";
        setSortKey(key);
        setSortDirection(direction);
        setPage(1);
    };

    const filteredData = data.filter((entry) => {
        const { date, visits } = entry;
        if (filters.fromDate && date < filters.fromDate) return false;
        if (filters.toDate && date > filters.toDate) return false;
        if (filters.minVisits != null && visits < filters.minVisits) return false;
        if (filters.maxVisits != null && visits > filters.maxVisits) return false;
        return true;
    });

    return (
        <div style={{ padding: "2rem" }}>
            {loading && <LinearProgress sx={{ position: "absolute", top: 0, left: 0, right: 0, zIndex: 9999 }} />}

            <Dialog open={formDialogOpen} onClose={() => setFormDialogOpen(false)} maxWidth="sm" fullWidth>
                <DialogTitle>
                    Edit Entry
                    <IconButton
                        aria-label="close"
                        onClick={() => setFormDialogOpen(false)}
                        sx={{ position: "absolute", right: 8, top: 8 }}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent dividers>
                    <TrafficForm
                        onSubmit={(entry) => {
                            handleSubmit(entry);
                            setFormDialogOpen(false);
                            setSelectedEntry(null);
                        }}
                        selectedEntry={selectedEntry}
                        onClear={() => setSelectedEntry(null)}
                    />
                </DialogContent>
            </Dialog>

            <TrafficFilters onFilter={handleFilter} onClear={clearFilters} />

            <TrafficTable
                data={data}
                sortKey={sortKey}
                sortDirection={sortDirection}
                onSort={sortData}
                onEdit={(entry) => {
                    setSelectedEntry(entry);
                    setFormDialogOpen(true);
                }}
                onDelete={() => handleDelete(selectedEntry?.id ?? "")}
                page={(dataPagination?.page ?? 1) - 1}
                rowsPerPage={rowsPerPage}
                onPageChange={setPage}
                onRowsPerPageChange={(newRows) => {
                    setRowsPerPage(newRows);
                    setPage(1);
                }}
                totalCount={dataPagination?.totalItems ?? 0}
                loading={loading}
            />

            <TrafficChart data={filteredData} loading={loading} />
        </div>
    );
}

export default TrafficContainer;
