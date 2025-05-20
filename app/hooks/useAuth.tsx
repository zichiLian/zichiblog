'use client'
import { useEffect, useState } from 'react';

export function useAuth() {
    const [authState, setAuthState] = useState<{
        isAdmin: boolean;
        isLoading: boolean;
        error?: string;
    }>({
        isAdmin: false,
        isLoading: true
    });

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const res = await fetch('/api/auth/check', {
                    credentials: 'include'
                });

                const data = await res.json();
                setAuthState({
                    isAdmin: data.isAdmin || false,
                    isLoading: false,
                    error: data.error
                });
            } catch (error) {
                setAuthState({
                    isAdmin: false,
                    isLoading: false,
                    error: 'Failed to check auth status'
                });
            }
        };

        checkAuth();
    }, []);

    return authState;
}