import { ArrowRight } from 'lucide-react-native';
import React from 'react';
import { Linking, View } from 'react-native';

import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Separator } from '../ui/separator';
import { P } from '../ui/typography';

import useI18n from '@/hooks/useI81n';
import { IshopDetails } from '@/types/IShop';
import { truncateString } from '@/utils/tuncate-string';

/**
 * @description A React component that renders the shop information section, including shop name,
 * phone number, optional registration number, prefecture, address (truncated to 40 characters),
 * order amount threshold, postal code, and social media links (Facebook and Tiktok) if available.
 * @typedef {Object} IshopDetails
 *
 * @param {Object} props - Component props.
 * @property {IshopDetails} props.shop - Data object containing information about the shop.
 * @returns {JSX.Element} The rendered `ShopInfo` component.
 */
export const ShopInfo = ({ shop }: { shop: IshopDetails }) => {
  const { getText } = useI18n();
  return (
    <View className="w-full flex-1 sm:w-auto">
      <Card className="gap-y-5 bg-background p-2 shadow-none">
        <CardHeader className="items-start p-2 py-5 pb-0">
          <CardTitle>{getText('shop_info')}</CardTitle>
        </CardHeader>
        <CardContent className="gap-3 rounded-lg p-2">
          <View className="flex-row items-center justify-between">
            <P className="text-sm font-semibold">{getText('shop_name')}</P>
            <P className="text-sm font-semibold">{shop.shopName}</P>
          </View>
          <Separator />
          <View className="flex-row items-center justify-between">
            <P className="text-sm font-semibold">{getText('phone_number')}</P>
            <P className="text-sm font-semibold">{shop.shopPhoneNumber}</P>
          </View>
          <Separator />
          {!!shop.shopRegistrationNumber && (
            <>
              <View className="flex-row items-center justify-between">
                <P className="text-sm font-semibold">{getText('shop_registration_number')}</P>
                <P className="text-sm font-semibold">{shop.shopRegistrationNumber}</P>
              </View>
              <Separator />
            </>
          )}
          <View className="flex-row items-center justify-between">
            <P className="text-sm font-semibold">{getText('prefecture')}</P>
            <P className="text-sm font-semibold">{shop.prefecture}</P>
          </View>
          <Separator />
          <View className="flex-row items-start justify-between gap-5">
            <P className="text-sm font-semibold">{getText('address')}</P>
            <P className="text-sm font-semibold">{truncateString(shop.shopAddress, 20)}</P>
          </View>
          <Separator />
          <View className="flex-row items-start justify-between gap-5">
            <P className="text-sm font-semibold">{getText('low_stock_threshold')}</P>
            <P className="text-sm font-semibold">{shop?.lowStockThreshold}</P>
          </View>
          <Separator />
          {!!shop?.expiryThreshold && (
            <>
              <View className="flex-row items-start justify-between gap-5">
                <P className="text-sm font-semibold">{getText('expiry_threshold')}</P>
                <P className="text-sm font-semibold">
                  {shop?.expiryThreshold}{' '}
                  {shop.expiryThreshold > 1 ? getText('days') : getText('day')}
                </P>
              </View>
              <Separator />
            </>
          )}
          <View className="flex-row items-center justify-between">
            <P className="text-sm font-semibold">{getText('minimum_order_amount')}</P>
            <P className="text-sm font-semibold">¥{shop.orderAmount}</P>
          </View>
          <Separator />
          <View className="flex-row items-center justify-between">
            <P className="text-sm font-semibold">{getText('postal_code')}</P>
            <P className="text-sm font-semibold">{shop.shopPostalCode}</P>
          </View>
          {!!shop.shopFacebookUrl && (
            <>
              <Separator />
              <View className="flex-row items-center justify-between">
                <P className="text-sm font-semibold">{getText('shop_facebook_link')}</P>
                <Button
                  variant="link"
                  className="h-auto flex-row gap-1 p-0"
                  onPress={() => Linking.openURL(shop.shopFacebookUrl)}>
                  <P className="text-blue-600">{getText('view')}</P>
                  <ArrowRight size={16} color="#2563eb" />
                </Button>
              </View>
            </>
          )}
          {!!shop.shopTiktokUrl && (
            <>
              <Separator />
              <View className="flex-row items-center justify-between">
                <P className="text-sm font-semibold">{getText('shop_tiktok_link')}</P>
                <Button
                  variant="link"
                  className="h-auto flex-row gap-1 p-0"
                  onPress={() => Linking.openURL(shop.shopTiktokUrl)}>
                  <P className="!text-blue-600">{getText('view')}</P>
                  <ArrowRight size={16} color="#2563eb" />
                </Button>
              </View>
            </>
          )}
          {!!shop.shopIntroduction && (
            <>
              <Separator />
              <View className="gap-3">
                <P className="text-sm font-semibold">{getText('promotional_message')}:</P>
                <P className="text-sm">{shop.shopIntroduction}</P>
              </View>
            </>
          )}
        </CardContent>
      </Card>
    </View>
  );
};
