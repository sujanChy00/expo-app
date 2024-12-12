import { Link } from 'expo-router';
import { Image, Platform, View, useWindowDimensions } from 'react-native';

import { SuccessBadge } from '../success-badge';
import { Avatar } from '../ui/avatar';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Text } from '../ui/text';
import { P } from '../ui/typography';

import useI18n from '@/hooks/useI81n';
import { IshopDetails } from '@/types/IShop';
import { getAvatarName } from '@/utils/get-avatar-name';

/**
 * @description A React component that renders a header section for a shop, including its name, address, country, photo (if available), and an "Edit Shop" button. It also displays the `ShopLegalInfo` component for legal information.
 * @typedef {Object} IshopDetails
 *
 * @param {Object} props - Component props.
 * @property {IshopDetails} props.shop - Data object containing information about the shop.
 * @returns {JSX.Element} The rendered `ShopHeader` component.
 */
export const ShopHeader = ({ shop }: { shop: IshopDetails }) => {
  const { getText } = useI18n();
  const { width } = useWindowDimensions();
  return (
    <Card className="justify-between gap-3 border-transparent bg-background p-2 shadow-none sm:border-border md:flex-row md:items-end md:gap-0">
      <View className="items-center gap-2 xs:flex-row">
        <View className="relative">
          <Avatar
            alt={shop.shopName}
            className="h-28 w-28 items-center justify-center border border-border">
            {shop.shopPhotoUrl ? (
              <Image
                source={{ uri: shop?.shopPhotoUrl }}
                style={{ height: '100%', width: '100%' }}
              />
            ) : (
              <P className="text-4xl">{getAvatarName(shop.shopName)}</P>
            )}
          </Avatar>
          <SuccessBadge className="absolute -right-2 -top-2 z-10 flex h-10 w-10 flex-row items-center justify-center rounded-full bg-tertiary/10 p-0 xs:hidden">
            <P className="text-tertiary ">{shop.shopCountry}</P>
          </SuccessBadge>
        </View>
        <View className="pt-2 xs:pt-0">
          <P className="text-center font-semibold capitalize xs:text-left">{shop.shopName}</P>
          <P className="pb-2 text-center capitalize xs:text-left sm:pb-0" numberOfLines={10}>
            {shop.shopAddress}
          </P>
          {width >= 576 && (
            <SuccessBadge className="native:w-20 hidden rounded-md bg-tertiary/10 web:w-max xs:flex">
              <P className="text-tertiary">{shop.shopCountry}</P>
            </SuccessBadge>
          )}
        </View>
      </View>
      {Platform.OS === 'web' && (
        <View className="flex-row-reverse items-center justify-center gap-2 pt-3 xs:flex-row xs:justify-end xs:pt-0">
          <Link href={`/shops/${shop.shopId}/edit`} asChild>
            <Button
              className="h-9 rounded-lg"
              style={{ backgroundColor: '#14532d' }}
              variant="tertiary">
              <P className="font-semibold text-white">{getText('edit_shop')}</P>
            </Button>
          </Link>
          <Link href={`/shops/${shop.shopId}/legal-info`} asChild>
            <Button className="rounded-lg" variant="secondary">
              <Text className="text-sm font-semibold">Edit Legal Info</Text>
            </Button>
          </Link>
        </View>
      )}
    </Card>
  );
};
