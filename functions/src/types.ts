type FirestoreOperator = FirebaseFirestore.WhereFilterOp;

export interface PaginationOptions {
    limit?: number;
    page?: number;
    startAfter?: string;
    orderBy?: string;
    direction?: FirebaseFirestore.OrderByDirection;
    filters?: GenericFilter[];
}

export interface Pagination<T> {
    data: (T & { id: string })[];
    page: number;
    totalItems: number;
    totalPages: number;
}
export interface GenericFilter {
    field: string;
    op: FirestoreOperator;
    value: string | number |undefined;
  }
