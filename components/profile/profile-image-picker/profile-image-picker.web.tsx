import { FileUp } from 'lucide-react-native';
import React, { useState } from 'react';
import { ActivityIndicator, Image, View } from 'react-native';

import { ProfileImagePickerProps } from './profile-image-picker';

import { useUpalodPackageImage } from '@/actions/package';
import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { P } from '@/components/ui/typography';
import { getAvatarName } from '@/utils/get-avatar-name';

export const ProfileImagePicker = ({
  alt,
  onUpload,
  isLoading,
  image,
}: ProfileImagePickerProps) => {
  const [preview, setPreview] = useState(image);

  const { mutateAsync, isPending } = useUpalodPackageImage();
  return (
    <View className="flex-1 items-center justify-center">
      <View className="relative z-30 flex h-28 w-28 items-center justify-center rounded-full">
        <Avatar
          alt={alt}
          className="flex h-28 w-28 items-center justify-center rounded-full border border-border">
          {preview ? (
            <Image source={{ uri: preview }} style={{ width: '100%', height: '100%' }} />
          ) : (
            <P className="text-4xl text-gray-600">{getAvatarName(alt)}</P>
          )}
        </Avatar>
        <Button
          disabled={isPending || isLoading}
          size="icon"
          className="absolute bottom-0 right-0 z-30 h-12 w-12 rounded-full border-4 border-white bg-border web:hover:opacity-100 dark:border-border dark:bg-background">
          {isPending ? (
            <ActivityIndicator size="small" />
          ) : (
            <label htmlFor="image-picker" className="cursor-pointer">
              <FileUp className="text-gray-600" size={26} />
            </label>
          )}
        </Button>
        <input
          id="image-picker"
          type="file"
          className="hidden"
          accept="image/png, image/jpeg, image/jpg"
          onChange={(e) => {
            if (e.target.files && e.target.files.length > 0) {
              const files = Array.from(e.target.files);
              const image = new FileReader();
              image.onload = () => setPreview(String(image.result));
              image.readAsDataURL(files[0]);
              mutateAsync(files).then((data) => onUpload && onUpload(data[0]));
            }
          }}
        />
      </View>
    </View>
  );
};
