import { Link } from 'expo-router';
import React from 'react';
import { View } from 'react-native';

import { SuccessBadge } from '../success-badge';
import { Avatar } from '../ui/avatar';
import { Button } from '../ui/button';
import { Card, CardFooter, CardHeader } from '../ui/card';
import { P } from '../ui/typography';

import { useWindow } from '@/hooks/use-window';
import useI18n from '@/hooks/useI81n';
import { ISellerShopDetail } from '@/types/IProfile';
import { getAvatarName } from '@/utils/get-avatar-name';

/**
 * @description A React component that renders a detailed card for a shop, including its name, address, assistant country, role, and edit/view buttons. The card's width adapts to the screen size.
 * @typedef {Object} ShopDetail
 *
 * @param {Object} props - Component props.
 * @property {ShopDetail} props.shop - Data object containing information about the shop.
 * @returns {JSX.Element} The rendered `ShopCard` component.
 */
export const ShopCard = ({ shop }: { shop: ISellerShopDetail }) => {
  const { dataCardStyle, width } = useWindow();
  const { getText } = useI18n();
  return (
    <View className="p-1" style={dataCardStyle}>
      <Card className={`justify-between overflow-hidden shadow-none ${width > 576 && 'flex-1'}`}>
        <CardHeader className="relative z-10 flex-row items-end justify-between gap-4 p-4">
          <View className="flex-row items-center gap-2">
            <Avatar
              alt={shop.shopName}
              className="h-20 w-20 items-center justify-center border border-border">
              <P className="text-2xl text-gray-600">{getAvatarName(shop.shopName)}</P>
            </Avatar>
            <View className="flex-auto gap-y-1">
              <P className="font-semibold capitalize">{shop.shopName}</P>
              <P className="w-auto max-w-[90%] text-sm" numberOfLines={10}>
                {shop.shopAddress}
              </P>
            </View>
          </View>
          <SuccessBadge className="absolute right-2 top-2 z-10 rounded-lg">
            {shop.shopAssistantCountry}
          </SuccessBadge>
        </CardHeader>
        <CardFooter className="divide-x divide-border p-0">
          <Link asChild href={`/(main)/(app)/shops/${shop.shopId}/edit`}>
            <Button className="flex-1 rounded-none" variant="secondary">
              <P className="font-semibold">{getText('edit')}</P>
            </Button>
          </Link>
          <Link asChild href={`/(main)/(app)/shops/${shop.shopId}`}>
            <Button className="flex-1 rounded-none">
              <P className="font-semibold text-white">{getText('view')}</P>
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </View>
  );
};
