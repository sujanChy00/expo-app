import { ColumnDef } from '@tanstack/react-table';
import { useRouter } from 'expo-router';
import { View } from 'react-native';

import { UserAvatar } from '../profile/user-avatar';
import { Avatar } from '../ui/avatar';
import { DataTable } from '../ui/data-table';
import { H3, P } from '../ui/typography';

import useI18n from '@/hooks/useI81n';
import { ITransactionById, ITransactionByIdItems } from '@/types/ITransaction';

/**
 * @description A React component that displays a table of ordered items associated with a specific order (using the `useReactTable` library). It renders the item name, quantity, and optionally weight, and utilizes custom components like `Avatar` and `UserAvatar` (potentially from a UI library) for visuals.
 * @typedef {Object} ITransactionByIdItems
 * @property {string} name - Name of the ordered item.
 * @property {number} quantity - Ordered quantity of the item.
 * @property {number} weight - Weight of the item (optional).
 * // ... other properties related to the item (optional)

 * @typedef {Object} ITransactionById
 * @property {ITransactionByIdItems[]} items - Array of ordered items.
 * // ... other properties related to order details (e.g., status, payment details)

 *
 * @param {Object} props - Component props.
 * @property {ITransactionById} props.order - Data object containing information about the order, including the `items` array.
 * @returns {JSX.Element} The rendered `OrderedItems` component, or null if no items exist.
 */

export const OrderedItems = ({ order }: { order: ITransactionById }) => {
  const { getText } = useI18n();
  const { push } = useRouter();
  const columns: ColumnDef<ITransactionByIdItems>[] = [
    {
      accessorKey: 'name',
      header: () => getText('name'),
      cell: ({ row }) => (
        <View key={row.id} className="flex-row items-center gap-5">
          <Avatar
            alt={row.original.name}
            className="items-center justify-center border border-border">
            <UserAvatar
              alt={row.original.name}
              fallBack={row.original.name}
              src={row.original.thumbnailImage}
            />
          </Avatar>
          <P className="text-sm">{row.original.name}</P>
        </View>
      ),
    },
    {
      accessorKey: 'quantity',
      header: () => getText('quantity'),
    },
    {
      accessorKey: 'price',
      header: () => getText('price'),
    },
    {
      accessorKey: 'weight',
      header: () => getText('weight'),
    },
  ];

  const tableProps = {
    data: order.items,
    columns,
  };

  if (!order.items || order.items.length === 0) return null;

  return (
    <View className="hidden gap-y-4 pt-5 md:flex">
      <H3 className="uppercase">{getText('ordered_items')}</H3>
      <DataTable onRowPress={(row) => push(`/items/${row.id}`)} {...tableProps} />
    </View>
  );
};
