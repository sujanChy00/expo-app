import React from 'react';
import { View } from 'react-native';

import { P } from './ui/typography';

import { cn } from '@/lib/utils';

type Props = {
  children: React.ReactNode;
  className?: string;
};

export const SuccessBadge = ({ children, className }: Props) => {
  return (
    <View
      style={{ backgroundColor: '#095086' }}
      className={cn(
        'native:p-2 flex-row items-center justify-center rounded-md web:px-1.5 web:py-0.5',
        className
      )}>
      <P className="text-xs font-semibold text-white xs:text-sm">{children}</P>
    </View>
  );
};
