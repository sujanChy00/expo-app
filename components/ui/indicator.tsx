import { cn } from '@/lib/utils';
import { generateClassName } from '@/utils/get-styles';
import React from 'react';
import { View } from 'react-native';
import { P } from './typography';
type Props = {
  children: React.ReactNode;
  className?: string;
  label?: string | number;
};

export const Indicator = ({ children, className, label }: Props) => {
  return (
    <View className={'relative'}>
      {!!label && (
        <P
          className={cn(
            'absolute -right-2 -top-2 z-30 flex flex-row items-center justify-center rounded-full bg-green-600 text-center',
            generateClassName('h-5 w-5 text-sm', 'h-6 w-6'),
            className
          )}>
          {label}
        </P>
      )}
      {children}
    </View>
  );
};
