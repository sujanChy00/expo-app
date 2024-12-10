import { QueryClient } from '@tanstack/query-core';
import { QueryCache, QueryClientProvider } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

import { useUser } from '@/hooks/use-user';

export function QueryProvider({ children }: { children: React.ReactNode }) {
  const [qc, setQc] = useState<QueryClient | null>(null);
  const { setUser } = useUser();
  useEffect(() => {
    setQc(
      new QueryClient({
        queryCache: new QueryCache({
          onError(error) {
            // @ts-ignore
            if (error?.status === 'Unauthorized') {
              setUser(null);
            }
          },
        }),
        defaultOptions: {
          queries: {
            retry(failureCount, error) {
              // @ts-ignore
              if (error?.status === 'Unauthorized') {
                setUser(null);
              }
              return failureCount < 2;
            },
            refetchOnWindowFocus: true,
          },
        },
      })
    );
  }, []);
  if (!qc) return null;

  return <QueryClientProvider client={qc}>{children}</QueryClientProvider>;
}
