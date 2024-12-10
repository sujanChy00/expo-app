import React from 'react';
import { Image, View } from 'react-native';

import { P } from './ui/typography';

import { cn } from '@/lib/utils';

type Props = {
  message: string;
  className?: string;
  children?: React.ReactNode;
};

export const FalllBackMesage = ({ message, className, children }: Props) => {
  return (
    <View
      className={cn(
        'bg-background text-foreground native:pt-20 items-center justify-center web:h-screen',
        className
      )}>
      <View className="items-center gap-y-2">
        <Image
          alt={message}
          source={require('@/assets/images/opps.png')}
          style={{ width: 100, height: 100 }}
          resizeMode="contain"
        />
        {children ? (
          children
        ) : (
          <P className="text-center font-medium text-gray-950 dark:text-red-500">{message}</P>
        )}
      </View>
    </View>
  );
};
