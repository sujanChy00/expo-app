import { ColumnDef } from '@tanstack/react-table';
import React from 'react';
import { View } from 'react-native';

import { CoolBadge } from '../cool-badge';
import { DryBadge } from '../dry-badge';
import { ThumbsUp } from '../icons/thumbs-up';
import { ToggleItemStatus } from '../item/toggle-item-status';
import { DataTable } from '../ui/data-table';
import { H3 } from '../ui/typography';
import { ToggleRecommendedItem } from './toggle-recommended-item';

import { useGetRecommendedItems } from '@/api/item-api';
import useI18n from '@/hooks/useI81n';
import { IRecommendedItem } from '@/types';

export const RecommendedItemsTable = () => {
  const { data, isPending } = useGetRecommendedItems();
  const { getText } = useI18n();
  const columns: ColumnDef<IRecommendedItem>[] = [
    {
      accessorKey: 'itemName',
      header: () => getText('name'),
    },
    {
      accessorKey: 'itemPrice',
      header: () => getText('price'),
    },
    {
      accessorKey: 'itemDisabled',
      header: () => getText('disabled'),
      cell: ({ row }) => (
        <ToggleItemStatus initialValue={row.original.itemDisabled} itemId={row.original.itemId} />
      ),
    },
    {
      accessorKey: 'itemType',
      header: () => getText('type'),
      cell: ({ row }) => {
        const itemType = row.original.itemType;
        return itemType == 'dry' ? (
          <DryBadge text={itemType} className="w-max" />
        ) : (
          <CoolBadge text={itemType} className="w-max" />
        );
      },
    },
    {
      accessorKey: 'actions',
      header: () => getText('recommended'),
      cell: ({ row }) => (
        <ToggleRecommendedItem
          disabled={row.original.itemDisabled}
          recommended
          itemId={row.original.itemId}
        />
      ),
    },
  ];

  const tableProps = {
    data: data || [],
    columns,
  };
  return (
    <View className="hidden gap-y-5 sm:flex">
      <View className="flex-row items-center gap-2">
        <H3>{getText('recommended_items')}</H3>
        <ThumbsUp className="text-green-500" />
      </View>
      <DataTable {...tableProps} isPending={isPending} />
    </View>
  );
};
