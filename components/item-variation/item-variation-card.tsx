import { Link } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { Button } from '../ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '../ui/card';
import { Separator } from '../ui/separator';
import { P } from '../ui/typography';
import { DeleteItemVariation } from './delete-item-variation';

import { X } from '@/components/icons/close-icon';
import { useWindow } from '@/hooks/use-window';
import useI18n from '@/hooks/useI81n';
import { cn } from '@/lib/utils';
import { IItemVaritions } from '@/types';

/**
 * @description A React component that renders a card displaying information about a single item variation, including weight, stock, price, and before-tax price. It also includes a delete button and an "EDIT VARIATION" button.
 *
 * @returns {JSX.Element} The rendered item variation card component.
 */

interface Props {
  variation: IItemVaritions;
  itemId: string;
}

export const ItemVariationCard = ({ variation, itemId }: Props) => {
  const { dataCardStyle, width } = useWindow();
  const { getText } = useI18n();

  return (
    <TouchableOpacity style={dataCardStyle}>
      <Card
        className={cn(
          'shadow-none',
          width > 576 && 'flex-1',
          variation.name.toLowerCase() == 'default' && 'border-primary'
        )}>
        <CardHeader className="flex-row items-center justify-between p-3">
          <P className="font-semibold sm:text-sm">{variation.name.toUpperCase()}</P>
          {variation.name.toLowerCase() != 'default' && (
            <DeleteItemVariation
              className="bg-transparent"
              itemId={itemId}
              variationName={variation.name}>
              <X size={18} className="text-foreground" />
            </DeleteItemVariation>
          )}
        </CardHeader>
        <CardContent className="px-3 py-4">
          <View className="flex-row items-center justify-between divide-x divide-border overflow-hidden rounded-md border border-input p-2 dark:divide-gray-500">
            <View className="flex-1 items-center gap-y-0.5">
              <P className="font-medium sm:text-sm">{getText('weight')}</P>
              <P className="font-semibold sm:text-xs">{variation.weight}</P>
            </View>
            <Separator orientation="vertical" />
            <View className="flex-1 items-center gap-y-0.5">
              <P className="font-medium sm:text-xs">{getText('stock')}</P>
              <P className="font-semibold sm:text-xs">{variation.stock}</P>
            </View>
            <Separator orientation="vertical" />
            <View className="flex-1 items-center gap-y-0.5">
              <P className="font-medium sm:text-xs">{getText('price')}</P>
              <P className="font-semibold sm:text-xs">{variation.price}</P>
            </View>
            <Separator orientation="vertical" />
            <View className="flex-1 items-center gap-y-0.5">
              <P className="font-medium sm:text-xs">{getText('before_tax')}</P>
              <P className="font-semibold sm:text-xs">{variation.beforeTaxPrice}</P>
            </View>
          </View>
        </CardContent>
        <CardFooter className="p-0 pt-4">
          <Link href={`/items/${itemId}/variation/${variation.name}/edit`} asChild>
            <Button className="w-full rounded-t-none">
              <Text className="text-sm font-semibold" style={{ color: 'white' }}>
                {getText('edit_variation')}
              </Text>
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </TouchableOpacity>
  );
};
