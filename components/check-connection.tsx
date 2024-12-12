import NetInfo from '@react-native-community/netinfo';
import { WifiOff } from 'lucide-react-native';
import React, { useEffect, useState } from 'react';
import { Platform, View } from 'react-native';

import { P } from './ui/typography';

import { useColorScheme } from '@/hooks/use-color-scheme';

export const CheckConnection = ({ children }: { children: React.ReactNode }) => {
  const { isDarkColorScheme } = useColorScheme();
  const [isConnected, setIsConnected] = useState<boolean | null>(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected);
    });

    return () => unsubscribe();
  }, []);

  if (Platform.OS === 'web' || isConnected) return children;

  return (
    <View className="flex-1 items-center justify-center gap-4 bg-background">
      <WifiOff size={40} color={isDarkColorScheme ? 'white' : 'black'} />
      <P style={{ fontSize: 18 }} className="text-destructive">
        No internet connection
      </P>
    </View>
  );
};
