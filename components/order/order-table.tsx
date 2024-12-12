import { useQuery } from '@tanstack/react-query';
import { ColumnDef } from '@tanstack/react-table';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';

import { CoolBadge } from '../cool-badge';
import { DryBadge } from '../dry-badge';
import { TableSortHeader } from '../table-sort-header';
import { Card } from '../ui/card';
import { DataTable } from '../ui/data-table';
import { SearchInput } from '../ui/search-input';
import { H3, P } from '../ui/typography';
import { SortOrderTable } from './sort-order-table';

import { getAllOrders } from '@/api/order-api';
import { orderStatusColor } from '@/data/order/get-orders';
import useI18n from '@/hooks/useI81n';
import { purifyObject } from '@/lib/purify-object';
import { useSelectedShop } from '@/providers/auth-provider';
import { ITransactionContent } from '@/types/ITransaction';
import { dateTimestampFormatter } from '@/utils/date';

/**
 * @description A React component that displays a table of orders using the `useReactTable` library. It allows searching by order ID, sorting by status, and pagination. The table displays various details for each order, including name, total price, status, type, payment method, date, and a "view" action button.
 * @typedef {Object} ITransactionContent
 * @property {string} transaction_id - Unique identifier for the order.
 * @property {string} transaction_user_name - Username of the customer who placed the order.
 *
 * @returns {JSX.Element} The rendered `OrderTable` component.
 */

export const OrderTable = () => {
  const { getText } = useI18n();
  const router = useRouter();
  const { selectedShop } = useSelectedShop();

  const params = useLocalSearchParams<{
    startDate?: string;
    endDate?: string;
    query?: string;
    status?: string;
    size?: string;
    page?: string;
    order?: string;
    sort?: string;
  }>();
  const showDateClearBtn = !!(purifyObject(params)?.startDate && purifyObject(params)?.endDate);

  const { data: orders, isPending } = useQuery({
    queryKey: ['orders', selectedShop?.shopId, params],
    queryFn: () =>
      getAllOrders(
        {
          size: params?.size ? Number(params?.size) : 30,
          page: params?.page ? Number(params.page) - 1 : 0,
          sortBy: params?.status || 'order_placed',
          orderId: params?.query,
          order: params?.order === 'asc' ? 0 : params?.order === 'desc' ? 1 : undefined,
          from: params?.startDate,
          to: params?.endDate,
        },
        selectedShop?.shopId as number
      ),
  });

  const columns: ColumnDef<ITransactionContent>[] = [
    { accessorKey: 'orderId', header: () => getText('order_id') },
    {
      accessorKey: 'userName',
      header: () => (
        <TableSortHeader name="name">
          <P className="text-sm">{getText('name')}</P>
        </TableSortHeader>
      ),
    },
    { accessorKey: 'totalPrice', header: () => getText('total') },
    {
      accessorKey: 'orderProgress',
      header: () => getText('progress'),
      cell: ({ row }) => (
        <Card className="p-1 text-sm font-semibold text-white">
          <P
            style={{
              color: orderStatusColor[row.original.orderProgress],
            }}>
            {row.original.orderProgress.replaceAll('_', ' ')}
          </P>
        </Card>
      ),
    },
    {
      accessorKey: 'transactionType',
      header: () => getText('type'),
      cell: ({ row }) => {
        if (row.original.transactionType === 'dry') {
          return <DryBadge text={row.original.transactionType} />;
        } else return <CoolBadge text={row.original.transactionType} />;
      },
    },
    {
      accessorKey: 'paymentMethod',
      header: () => getText('payment_method'),
      cell: ({ row }) => (
        <P className="capitalize">{row.original.paymentMethod.replaceAll('_', ' ')}</P>
      ),
    },

    {
      accessorKey: 'orderDateTimestamp',
      header: () => getText('date'),
      cell: ({ row }) => dateTimestampFormatter(row.original.orderDateTimestamp),
    },
  ];

  const tableProps = {
    data: orders?.content || ([] as ITransactionContent[]),
    columns,
  };
  return (
    <View className="hidden space-y-5 p-6 md:flex">
      <View className="flex-row items-center justify-between">
        <H3 className="uppercase">
          {getText('orders')} {orders ? `(${orders?.totalElements})` : ''}
        </H3>
        <SearchInput style={{ flex: 0.6 }} placeholder="order_search_placeholder" />
        <SortOrderTable />
      </View>
      {showDateClearBtn && (
        <View className="flex-row items-center gap-2">
          <P className="text-sm text-secondary-foreground">
            Showing results for{' '}
            {!!params?.startDate && new Date(params.startDate).toLocaleDateString()} -{' '}
            {!!params?.endDate && new Date(params.endDate).toLocaleDateString()}
          </P>
          <TouchableOpacity
            onPress={() => {
              router.setParams({
                startDate: undefined,
                endDate: undefined,
              });
            }}>
            <P className="text-sm font-semibold">Clear</P>
          </TouchableOpacity>
        </View>
      )}
      <DataTable
        {...tableProps}
        onRowPress={(order) => router.push(`/orders/${order.orderId}`)}
        isPending={isPending}
        pagination={{
          isLast: orders?.last,
          currentPage: orders?.pageNumber,
          totalPage: orders?.totalPages,
          totalItems: orders?.totalElements,
        }}
      />
    </View>
  );
};
