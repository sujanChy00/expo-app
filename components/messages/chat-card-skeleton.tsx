import React from 'react';
import { ScrollView, View } from 'react-native';

import { Skeleton } from '../ui/skeleton';

import { isweb } from '@/constants/data';
import { cn } from '@/lib/utils';
import { generateClassName } from '@/utils/get-styles';

/**
 * @description A React component that renders a skeleton loading state for a chat card,
 * displaying placeholders for various UI elements like profile picture, message bubbles, and search bar (on web).
 * @typedef {Object} ChatCardSkeletonProps
 *
 *
 * @param {ChatCardSkeletonProps} props - Component props.
 * @returns {JSX.Element} The rendered chat card skeleton component.
 */

export const ChatCardSkeleton = () => {
  const numberOfSekeltons = isweb ? 6 : 20;

  return (
    <ScrollView className="h-[75vh] bg-background">
      <View className="flex-1 pt-2">
        {Array.from({ length: numberOfSekeltons }).map((_, i) => (
          <View key={i} className="flex-row items-center justify-start gap-3 p-2">
            <Skeleton className="h-16 w-16 rounded-full base:h-10 base:w-10" />
            <View className={cn('flex-1 gap-y-1', generateClassName('flex xs:hidden sm:flex'))}>
              <Skeleton className="h-2 w-[35%] base:h-2 base:w-[25%] md:w-24" />
              <Skeleton className="h-2 w-[55%] base:h-2 base:w-[35%] md:w-16" />
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};
