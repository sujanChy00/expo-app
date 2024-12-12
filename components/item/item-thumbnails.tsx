import React from 'react';
import { Pressable, ViewStyle } from 'react-native';

import { AppImage } from '../app-image';
import { Card } from '../ui/card';

import { cn } from '@/lib/utils';

type Props = {
  alt: string;
  onPress?: () => void;
  img?: string;
  style?: ViewStyle;
  className?: string;
};
/**
 * @description A React component that renders a clickable image with a shadow effect, suitable for displaying item thumbnails.
 * @example
 * ```jsx
 * <ItemThumbnails alt="Item thumbnail" img="[https://placehold.co/](https://placehold.co/)" />
 * @typedef {Object} Props
 * @property {string} alt - The alternative text for the image, used for accessibility.
 * @property {string} img - The URL of the image to be displayed.
 * @property {() => void} [onPress] - An optional callback function to be executed when the image is pressed.
 *
 *
 * @param {Props} props - The component props.
 * @returns {JSX.Element} The rendered item thumbnail component.
 *

 * ```
 */
export const ItemThumbnails = ({ alt, img, onPress, className, style }: Props) => {
  return (
    <Pressable onPress={onPress} className={className} style={style}>
      <Card className={cn('p-1 shadow-none', className)}>
        <AppImage
          alt={alt}
          uri={img}
          style={{
            height: 90,
            width: '100%',
          }}
          resizeMode="contain"
        />
      </Card>
    </Pressable>
  );
};
