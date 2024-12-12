import { useQuery } from '@tanstack/react-query';
import { ColumnDef } from '@tanstack/react-table';
import { Link, useLocalSearchParams, useRouter } from 'expo-router';
import { Plus } from 'lucide-react-native';
import React, { useState } from 'react';
import { View } from 'react-native';

import { UserAvatar } from '../profile/user-avatar';
import { ToggleRecommendedItem } from '../recomended-items/toggle-recommended-item';
import { TableSortHeader } from '../table-sort-header';
import { Avatar } from '../ui/avatar';
import { Button } from '../ui/button';
import { DataTable } from '../ui/data-table';
import { SearchInput } from '../ui/search-input';
import { Text } from '../ui/text';
import { H3, P } from '../ui/typography';
import { ItemTableActions } from './item-table-actions';
import { SortItemByCategory } from './sort-item-y-category';
import { ToggleItemStatus } from './toggle-item-status';

import { useGetAllCategories } from '@/api/categories-api';
import { getAllItems } from '@/api/item-api';
import useI18n from '@/hooks/useI81n';
import { cn } from '@/lib/utils';
import { useSelectedShop } from '@/providers/auth-provider';
import { IItem } from '@/types';
import { getAvatarName } from '@/utils/get-avatar-name';
import { truncateString } from '@/utils/tuncate-string';

interface Props {
  className?: string;
}

/**
 * @description A React component that renders a table of items using React Table library, allowing sorting, filtering, and pagination (implementation not included). Displays item details, actions, and toggle options for disabled and recommended status.
 * @typedef {Object} IItem
 * @property {string} item_id - The ID of the item.
 * @property {string} item_name - The name of the item.
 * @property {string} thumbnail_image_url (optional) - The URL of the item's thumbnail image.
 * @property {number} item_price_before_tax - The price of the item before tax.
 * @property {number} item_stock - The stock level of the item.
 * @property {boolean} item_disabled - Whether the item is disabled.
 * @property {boolean} recommended - Whether the item is recommended.
 * @property {string} category_name - The name of the item's category.
 * @property {string} created_at - The item's creation date.
 * @property {string} updated_at - The item's last update date.
 *
 * @typedef {Object} ColumnDef<T>
 * @property {string} accessorKey - The key used to access data from the row object.
 * @property {string} header - The header label for the column.
 * @property {Function} [cell] (optional) - A custom cell rendering function.
 *
 *
 * @param {} props - Component props (not explicitly defined).
 * @returns {JSX.Element} The rendered item table component.
 */
export const ItemTable = ({ className }: Props) => {
  const { getText } = useI18n();
  const router = useRouter();
  const searchParams = useLocalSearchParams<{
    query?: string;
    page?: string;
    size?: string;
    sort?: string;
    order?: string;
    catId?: string;
  }>();
  const { data } = useGetAllCategories();
  const [catId, setCatId] = useState<string>(searchParams?.catId || '');
  const { selectedShop } = useSelectedShop();

  const categories = data?.map((cat) => ({ label: cat.name, value: cat.id }));
  const options = categories ? [{ label: 'All', value: 'all' }, ...categories] : [];

  const params = {
    size: searchParams?.size ? Number(searchParams.size) : 30,
    page: searchParams?.page ? Number(searchParams.page) - 1 : 0,
    sort: searchParams?.sort || 'updated_at',
    q: searchParams?.query,
    catId:
      !!searchParams?.catId && searchParams.catId != 'all' ? Number(searchParams.catId) : undefined,
    order: searchParams?.order === 'asc' ? 0 : searchParams?.order === 'desc' ? 1 : undefined,
  };

  const { data: items, isPending } = useQuery({
    queryKey: [
      'Items',
      selectedShop?.shopId,
      searchParams?.order,
      searchParams?.sort,
      searchParams?.page,
      searchParams?.size,
      searchParams?.query,
      searchParams?.catId,
    ],
    queryFn: () => getAllItems(params, selectedShop?.shopId as number),
    enabled: !!selectedShop?.shopId,
  });

  const columns: ColumnDef<IItem>[] = [
    {
      accessorKey: 'item_name',
      header: () => (
        <TableSortHeader name="name">
          <P className="text-sm">{getText('name')}</P>
        </TableSortHeader>
      ),
      cell({ row }) {
        return (
          <View className="flex-row items-center gap-2">
            <Avatar
              alt={row.original.item_name}
              className="items-center justify-center border border-border">
              {row.original.thumbnail_image_url ? (
                <UserAvatar
                  alt={row.original.item_name}
                  src={row.original.thumbnail_image_url}
                  fallBack={row.original.item_name}
                />
              ) : (
                <P>{getAvatarName(row.original.item_name)}</P>
              )}
            </Avatar>
            <P className="text-sm">{truncateString(row.getValue('item_name'), 30)}</P>
          </View>
        );
      },
    },
    {
      accessorKey: 'category_name',
      header: () => <SortItemByCategory options={options} setCategoryId={setCatId} catid={catId} />,
    },
    {
      accessorKey: 'item_price_before_tax',
      header: () => (
        <TableSortHeader name="price">
          <P className="text-sm">{getText('price')}</P>
        </TableSortHeader>
      ),
    },
    {
      accessorKey: 'item_stock',
      header: () => (
        <TableSortHeader name="stock">
          <P className="text-sm">{getText('stock')}</P>
        </TableSortHeader>
      ),
    },

    {
      accessorKey: 'item_disabled',
      header: getText('disabled'),
      cell({ row }) {
        return (
          <ToggleItemStatus
            itemId={row.original.item_id}
            initialValue={row.original.item_disabled}
          />
        );
      },
    },
    {
      accessorKey: 'recommended',
      header: getText('recommended'),
      cell({ row }) {
        return (
          <ToggleRecommendedItem
            disabled={row.original.item_disabled}
            recommended={row.original.recommended}
            itemId={row.original.item_id}
          />
        );
      },
    },
    {
      id: 'actions',
      header: getText('actions'),
      cell({ row }) {
        return (
          <ItemTableActions
            actions={['view', 'edit', 'copy', 'delete']}
            itemId={row.original.item_id}
          />
        );
      },
    },
  ];

  const tableProps = {
    data: items?.content || ([] as IItem[]),
    columns,
  };

  return (
    <View className={cn('space-y-4 bg-background', className)}>
      <View className="flex-row items-center justify-between">
        <H3>
          {getText('items').toUpperCase()} {items ? `(${items.totalElements})` : ''}
        </H3>
        <SearchInput
          style={{
            flex: 0.7,
          }}
          placeholder="search_items"
        />
        <Link href="/items/add-item" asChild>
          <Button className="flex-row items-center gap-1">
            <Plus className="text-primary-foreground" />
            <Text className="font-semibold uppercase">{getText('add')}</Text>
          </Button>
        </Link>
      </View>
      <DataTable
        pagination={{
          currentPage: items?.pageNumber,
          isLast: items?.last,
          totalPage: items?.totalPages,
        }}
        {...tableProps}
        onRowPress={(item) => router.push(`/items/${item.item_id}`)}
        isPending={isPending}
      />
    </View>
  );
};
