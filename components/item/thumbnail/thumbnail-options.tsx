import { CheckCheck, GalleryThumbnails, Trash } from 'lucide-react-native';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';

import { Separator } from '../../ui/separator';
import { P } from '../../ui/typography';

import { useThumbnail } from '@/hooks/use-thumbnail';

export const ThumbnailOptions = ({ item, index }: { item: string; index: number }) => {
  const { setThumbnail, filterImages, thumbnail, setWebImages } = useThumbnail();
  const currentThumbnail = thumbnail == item;
  return (
    <>
      <TouchableOpacity
        className="p-2"
        onPress={() => {
          if (currentThumbnail) return;
          setThumbnail(item);
        }}>
        <View className="flex-row items-center justify-between">
          <P className={currentThumbnail ? 'text-foreground' : 'text-gray-500'}>
            {currentThumbnail ? 'Selected Thumbnail' : 'Set as thumbnail'}
          </P>
          {currentThumbnail ? <CheckCheck color="green" /> : <GalleryThumbnails color="gray" />}
        </View>
      </TouchableOpacity>
      {!currentThumbnail && (
        <>
          <Separator className="bg-background" />
          <TouchableOpacity
            className="p-2"
            onPress={() => {
              filterImages(index);
              setWebImages((prev) => {
                return prev.filter((val) => val.img !== item);
              });
            }}>
            <View className="flex-row items-center justify-between">
              <P className="text-red-600">Delete</P>
              <Trash color="#b91c1c" />
            </View>
          </TouchableOpacity>
        </>
      )}
    </>
  );
};
