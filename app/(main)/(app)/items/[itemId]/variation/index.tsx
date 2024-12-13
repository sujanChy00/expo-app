import { useGetItemDetail } from '@/api/item-api';
import { FalllBackMesage } from '@/components/fall-back-message';
import { ItemVariationCard } from '@/components/item-variation/item-variation-card';
import { RefreshingIcon } from '@/components/refreshing-icon';
import { Button } from '@/components/ui/button';
import { useWindow } from '@/hooks/use-window';
import { cn } from '@/lib/utils';
import { generateClassName } from '@/utils/get-styles';
import { FlashList } from '@shopify/flash-list';
import { Link, Stack, useLocalSearchParams } from 'expo-router';
import { Plus } from 'lucide-react-native';
import React, { useEffect, useState } from 'react';
import { RefreshControl, View } from 'react-native';
import Animated, { SlideInDown } from 'react-native-reanimated';

const ItemVariation = () => {
  const [refreshing, setRefreshing] = useState(false);
  const { isXs } = useWindow();
  const [numberOfColumns, setNumberOfColumns] = useState(1);
  const { itemId } = useLocalSearchParams<{ itemId: string }>();
  const { data, isPending, refetch } = useGetItemDetail(itemId);

  useEffect(() => {
    setNumberOfColumns(isXs ? 2 : 1);
  }, [isXs]);
  return (
    <View className="flex-1 bg-background p-3 md:p-6">
      <RefreshingIcon refreshing={refreshing} />
      <Stack.Screen
        options={{
          title: 'Variations',
          headerBackTitle: 'back',
        }}
      />
      <FlashList
        ListEmptyComponent={() => {
          if (isPending)
            return <View className="flex-row flex-wrap items-center justify-center gap-4"></View>;

          return <FalllBackMesage message="No variations found" className="web:h-screen" />;
        }}
        refreshing={refreshing}
        onRefresh={() => {
          setRefreshing(true);
          refetch().finally(() => setRefreshing(false));
        }}
        estimatedItemSize={100}
        showsVerticalScrollIndicator={false}
        data={data?.itemDetails.variations}
        {...(numberOfColumns > 1 && {
          numColumns: numberOfColumns,
          key: numberOfColumns,
        })}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => {
              setRefreshing(true);
              refetch().finally(() => {
                setRefreshing(false);
              });
            }}
          />
        }
        keyExtractor={(item, index) => item.weight + index + item.price}
        renderItem={({ item }) => <ItemVariationCard itemId={itemId!} variation={item} />}
        className={'flex bg-background'}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
      />
      <Animated.View
        className={cn(
          'z-20',
          generateClassName('fixed bottom-2 right-2', 'absolute bottom-6 right-6')
        )}
        entering={SlideInDown.duration(500)}>
        <Link asChild href={`/items/${itemId}/variation/add`}>
          <Button className="h-16 w-16 rounded-full" size={'icon'}>
            <Plus color={'white'} />
          </Button>
        </Link>
      </Animated.View>
    </View>
  );
};

export default ItemVariation;
