import { Link, useRouter } from 'expo-router';
import React from 'react';
import { Pressable, View } from 'react-native';

import { ItemStockManagementModal } from '../item/item-stock-management-modal';
import { Avatar, AvatarImage } from '../ui/avatar';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader } from '../ui/card';
import { Separator } from '../ui/separator';
import { P } from '../ui/typography';

import { useWindow } from '@/hooks/use-window';
import useI18n from '@/hooks/useI81n';
import { cn } from '@/lib/utils';
import { IStockItem } from '@/types';
import { getAvatarName } from '@/utils/get-avatar-name';
import { truncateString } from '@/utils/tuncate-string';

export const ItemStockCard = ({ item }: { item: IStockItem }) => {
  const router = useRouter();
  const { getText } = useI18n();
  const { width, dataCardStyle } = useWindow();

  return (
    <View style={dataCardStyle}>
      <Card className={cn('relative p-1 dark:bg-background', width > 576 && 'web:flex-1')}>
        <Pressable onPress={() => router.push(`/items/${item.id}`)}>
          <CardHeader className="flex-row items-center justify-between p-1.5">
            <View className="flex-1 flex-row items-center gap-2">
              <Avatar
                style={{ height: 50, width: 50, borderRadius: 5 }}
                className="items-center justify-center bg-muted"
                alt={item.name}>
                {!!item.thumbnailImage && <AvatarImage source={{ uri: item.thumbnailImage }} />}
                {!item.thumbnailImage && <P>{getAvatarName(item.name)}</P>}
              </Avatar>
              <View className="flex-1">
                <P className="text-sm font-semibold uppercase" style={{ fontSize: 13 }}>
                  {truncateString(item?.name, 20)}
                </P>
                <P className="text-sm  font-semibold" style={{ fontSize: 13 }}>
                  {getText('stock')}: {item.stock}
                </P>
              </View>
            </View>
            <ItemStockManagementModal itemId={item.id} stock={item.stock}>
              <Button size="sm" variant="secondary" className="rounded-lg">
                <P className="">{getText('update_stock')}</P>
              </Button>
            </ItemStockManagementModal>
          </CardHeader>
        </Pressable>
        {item.sharedItems.length > 0 && (
          <CardContent className="p-0 pb-0 pt-4">
            <Separator />
            <View className="flex-row items-center gap-1 p-2">
              <P className="font-bold">Related Items: </P>
              <View className="flex-row flex-wrap items-center gap-2">
                {item.sharedItems.map((item) => (
                  <Badge key={item} className="rounded-lg bg-tertiary-foreground">
                    <Link href={`/items/${item}`} className="text-sm font-medium text-tertiary">
                      {item}
                    </Link>
                  </Badge>
                ))}
              </View>
            </View>
          </CardContent>
        )}
      </Card>
    </View>
  );
};
