'use client';

import { useEffect } from 'react';
import { toast } from "react-toastify";

// This component is only responsible for firing the toast
export default function ErrorToastHandler({ message }: { message: string }) {
    
    // Use useEffect to ensure the toast is fired only after mounting on the client
    useEffect(() => {
        toast.error(message);
    }, [message]);
    
    // This component renders nothing, its only job is the side effect (the toast)
    return null; 
}