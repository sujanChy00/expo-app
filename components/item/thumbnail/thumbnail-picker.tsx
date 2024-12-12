import { Entypo } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useLocalSearchParams } from 'expo-router';
import { X } from 'lucide-react-native';
import React, { useState } from 'react';
import { ActivityIndicator, Image, TouchableOpacity, View } from 'react-native';
import Animated, { ZoomIn, ZoomOut } from 'react-native-reanimated';

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogTrigger,
} from '../../ui/alert-dialog';
import { Button } from '../../ui/button';
import { P } from '../../ui/typography';

import { useAddItemImages } from '@/actions/item';
import { isweb } from '@/constants/data';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useThumbnail } from '@/hooks/use-thumbnail';
import useI18n from '@/hooks/useI81n';
import { errorToast } from '@/lib/toast';

export const ThumbnailPicker = ({ className }: { className?: string }) => {
  const { itemId } = useLocalSearchParams<{ itemId: string }>();
  const [opened, setOpened] = useState(false);
  const { setImages, setWebImages, images } = useThumbnail();
  const { mutateAsync, isPending } = useAddItemImages();
  const { getText } = useI18n();
  const [preview, setPreview] = useState<string[]>([]);
  const imageLimit = 4 - images.length;

  const onClear = (img: string) => {
    setPreview((prev) => prev.filter((i) => i !== img));
  };

  const onAdd = () => {
    mutateAsync({ itemId: itemId as string, images: preview }).then((res) => {
      setImages(res.images);
      setWebImages?.(res.images.map((img, i) => ({ id: i + 1, img })));
      setOpened(false);
    });
  };

  return (
    <AlertDialog open={opened} onOpenChange={setOpened}>
      <AlertDialogTrigger asChild className={className}>
        <Button>
          <P className="uppercase text-primary-foreground">{getText('add_images')}</P>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="w-[90%] sm:w-[35%]">
        {preview.length > 0 && (
          <View className="flex-row flex-wrap items-center justify-start gap-4">
            {preview.map((uri) => (
              <Animated.View
                key={uri}
                className="relative h-24 w-[30%] rounded-lg"
                entering={ZoomIn}
                exiting={ZoomOut}>
                <Image source={{ uri }} alt="image" className="h-full w-full rounded-lg" />
                <View className="absolute left-0 top-0 h-full w-full items-center justify-center bg-background/50">
                  <Button
                    onPress={() => onClear(uri)}
                    variant="destructive"
                    size="icon"
                    className="rounded-full">
                    <X color="#fff" size={16} />
                  </Button>
                </View>
              </Animated.View>
            ))}
          </View>
        )}
        {preview.length < imageLimit && (
          <Picker imageLimit={imageLimit} isPending={false} setPreview={setPreview} />
        )}
        <AlertDialogFooter className="flex-row flex-nowrap justify-end">
          <AlertDialogCancel disabled={isPending}>
            <P className="uppercase">{getText('close')}</P>
          </AlertDialogCancel>
          <Button
            onPress={onAdd}
            disabled={isPending || preview.length == 0}
            className="flex-row gap-1">
            {isPending && <ActivityIndicator size="small" />}
            <P className="uppercase text-white">{getText('add')}</P>
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

const Picker = ({
  setPreview,
  isPending,
  imageLimit,
}: {
  setPreview: React.Dispatch<React.SetStateAction<string[]>>;
  isPending: boolean;
  imageLimit: number;
}) => {
  const { getText } = useI18n();
  const { isDarkColorScheme } = useColorScheme();
  const pickImage = async () => {
    if (isPending) return;
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [4, 3],
      quality: 1,
      allowsMultipleSelection: true,
      selectionLimit: imageLimit,
    });
    if (!result.canceled && result.assets[0]) {
      const uris = result.assets.map((img) => img.uri);
      setPreview(uris);
    }
  };

  if (isweb)
    return (
      <div className="mt-5 items-center justify-center rounded-lg border-2 border-dashed border-border bg-background py-4">
        <label
          htmlFor="image_picker"
          className="flex h-full w-full cursor-pointer flex-col items-center justify-center">
          <Entypo name="upload" color={isDarkColorScheme ? '#1f2937' : '#d1d5db'} size={60} />
          <P className="text-center">{getText('choose_image')}</P>
        </label>
        <input
          multiple
          accept="image/png, image/jpeg, image/jpg"
          onChange={(e) => {
            const files = e.target.files;
            if (!files || isPending) return;

            const urls = [];
            for (let i = 0; i < files.length; i++) {
              const file = files[i];
              const url = URL.createObjectURL(file);
              urls.push(url);
            }
            if (urls.length > imageLimit) {
              errorToast('You can only add 4 total images');
              setPreview(urls.slice(0, imageLimit));
              return;
            }
            setPreview(urls);
          }}
          type="file"
          id="image_picker"
          className="hidden"
        />
      </div>
    );
  return (
    <TouchableOpacity
      onPress={pickImage}
      className="mt-5 items-center justify-center rounded-lg border-2 border-dashed border-border bg-background py-4">
      <View className="items-center justify-center">
        <Entypo name="upload" color={isDarkColorScheme ? '#1f2937' : '#d1d5db'} size={60} />
        <P className="text-center">{getText('choose_image')}</P>
      </View>
    </TouchableOpacity>
  );
};
