import { ColumnDef, getCoreRowModel } from '@tanstack/react-table';
import { Link } from 'expo-router';
import { Eye } from 'lucide-react-native';
import { View } from 'react-native';

import { UserAvatar } from '../profile/user-avatar';
import { Button } from '../ui/button';
import { DataTable } from '../ui/data-table';
import { P } from '../ui/typography';

import { useUser } from '@/hooks/use-user';
import useI18n from '@/hooks/useI81n';
import { ISellerShopDetail } from '@/types/IProfile';

/**
 * @description A React component that renders a table of shops for the currently logged-in user, including columns for
 * name, address, role, and a view button for each shop. The table is only visible on large screens.
 * @typedef {Object} ShopDetail
 *
 * @param {Object} props - Component props.
 * @returns {JSX.Element} The rendered `ShopTable` component.
 */

export const ShopTable = () => {
  const { getText } = useI18n();
  const { user } = useUser();

  const columns: ColumnDef<ISellerShopDetail>[] = [
    {
      accessorKey: 'shopName',
      header: () => getText('name'),
      cell: ({ row }) => (
        <View className="flex-row items-center gap-2">
          <UserAvatar alt={row.original.shopName} fallBack={row.original.shopName} />
          <P className="text-sm">{row.original.shopName}</P>
        </View>
      ),
    },
    {
      accessorKey: 'shopAddress',
      header: () => getText('address'),
    },
    {
      accessorKey: 'view',
      header: () => getText('view'),
      cell: ({ row }) => (
        <Link href={`/(main)/(app)/shops/${row.original.shopId}`} asChild>
          <Button size="icon" className="h-7 w-7 rounded-lg">
            <Eye className="text-primary-foreground" size={18} />
          </Button>
        </Link>
      ),
    },
  ];

  const table = {
    data: user?.shopDetails || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  };
  return (
    <View className="hidden flex-1 pt-7 md:flex">
      <DataTable {...table} />
    </View>
  );
};
