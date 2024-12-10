import React from 'react';
import { View } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';

import { ImageModal } from '../image-modal';
import { DeleteMessage } from './delete-message';

import { cn } from '@/lib/utils';

type Props = {
  src?: string;
  alt: string;
  messageId: number;
  shouldShowDelete: boolean;
  className?: string;
  thumbnails?: string[];
};

/**
 * @description A React component that renders an image within a chat message, optionally including a delete button.
 * @typedef {Object} Props
 * @property {string} [src] - The image source URL. If not provided, the component doesn't render.
 * @property {string} alt - Alternative text for the image, required for accessibility.
 * @property {number} messageId - The message ID associated with the image, potentially used for deletion or other interactions.
 * @property {boolean} shouldShowDelete - Whether the delete button should be displayed for the image.
 * @property {string} [className] - Additional CSS class names to apply to the component.
 *
 *
 * @param {Props} props - Component props.
 * @returns {JSX.Element} The rendered chat image component, or null if no image source is provided.
 */
export const ChatImage = ({
  src,
  alt,
  messageId,
  shouldShowDelete,
  className,
  thumbnails,
}: Props) => {
  if (!src) return null;

  return (
    <Animated.View entering={FadeIn} className={cn('flex-row items-center gap-2', className)}>
      <DeleteMessage messageId={messageId} showDelete={shouldShowDelete} />
      <View className="items-center justify-center p-1">
        <ImageModal
          src={src}
          style={{ height: 80, width: 80, borderRadius: 10 }}
          resizeMode="contain"
          alt={alt}
          thumnails={thumbnails}
        />
      </View>
    </Animated.View>
  );
};
