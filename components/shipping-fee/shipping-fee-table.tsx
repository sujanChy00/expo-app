import { ColumnDef } from '@tanstack/react-table';
import { Link } from 'expo-router';
import { Pencil } from 'lucide-react-native';
import { View } from 'react-native';

import { ResetShop } from '../shop/reset-shop';
import { Button } from '../ui/button';
import { DataTable } from '../ui/data-table';
import { H3 } from '../ui/typography';

import { useGetShippingFee } from '@/api/shipping-fee-api';
import useI18n from '@/hooks/useI81n';
import { IshippingFee } from '@/types/IshippingFee';

/**
 * @description A React component that renders a table of shipping fees, including origin and destination areas, weight, and fees 
 * for frozen, dry, and cool temperature categories. 
 * Each row also includes an "Edit" button to navigate to the shipping fee details page.
 * @typedef {Object} IshippingFee

 *
 * @returns {JSX.Element} The rendered `ShippingFeeTable` component.
 */
export const ShippingFeeTable = () => {
  const { getText } = useI18n();
  const { data, isPending } = useGetShippingFee();
  const columns: ColumnDef<IshippingFee>[] = [
    {
      accessorKey: 'sellerShippingFromArea',
      header: getText('from_area'),
    },
    {
      accessorKey: 'sellerShippingToArea',
      header: getText('to_area'),
    },
    {
      accessorKey: 'sellerShippingWeight',
      header: getText('weight'),
    },
    {
      accessorKey: 'sellerShippingFee',
      header: getText('shipping_fees'),
    },
    {
      accessorKey: 'sellerCoolShippingFee',
      header: getText('cool_shipping_fee'),
    },
    {
      accessorKey: 'sellerShippingFrozenShippingFee',
      header: getText('frozen_shipping_fee'),
    },
    {
      accessorKey: 'edit',
      header: 'Edit',
      cell: ({ row }) => (
        <Link asChild href={`/(main)/(app)/shipping-fee/${row.original.sellerShippingId}`}>
          <Button
            variant="secondary"
            size="icon"
            className="h-7 w-7 rounded-lg border-accent-foreground">
            <Pencil size={16} className="text-accent-foreground" />
          </Button>
        </Link>
      ),
    },
  ];

  const table = {
    data: data || [],
    columns,
  };
  return (
    <View className="hidden space-y-5 md:flex">
      <View className="flex flex-row items-center justify-between">
        <H3>{getText('shipping_fees')}</H3>
        <ResetShop />
      </View>
      <DataTable {...table} isPending={isPending} />
    </View>
  );
};
