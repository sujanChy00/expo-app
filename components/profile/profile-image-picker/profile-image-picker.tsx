import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import * as ImagePicker from 'expo-image-picker';
import { FileUp } from 'lucide-react-native';
import { useRef, useState } from 'react';
import { ActivityIndicator, Image, Keyboard, View } from 'react-native';

import { AppBottomSheet } from '../../app-bottom-sheet';
import { Avatar } from '../../ui/avatar';
import { Button } from '../../ui/button';
import { P } from '../../ui/typography';

import useI18n from '@/hooks/useI81n';
import { useUploadImageAndCall } from '@/hooks/useUploadImageAndCall';
import { getAvatarName } from '@/utils/get-avatar-name';

export type ProfileImagePickerProps = {
  image?: string;
  onUpload?: (img: string) => void;
  alt: string;
  isLoading?: boolean;
};

export const ProfileImagePicker = ({
  onUpload,
  image,
  alt,
  isLoading,
}: ProfileImagePickerProps) => {
  const { isUploading, uploadImage } = useUploadImageAndCall();
  const { getText } = useI18n();
  const [preview, setPreview] = useState(image);
  const ref = useRef<BottomSheet>(null);
  const openSheet = () => {
    Keyboard.isVisible() && Keyboard.dismiss();
    if (ref.current) {
      ref.current.expand();
    }
  };
  const closeSheet = () => {
    if (ref.current) {
      ref.current.close();
    }
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const asset = result.assets[0];
      if (asset) {
        if (asset.uri) {
          setPreview(asset.uri);
          const localUri = asset.uri as string;
          closeSheet();
          uploadImage([localUri], async (imgs) => {
            onUpload && onUpload(imgs[0]);
          });
        }
      }
    }
  };

  const takePicture = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();

    if (status !== 'granted') {
      alert('Sorry, we need camera permissions to make this work!');
      return;
    }

    const result = await ImagePicker.launchCameraAsync();

    if (result.canceled) return;

    const uri = result.assets[0]?.uri;
    setPreview(uri);
    const localUri = uri;
    closeSheet();
    uploadImage([localUri], async (imgs) => {
      onUpload && onUpload(imgs[0]);
    });
  };

  const isPending = isUploading || isLoading;

  return (
    <View className="flex-1 items-center justify-center">
      <View className="relative z-30 flex h-28 w-28 items-center justify-center rounded-full">
        <Avatar
          alt={alt}
          className="flex h-28 w-28 items-center justify-center rounded-full border border-border">
          {preview ? (
            <Image style={{ width: '100%', height: '100%' }} source={{ uri: preview }} />
          ) : (
            <P className="text-4xl text-gray-600">{getAvatarName(alt)}</P>
          )}
        </Avatar>
        <Button
          onPress={openSheet}
          disabled={isPending}
          size="icon"
          className="absolute bottom-0 right-0 z-30 h-12 w-12 rounded-full border-4 border-white bg-border web:hover:opacity-100 dark:border-border dark:bg-background">
          {isPending ? <ActivityIndicator size="small" /> : <FileUp color="#4b5563" size={26} />}
        </Button>
        <AppBottomSheet snapPoints={['20%']} index={-1} ref={ref}>
          <BottomSheetView className="items-stretch justify-center gap-3 p-3">
            <Button onPress={takePicture} variant="secondary">
              <P className="font-sm font-semibold">{getText('open_camera')}</P>
            </Button>
            <Button variant="secondary" onPress={pickImage}>
              <P className="font-sm font-semibold">{getText('choose_from_gallery')}</P>
            </Button>
          </BottomSheetView>
        </AppBottomSheet>
      </View>
    </View>
  );
};
