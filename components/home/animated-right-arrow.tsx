import { ArrowRight } from 'lucide-react-native';
import { useEffect, useRef } from 'react';
import { Animated, Easing } from 'react-native';

export const AnimatedArrowRight = () => {
  const translateX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(translateX, {
          toValue: 10,
          duration: 500,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(translateX, {
          toValue: 0,
          duration: 500,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [translateX]);

  return (
    <Animated.View style={{ transform: [{ translateX }] }}>
      <ArrowRight color="white" size={18} />
    </Animated.View>
  );
};
