import { ThumbsUp } from 'lucide-react-native';
import React from 'react';

import { Badge } from '../ui/badge';
import { P } from '../ui/typography';

import { cn } from '@/lib/utils';
import { generateClassName } from '@/utils/get-styles';

/**
 * @fileoverview A React component that displays the count of likes an item has received.
 *
 * @param {Object} props - Component props.
 * @param {number} [props.count] - The count of likes.
 *
 * @returns {JSX.Element} The rendered ItemLikesCount component.
 */
export const ItemLikesCount = ({ count, className }: { count?: number; className?: string }) => {
  return (
    <Badge
      style={{
        shadowColor: 'rgba(0, 0, 0, 0.5)',
        shadowOffset: {
          width: 0,
          height: 5,
        },
        shadowOpacity: 0.5,
        shadowRadius: 5,

        elevation: 10,
      }}
      className={cn(
        'flex flex-row items-center gap-2 rounded-full bg-green-800 bg-tertiary p-2 web:md:hidden',
        className,
        generateClassName('absolute left-2 top-2 z-40')
      )}>
      <ThumbsUp color="white" size={20} className="text-foreground" />
      <P className="color-white ">{count || 0}</P>
    </Badge>
  );
};
