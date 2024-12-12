import { View } from 'react-native';

import { Card, CardContent, CardFooter } from '../ui/card';
import { Separator } from '../ui/separator';
import { Skeleton } from '../ui/skeleton';

import { useWindow } from '@/hooks/use-window';

/**
 * @description A React component that generates a set of skeleton elements to visualize loading states for item cards.
 *
 * @example
 * ```jsx
 * <ItemCardSkeleton /> // Renders 6 skeletons
 * <ItemCardSkeleton numOfSkeletons={3} /> // Renders 3 skeletons
 * @typedef {Object} ItemCardSkeletonProps
 * @property {number} [numOfSkeletons=6] - The number of skeleton elements to render.
 *
 *
 * @param {ItemCardSkeletonProps} props - The component props.
 * @returns {JSX.Element[]} An array of JSX elements representing the rendered item card skeletons.
 *
 *
 * ```
 */
export const ItemCardSkeleton = ({ numOfSkeletons = 20 }: { numOfSkeletons?: number }) => {
  const { cardSkeletonStyle } = useWindow();

  return Array.from({ length: numOfSkeletons }).map((_, index) => (
    <Card key={index} className="flex-auto gap-y-3 p-2" style={cardSkeletonStyle}>
      <CardContent className="flex-row items-start justify-between p-0">
        <View className="flex-row items-center gap-2">
          <Skeleton className="rounded-full" style={{ height: 60, width: 60 }} />
          <View className="gap-y-1">
            <Skeleton className="h-2 w-32" />
            <View className="gap-y-0.5">
              <Skeleton className="h-2 w-20" />
              <Skeleton className="h-2 w-20" />
            </View>
          </View>
        </View>
        <Skeleton className="h-8 w-20 rounded-md" />
      </CardContent>
      <Separator />
      <CardFooter className="justify-between px-0 pb-0">
        <Skeleton className="h-2 w-20" />
        <Skeleton className="h-2 w-20" />
      </CardFooter>
    </Card>
  ));
};
