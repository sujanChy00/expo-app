import { useFocusEffect } from 'expo-router';
import { useCallback } from 'react';
import { BackHandler } from 'react-native';

export const useExitApp = () => {
  const exitApp = () => {
    BackHandler.exitApp();
    return true;
  };
  useFocusEffect(
    useCallback(() => {
      const backHandler = BackHandler.addEventListener('hardwareBackPress', exitApp);

      return () => backHandler.remove();
    }, [])
  );
};
