import { Image, TouchableOpacity, View } from 'react-native';
import { ScaleDecorator } from 'react-native-draggable-flatlist';
import Animated, { FadeIn, SlideInDown, SlideOutDown, ZoomOut } from 'react-native-reanimated';

import { ThumbnailOptions } from '../thumbnail-options';

import { useThumbnail } from '@/hooks/use-thumbnail';

interface Props {
  item: string;
  isActive: boolean;
  drag: () => void;
  index: number;
}

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

export const AppDraggable = ({ item, drag, isActive, index }: Props) => {
  const { editMode, itemHeight } = useThumbnail();

  return (
    <View className="relative">
      <ScaleDecorator>
        <AnimatedTouchable
          exiting={ZoomOut}
          entering={FadeIn}
          onLongPress={drag}
          style={{
            opacity: isActive ? 0.5 : 1,
            height: itemHeight,
            width: '100%',
          }}>
          <Image
            alt="afdas"
            className="h-full w-full rounded-lg"
            resizeMode="cover"
            source={{
              uri: item,
            }}
          />
        </AnimatedTouchable>
      </ScaleDecorator>
      {!isActive && editMode && (
        <Animated.View
          entering={SlideInDown}
          exiting={SlideOutDown.delay(100)}
          className="absolute bottom-0 left-0 z-50 w-full bg-background/80 supports-[backdrop-filter]:backdrop-blur-md"
          style={{
            shadowColor: 'black',
            shadowOpacity: 0.26,
            shadowOffset: { width: 0, height: 2 },
            shadowRadius: 10,
            elevation: 3,
          }}>
          <ThumbnailOptions item={item} index={index} />
        </Animated.View>
      )}
    </View>
  );
};
