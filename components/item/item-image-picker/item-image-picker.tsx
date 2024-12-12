import { Entypo } from '@expo/vector-icons';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import * as ImagePicker from 'expo-image-picker';
import { useRef } from 'react';
import { Image, View } from 'react-native';

import { AppBottomSheet } from '@/components/app-bottom-sheet';
import { AppLoader } from '@/components/app-loader';
import { X } from '@/components/icons/close-icon';
import { Button } from '@/components/ui/button';
import { P } from '@/components/ui/typography';
import { useItemForm } from '@/forms/item/use-item-form';
import { useColorScheme } from '@/hooks/use-color-scheme';
import useI18n from '@/hooks/useI81n';
import { errorToast } from '@/lib/toast';
import { cn } from '@/lib/utils';
import { addLocalFileToFormData } from '@/utils/addLocalFileToFormData';

interface Props {
  onImageChange?: (images: string[]) => void;
}
export const ItemImagePicker = ({ onImageChange }: Props) => {
  const ref = useRef<BottomSheet>(null);
  const { getText } = useI18n();
  const { isDarkColorScheme } = useColorScheme();
  const {
    deleteItemImage,
    deletingItemImage,
    images,
    preview,
    setPreview,
    setImages,
    isPreviewAvailable,
    isPreviewEmpty,
    onClear,
    isNewImage,
    setIsNewImage,
    uploadItemImage,
    uploadingItemImage,
  } = useItemForm();

  const openSheet = () => ref?.current?.expand();

  const closeSheet = () => ref?.current?.close();

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      aspect: [4, 3],
      quality: 1,
      allowsMultipleSelection: true,
      selectionLimit: 4,
      base64: true,
    });
    if (!result.canceled && result.assets[0]) {
      const uris = result.assets.map((img) => img.uri);
      // setPreview((prev) => [...(prev as string[]), ...uris]);
      setPreview(uris);
      const formData = new FormData();

      try {
        uris.forEach((uri) => addLocalFileToFormData(uri, formData, 'files'));
        closeSheet();
        await uploadItemImage(formData)
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
          .catch((error) => {
            setPreview((images as string[]) || (preview as string[]));
            setIsNewImage(false);
            errorToast(error.message);
          });
      } catch (error) {
        setIsNewImage(false);
        errorToast('Failed');
      }
    }
  };

  const takePicture = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      alert(getText('camera_permission_message'));
      return;
    }
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled && result.assets[0]) {
      const uris = result.assets.map((img) => img.uri);
      setPreview((prev) => [...(prev as string[]), ...uris]);
      const formData = new FormData();

      try {
        uris.forEach((uri) => addLocalFileToFormData(uri, formData, 'files'));
        closeSheet();
        await uploadItemImage(formData)
          .then((img) => {
            onImageChange?.(img);
            setImages((prev) => {
              if (!prev) {
                return img.length > 0 ? img : [];
              } else {
                return img.length > 0 ? [...prev, ...img] : prev;
              }
            });
            setIsNewImage(true);
          })
          .catch((error) => {
            setPreview((images as string[]) || (preview as string[]));
            setIsNewImage(false);
            errorToast(error.message);
          });
      } catch (error) {
        setIsNewImage(false);
        errorToast('Failed');
      }
    }
  };

  return (
    <>
      <AppLoader
        className="h-max w-max gap-3 p-3"
        visible={uploadingItemImage || deletingItemImage}>
        {uploadingItemImage && <P>{getText('uploading')}...</P>}
        {deletingItemImage && <P>{getText('deleting')}...</P>}
      </AppLoader>
      <View
        className={cn(
          'h-28 w-full flex-row items-center rounded-md border border-border p-3',
          images && images?.length < 4 ? 'justify-start gap-2' : 'justify-between'
        )}>
        {isPreviewEmpty && <P>{getText('add_images')}</P>}
        {isPreviewAvailable &&
          preview?.map((img, index) => (
            <View className="relative" style={{ width: 80, height: 80 }} key={img + index}>
              <Image
                style={{ width: '100%', height: '100%' }}
                alt={img}
                source={{ uri: img }}
                resizeMode="contain"
                key={index}
              />
              {!uploadingItemImage && isNewImage && (
                <View className="absolute z-20 h-full w-full items-center justify-center">
                  <Button
                    onPress={() => deleteItemImage(img).then(() => onClear?.(img, index))}
                    variant="destructive"
                    className="rounded-full"
                    size="icon">
                    <X color="#fff" />
                  </Button>
                </View>
              )}
            </View>
          ))}
        {(!preview || preview?.length < 4) && (
          <Button
            onPress={openSheet}
            variant="secondary"
            className="ml-auto"
            disabled={uploadingItemImage}
            style={{ height: 80, width: 80 }}>
            <Entypo name="upload" size={40} color={isDarkColorScheme ? 'white' : 'black'} />
          </Button>
        )}
        <AppBottomSheet ref={ref} snapPoints={['20%']} index={-1}>
          <BottomSheetView className="items-stretch justify-center gap-3 p-3">
            <Button onPress={takePicture} variant="secondary">
              <P className="font-semibold">{getText('open_camera')}</P>
            </Button>
            <Button variant="secondary" onPress={pickImage}>
              <P className="font-semibold">{getText('choose_from_gallery')}</P>
            </Button>
          </BottomSheetView>
        </AppBottomSheet>
      </View>
    </>
  );
};
