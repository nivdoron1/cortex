import * as admin from "firebase-admin";
import {PaginationOptions, Pagination, GenericFilter} from "../types";
import {db} from "../db";
import {applyWhereFilters} from "./utils";

export const FirestoreService = <T extends admin.firestore.DocumentData>(collection: string) => {
  return {
    async getAll(options: PaginationOptions = {}): Promise<Pagination<T>> {
      const page = options.page ?? 1;
      const limit = Number(options.limit) ?? 5;
      const orderBy = options.orderBy || "date";
      const direction = options.direction || "desc";
      const filters = options.filters as GenericFilter[] | undefined;

      const baseRef = db.collection(collection);
      let ref = applyWhereFilters(baseRef, filters).orderBy(orderBy, direction);

      // Get total count after applying filters
      const totalSnapshot = await ref.get();
      const totalItems = totalSnapshot.size;
      const totalPages = Math.ceil(totalItems / limit);

      // Handle pagination
      if (options.startAfter) {
        const startDoc = await db.collection(collection).doc(options.startAfter).get();
        if (startDoc.exists) {
          ref = ref.startAfter(startDoc);
        }
      } else if (page > 1) {
        const offset = (page - 1) * limit;
        const offsetSnapshot = await ref.limit(offset).get();
        const lastVisible = offsetSnapshot.docs[offsetSnapshot.docs.length - 1];
        if (lastVisible) {
          ref = ref.startAfter(lastVisible);
        }
      }

      ref = ref.limit(limit);

      const snapshot = await ref.get();
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      } as T & { id: string }));

      return {
        data,
        page,
        totalItems,
        totalPages,
      };
    },
    async getOne(id: string): Promise<T & { id: string }> {
      const doc = await db.collection(collection).doc(id).get();
      if (!doc.exists) throw new Error("Document not found");
      return {
        id: doc.id,
        ...doc.data(),
      } as T & { id: string };
    },

    async create(data: T): Promise<T & { id: string }> {
      const docRef = await db.collection(collection).add(data);
      return {id: docRef.id, ...data};
    },

    async update(id: string, data: Partial<T>): Promise<T & { id: string }> {
      await db.collection(collection).doc(id).update(data);
      return {id, ...(data as T)};
    },

    async remove(id: string): Promise<{ id: string }> {
      await db.collection(collection).doc(id).delete();
      return {id};
    },
    async bulkCreate(docs: T[]): Promise<(T & { id: string })[]> {
      const batch = db.batch();
      const colRef = db.collection(collection);
      const results: (T & { id: string })[] = [];

      docs.forEach((doc) => {
        const docRef = colRef.doc(); // generate ID
        batch.set(docRef, doc);
        results.push({id: docRef.id, ...doc});
      });

      await batch.commit();
      return results;
    },
    async bulkUpdate(docs: { id: string; data: admin.firestore.UpdateData<T> }[]): Promise<(T & { id: string })[]> {
      const batch = db.batch();
      const colRef = db.collection(collection);
      const results: (T & { id: string })[] = [];

      for (const {id, data} of docs) {
        const docRef = colRef.doc(id);
        batch.update(docRef, data);
        results.push({id, ...(data as T)});
      }

      await batch.commit();
      return results;
    },

  };
};
