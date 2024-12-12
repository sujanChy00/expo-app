import { Card, CardHeader } from '../ui/card';
import { Skeleton } from '../ui/skeleton';

import { useWindow } from '@/hooks/use-window';

/**
 * @description A React component that generates a set of skeleton elements (rectangular placeholders with a shimmering effect) to visually represent the layout of shipping fee cards while data is loading. The number of cards can be customized through the `numOfSkeletons` prop.
 * @typedef {Object} Props
 * @property {number} [numOfSkeletons=6] - The number of skeleton placeholders to render. Defaults to 6.

 *
 * @param {Props} props - Component props.
 * @returns {JSX.Element[]} An array of `JSX.Element` representing the rendered skeleton elements.
 */
export const ShippingFeeCardSkeleton = ({ numOfSkeletons = 20 }: { numOfSkeletons?: number }) => {
  const { cardSkeletonStyle } = useWindow();

  return Array.from({ length: numOfSkeletons }).map((_, index) => (
    <Card key={index} style={cardSkeletonStyle}>
      <CardHeader className="flex-row items-center justify-between gap-x-2 p-2.5">
        <Skeleton className="h-2 w-20" />
        <Skeleton className="h-2 w-20" />
      </CardHeader>
      <Skeleton className="h-20 w-full" />
    </Card>
  ));
};
