import React from 'react';
import { Image, ImageResizeMode, View } from 'react-native';

import { H3 } from '@/components/ui/typography';
import { useThumbnail } from '@/hooks/use-thumbnail';
import { cn } from '@/lib/utils';

export const Thumbnail = ({
  className,
  resizeMode = 'cover',
}: {
  className?: string;
  resizeMode?: ImageResizeMode;
}) => {
  const { thumbnail } = useThumbnail();

  if (thumbnail)
    return (
      <View className={cn('relative h-72 w-full', className)}>
        <Image
          resizeMode={resizeMode}
          source={{
            uri: thumbnail,
          }}
          className="h-full w-full"
        />
        <View className="absolute left-0 top-0 z-10 h-full w-full items-start justify-end bg-background/30 p-2">
          <H3>Current Thumbnail</H3>
        </View>
      </View>
    );

  return (
    <View className={cn('h-72 w-full items-center justify-center bg-muted', className)}>
      <H3 className="native:pt-5 text-gray-200">Please select a thumbnail</H3>
    </View>
  );
};
