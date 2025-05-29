import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";

export default function ToastProvider({ children }: { children: React.ReactNode }) {
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);
    return (
        <>
            {children}
            {mounted && <ToastContainer position="top-right" autoClose={3000} newestOnTop />}
        </>
    );
}
  