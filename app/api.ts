// src/api.ts

import { auth } from "firebase";

export async function secureFetch(path: string, options: RequestInit = {}) {
    const token = await auth.currentUser?.getIdToken();

    return fetch(path, {
        ...options,
        headers: {
            ...options.headers,
            Authorization: `Bearer ${token}`,
        },
    });
}

