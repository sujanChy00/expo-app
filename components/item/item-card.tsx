import { useRouter } from 'expo-router';
import { Pressable, View } from 'react-native';

import { DestructiveBadge } from '../destructive-badge';
import { ToggleRecommendedItem } from '../recomended-items/toggle-recommended-item';
import { SuccessBadge } from '../success-badge';
import { Avatar, AvatarImage } from '../ui/avatar';
import { Card, CardContent, CardHeader } from '../ui/card';
import { P } from '../ui/typography';
import { ItemCardFooter } from './item-card-footer';

import { useWindow } from '@/hooks/use-window';
import useI18n from '@/hooks/useI81n';
import { cn } from '@/lib/utils';
import { IItem } from '@/types';
import { getAvatarName } from '@/utils/get-avatar-name';
import { truncateString } from '@/utils/tuncate-string';

/**
 * @description A React component that renders an individual item card with details, pricing, and an option to toggle "recommended" status.
 * @example
 * ```jsx
 * <ItemCard item={{
 *   item_id: "123",
 *   item_name: "T-Shirt",
 *   thumbnail_image_url: "[invalid URL removed]",
 *   // ... other item properties
 * }} />
 *
 * @typedef {Object} IItem
 * @property {string} item_id - The ID of the item.
 * @property {string} item_name - The name of the item.
 * @property {string} thumbnail_image_url - The URL of the item's thumbnail image.
 * @property {number} item_price_before_tax - The price of the item before tax.
 * @property {number} item_marked_price_before_tax (optional) - The marked price of the item before tax (if on sale).
 * @property {number} item_price - The price of the item (including tax).
 * @property {boolean} item_disabled - Whether the item is disabled.
 * @property {number} item_stock - The stock level of the item.
 * @property {boolean} recommended - Whether the item is recommended.
 * @property {IItemVaritions[]} variations (optional) - An array of item variations.
 *
 *
 * @param {ItemCardProps} props - The component props.
 * @returns {JSX.Element} The rendered item card component.
 * ```
 */

export const ItemCard = ({ item }: { item: IItem }) => {
  const router = useRouter();
  const { getText } = useI18n();
  const { dataCardStyle, width } = useWindow();
  return (
    <Pressable onPress={() => router.push(`/items/${item.item_id}`)} style={dataCardStyle}>
      <Card className={cn('relative p-1 dark:bg-background', width > 576 && 'web:flex-1')}>
        <CardHeader className="flex-row items-center gap-x-2 p-1.5">
          <Avatar
            style={{ height: 50, width: 50, borderRadius: 5 }}
            className="items-center justify-center bg-muted"
            alt={item.item_name}>
            {!!item.thumbnail_image_url && (
              <AvatarImage source={{ uri: item.thumbnail_image_url }} />
            )}
            {!item.thumbnail_image_url && <P>{getAvatarName(item.item_name)}</P>}
          </Avatar>
          <View className="flex-1 flex-row items-start justify-between">
            <View>
              <P className="text-sm font-semibold uppercase" style={{ fontSize: 13 }}>
                {truncateString(item?.item_name, 20)}
              </P>
              <View className="flex-row items-center gap-x-2 pt-1">
                <P className="text-sm font-semibold text-red-700" style={{ fontSize: 13 }}>
                  ¥{item.item_price_before_tax}
                </P>
                {item.item_marked_price_before_tax > item.item_price_before_tax && (
                  <P className="text-xs  line-through">¥{item.item_marked_price_before_tax}</P>
                )}
              </View>
              <P className="text-sm" style={{ fontSize: 12 }}>
                ¥{item.item_price} {getText('with_tax')}
              </P>
            </View>
            {item.item_disabled ? (
              <DestructiveBadge className="absolute right-0 top-0 rounded-lg">
                {getText('disabled')}
              </DestructiveBadge>
            ) : (
              <SuccessBadge className="absolute right-0 top-0 rounded-lg">
                {getText('enabled')}
              </SuccessBadge>
            )}
          </View>
        </CardHeader>
        <CardContent className="flex-row items-center justify-between p-1.5">
          <P className="text-sm  font-semibold">
            {getText('stock')}: {item.item_stock}
          </P>
          {!item.item_disabled && (
            <View className="flex-row items-center gap-x-2">
              <P className="text-sm font-semibold">{getText('recommended')}:</P>
              <ToggleRecommendedItem
                disabled={item.item_disabled}
                itemId={item.item_id}
                recommended={item.recommended}
              />
            </View>
          )}
        </CardContent>
        <ItemCardFooter variations={item.variations} />
      </Card>
    </Pressable>
  );
};
