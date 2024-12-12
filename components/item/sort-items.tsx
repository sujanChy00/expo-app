import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { View } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';

import { ArrowDown } from '../icons/arrow-down';
import { ArrowUp } from '../icons/arrow-up';
import { Button } from '../ui/button';
import { P } from '../ui/typography';

import useI18n from '@/hooks/useI81n';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/providers/auth-provider';

/**
 * @fileoverview A React component that provides sorting options for items.
 *
 * @param {Props} props - The properties object.
 * @param {SortOption[]} [props.options] - Optional array of sorting options.
 * @param {string} [props.className] - Optional class name for additional styling.
 *
 * @returns {JSX.Element} The rendered SortItems component.
 */
export const SortItems = ({
  options,
  className,
}: {
  options?: { label: string; value: string }[];
  className?: string;
}) => {
  const { getText } = useI18n();
  const router = useRouter();
  const { language } = useLanguage();

  const params = useLocalSearchParams<{ sort?: string; order?: string }>();
  const onSort = (text: string) => {
    const order = !params?.order ? '0' : params?.order == '0' ? '1' : '';
    const sort = order ? text : '';
    router.setParams({ sort, order });
  };
  const sortOptions = options || [
    {
      label: getText('price'),
      value: 'price',
    },
    {
      label: getText('stock'),
      value: 'stock',
    },
    {
      label: getText('updated'),
      value: 'updated_at',
    },
    {
      label: getText('added'),
      value: 'created_at',
    },
  ];

  return (
    <View className={cn('flex-row flex-wrap justify-end gap-1 p-2 py-4', className)}>
      {sortOptions.map((option) => (
        <Button
          className="flex-row items-center gap-1"
          key={option.value}
          style={{ borderRadius: 30 }}
          variant={params?.sort == option.value ? 'secondary' : 'outline'}
          size="sm"
          onPress={() => onSort(option.value)}>
          <P>{option.label}</P>
          {option.value == params?.sort &&
            (params?.order == '0' ? (
              <Animated.View entering={FadeIn}>
                <ArrowDown size={16} className="text-foreground" />
              </Animated.View>
            ) : (
              <Animated.View entering={FadeIn}>
                <ArrowUp size={16} className="text-foreground" />
              </Animated.View>
            ))}
        </Button>
      ))}
    </View>
  );
};
