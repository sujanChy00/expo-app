import React from 'react';
import { ActivityIndicator, Modal, View } from 'react-native';

import { Card } from './ui/card';

import { useColorScheme } from '@/hooks/use-color-scheme';
import { cn } from '@/lib/utils';

interface AppLoaderProps {
  visible: boolean;
  className?: string;
  children?: React.ReactNode;
  style?: React.ComponentPropsWithRef<typeof Card>['style'];
}

export const AppLoader = ({ visible, children, className, style }: AppLoaderProps) => {
  const { isDarkColorScheme } = useColorScheme();
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View
        className="flex-1 items-center justify-center"
        style={{
          backgroundColor: !isDarkColorScheme ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)',
        }}>
        <Card
          style={style}
          className={cn(
            'h-24 w-24 items-center justify-center rounded-lg bg-background',
            className
          )}>
          <ActivityIndicator size="large" />
          {children}
        </Card>
      </View>
    </Modal>
  );
};
