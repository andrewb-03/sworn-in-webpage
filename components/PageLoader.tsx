'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export default function PageLoader() {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 400);
    return () => clearTimeout(timer);
  }, [pathname]);

  if (!loading) return null;

  return (
    <div
      aria-hidden="true"
      style={{
        position:   'fixed',
        top:        0,
        left:       0,
        right:      0,
        height:     2,
        background: 'var(--orange, #E8621A)',
        zIndex:     9999,
        animation:  'pageload 0.4s ease-out forwards',
      }}
    >
      <style>{`
        @keyframes pageload {
          from { width: 0%; opacity: 1; }
          to   { width: 100%; opacity: 0; }
        }
      `}</style>
    </div>
  );
}
