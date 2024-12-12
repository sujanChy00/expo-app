import { useQuery } from '@tanstack/react-query';
import { ColumnDef } from '@tanstack/react-table';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { View } from 'react-native';

import { OrderTrackingDetailsModal } from '../orders/order-tracking-details-modal';
import { DataTable } from '../ui/data-table';
import { SortShipments } from './sort-shipments';

import { getAllShipments } from '@/api/order-api';
import { H3, P } from '@/components/ui/typography';
import useI18n from '@/hooks/useI81n';
import { useSelectedShop } from '@/providers/auth-provider';
import { OrderTrackingResponse } from '@/types/ITransaction';
import { dateTimestampFormatter } from '@/utils/date';

export const ShipmentTable = () => {
  const { getText } = useI18n();
  const router = useRouter();
  const { selectedShop } = useSelectedShop();
  const params = useLocalSearchParams<{
    filter?: string;
    size?: string;
    page?: string;
  }>();

  const { data, isPending } = useQuery({
    queryKey: ['Shipments', selectedShop?.shopId, params],
    queryFn: () =>
      getAllShipments(
        {
          size: params?.size ? Number(params?.size) : 30,
          page: params?.page ? Number(params.page) - 1 : 0,
          filter: params?.filter || 'current',
        },
        selectedShop?.shopId as number
      ),
  });
  const columns: ColumnDef<OrderTrackingResponse>[] = [
    {
      accessorKey: 'orderId',
      header: () => <P className="text-sm">{getText('order_id')}</P>,
    },
    {
      accessorKey: 'userFullName',
      header: () => <P className="text-sm">{getText('name')}</P>,
    },
    {
      accessorKey: 'currentStatus',
      header: () => <P className="text-sm">{getText('status')}</P>,
      cell: ({ row }) => (
        <P
          className={
            row.original.deliveredAt
              ? 'text-green-800'
              : row.original.lastUpdate
                ? 'text-blue-600'
                : 'text-destructive'
          }>
          {row.original.currentStatus}
        </P>
      ),
    },

    {
      accessorKey: 'deliveredAt',
      header: () => <P className="text-sm">{getText('delivered_at')}</P>,
      cell: ({ row }) => (
        <P> {row.original.deliveredAt ? dateTimestampFormatter(row.original.deliveredAt) : '-'}</P>
      ),
    },
    {
      accessorKey: 'updatedAt',
      header: () => <P className="text-sm">{getText('last_fetched')}</P>,
      cell: ({ row }) => (
        <P>{row.original.updatedAt ? dateTimestampFormatter(row.original.updatedAt) : '-'}</P>
      ),
    },
    {
      accessorKey: 'lastUpdate',
      header: () => <P className="text-sm">{getText('last_updated')}</P>,
      cell: ({ row }) => <P>{row.original.lastUpdate ? row.original.lastUpdate : '-'}</P>,
    },
    {
      accessorKey: 'details',
      header: () => <P className="text-sm">{getText('view')}</P>,
      cell: ({ row }) => <OrderTrackingDetailsModal initialData={row.original} children="view" />,
    },
  ];
  const tableProps = {
    data: data?.content || [],
    columns,
  };
  return (
    <View className="hidden space-y-5 p-6 md:flex">
      <View className="flex-row items-center justify-between">
        <View>
          <H3 className="uppercase">
            {getText('shipments')} ({data?.totalElements})
          </H3>
          <P> {data?.message}</P>
        </View>
        <SortShipments />
      </View>
      <DataTable
        {...tableProps}
        onRowPress={(order) => router.push(`/orders/${order.orderId}`)}
        isPending={isPending}
        pagination={{
          isLast: data?.last,
          currentPage: data?.pageNumber,
          totalPage: data?.totalPages,
          totalItems: data?.totalElements,
        }}
      />
    </View>
  );
};
