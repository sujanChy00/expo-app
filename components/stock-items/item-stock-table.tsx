import { useQuery } from '@tanstack/react-query';
import { ColumnDef } from '@tanstack/react-table';
import { Link, useLocalSearchParams, useRouter } from 'expo-router';
import { View } from 'react-native';

import { ItemTableActions } from '../item/item-table-actions';
import { UserAvatar } from '../profile/user-avatar';
import { Avatar } from '../ui/avatar';
import { Badge } from '../ui/badge';
import { DataTable } from '../ui/data-table';
import { SearchInput } from '../ui/search-input';

import { getStockItems } from '@/api/item-api';
import { H3, P } from '@/components/ui/typography';
import useI18n from '@/hooks/useI81n';
import { cn } from '@/lib/utils';
import { useSelectedShop } from '@/providers/auth-provider';
import { IStockItem } from '@/types';
import { getAvatarName } from '@/utils/get-avatar-name';
import { truncateString } from '@/utils/tuncate-string';

export const ItemStockTable = ({ className }: { className?: string }) => {
  const router = useRouter();
  const { getText } = useI18n();
  const { selectedShop } = useSelectedShop();
  const searchParams = useLocalSearchParams<{
    query?: string;
    page?: string;
    size?: string;
  }>();

  const { data: items, isPending } = useQuery({
    queryKey: [
      'item-stock',
      selectedShop?.shopId,
      searchParams.query,
      searchParams?.page,
      searchParams?.size,
    ],
    queryFn: async () =>
      await getStockItems(
        {
          size: searchParams?.size ? Number(searchParams.size) : 30,
          page: searchParams?.page ? Number(searchParams.page) - 1 : 0,
          q: searchParams?.query,
        },
        selectedShop?.shopId
      ),
    enabled: !!selectedShop?.shopId,
  });

  const columns: ColumnDef<IStockItem>[] = [
    {
      accessorKey: 'name',
      header: () => getText('name'),
      cell({ row }) {
        return (
          <View className="flex-row items-center gap-2">
            <Avatar
              alt={row.original.name}
              className="items-center justify-center border border-border">
              {row.original.thumbnailImage ? (
                <UserAvatar
                  alt={row.original.name}
                  src={row.original.thumbnailImage}
                  fallBack={row.original.name}
                />
              ) : (
                <P>{getAvatarName(row.original.name)}</P>
              )}
            </Avatar>
            <P className="text-sm">{truncateString(row.original.name, 30)}</P>
          </View>
        );
      },
    },
    {
      accessorKey: 'stock',
      header: () => getText('stock'),
    },
    {
      accessorKey: 'sharedItems',
      header: () => getText('related_items'),
      cell: ({ row }) => (
        <View className="flex-row flex-wrap items-center gap-2">
          {row.original.sharedItems.length > 0
            ? row.original.sharedItems.map((item) => (
                <Link href={`/items/${item}`} key={item}>
                  <Badge className="rounded-lg">
                    <P className="text-sm text-white">{item}</P>
                  </Badge>
                </Link>
              ))
            : null}
        </View>
      ),
    },
    {
      accessorKey: 'id',
      header: () => getText('actions'),
      cell: ({ row }) => (
        <ItemTableActions
          actions={['view', 'update-stock']}
          itemId={row.original.id}
          stock={row.original.stock}
        />
      ),
    },
  ];

  const tableProps = {
    data: items?.content || ([] as IStockItem[]),
    columns,
  };
  return (
    <View className={cn('flex-1 space-y-5', className)}>
      <View className="flex-row items-center justify-between">
        <H3 className="uppercase">{getText('item_stock')}</H3>
        <SearchInput
          style={{
            flex: 0.7,
          }}
          placeholder="search_items"
        />
        <H3 className="text-right">Total: {items?.totalElements || 0}</H3>
      </View>
      <DataTable
        onRowPress={(item) => router.push(`/items/${item.id}`)}
        pagination={{
          currentPage: items?.pageNumber,
          isLast: items?.last,
          totalPage: items?.totalPages,
        }}
        {...tableProps}
        isPending={isPending}
      />
    </View>
  );
};
