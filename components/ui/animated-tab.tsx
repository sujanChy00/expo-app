import React, {
  JSXElementConstructor,
  ReactElement,
  createContext,
  useContext,
  useState,
} from 'react';
import {
  Dimensions,
  LayoutChangeEvent,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Platform,
  ScrollView,
  TouchableOpacity,
  View,
  ViewProps,
} from 'react-native';
import Animated, {
  Extrapolation,
  FadeIn,
  FadeOut,
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import { AnimatedView } from 'react-native-reanimated/lib/typescript/component/View';

import { cn } from '@/lib/utils';

const SCREEN_WIDTH = Dimensions.get('screen').width;

type AnimatedViewProps = Omit<React.ComponentPropsWithoutRef<typeof AnimatedView>, 'children'>;

interface AnimatedTabContentProps extends ViewProps {
  tabValue: string;
}

interface AnimatedTabProps {
  defaultValue?: string;
  onValueChange?: (val: string) => void;
  children: React.ReactNode;
  numberOfTabs: number;
}

interface AnimatedTabTriggerProps extends AnimatedViewProps {
  index: number;
  tabValue: string;
  children: React.ReactNode;
}

interface Context {
  defaultValue?: string;
  onValueChange?: (val: string) => void;
  tabs: any[];
  scrollRef: any;
  scrollValue: any;
  viewTranslatePoints: number[];
  setViewTranslatePoints: React.Dispatch<React.SetStateAction<number[]>>;
  tabWidths: number[];
  setTabWidths: React.Dispatch<React.SetStateAction<number[]>>;
  setLayoutWidth: React.Dispatch<React.SetStateAction<number>>;
  layoutWidth: number;
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
  activeIndex: number;
}

const AnimatedTabContext = createContext<Context>({
  tabs: [],
  scrollRef: undefined,
  scrollValue: undefined,
  viewTranslatePoints: [],
  setViewTranslatePoints: () => {},
  tabWidths: [],
  setTabWidths: () => {},
  setLayoutWidth: () => {},
  layoutWidth: 0,
  activeIndex: 0,
  setActiveIndex: () => {},
});

export const AnimatedTab = ({
  children,
  defaultValue,
  onValueChange,
  numberOfTabs,
}: AnimatedTabProps) => {
  const scrollValue = useSharedValue(0);
  const scrollRef = useAnimatedRef<ScrollView>();
  const [viewTranslatePoints, setViewTranslatePoints] = useState<number[]>([]);
  const [tabWidths, setTabWidths] = useState<number[]>([]);
  const tabs = Array.from({ length: numberOfTabs });
  const [layoutWidth, setLayoutWidth] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <AnimatedTabContext.Provider
      value={{
        defaultValue,
        onValueChange,
        scrollRef,
        scrollValue,
        tabs,
        setTabWidths,
        setViewTranslatePoints,
        viewTranslatePoints,
        tabWidths,
        layoutWidth,
        setLayoutWidth,
        activeIndex,
        setActiveIndex,
      }}>
      {children}
    </AnimatedTabContext.Provider>
  );
};

export const AnimatedTabContentWrapper = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const { scrollRef, scrollValue, onValueChange, setLayoutWidth, layoutWidth } = useTabs();
  const tabs = Array.from({ length: React.Children.count(children) });
  const onMomentumScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (Platform.OS == 'web') return;
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / layoutWidth);
    const tabValues = React.Children.map(children, (child) => {
      return (child as React.ReactElement<any>).props.tabValue;
    });
    onValueChange?.(tabValues?.[index]);
  };
  return (
    <ScrollView
      onLayout={(e) => setLayoutWidth(e.nativeEvent.layout.width)}
      className={cn('flex-1 bg-background', className)}
      ref={scrollRef}
      scrollEnabled={Platform.OS !== 'web'}
      onMomentumScrollEnd={onMomentumScrollEnd}
      onScroll={(event) => {
        if (Platform.OS == 'web') return;
        const offsetX = event.nativeEvent.contentOffset.x;
        scrollValue.value = offsetX;
      }}
      contentContainerClassName="flex-row"
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      horizontal
      style={{ flex: 1 }}
      scrollEventThrottle={16}>
      {React.Children.map(children, (child, index) => {
        return React.cloneElement(child as ReactElement<any, string | JSXElementConstructor<any>>, {
          value: tabs[index],
        });
      })}
    </ScrollView>
  );
};

export const AnimatedTabContent = (props: AnimatedTabContentProps) => {
  const { layoutWidth } = useTabs();
  return (
    <View
      {...props}
      style={[{ width: layoutWidth ? layoutWidth : SCREEN_WIDTH, flex: 1 }, props.style]}
    />
  );
};

export const AnimatedTabList = (props: ViewProps) => {
  const { tabs, scrollValue, tabWidths, viewTranslatePoints, layoutWidth } = useTabs();
  const indicatorStyle = useAnimatedStyle(() => {
    return tabWidths.length === tabs.length && viewTranslatePoints.length === tabs.length
      ? {
          width: interpolate(
            scrollValue.value,
            tabs.map((_, i) => i * layoutWidth),
            tabWidths,
            Extrapolation.CLAMP
          ),
          transform: [
            {
              translateX: interpolate(
                scrollValue.value,
                tabs.map((_, i) => i * layoutWidth),
                viewTranslatePoints,
                Extrapolation.CLAMP
              ),
            },
          ],
        }
      : {
          width: 0,
          transform: [{ translateX: 0 }],
        };
  });

  return (
    <Animated.View
      {...props}
      style={{
        position: 'relative',
      }}
      className={cn(
        'native:justify-between relative z-20 flex-row items-center gap-4 border-b border-b-border bg-background p-3 web:justify-between web:md:justify-start',
        props.className
      )}>
      {React.Children.map(props.children, (child, index) => {
        return React.cloneElement(child as ReactElement<any, string | JSXElementConstructor<any>>, {
          value: tabs[index],
        });
      })}
      <Animated.View
        style={[
          {
            position: 'absolute',
            zIndex: 99999,
            borderRadius: 4,
            height: 2,
            left: 0,
            bottom: 0,
            backgroundColor: '#14522d',
          },
          indicatorStyle,
        ]}
      />
    </Animated.View>
  );
};

export const AnimatedTabTrigger = (props: AnimatedTabTriggerProps) => {
  const { index, tabValue, children, ...rest } = props;
  const {
    tabWidths,
    setTabWidths,
    setViewTranslatePoints,
    viewTranslatePoints,
    scrollRef,
    onValueChange,
    setActiveIndex,
    activeIndex,
    layoutWidth,
  } = useTabs();

  const scrollToIndex = (index: number) => {
    setActiveIndex(index);
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        x: index * layoutWidth,
        animated: true,
      });
      onValueChange?.(tabValue);
    }
  };
  const handleViewLayout = (event: LayoutChangeEvent) => {
    const { x } = event.nativeEvent.layout;
    const currentPoints = [...viewTranslatePoints];
    currentPoints[index] = x;
    setViewTranslatePoints(currentPoints);
  };

  const handleTextLayout = (event: LayoutChangeEvent) => {
    const { width } = event.nativeEvent.layout;
    const currentTabWidths = [...tabWidths];
    currentTabWidths[index] = width;
    setTabWidths(currentTabWidths);
  };

  return (
    <Animated.View
      {...rest}
      className={cn('relative', props.className)}
      onLayout={handleViewLayout}>
      <TouchableOpacity onLayout={handleTextLayout} onPress={() => scrollToIndex(index)}>
        {children}
      </TouchableOpacity>
      {Platform.OS == 'web' && activeIndex == index && (
        <Animated.View
          entering={FadeIn}
          exiting={FadeOut}
          style={{ height: 2 }}
          className="absolute -bottom-3 left-0 w-full bg-primary"
        />
      )}
    </Animated.View>
  );
};

const useTabs = () => {
  const context = useContext(AnimatedTabContext);
  if (!context) {
    throw new Error('useTabs must be used within an AnimatedTab');
  }
  return context;
};
