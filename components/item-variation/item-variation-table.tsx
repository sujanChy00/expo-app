import { ColumnDef } from '@tanstack/react-table';
import { Link, useLocalSearchParams, useRouter } from 'expo-router';
import { Pencil, Plus } from 'lucide-react-native';
import React from 'react';
import { View } from 'react-native';

import { Button } from '../ui/button';
import { DataTable } from '../ui/data-table';
import { Text } from '../ui/text';
import { H3 } from '../ui/typography';
import { DeleteItemVariation } from './delete-item-variation';

import useI18n from '@/hooks/useI81n';
import { IItemVaritions } from '@/types';

/**
 * @description A React component that renders a custom data table to display information about item variations,
 * including name, price, stock, weight, and before-tax price.
 * It also includes edit and delete buttons for each variation and a "ADD VARIATION" button in the top right corner.
 * @typedef {Object} IItemVaritions
 * @property {string} name - The name of the item variation.
 * @property {number} price - The price of the item variation.
 * @property {number} stock - The stock level of the item variation.
 * @property {number} weight - The weight of the item variation.
 * @property {number} beforeTaxPrice - The price of the item variation before tax.
 *
 *
 * @param {Object} props - Component props.
 * @property {IItemVaritions[]} props.variations (optional) - An array of item variation objects.
 * @returns {JSX.Element} The rendered item variation table component.
 */

export const ItemVariationTable = ({ variations }: { variations?: IItemVaritions[] }) => {
  const { getText } = useI18n();
  const { itemId } = useLocalSearchParams<{ itemId: string }>();
  const router = useRouter();

  const columns: ColumnDef<IItemVaritions>[] = [
    {
      accessorKey: 'name',
      header: () => getText('name'),
    },
    {
      accessorKey: 'price',
      header: () => getText('price'),
    },
    {
      accessorKey: 'stock',
      header: () => getText('stock'),
    },
    {
      accessorKey: 'weight',
      header: () => getText('weight'),
    },
    {
      accessorKey: 'beforeTaxPrice',
      header: () => getText('item_price_before_tax'),
    },
    {
      accessorKey: 'actions',
      header: () => getText('actions'),
      cell: ({ row }) => (
        <View className="flex-row items-center gap-1">
          <Button
            variant="secondary"
            onPress={() => router.push(`/items/${itemId}/variation/${row.original.name}/edit`)}
            size="icon"
            className="h-7 w-7 rounded-lg border-accent-foreground">
            <Pencil size={16} className="text-accent-foreground" />
          </Button>
          <DeleteItemVariation itemId={itemId!} variationName={row.original.name} />
        </View>
      ),
    },
  ];

  const tableProps = {
    data: variations || [],
    columns,
  };
  return (
    <View className="hidden flex-1 gap-y-5 p-6 pt-8 md:flex">
      <View className="flex-row items-center justify-between">
        <H3>{getText('item_variations')}</H3>
        <Link asChild href={`/items/${itemId}/variation/add`}>
          <Button className="flex-row items-center gap-1">
            <Plus className="text-primary-foreground" size={20} />
            <Text className="font-semibold uppercase text-primary-foreground">
              {getText('add')}
            </Text>
          </Button>
        </Link>
      </View>
      <DataTable {...tableProps} />
    </View>
  );
};
