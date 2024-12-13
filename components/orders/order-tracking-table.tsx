import { ColumnDef } from '@tanstack/react-table';

import { DataTable } from '../ui/data-table';
import { P } from '../ui/typography';

import useI18n from '@/hooks/useI81n';
import { OrderTrackingDetails, OrderTrackingResponse } from '@/types/ITransaction';

type Props = {
  order?: OrderTrackingResponse;
  className?: string;
};

export const OrderTrackingTable = ({ order, className }: Props) => {
  const { getText } = useI18n();

  const columns: ColumnDef<OrderTrackingDetails>[] = [
    {
      accessorKey: 'date',
      header: () => <P className="text-sm">{getText('date')}</P>,
    },
    {
      accessorKey: 'location',
      header: () => <P className="text-sm">{getText('location')}</P>,
      cell: ({ row }) => <P className="text-sm">{row.original.location || '-'}</P>,
    },
    {
      accessorKey: 'status',
      header: () => <P className="text-sm">{getText('status')}</P>,
    },
  ];
  return <DataTable className={className} data={order?.details || []} columns={columns} />;
};
