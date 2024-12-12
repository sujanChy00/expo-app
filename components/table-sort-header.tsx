import { useLocalSearchParams, useRouter } from 'expo-router';
import { ArrowDownWideNarrow, ArrowUpDown, ArrowUpNarrowWide } from 'lucide-react-native';
import React from 'react';
import { Pressable, PressableProps } from 'react-native';

import { cn } from '@/lib/utils';

interface Props extends Omit<PressableProps, 'children' | 'onPress'> {
  name: string;
  children: React.ReactNode;
}

export const TableSortHeader = ({ children, className, name, ...rest }: Props) => {
  const router = useRouter();
  const searchParams = useLocalSearchParams<{
    sort?: string;
    order?: 'asc' | 'desc';
  }>();

  const onSort = () => {
    let newSortOrder: 'asc' | 'desc' | undefined = 'asc';

    if (searchParams.sort === name) {
      if (searchParams.order === 'asc') {
        newSortOrder = 'desc';
      } else if (searchParams.order === 'desc') {
        newSortOrder = undefined;
      }
    }

    router.setParams({
      sort: newSortOrder ? name : undefined,
      order: newSortOrder,
    });
  };

  const getSortIcon = (): React.ReactNode => {
    if (searchParams.sort === name) {
      if (searchParams.order === 'asc') {
        return <ArrowUpNarrowWide size={13} />;
      } else if (searchParams.order === 'desc') {
        return <ArrowDownWideNarrow size={13} />;
      }
    }
    return <ArrowUpDown size={13} />;
  };

  return (
    <Pressable
      {...rest}
      onPress={onSort}
      className={cn('flex cursor-pointer flex-row items-center justify-start gap-1', className)}>
      {children}
      {getSortIcon()}
    </Pressable>
  );
};
