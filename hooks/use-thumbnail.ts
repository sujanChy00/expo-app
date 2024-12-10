import { useContext } from 'react';
import { withTiming } from 'react-native-reanimated';

import useI18n from './useI81n';

import { useUpdateItemImages } from '@/actions/item';
import { ThumbnailContext } from '@/components/item/thumbnail/thumbnail-provider';
import { errorToast } from '@/lib/toast';

export const useThumbnail = () => {
  const { getText } = useI18n();
  const context = useContext(ThumbnailContext);
  const { mutateAsync, isPending: updatingItemImages } = useUpdateItemImages();
  if (!context) {
    throw new Error('useItemThumbnail must be used within a ItemThumbnailProvider');
  }

  const itemHeight = 160;

  const {
    translateY,
    setImages,
    setEditMode,
    thumbnail,
    images,
    editMode,
    setThumbnail,
    setWebImages,
  } = context;

  const closeOptions = () => (translateY.value = withTiming(150));
  const filterImages = (index: number) => {
    setImages((prev) => {
      const newImages = [...prev];
      newImages.splice(index, 1);
      return newImages;
    });
  };

  const updateImages = (itemId: string) => {
    setEditMode(true);
    if (!thumbnail) {
      setThumbnail(images[0]);
    }

    if (editMode && !!thumbnail) {
      if (!images.find((img) => img == thumbnail)) {
        errorToast(getText('thumbnail_error_message'));

        return;
      }
      mutateAsync({
        images,
        thumbnailImage: thumbnail,
        itemId,
      }).then((res) => {
        setThumbnail(res.thumbnailImage);
        setImages(res.images);
        setWebImages(res.images.map((img, i) => ({ id: i + 1, img })));
        setEditMode(false);
      });
    }
  };

  return {
    closeOptions,
    filterImages,
    itemHeight,
    updateImages,
    updatingItemImages,
    ...context,
  };
};
