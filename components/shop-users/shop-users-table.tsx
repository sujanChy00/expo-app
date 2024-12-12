import { ColumnDef } from '@tanstack/react-table';
import React from 'react';
import { View } from 'react-native';

import { DataTable } from '../ui/data-table';
import { H3 } from '../ui/typography';

import { useGetAllShopUsers } from '@/api/shop-api';
import useI18n from '@/hooks/useI81n';
import { IShopUser } from '@/types/IShopUsers';
import { dateTimeFormatterWithouTLocale } from '@/utils/date';

/**
 * @description A React component that renders a table of shop users, including columns for ID, name, email, phone, role, 
 * approved status, and creation date. 
 * The table is only visible on small screens and uses custom formatting functions for the latter two columns.
 * @typedef {Object} IShopUser

 * @typedef {Object} ColumnDef

 *
 * @param {Object} props - Component props.
 * @returns {JSX.Element} The rendered `ShopUsersTable` component.
 */
export const ShopUsersTable = () => {
  const { data, isPending } = useGetAllShopUsers();
  const { getText } = useI18n();

  const columns: ColumnDef<IShopUser>[] = [
    {
      accessorKey: 'sellerId',
      header: 'ID',
    },
    {
      accessorKey: 'sellerName',
      header: 'Name',
    },
    {
      accessorKey: 'sellerEmail',
      header: 'Email',
    },
    {
      accessorKey: 'sellerCreated',
      header: 'Created',
      cell: ({ row }) => {
        const created = row.original.sellerCreated;
        return dateTimeFormatterWithouTLocale(new Date(created));
      },
    },
  ];

  const table = {
    data: data || [],
    columns,
  };

  return (
    <View className="hidden space-y-5 bg-background md:flex">
      <H3 className="uppercase">{getText('shop_users')}</H3>
      <DataTable {...table} isPending={isPending} />
    </View>
  );
};
