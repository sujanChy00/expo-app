import { View } from 'react-native';

import { Card } from '../ui/card';
import { Skeleton } from '../ui/skeleton';

import { cn } from '@/lib/utils';

/**
 * @description A React component that generates a set of skeleton cards (placeholders for content) to visually represent the layout of recommended items while data is loading. The number of cards can be customized through the `numOfSkeletons` prop.
 * @typedef {Object} Props
 * @property {number} [numOfSkeletons=6] - The number of skeleton cards to render. Defaults to 6.

 *
 * @param {Props} props - Component props.
 * @returns {JSX.Element[]} An array of `JSX.Element` representing the rendered skeleton cards.
 */

export const RecommendedItemCardSkeleton = ({
  numOfSkeletons = 6,
}: {
  numOfSkeletons?: number;
}) => {
  return Array.from({ length: numOfSkeletons }).map((_, index) => (
    <Card key={index} className={cn('flex-row items-center gap-2 p-2')}>
      <Skeleton className="rounded-full" style={{ height: 60, width: 60 }} />
      <View className="gap-y-1">
        <Skeleton className="h-2 w-32" />
        <View className="gap-y-0.5">
          <Skeleton className="h-2 w-20" />
          <Skeleton className="h-2 w-20" />
        </View>
      </View>
    </Card>
  ));
};
