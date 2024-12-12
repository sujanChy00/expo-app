import { useQuery } from '@tanstack/react-query';
import { ColumnDef } from '@tanstack/react-table';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { View } from 'react-native';

import { ItemTableActions } from '../item/item-table-actions';
import { ToggleItemStatus } from '../item/toggle-item-status';
import { UserAvatar } from '../profile/user-avatar';
import { TableSortHeader } from '../table-sort-header';
import { Avatar } from '../ui/avatar';
import { DataTable } from '../ui/data-table';
import { Skeleton } from '../ui/skeleton';
import { H3, P } from '../ui/typography';

import { getExpiredItems } from '@/api/item-api';
import useI18n from '@/hooks/useI81n';
import { cn } from '@/lib/utils';
import { useSelectedShop } from '@/providers/auth-provider';
import { ILowStockItem } from '@/types';
import { getAvatarName } from '@/utils/get-avatar-name';
import { truncateString } from '@/utils/tuncate-string';

/**
 * @description A React component that renders a table of expired items for the selected shop.
 *
 * @typedef {Object} ILowStockItem
 * @property {string} itemId - The ID of the item.
 * @property {string} itemName - The name of the item.
 * @property {number} itemStock - The current stock level of the item.
 * @property {string} itemExpiryDateString - The formatted expiry date string of the item.
 * @property {boolean} itemDisabled - Whether the item is disabled or not.
 *
 * @typedef {Object} ColumnDef<T>
 * @property {string} accessorKey - The key to access data from the table row object.
 * @property {string} header - The header text for the column.
 * @property {JSX.Element | Function} [cell]? - A custom cell renderer function or JSX element for the column.
 *
 * @returns {JSX.Element} The rendered expired items table.
 */
export const ExpiredItemsTable = ({ className }: { className?: string }) => {
  const router = useRouter();
  const { selectedShop } = useSelectedShop();
  const searchParams = useLocalSearchParams<{
    startDate?: string;
    endDate?: string;
    query?: string;
    status?: string;
    size?: string;
    page?: string;
    sort?: string;
    order?: string;
  }>();
  const { getText } = useI18n();

  const { data: items, isPending } = useQuery({
    queryKey: [
      'ExpiredItems',
      selectedShop?.shopId,
      searchParams?.endDate,
      searchParams?.startDate,
      searchParams?.query,
      searchParams?.status,
      searchParams?.size,
      searchParams?.page,
      searchParams?.sort,
      searchParams?.order,
    ],
    queryFn: () =>
      getExpiredItems(
        {
          size: searchParams?.size ? Number(searchParams?.size) : 30,
          page: searchParams?.page ? Number(searchParams.page) - 1 : 0,
          q: searchParams?.query,
          order: searchParams?.order === 'asc' ? 0 : searchParams?.order === 'desc' ? 1 : undefined,
          sort: searchParams?.sort,
        },
        selectedShop?.shopId as number
      ),
    enabled: !!selectedShop?.shopId,
  });

  const columns: ColumnDef<ILowStockItem>[] = [
    {
      accessorKey: 'itemName',
      header: () => (
        <TableSortHeader name="name">
          <P className="text-sm">{getText('name')}</P>
        </TableSortHeader>
      ),
      cell: ({ row }) => (
        <View className="flex-row items-center gap-2">
          <Avatar
            alt={row.original.itemName}
            className="items-center justify-center border border-border">
            {row.original.thumbnailImage ? (
              <UserAvatar
                alt={row.original.itemName}
                src={row.original.thumbnailImage}
                fallBack={row.original.itemName}
              />
            ) : (
              <P>{getAvatarName(row.original.itemName)}</P>
            )}
          </Avatar>
          <P className="text-sm">{truncateString(row.original.itemName, 30)}</P>
        </View>
      ),
    },
    {
      accessorKey: 'itemStock',
      header: () => (
        <TableSortHeader name="stock">
          <P className="text-sm">{getText('stock')}</P>
        </TableSortHeader>
      ),
    },
    {
      accessorKey: 'itemExpiryDateString',
      header: ({ header }) => (
        <TableSortHeader name="exp_date">
          <P className="text-sm">{getText('expiry_date')}</P>
        </TableSortHeader>
      ),
    },
    {
      accessorKey: 'itemDisabled',
      header: getText('disabled'),
      cell: ({ row }) => (
        <ToggleItemStatus initialValue={row.original.itemDisabled} itemId={row.original.itemId} />
      ),
    },
    {
      accessorKey: 'actions',
      header: getText('actions'),
      cell: ({ row }) => (
        <ItemTableActions actions={['edit', 'view']} itemId={row.original.itemId} />
      ),
    },
  ];

  const tableProps = {
    columns,
    data: items?.content || ([] as ILowStockItem[]),
  };

  return (
    <View className={cn('space-y-4', className)}>
      <View className="flex-row items-center justify-between">
        <H3 className="uppercase">{getText('expired_items')}</H3>
        {isPending ? (
          <Skeleton className="h-9 w-24" />
        ) : (
          <H3 className="text-right">
            {getText('total')}: {items?.totalElements || 0}
          </H3>
        )}
      </View>
      <DataTable
        onRowPress={(item) => router.push(`/items/${item.itemId}`)}
        {...tableProps}
        isPending={isPending}
        pagination={{
          isLast: items?.last,
          currentPage: items?.pageNumber,
          totalPage: items?.totalPages,
        }}
      />
    </View>
  );
};
