import { Card, CardContent, CardFooter, CardHeader } from '../ui/card';
import { Skeleton } from '../ui/skeleton';

import { useWindow } from '@/hooks/use-window';

export const VariationCardSkeleton = ({ numOfSkeletons = 10 }: { numOfSkeletons?: number }) => {
  const { width, cardSkeletonStyle } = useWindow();
  return Array.from({ length: numOfSkeletons }).map((_, index) => (
    <Card key={index} className="p-0 shadow-none" style={cardSkeletonStyle}>
      <CardHeader className="flex-row items-center justify-between border-b border-dashed border-b-border p-1.5">
        <Skeleton className="h-2 w-[25%]" />
        <Skeleton className="h-8 w-8 rounded-full" />
      </CardHeader>
      <CardContent className="flex-row items-start justify-between gap-3 p-2 py-4">
        <Skeleton className="h-4 flex-1" />
        <Skeleton className="h-4 flex-1" />
        <Skeleton className="h-4 flex-1" />
      </CardContent>
      <CardFooter className="p-0">
        <Skeleton className="h-10 w-full rounded-t-none" />
      </CardFooter>
    </Card>
  ));
};
