'use client';

import { useEffect, useState } from 'react';

/**
 * A wrapper component that only renders its children on the client side.
 * Useful for avoiding hydration mismatches when using client-side only 
 * values like Math.random() or non-deterministic IDs.
 */
export function ClientOnly({ children }: { children: React.ReactNode }) {
    const [hasMounted, setHasMounted] = useState(false);

    useEffect(() => {
        setHasMounted(true);
    }, []);

    if (!hasMounted) {
        return null;
    }

    return <>{children}</>;
}
