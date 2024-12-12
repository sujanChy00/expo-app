import React from 'react';

import { Skeleton } from '../ui/skeleton';

export const DeliveryTimeCardSkeleton = () => {
  return Array.from({ length: 4 }).map((_, i) => (
    <Skeleton
      style={{
        width: '100%',
        height: 200,
      }}
      key={i}
    />
  ));
};
