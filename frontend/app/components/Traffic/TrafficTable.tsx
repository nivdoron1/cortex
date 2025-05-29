import {
    Table, TableBody, TableCell, TableHead, TableRow, TableSortLabel,
    IconButton, TablePagination, Backdrop, CircularProgress
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import type { Traffic } from '~/api/api';

interface Props {
    data: Traffic[];
    sortKey: keyof Traffic;
    sortDirection: 'asc' | 'desc';
    onSort: (key: keyof Traffic) => void;
    onEdit: (entry: Traffic) => void;
    onDelete: (id: string) => void;
    page: number;
    rowsPerPage: number;
    onPageChange: (newPage: number) => void;
    onRowsPerPageChange: (newRowsPerPage: number) => void;
    totalCount: number;
    loading?: boolean;
}

const ROW_HEIGHT = 100;
const MAX_ROWS = 5;

const TrafficTable: React.FC<Props> = ({
    data,
    sortKey,
    sortDirection,
    onSort,
    onEdit,
    onDelete,
    page,
    rowsPerPage,
    onPageChange,
    onRowsPerPageChange,
    totalCount,
    loading = false,
}) => (
    <div style={{ position: 'relative' }}>
        <div style={{ maxHeight: `${ROW_HEIGHT * MAX_ROWS}px`, overflowY: 'auto' }}>
            <Table stickyHeader>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            <TableSortLabel
                                active={sortKey === 'date'}
                                direction={sortDirection}
                                onClick={() => onSort('date')}
                            >
                                Date
                            </TableSortLabel>
                        </TableCell>
                        <TableCell>
                            <TableSortLabel
                                active={sortKey === 'visits'}
                                direction={sortDirection}
                                onClick={() => onSort('visits')}
                            >
                                Visits
                            </TableSortLabel>
                        </TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                {loading ? (
                    <TableBody>
                        {Array.from({ length: rowsPerPage }).map((_, i) => (
                            <TableRow key={`skeleton-${i}`}>
                                <TableCell colSpan={3}>
                                    <div style={{
                                        height: ROW_HEIGHT - 16,
                                        background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
                                        backgroundSize: '200% 100%',
                                        animation: 'loading-skeleton 1.5s infinite',
                                        borderRadius: 4
                                    }} />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                ) : (
                    <TableBody>
                        {data.map((entry) => (
                            <TableRow key={entry.id}>
                                <TableCell>{new Date(entry.date).toISOString().split("T")[0]}</TableCell>
                                <TableCell>{entry.visits}</TableCell>
                                <TableCell>
                                    <IconButton onClick={() => onEdit(entry)}><EditIcon /></IconButton>
                                    <IconButton onClick={() => onDelete(entry.id)}><DeleteIcon /></IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                )}
            </Table>
        </div>

        <TablePagination
            component="div"
            count={totalCount}
            page={page}
            onPageChange={(_ , newPage) => onPageChange(newPage + 1)}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={(e) => onRowsPerPageChange(parseInt(e.target.value, 10))}
            rowsPerPageOptions={[5, 10, 25 , 50 , 100]}
            labelDisplayedRows={({ from, to, count }) => {
                const totalPages = Math.ceil(count / rowsPerPage);
                return `${from}–${to} of ${count} (Page ${page + 1} of ${totalPages})`;
              }}
        />
    </div>
);

export default TrafficTable;
  