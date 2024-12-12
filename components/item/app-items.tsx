import { FlashList } from '@shopify/flash-list';
import { useInfiniteQuery } from '@tanstack/react-query';
import { Link, useLocalSearchParams } from 'expo-router';
import { Plus } from 'lucide-react-native';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import Animated, { SlideInDown } from 'react-native-reanimated';

import { FalllBackMesage } from '../fall-back-message';
import { RefreshingIcon } from '../refreshing-icon';
import { Button } from '../ui/button';
import { ItemCard } from './item-card';
import { ItemCardSkeleton } from './item-card-skeleton';
import { SortItems } from './sort-items';

import { getAllItems } from '@/api/item-api';
import { useWindow } from '@/hooks/use-window';
import { useRefreshOnFocus } from '@/hooks/useRefreshOnFocus';
import { cn } from '@/lib/utils';
import { useSelectedShop } from '@/providers/auth-provider';
import { generateClassName, generateStyle } from '@/utils/get-styles';

/**
 * @description A React component that displays a list of items in a grid or list layout, depending on screen size.
 *
 * This component uses `useInfiniteQuery` from React Query to fetch and manage paginated data. It leverages `useWindowDimensions` and `useSelectedShop` hooks to adjust layout and data fetching based on user selection and screen size.
 *
 * @returns {JSX.Element} The rendered app items component.
 */
export const AppItems = ({ className }: { className?: string }) => {
  const { isXs } = useWindow();
  const params = useLocalSearchParams<{
    query?: string;
    order?: string;
    sort?: string;
  }>();
  const { selectedShop } = useSelectedShop();
  const [numberOfColumns, setNumberOfColumns] = useState(1);
  const [refresing, setRefreshing] = useState(false);
  const { data, hasNextPage, refetch, fetchNextPage, isFetchingNextPage, isPending } =
    useInfiniteQuery({
      queryKey: ['infinite-items', selectedShop?.shopId, params],
      queryFn: ({ pageParam = 0 }) =>
        getAllItems(
          {
            size: 20,
            page: pageParam,
            order: params?.order ? Number(params?.order) : undefined,
            sort: params?.sort || 'updated_at',
            q: params?.query,
          },
          selectedShop?.shopId as number
        ),
      enabled: !!selectedShop?.shopId,
      initialPageParam: 0,
      getNextPageParam(res) {
        return res.last ? undefined : res.pageNumber + 1;
      },
    });

  useRefreshOnFocus(refetch);

  useEffect(() => {
    setNumberOfColumns(isXs ? 2 : 1);
  }, [isXs]);

  const items = data?.pages.flatMap((item) => item.content);

  return (
    <View className={cn('flex-1 bg-background', className)}>
      <Animated.View
        entering={SlideInDown.duration(500)}
        style={generateStyle(
          {
            position: 'fixed',
            bottom: 16,
            right: 30,
            zIndex: 20,
          },
          {
            position: 'absolute',
            bottom: 4,
            right: 4,
            zIndex: 20,
          }
        )}>
        <Link
          className={cn(
            'z-10',
            generateClassName('fixed bottom-2 right-1', 'absolute bottom-0 right-1')
          )}
          asChild
          href="/items/add-item">
          <Button className="h-16 w-16 rounded-full bg-green-800" size="icon">
            <Plus size={28} color="#fff" />
          </Button>
        </Link>
      </Animated.View>
      <SortItems />
      <RefreshingIcon refreshing={refresing} />
      <FlashList
        estimatedItemSize={100}
        showsVerticalScrollIndicator={false}
        data={items}
        refreshing={refresing}
        onRefresh={() => {
          setRefreshing(true);
          refetch().then(() => setRefreshing(false));
        }}
        keyboardDismissMode="on-drag"
        ListEmptyComponent={() => {
          if (isPending)
            return (
              <View className="flex-row flex-wrap items-center justify-center gap-4">
                <ItemCardSkeleton />
              </View>
            );
          return <FalllBackMesage message="No items found" />;
        }}
        removeClippedSubviews
        onEndReachedThreshold={0.5}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        keyExtractor={(item) => item.item_id + item.item_name + item.thumbnail_image_url}
        renderItem={({ item }) => <ItemCard key={item.item_id} item={item} />}
        {...(numberOfColumns > 1 && {
          numColumns: numberOfColumns,
          key: numberOfColumns,
        })}
        onEndReached={() => {
          if (hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
          }
        }}
        ListFooterComponentStyle={{
          padding: 10,
          alignItems: 'center',
        }}
        ListFooterComponent={() => {
          if (isFetchingNextPage) {
            return (
              <View className="items-center justify-center py-4">
                <ActivityIndicator />
              </View>
            );
          }
          return null;
        }}
      />
    </View>
  );
};
