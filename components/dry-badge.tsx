import React from 'react';
import { Image } from 'react-native';

import { Badge } from './ui/badge';
import { P } from './ui/typography';

import { cn } from '@/lib/utils';

type Props = {
  className?: string;
  text?: string;
};

export const DryBadge = ({ text, className }: Props) => {
  return (
    <Badge
      className={cn(
        'native:p-2 flex-row items-center gap-x-0.5 bg-orange-300 px-1 py-0',
        className
      )}>
      <Image
        style={{ height: 22, width: 22 }}
        source={require('@/assets/images/fire.gif')}
        alt="fire"
        resizeMode="contain"
      />
      <P className="web:xs:text-sm font-semibold uppercase text-white web:text-xs">{text}</P>
    </Badge>
  );
};
