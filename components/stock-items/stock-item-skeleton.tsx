import { View } from 'react-native';

import { Card, CardContent, CardHeader } from '../ui/card';
import { Separator } from '../ui/separator';
import { Skeleton } from '../ui/skeleton';
import { P } from '../ui/typography';

import { useWindow } from '@/hooks/use-window';

export const StockItemSkeleton = ({ numOfSkeletons = 20 }: { numOfSkeletons?: number }) => {
  const { cardSkeletonStyle } = useWindow();

  return Array.from({ length: numOfSkeletons }).map((_, index) => (
    <Card key={index} className="flex-auto gap-y-3 p-2" style={cardSkeletonStyle}>
      <CardHeader className="flex-row items-center justify-between p-1.5">
        <View className="flex-1 flex-row items-center gap-2">
          <Skeleton
            style={{
              height: 50,
              width: 50,
              borderRadius: 5,
            }}
          />
          <View className="flex-1 gap-1">
            <Skeleton className="h-3 w-[40%]" />
            <Skeleton className="h-3 w-[20%]" />
          </View>
        </View>
        <Skeleton className="h-9 w-[20%]" />
      </CardHeader>
      <CardContent className="p-0 pb-0 pt-4">
        <Separator />
        <View className="flex-row items-center gap-1 p-2">
          <P className="font-bold">Related Items: </P>
          <View className="flex-row flex-wrap items-center gap-2">
            {[0, 1, 2].map((item) => (
              <Skeleton key={item} className="h-8 w-20 rounded-lg" />
            ))}
          </View>
        </View>
      </CardContent>
    </Card>
  ));
};
