import React from 'react';
import { View } from 'react-native';

import { P } from './ui/typography';

import { cn } from '@/lib/utils';

type Props = {
  children: React.ReactNode;
  className?: string;
};

export const DestructiveBadge = ({ children, className }: Props) => {
  return (
    <View
      className={cn('flex-row items-center justify-center rounded-md bg-red-900 p-2', className)}>
      <P className="text-xs font-semibold text-white xs:text-sm">{children}</P>
    </View>
  );
};
