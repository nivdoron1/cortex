import {GenericFilter} from "../types";

export const buildTrafficFilters = (query: Record<string, string | number | undefined>): GenericFilter[] => {
  const filters: GenericFilter[] = [];

  if (query.fromDate) {
    filters.push({field: "date", op: ">=", value: query.fromDate});
  }

  if (query.toDate) {
    filters.push({field: "date", op: "<=", value: query.toDate});
  }

  if (query.minVisits !== undefined) {
    filters.push({field: "visits", op: ">=", value: Number(query.minVisits)});
  }

  if (query.maxVisits !== undefined) {
    filters.push({field: "visits", op: "<=", value: Number(query.maxVisits)});
  }

  return filters;
};
