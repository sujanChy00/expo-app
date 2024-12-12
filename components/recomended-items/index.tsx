import { ThumbsUp } from 'lucide-react-native';
import React from 'react';
import { View } from 'react-native';

import { H3 } from '../ui/typography';
import { RecommendedItemCard } from './recommended-item-card';
import { RecommendedItemCardSkeleton } from './recommended-item-card-skeleton';

import useI18n from '@/hooks/useI81n';
import { HomeResponse } from '@/types/Ihome';

/**
 * @description A React component that displays a section of recommended items. It adapts the layout based on the screen size:
 *   - On web platforms (widths above 576px), it renders a row of two `RecommendedItemCard` components.
 *   - On mobile platforms (widths below or equal to 576px), it displays a single `RecommendedItemCard` component per row.
 * The component also handles loading states and empty data scenarios.
 *
 * @returns {JSX.Element} The rendered `RecommendedItems` component, or null if there is no data.
 */

interface Props {
  data?: HomeResponse;
  isPending: boolean;
}
export const RecommendedItems = ({ isPending, data }: Props) => {
  const { getText } = useI18n();

  if (isPending)
    return (
      <View className="flex gap-y-5 pb-10 web:md:hidden">
        <View className="flex-row items-center gap-2">
          <H3>{getText('my_recommended_items')}</H3>
          <ThumbsUp color="#16a34a" />
        </View>
        <RecommendedItemCardSkeleton />
      </View>
    );

  if (!data || data.recommendedItems?.length === 0) return null;

  return (
    <View className="flex flex-1 gap-y-5 pb-10 web:md:hidden">
      <View className="flex-row items-center gap-2">
        <H3>{getText('my_recommended_items')}</H3>
        <ThumbsUp color="#16a34a" />
      </View>
      {data.recommendedItems.map((item) => (
        <RecommendedItemCard item={item} key={item.itemId} />
      ))}
    </View>
  );
};
