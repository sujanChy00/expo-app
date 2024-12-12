import { QueryObserverResult, RefetchOptions } from '@tanstack/react-query';
import { createContext, useEffect, useState } from 'react';
import { useSharedValue } from 'react-native-reanimated';

import { IItemDescriptionResponse } from '@/types';

interface Context {
  translateY: any;
  thumbnail?: string;
  setThumbnail: React.Dispatch<React.SetStateAction<string | undefined>>;
  images: string[];
  setImages: React.Dispatch<React.SetStateAction<string[]>>;
  preview: string[];
  setPreview: React.Dispatch<React.SetStateAction<string[]>>;
  webImages: { id: number; img: string }[];
  setWebImages: React.Dispatch<React.SetStateAction<{ id: number; img: string }[]>>;
  isDragging: any;
  draggedItemIndex: any;
  editMode: boolean;
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
  data?: IItemDescriptionResponse;
  onRefresh?: () => void;
  refreshing: boolean;
}

export const ThumbnailContext = createContext<Context>({
  translateY: undefined,
  isDragging: undefined,
  draggedItemIndex: undefined,
  editMode: false,
  setEditMode: () => {},
  setThumbnail: () => {},
  images: [],
  setImages: () => {},
  preview: [],
  setPreview: () => {},
  webImages: [],
  setWebImages: () => {},
  refreshing: false,
});

export const ThumbnailProvider = ({
  children,
  data,
  refetch,
}: {
  children: React.ReactNode;
  data: IItemDescriptionResponse;
  refetch?: (
    option?: RefetchOptions
  ) => Promise<QueryObserverResult<IItemDescriptionResponse, Error>>;
}) => {
  const items = data?.itemImages?.images
    ? data?.itemImages?.images?.map((img, i) => ({
        id: i + 1,
        img,
      }))
    : [];
  const translateY = useSharedValue(150);
  const [refreshing, setRefreshing] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [thumbnail, setThumbnail] = useState<string | undefined>(data?.itemImages.thumbnailImage);
  const onRefresh = () => {
    setRefreshing(true);
    refetch?.().finally(() => setRefreshing(false));
  };
  const [images, setImages] = useState<string[]>([]);
  const [webImages, setWebImages] = useState(items);
  const [preview, setPreview] = useState<string[]>([]);
  const isDragging = useSharedValue(false);
  const draggedItemIndex = useSharedValue(-1);

  useEffect(() => {
    if (data) {
      const itemImages = data.itemImages.images ? data.itemImages.images : [];
      setImages(itemImages);
    }
  }, [data]);

  return (
    <ThumbnailContext.Provider
      value={{
        translateY,
        setThumbnail,
        thumbnail,
        draggedItemIndex,
        isDragging,
        editMode,
        setEditMode,
        images,
        setImages,
        webImages,
        setWebImages,
        data,
        refreshing,
        onRefresh,
        preview,
        setPreview,
      }}>
      {children}
    </ThumbnailContext.Provider>
  );
};
