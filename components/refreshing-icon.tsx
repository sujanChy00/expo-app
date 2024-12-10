import React from 'react';
import { ActivityIndicator } from 'react-native';
import Animated, { FadeIn, FadeOut, ZoomIn, ZoomOut } from 'react-native-reanimated';

interface Props {
  className?: string;
  size?: 'large' | 'small';
  refreshing: boolean;
  color?: string;
}

export const RefreshingIcon = ({ refreshing, className, size = 'large', color }: Props) => {
  if (!refreshing) return null;
  return (
    <Animated.View
      entering={FadeIn}
      exiting={FadeOut}
      className="absolute left-0 top-0 z-50 h-full w-screen items-center justify-center bg-black/80">
      <Animated.View entering={ZoomIn.delay(100)} exiting={ZoomOut}>
        <ActivityIndicator size={size} color={color} />
      </Animated.View>
    </Animated.View>
  );
};
