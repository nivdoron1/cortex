import {GenericFilter} from "../types";

/**
 * Applies an array of Firestore where filters to a query reference.
 *
 * @template T - The type of the Firestore document.
 * @param {FirebaseFirestore.Query<T>} ref - The Firestore query reference.
 * @param {GenericFilter[]} [filters] - An optional array of filters to apply.
 * @return {FirebaseFirestore.Query<T>} The query with the filters applied.
 */
export function applyWhereFilters<T>(
  ref: FirebaseFirestore.Query<T>,
  filters?: GenericFilter[]
): FirebaseFirestore.Query<T> {
  if (!filters) return ref;

  return filters.reduce((query, filter) => {
    return query.where(filter.field, filter.op, filter.value);
  }, ref);
}
