import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import Animated, { SlideInRight, SlideOutRight } from 'react-native-reanimated';

import { ThumbnailPicker } from './thumbnail-picker';

import { Button } from '@/components/ui/button';
import { P } from '@/components/ui/typography';
import { useThumbnail } from '@/hooks/use-thumbnail';
import useI18n from '@/hooks/useI81n';
import { cn } from '@/lib/utils';

interface Props {
  className?: string;
}

export const ThumbnailActions = ({ className }: Props) => {
  const { itemId } = useLocalSearchParams<{ itemId: string }>();

  const {
    editMode,
    setEditMode,
    updateImages,
    updatingItemImages,
    setImages,
    setWebImages,
    images,
    webImages,
    data,
    setThumbnail,
  } = useThumbnail();
  const router = useRouter();
  const { getText } = useI18n();
  return (
    <View className="items-center justify-end gap-3 py-2 web:sm:flex-row">
      <P className="text-center text-yellow-500">NOTE: you can only add 4 images.</P>
      <View
        className={cn(
          'relative z-50 flex-row items-center justify-end gap-3 rounded-lg',
          className
        )}>
        <Button
          disabled={updatingItemImages}
          onPress={() => {
            if (editMode) {
              setImages(data?.itemImages.images || []);
              setWebImages(webImages);
              setThumbnail(data?.itemImages.thumbnailImage);
              setEditMode(false);
            } else {
              router.back();
            }
          }}
          variant="outline">
          <P className="uppercase">{editMode ? getText('cancel') : getText('back')}</P>
        </Button>
        <Button
          variant="secondary"
          className="relative flex-row items-center gap-2"
          disabled={updatingItemImages}
          onPress={() => updateImages(itemId as string)}>
          {updatingItemImages && <ActivityIndicator size="small" />}
          <P className="uppercase">{editMode ? getText('update') : getText('edit')}</P>
        </Button>
        {!editMode && images.length < 4 && (
          <Animated.View entering={SlideInRight} exiting={SlideOutRight}>
            <ThumbnailPicker />
          </Animated.View>
        )}
      </View>
    </View>
  );
};
