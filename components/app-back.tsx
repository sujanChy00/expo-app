import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { P } from './ui/typography';
import { ChevronLeft } from './icons/chevron-left';
import { useRouter } from 'expo-router';
import { isIOS } from '@/constants/data';
import Animated, { SlideInRight } from 'react-native-reanimated';

const AppBack = () => {
  const { back, canGoBack } = useRouter();

  if (!canGoBack || !isIOS) {
    return null;
  }
  return (
    <TouchableOpacity onPress={back} style={{ marginLeft: -20 }}>
      <View className="flex-row items-center">
        <ChevronLeft size={34} className="text-foreground" />
        <Animated.View entering={SlideInRight.delay(100)}>
          <P className="text-xl font-medium ">back</P>
        </Animated.View>
      </View>
    </TouchableOpacity>
  );
};

export default AppBack;
