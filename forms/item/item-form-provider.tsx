import { UseMutateAsyncFunction } from '@tanstack/react-query';
import { createContext, useState } from 'react';

import { useUploadItemImage } from '@/actions/item';
import { useUpalodPackageImage } from '@/actions/package';
import { IItemDescriptionResponse } from '@/types';

export const ItemFormContext = createContext<{
  data?: IItemDescriptionResponse;
  copy?: boolean;
  uploadPackageImage: UseMutateAsyncFunction<string[], Error, File[], unknown>;
  images?: string[];
  setImages: React.Dispatch<React.SetStateAction<string[]>>;
  isNewImage: boolean;
  setIsNewImage: React.Dispatch<React.SetStateAction<boolean>>;
  uploadingPackageImage: boolean;
  isPreviewEmpty?: boolean;
  isPreviewAvailable?: boolean;
  onClear: (img: string, index: number) => void;
  preview?: string[];
  setPreview: React.Dispatch<React.SetStateAction<string[]>>;
  uploadItemImage: UseMutateAsyncFunction<string[], Error, FormData, unknown>;
  uploadingItemImage: boolean;
}>({
  isNewImage: false,
  setImages: () => {},
  setIsNewImage: () => {},
  setPreview: () => {},
  uploadingPackageImage: false,
  uploadPackageImage: async () => [],
  onClear: () => {},
  uploadItemImage: async () => [],
  uploadingItemImage: false,
});

interface ItemFormProviderProps {
  children: React.ReactNode;
  data?: IItemDescriptionResponse;
  copy?: boolean;
}

export const ItemFormProvider = ({ children, data, copy }: ItemFormProviderProps) => {
  const itemImages = data ? data.itemImages.images : [];
  const [images, setImages] = useState(itemImages);
  const [isNewImage, setIsNewImage] = useState(false);
  const { mutateAsync: uploadPackageImage, isPending: uploadingPackageImage } =
    useUpalodPackageImage();
  const { mutateAsync: uploadItemImage, isPending: uploadingItemImage } = useUploadItemImage();
  const [preview, setPreview] = useState<string[]>(itemImages || []);

  const onClear = (img: string, index: number) => {
    const newPreview = preview.filter((src) => src != img);
    const newImages = images?.filter((_, i) => i != index);
    setImages(newImages);
    setPreview(newPreview);
  };

  const isPreviewEmpty = preview.every((img) => img == '') || preview.length === 0;
  const isPreviewAvailable = preview.length > 0 && preview.some((img) => img !== '');

  return (
    <ItemFormContext.Provider
      value={{
        copy,
        data,
        uploadPackageImage,
        images,
        setImages,
        isNewImage,
        setIsNewImage,
        uploadingPackageImage,
        isPreviewEmpty,
        isPreviewAvailable,
        onClear,
        preview,
        setPreview,
        uploadItemImage,
        uploadingItemImage,
      }}>
      {children}
    </ItemFormContext.Provider>
  );
};
