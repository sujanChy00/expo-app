import { Entypo } from '@expo/vector-icons';
import { X } from 'lucide-react-native';
import React from 'react';
import { ActivityIndicator, Image, View } from 'react-native';

import { Button } from '@/components/ui/button';
import { P } from '@/components/ui/typography';
import { useItemForm } from '@/forms/item/use-item-form';
import { useColorScheme } from '@/hooks/use-color-scheme';
import useI18n from '@/hooks/useI81n';
import { errorToast } from '@/lib/toast';
import { handleImageUpload } from '@/utils/handle-image-upload';

interface Props {
  onImageChange?: (images: string[]) => void;
}

/**
 *
 * @deprecated A React component for selecting and displaying images with upload functionality,
 * designed for web platforms.
 *
 * This component provides options to preview selected images, upload new images,
 * and manage uploaded image states.
 *
 * @component
 * @param {object} props - The properties object.
 * @param {(images: string[]) => void} [props.onImageChange] - Callback function triggered on image change.
 * @param {React.Dispatch<React.SetStateAction<string[]>>} props.setPreview - State setter for previewed images.
 */

export const ItemImagePicker = ({ onImageChange }: Props) => {
  const { isDarkColorScheme } = useColorScheme();
  const { getText } = useI18n();
  const {
    deleteItemImage,
    deletingItemImage,
    isPreviewAvailable,
    isPreviewEmpty,
    preview,
    uploadPackageImage,
    uploadingPackageImage,
    onClear,
    setImages,
    setPreview,
    images,
    setIsNewImage,
    isNewImage,
  } = useItemForm();

  return (
    <div className="pt-4">
      <View className="h-28 w-full flex-row items-center justify-center gap-4 rounded-md border border-border p-3">
        {isPreviewEmpty && <P>{getText('add_images')}</P>}
        {isPreviewAvailable &&
          preview?.map((img, index) => (
            <View className="relative" style={{ width: 80, height: 80 }} key={img + index}>
              <Image
                style={{ width: 80, height: 80 }}
                alt={img}
                source={{ uri: img }}
                resizeMode="contain"
                key={index}
              />
              {!uploadingPackageImage && isNewImage && (
                <View className="absolute z-20 h-full w-full items-center justify-center">
                  <Button
                    onPress={() => deleteItemImage(img).then(() => onClear(img, index))}
                    variant="destructive"
                    className="rounded-full"
                    size="icon">
                    {deletingItemImage ? (
                      <ActivityIndicator color="#fff" size="small" />
                    ) : (
                      <X className="text-foreground" />
                    )}
                  </Button>
                </View>
              )}
            </View>
          ))}
        <label
          htmlFor="file"
          className="ml-auto flex h-full w-28 cursor-pointer items-center justify-center rounded-md bg-gray-200 dark:bg-zinc-900">
          {uploadingPackageImage && <ActivityIndicator size={40} />}
          {!uploadingPackageImage && (
            <Entypo name="upload" size={40} color={isDarkColorScheme ? '#fff' : '#000'} />
          )}
        </label>
      </View>
      <input
        disabled={uploadingPackageImage}
        multiple
        onChange={(e) =>
          handleImageUpload(e, {
            onSuccess: (preview, files) => {
              setPreview(preview);
              uploadPackageImage?.(files)
                .then((img) => {
                  onImageChange?.(img);
                  setImages(img);
                  setIsNewImage(true);
                  // setImages((prev: string[] | undefined) => {
                  //   if (!prev) {
                  //     return img.length > 0 ? img : undefined;
                  //   } else {
                  //     return img.length > 0 ? [...prev, ...img] : prev;
                  //   }
                  // });
                })
                .catch(() => {
                  setPreview(images || preview);
                  setIsNewImage(false);
                  errorToast('Failed to upload files');
                });
            },
            onError: (files) => {
              if (files.length > 4) {
                errorToast('You can only select up to 4 images');
              }
            },
          })
        }
        type="file"
        accept="image/png, image/jpeg, image/jpg"
        id="file"
        className="hidden"
      />
    </div>
  );
};
