import React from 'react';
import { View, ViewProps } from 'react-native';

import { SuccessBadge } from '../success-badge';
import { AnimatedTabContent } from '../ui/animated-tab';
import { Card } from '../ui/card';
import { P } from '../ui/typography';

import useI18n from '@/hooks/useI81n';
import { cn } from '@/lib/utils';
import { ItemDescription } from '@/types';

interface Props extends ViewProps {
  item: ItemDescription;
}

/**
 * @description A React component that displays an item's description and other details based on the current language tab selection.
 * @example
 * ```jsx
 * <ItemTabContentByLan
 *   item={{
 *     language: "en_US",
 *     itemName: "T-Shirt",
 *     itemShippingTime: "3-5 days",
 *     itemTags: ["cotton", "summer"],
 *     itemDesc: "A comfortable and stylish T-shirt...",
 *   }}
 * />
 * @typedef {Object} ItemDescription
 * @property {string} language - The language of the item description.
 * @property {string} itemName - The name of the item.
 * @property {string} itemShippingTime - The shipping time of the item.
 * @property {string[]} [itemTags] - An array of tags associated with the item.
 * @property {string} itemDesc - The description of the item.
 *
 *
 * @param {ItemDescription} item - The item description data object.
 * @returns {JSX.Element} The rendered item tab content component.
 *
 *
 * ```
 */

export const ItemTabContentByLan = ({ item, children, ...props }: Props) => {
  const { getText } = useI18n();
  return (
    <AnimatedTabContent
      {...props}
      className={cn('gap-4 px-3 xs:px-6 web:md:flex-1', props.className)}
      tabValue={item.language}>
      <Card className="gap-y-2 p-3 shadow-none web:flex-1">
        <View className="flex-row items-center gap-2">
          <P className="text-sm font-semibold">{getText('name') + ' :'}</P>
          <P className="flex-1 text-sm font-semibold">{item?.itemName.toUpperCase()}</P>
        </View>
        <View className="gap-y-1">
          <P className="text-sm font-semibold">{getText('description') + ' :'}</P>
          <P className="text-sm">{item?.itemDesc}</P>
        </View>
        {item?.itemTags && item?.itemTags.length > 0 && (
          <View className="flex-1 items-start gap-y-2">
            <P className="text-sm font-semibold">{getText('tags')} : </P>
            <View className="flex-1 flex-row flex-wrap items-center justify-start gap-2">
              {item?.itemTags?.map((tag, i) => <SuccessBadge key={i + tag}>{tag}</SuccessBadge>)}
            </View>
          </View>
        )}
      </Card>
      {children}
    </AnimatedTabContent>
  );
};
