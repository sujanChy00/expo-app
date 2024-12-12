import { useRouter } from 'expo-router';
import { Truck } from 'lucide-react-native';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';

import { Card, CardContent, CardHeader } from '../ui/card';
import { Separator } from '../ui/separator';
import { P } from '../ui/typography';

import { useWindow } from '@/hooks/use-window';
import useI18n from '@/hooks/useI81n';
import { IshippingFee } from '@/types/IshippingFee';

/**
 * @description A React component that renders a detailed card for a shipping fee,
 * including origin and destination areas, weight, and fees for frozen, dry, and cool temperature categories.
 * Clicking the card navigates to the shipping fee details page. The card's width adapts to the available screen size.
 * @typedef {Object} IshippingFee
 *
 * @param {Object} props - Component props.
 * @property {IshippingFee} props.shippingFee - Data object containing information about the shipping fee.
 * @returns {JSX.Element} The rendered `ShippingFeeCard` component.
 */

export const ShippingFeeCard = ({ shippingFee }: { shippingFee: IshippingFee }) => {
  const { getText } = useI18n();
  const { dataCardStyle } = useWindow();
  const router = useRouter();

  return (
    <TouchableOpacity
      onPress={() => router.push(`/shipping-fee/${shippingFee?.sellerShippingId}`)}
      style={dataCardStyle}>
      <Card className="p-4">
        <CardHeader className="flex-row items-center justify-between gap-x-2 p-0">
          <P className="text-sm font-medium">{shippingFee?.sellerShippingFromArea}</P>
          <View className="flex-1 items-center">
            <Truck color="#095086" />
            <View className="w-full border-b border-dashed border-b-border dark:border-gray-500" />
          </View>
          <P className="text-sm font-medium">{shippingFee?.sellerShippingToArea}</P>
        </CardHeader>
        <CardContent className="gap-y-1 p-0 pt-3">
          <P className="text-center text-sm font-medium">
            {getText('weight')}-{shippingFee?.sellerShippingWeight}
          </P>
          <View className="flex-row items-center justify-between divide-x divide-border overflow-hidden rounded-md border border-border dark:divide-gray-500 dark:border-gray-500">
            <View className="flex-1 items-center  gap-y-2 p-1">
              <P className="text-xs font-semibold">{getText('frozen')}</P>
              <P className="text-xs font-semibold">
                {shippingFee?.sellerShippingFrozenShippingFee}
              </P>
            </View>
            <Separator orientation="vertical" />
            <View className="flex-1 items-center gap-y-2">
              <P className="text-xs font-semibold">{getText('dry')}</P>
              <P className="text-xs font-semibold">{shippingFee?.sellerShippingFee}</P>
            </View>
            <Separator orientation="vertical" />
            <View className="flex-1 items-center gap-y-2 p-1">
              <P className="text-xs font-semibold">{getText('cool')}</P>
              <P className="text-xs font-semibold">{shippingFee?.sellerCoolShippingFee}</P>
            </View>
          </View>
        </CardContent>
      </Card>
    </TouchableOpacity>
  );
};
