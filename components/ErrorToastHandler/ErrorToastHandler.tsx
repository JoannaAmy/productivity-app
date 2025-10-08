'use client';

import { useEffect } from 'react';
import { toast } from "react-toastify";


export default function ErrorToastHandler({ message }: { message: string }) {

    useEffect(() => {
        toast.error(message);
    }, [message]);

    return null;
}