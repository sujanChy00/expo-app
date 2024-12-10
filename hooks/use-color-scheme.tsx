import AsyncStorage from '@react-native-async-storage/async-storage';
import { useColorScheme as useNativewindColorScheme } from 'nativewind';
import { useEffect } from 'react';

export function useColorScheme() {
  const { colorScheme, setColorScheme } = useNativewindColorScheme();

  useEffect(() => {
    AsyncStorage.getItem('color-scheme').then((value) => {
      if (value === 'light' || value === 'dark') {
        setColorScheme(value);
      }
    });
  }, []);

  const changeTheme = (value: 'light' | 'dark') => {
    AsyncStorage.setItem('color-scheme', value);
    setColorScheme(value);
  };

  const toggleTheme = () => {
    const theme = colorScheme === 'light' ? 'dark' : 'light';
    AsyncStorage.setItem('color-scheme', theme);
    changeTheme(theme);
  };

  return {
    colorScheme: colorScheme ?? 'light',
    isDarkColorScheme: colorScheme === 'dark',
    setColorScheme: changeTheme,
    toggleColorScheme: toggleTheme,
  };
}
