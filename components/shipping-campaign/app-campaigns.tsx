import { FlashList } from '@shopify/flash-list';
import { Link } from 'expo-router';
import { Plus } from 'lucide-react-native';
import { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import Animated, { SlideInDown } from 'react-native-reanimated';

import { FalllBackMesage } from '../fall-back-message';
import { RefreshingIcon } from '../refreshing-icon';
import { Button } from '../ui/button';
import { CampaignCard } from './campaign-card';

import { useGetAllShippingCampaigns } from '@/api/campaign-api';
import { useWindow } from '@/hooks/use-window';
import { generateStyle } from '@/utils/get-styles';

/**
 * @description A React component that renders a list of shipping campaigns in a grid or list layout, adapting to the available screen width:
 *   - On web platforms (widths above 576px), it displays two `CampaignCard` components per row in a grid layout.
 *   - On mobile platforms (widths below or equal to 576px), it presents a single `CampaignCard` component per row in a list layout.
 * The component handles loading states, empty data scenarios, and utilizes `FlashList` for optimized rendering and performance, especially on larger datasets.
 *
 * @returns {JSX.Element} The rendered `AppCampaigns` component.
 */
export const AppCampaigns = () => {
  const [refreshing, setRefreshing] = useState(false);
  const { data: shippingCampaigns, isPending, refetch } = useGetAllShippingCampaigns();
  const { isXs } = useWindow();
  const [numberOfColumns, setNumberOfColumns] = useState(1);

  useEffect(() => {
    setNumberOfColumns(isXs ? 2 : 1);
  }, [isXs]);

  return (
    <View className="flex flex-1 bg-background">
      <RefreshingIcon refreshing={refreshing} />

      <Animated.View
        entering={SlideInDown.duration(500)}
        style={generateStyle(
          {
            position: 'fixed',
            bottom: 16,
            right: 16,
            zIndex: 20,
          },
          {
            position: 'absolute',

            bottom: 20,
            right: 8,
            zIndex: 20,
          }
        )}>
        <Link href="/shipping-campaign/add" asChild>
          <Button className="h-16 w-16 rounded-full bg-green-800" size="icon">
            <Plus size={24} color="white" />
          </Button>
        </Link>
      </Animated.View>
      <FlashList
        refreshing={refreshing}
        onRefresh={() => {
          setRefreshing(true);
          refetch().finally(() => setRefreshing(false));
        }}
        ListEmptyComponent={() => {
          if (isPending)
            return (
              <View className="flex-1 items-center justify-center bg-background">
                <ActivityIndicator size="large" />
              </View>
            );
          return <FalllBackMesage message="No shipping campaigns" className="flex sm:hidden" />;
        }}
        keyboardDismissMode="on-drag"
        estimatedItemSize={100}
        key={numberOfColumns}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={{ height: 15 }} />}
        {...(numberOfColumns > 1 && {
          numColumns: numberOfColumns,
          key: numberOfColumns,
        })}
        keyExtractor={(item, index) => item.shippingCampaignId.toString() + index}
        removeClippedSubviews
        onEndReachedThreshold={0.5}
        data={shippingCampaigns}
        renderItem={({ item }) => <CampaignCard campaign={item} />}
      />
    </View>
  );
};
