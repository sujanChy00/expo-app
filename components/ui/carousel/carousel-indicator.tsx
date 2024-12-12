import React from 'react';
import { Animated, View, useWindowDimensions } from 'react-native';

import { useColorScheme } from '@/hooks/use-color-scheme';
import { cn } from '@/lib/utils';

interface Props {
  data?: string[];
  scrollX: Animated.Value;
  className?: string;
}

/**
 * @fileoverview A React Native component for rendering pagination indicators for a carousel.
 *
 * @typedef {Object} Props
 * @property {any[]} [data] - Array of data items for the carousel.
 * @property {Animated.Value} scrollX - Animated value for the horizontal scroll position.
 * @property {string} [className] - Additional class names for styling.
 *
 * @param {Props} props - Component props.
 * @param {any[]} [props.data] - Array of data items for the carousel.
 * @param {Animated.Value} props.scrollX - Animated value for the horizontal scroll position.
 * @param {string} [props.className] - Additional class names for styling.
 *
 * @returns {JSX.Element | null} The rendered CarousePagination component or null if no data is provided.
 */
export const CarouselIndicator = ({ data, scrollX, className }: Props) => {
  const { width } = useWindowDimensions();
  const { isDarkColorScheme } = useColorScheme();

  if (!data || data?.length < 2) return null;

  return (
    <View
      className={cn('bottom-4 left-0 z-50 w-full flex-row items-center justify-center', className)}>
      <View className="flex-row items-center justify-center gap-3">
        {data?.map((_, imageIndex) => {
          const viewWidth = scrollX.interpolate({
            inputRange: [width * (imageIndex - 1), width * imageIndex, width * (imageIndex + 1)],
            outputRange: [8, 20, 8],
            extrapolate: 'clamp',
          });
          return (
            <Animated.View
              key={imageIndex}
              style={{
                width: viewWidth,
                height: 8,
                borderRadius: 100,
                backgroundColor: '#4b5563',
              }}
            />
          );
        })}
      </View>
    </View>
  );
};
