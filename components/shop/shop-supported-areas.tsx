import React from 'react';
import { View } from 'react-native';

import { SuccessBadge } from '../success-badge';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

import useI18n from '@/hooks/useI81n';
import { ISupportedShopAreas } from '@/types/IShop';

/**
 * @description A React component that displays a list of supported areas for a shop using `SuccessBadge` components.
 * @typedef {Object} ISupportedShopAreas
 *
 * @param {Object} props - Component props.
 * @property {ISupportedShopAreas[]} props.areas - Array of objects containing information about supported areas.
 * @returns {JSX.Element} The rendered `ShopSupportedAreas` component.
 */
export const ShopSupportedAreas = ({ areas }: { areas: ISupportedShopAreas[] }) => {
  const { getText } = useI18n();
  return (
    <View className="w-full pb-5 md:w-auto md:flex-[0.6]">
      <Card className="gap-y-5 bg-background shadow-none">
        <CardHeader className="py-5 pb-0">
          <CardTitle>{getText('supported_areas')}</CardTitle>
        </CardHeader>
        <CardContent className="flex-row flex-wrap items-center gap-1.5 rounded-lg p-3">
          {areas.map((area) => (
            <SuccessBadge className="rounded-md" key={area.id}>
              {area.area}
            </SuccessBadge>
          ))}
        </CardContent>
      </Card>
    </View>
  );
};
