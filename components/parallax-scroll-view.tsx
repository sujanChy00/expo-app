import { ImageResizeMode, ImageStyle, View, ViewProps, ViewStyle } from 'react-native';
import Animated, {
  clamp,
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ImageModal } from './image-modal';
import { Carousel } from './ui/carousel';
import { P } from './ui/typography';

import { ImageOff } from '@/components/icons/image-off';
import { cn } from '@/lib/utils';

interface ParallaxViewProps
  extends Omit<
    React.ComponentPropsWithoutRef<typeof Animated.ScrollView>,
    'stickyHeaderComponent' | 'children'
  > {
  imageHeight: number;
  stickyHeader?: React.ReactNode;
  children?: React.ReactNode;
  stickyHeaderClassName?: string;
  stickyHeaderStyle?: ViewStyle;
  uri?: string | string[];
  alt?: string;
  imageStyle?: ImageStyle;
  backGroundImageClassName?: string;
  resizeMode?: ImageResizeMode;
  noImageMessage?: string;
  overlay?: React.ReactNode;
}

export const ParallaxScrollView = ({
  imageHeight = 300,
  children,
  stickyHeader,
  stickyHeaderClassName,
  stickyHeaderStyle,
  imageStyle,
  uri,
  backGroundImageClassName,
  alt,
  noImageMessage,
  resizeMode = 'cover',
  overlay,
  ...props
}: ParallaxViewProps) => {
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollViewOffset(scrollRef);
  const { top } = useSafeAreaInsets();

  const headerStyle = useAnimatedStyle(() => {
    const translateY = interpolate(scrollOffset.value, [0, imageHeight], [-50, 0]);
    return {
      opacity: interpolate(scrollOffset.value, [0, imageHeight - 90], [0, 1]),
      transform: [
        {
          translateY: clamp(translateY, -50, 0),
        },
      ],
    };
  });

  const backGroundImageStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: interpolate(
          scrollOffset.value,
          [-imageHeight, 0, imageHeight],
          [-imageHeight / 2, 0, imageHeight * 0.75]
        ),
      },
      {
        scale: interpolate(scrollOffset.value, [0, imageHeight], [1, 2]),
      },
    ],
  }));

  const isArray = !!uri && Array.from(uri) && uri.length > 0;

  return (
    <>
      <Animated.ScrollView {...props} ref={scrollRef} scrollEventThrottle={16}>
        <Animated.View
          className={cn(
            'items-center justify-center',
            !uri || (Array.isArray(uri) && uri.length == 0 && 'bg-secondary'),
            backGroundImageClassName
          )}
          style={[
            {
              width: '100%',
              height: imageHeight,
            },
            imageStyle as ViewStyle,
            backGroundImageStyle,
          ]}>
          {uri ? (
            Array.isArray(uri) ? (
              uri.length > 0 ? (
                <Carousel
                  resizeMode={resizeMode}
                  thumbnails={uri}
                  data={uri}
                  style={{
                    height: imageHeight,
                  }}
                />
              ) : (
                <View className="items-center gap-2.5">
                  <ImageOff className="text-muted-foreground" size={40} />
                  <P className="font-medium uppercase text-secondary-foreground">
                    {noImageMessage || 'NO IMAGE'}
                  </P>
                </View>
              )
            ) : (
              <ImageModal
                resizeMode={resizeMode}
                alt={alt}
                src={uri}
                style={[
                  {
                    width: '100%',
                    height: '100%',
                  },
                ]}
              />
            )
          ) : (
            <View className="items-center gap-2.5">
              <ImageOff className="text-muted-foreground" size={40} />
              <P className="font-medium uppercase text-secondary-foreground">{alt || 'NO IMAGE'}</P>
            </View>
          )}
          {overlay}
        </Animated.View>
        {children}
      </Animated.ScrollView>
      {stickyHeader && (
        <Animated.View
          className={cn('bg-background', stickyHeaderClassName)}
          style={[
            {
              paddingTop: top,
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              zIndex: 20,
              shadowColor: '#000',
              shadowOffset: {
                height: 10,
                width: 0,
              },
              elevation: 10,
              shadowOpacity: 1,
              shadowRadius: 10,
            },
            stickyHeaderStyle,
            headerStyle,
          ]}>
          {stickyHeader}
        </Animated.View>
      )}
    </>
  );
};

export const ParallaxContent = (props: ViewProps) => {
  return <View {...props} className={cn('flex-1 bg-white p-3', props.className)} />;
};
