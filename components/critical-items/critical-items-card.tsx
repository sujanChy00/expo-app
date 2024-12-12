import { useRouter } from 'expo-router';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';

import { DestructiveBadge } from '../destructive-badge';
import { ItemStockManagementModal } from '../item/item-stock-management-modal';
import { SuccessBadge } from '../success-badge';
import { Avatar, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';
import { Card, CardHeader } from '../ui/card';
import { Separator } from '../ui/separator';
import { P } from '../ui/typography';

import { useWindow } from '@/hooks/use-window';
import useI18n from '@/hooks/useI81n';
import { cn } from '@/lib/utils';
import { ILowStockItem } from '@/types';
import { getAvatarName } from '@/utils/get-avatar-name';
import { truncateString } from '@/utils/tuncate-string';

/**
 * @description A React component that renders a critical item card with details and a link.
 *
 * @typedef {Object} ILowStockItem
 * @property {string} itemId - The ID of the item.
 * @property {string} itemName - The name of the item.
 * @property {number} itemStock - The current stock level of the item.
 * @property {string} itemExpiryDateString - The formatted expiry date string of the item.
 * @property {boolean} itemDisabled - Whether the item is disabled or not.
 *
 * @typedef {Object} CriticalItemCardProps
 * @property {ILowStockItem} item - The low stock item object.
 *
 * @param {CriticalItemCardProps} props - Component props.
 *
 * @returns {JSX.Element} The rendered critical item card.
 */
export const CriticalItemsCard = ({ item, type }: { item: ILowStockItem; type?: 'low-stock' }) => {
  const router = useRouter();
  const { dataCardStyle, width } = useWindow();
  const { getText } = useI18n();
  return (
    <TouchableOpacity onPress={() => router.push(`/items/${item.itemId}`)} style={dataCardStyle}>
      <Card className={`p-3 ${width > 576 && 'web:flex-1'}`}>
        <CardHeader
          className={cn('flex-row items-start justify-between p-0', type == 'low-stock' && 'pb-3')}>
          <View className="flex-1 flex-row items-center gap-2">
            <Avatar
              style={{ height: 50, width: 50, borderRadius: 5 }}
              className="items-center justify-center bg-muted"
              alt={item.itemName}>
              {!!item.thumbnailImage && <AvatarImage source={{ uri: item.thumbnailImage }} />}
              {!item.thumbnailImage && <P>{getAvatarName(item.itemName)}</P>}
            </Avatar>
            <View className="flex-1">
              <P className="font-semibold">{truncateString(item.itemName, 20)}</P>
              <P>
                {getText('stock')}: {item.itemStock}
              </P>
            </View>
          </View>
          <View className="gap-y-1">
            <P>{item.itemExpiryDateString}</P>
            {item.itemDisabled ? (
              <DestructiveBadge className="rounded-lg">{getText('disabled')}</DestructiveBadge>
            ) : (
              <SuccessBadge className="rounded-lg">{getText('active')}</SuccessBadge>
            )}
          </View>
        </CardHeader>
        {type == 'low-stock' && (
          <>
            <Separator />
            <View className="p-0 pb-0 pt-3">
              <ItemStockManagementModal itemId={item.itemId} stock={item.itemStock}>
                <Button variant="secondary" className="flex-1 rounded-lg ">
                  <P className="">{getText('update_stock')}</P>
                </Button>
              </ItemStockManagementModal>
            </View>
          </>
        )}
      </Card>
    </TouchableOpacity>
  );
};
