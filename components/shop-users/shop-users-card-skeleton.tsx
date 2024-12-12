import { View } from 'react-native';

import { Card, CardHeader } from '../ui/card';
import { Skeleton } from '../ui/skeleton';

import { useWindow } from '@/hooks/use-window';

/**
 * @description A React component that generates a grid of placeholder cards using `Card` and `Skeleton`
 * components to visually indicate loading while data is being fetched.
 * The number of cards can be customized through the `numOfSkeletons` prop.
 * @typedef {Object} Props
 * @property {number} [numOfSkeletons=12] - The number of skeleton elements to render.
 *
 *
 * @param {Props} props - Component props.
 * @returns {JSX.Element} The rendered `ShopUsersCardSkeleton` component.
 */
export const ShopUsersCardSkeleton = ({ numOfSkeletons = 20 }: { numOfSkeletons?: number }) => {
  const { cardSkeletonStyle } = useWindow();

  return Array.from({ length: numOfSkeletons }).map((_, index) => (
    <Card key={index} style={cardSkeletonStyle}>
      <CardHeader className="flex-row items-center justify-between p-2">
        <View className="flex-row items-center gap-2">
          <Skeleton className="h-10 w-10 rounded-full" />
          <View className="gap-y-1">
            <Skeleton className="h-2 w-24" />
            <Skeleton className="h-2 w-20" />
          </View>
        </View>
      </CardHeader>
      <Skeleton className="h-10 w-full rounded-t-none" />
    </Card>
  ));
};
