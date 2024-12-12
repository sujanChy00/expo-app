import { View } from 'react-native';

import { Card, CardHeader } from '../ui/card';
import { Separator } from '../ui/separator';
import { Skeleton } from '../ui/skeleton';

import { useWindow } from '@/hooks/use-window';
import { cn } from '@/lib/utils';

/**
 * @description A React component that renders a skeleton layout for a set number of critical item cards.
 *
 * @typedef {Object} SkeletonProps
 * @property {number} [numOfSkeletons=6] - The number of skeleton cards to render.
 *
 * @param {SkeletonProps} props - Component props.
 *
 * @returns {JSX.Element[]} An array of JSX elements representing the skeleton cards.
 */

export const CriticalItemsCardSkeleton = ({
  numOfSkeletons = 6,
  type,
}: {
  numOfSkeletons?: number;
  type?: 'low-stock';
}) => {
  const { cardSkeletonStyle } = useWindow();

  return Array.from({ length: numOfSkeletons }).map((_, index) => (
    <Card key={index} className="flex-auto p-2" style={cardSkeletonStyle}>
      <CardHeader
        className={cn('flex-row items-start justify-between p-0', type == 'low-stock' && 'pb-3')}>
        <View className="flex-row items-center gap-2">
          <Skeleton
            style={{
              height: 50,
              width: 50,
              borderRadius: 5,
            }}
          />
          <View className="gap-y-1">
            <Skeleton className="h-2 w-28" />
            <Skeleton className="h-2 w-20" />
          </View>
        </View>
        <View className="gap-y-1">
          <Skeleton className="h-2 w-20" />
          <Skeleton className="h-6 w-20 rounded-lg" />
        </View>
      </CardHeader>
      {type == 'low-stock' && (
        <>
          <Separator />
          <View className="p-0 pb-0 pt-3">
            <Skeleton className="h-10 w-full rounded-lg" />
          </View>
        </>
      )}
    </Card>
  ));
};
