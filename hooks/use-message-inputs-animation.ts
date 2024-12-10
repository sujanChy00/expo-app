import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

export const UseMessageInputsAnimation = () => {
  const params = useLocalSearchParams<{ orderId?: string }>();
  const [message, setMessage] = useState<string>('');
  const isMessageEmpty = message.replaceAll(' ', '').length == 0;
  const expanded = useSharedValue(1);
  const [isExpanded, setIsExpanded] = useState(false);

  const collapseItems = () => {
    expanded.value = withTiming(0, { duration: 400 });
    setIsExpanded(false);
  };
  const expandItems = () => {
    expanded.value = withTiming(1, { duration: 400 });
    setIsExpanded(true);
  };

  useEffect(() => {
    let timeout: NodeJS.Timeout | undefined;
    if (isExpanded && !isMessageEmpty) {
      timeout = setTimeout(() => {
        collapseItems();
      }, 3000);
    }

    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [isExpanded]);

  const expandButtonStyle = useAnimatedStyle(() => {
    const opacityInterpolation = interpolate(expanded.value, [0, 1], [1, 0], Extrapolation.CLAMP);
    const widthInterpolation = interpolate(expanded.value, [0, 1], [25, 0], Extrapolation.CLAMP);

    return {
      opacity: opacityInterpolation,
      width: widthInterpolation,
    };
  });

  const buttonViewStyle = useAnimatedStyle(() => {
    const widthInterpolation = interpolate(
      expanded.value,
      [0, 1],
      [0, params?.orderId ? 75 : 35],
      Extrapolation.CLAMP
    );
    return {
      width: widthInterpolation,
      opacity: expanded.value,
    };
  });
  return {
    buttonViewStyle,
    expandButtonStyle,
    expandItems,
    collapseItems,
    message,
    setMessage,
    isMessageEmpty,
    setIsExpanded,
  };
};
