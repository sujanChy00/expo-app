import { Link } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';

import { ImageModal } from '../image-modal';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Carousel } from '../ui/carousel';
import { P } from '../ui/typography';
import { ItemLikesCount } from './item-likes-count';
import { ItemOptions } from './item-options';
import { ItemThumbnails } from './item-thumbnails';

import { transFormItemDetails } from '@/data/item/get-items-details';
import useI18n from '@/hooks/useI81n';
import { cn } from '@/lib/utils';
import { IItemDescriptionResponse } from '@/types';

type Props = {
  data?: IItemDescriptionResponse;
  itemId: string;
  className?: string;
};
/**
 * @fileoverview A React component for displaying item images with various functionalities like carousel, modal view, and thumbnail selection.
 *
 * @typedef {Object} Props
 * @property {IItemDescriptionResponse} [data] - Data object containing item details and images.
 * @property {string} itemId - The ID of the item.
 *
 * @param {Props} props - Component props.
 * @param {IItemDescriptionResponse} [props.data] - Data object containing item details and images.
 * @param {string} props.itemId - The ID of the item.
 *
 * @returns {JSX.Element} The rendered ItemImages component.
 */
export const ItemImages = ({ data, itemId, className }: Props) => {
  const { canUpdateThumbnail, itemImages } = transFormItemDetails(data);
  const [itemImage, setItemImage] = useState(itemImages?.[0]);
  const { getText } = useI18n();

  useEffect(() => {
    setItemImage(itemImages?.[0]);
  }, [data]);

  return (
    <View className={cn('relative w-full flex-1 gap-y-3 p-0 xs:p-6 sm:w-auto', className)}>
      <Card className="relative z-20 border-transparent bg-background p-2 shadow-none web:md:border-border web:md:bg-card">
        <Link
          asChild
          href={`/items/${itemId}/manage-images`}
          className="absolute right-2 top-2 z-50 hidden md:flex">
          <Button className="rounded-3xl border-4 border-gray-400 dark:border-zinc-900">
            <P className="text-white">{getText('manage_images')}</P>
          </Button>
        </Link>
        {itemImages && itemImages.length > 0 && (
          <Carousel thumbnails={itemImages} data={itemImages} className="flex md:hidden" />
        )}
        <View className={!itemImages || itemImage?.length == 0 ? 'flex' : 'hidden md:flex'}>
          <ImageModal
            thumnails={itemImages}
            alt={data?.itemDetails.itemCategoryName || 'item name'}
            src={itemImage || ''}
            style={{ height: 250, width: '100%' }}
            resizeMode="contain"
          />
        </View>
      </Card>
      <View className="absolute right-2 top-2 z-40 flex md:hidden">
        <ItemOptions />
      </View>
      <ItemLikesCount count={data?.itemLikesCount} />
      {canUpdateThumbnail && (
        <View className="hidden grid-cols-4 flex-row items-center gap-2 md:grid">
          {itemImages?.map((img, i) => (
            <ItemThumbnails
              key={i}
              img={img}
              onPress={() => setItemImage(img)}
              alt={data?.itemDetails.itemCategoryName || 'item name'}
            />
          ))}
        </View>
      )}
    </View>
  );
};
