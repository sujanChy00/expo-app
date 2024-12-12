import React, { useRef } from 'react';
import {
  Animated,
  ImageResizeMode,
  ImageStyle,
  ScrollView,
  View,
  useWindowDimensions,
} from 'react-native';

import { CarouselIndicator } from './carousel-indicator';

import { ImageModal } from '@/components/image-modal';
import { cn } from '@/lib/utils';

interface Props {
  data?: string[];
  className?: string;
  thumbnails?: string[];
  style?: ImageStyle;
  resizeMode?: ImageResizeMode;
}
export const Carousel = ({ data, className, thumbnails, style, resizeMode }: Props) => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef<ScrollView>(null);
  const { width } = useWindowDimensions();

  if (!data || data.length == 0) return null;

  return (
    <View className={cn('relative', className)}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        snapToAlignment="center"
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
          useNativeDriver: false,
        })}
        scrollEventThrottle={16}>
        <View className="flex-row gap-4">
          {data?.map((img, i) => (
            <ImageModal
              resizeMode={resizeMode}
              key={img + i}
              thumnails={thumbnails}
              alt={img}
              src={img}
              style={[{ height: 250, width }, style]}
            />
          ))}
        </View>
      </ScrollView>
      <CarouselIndicator data={data} scrollX={scrollX} />
    </View>
  );
};
