import { ColumnDef } from '@tanstack/react-table';
import { Link } from 'expo-router';
import { Pencil, Plus } from 'lucide-react-native';
import React from 'react';
import { View } from 'react-native';

import { Button } from '../ui/button';
import { DataTable } from '../ui/data-table';
import { Text } from '../ui/text';
import { H3 } from '../ui/typography';
import { ToggleCampaignStatus } from './toggle-campaign-status';

import { useGetAllShippingCampaigns } from '@/api/campaign-api';
import useI18n from '@/hooks/useI81n';
import { IShipppingCampaign } from '@/types/IShippingCampaign';

/**
 * @description A React component that renders a table of shipping campaigns on the web platform, including their name, discount percentage, start and end date, an "Active" toggle, and an "Edit" button (with a pencil icon). Clicking the edit button navigates to the campaign edit page. The "Edit" button is only displayed on the web platform due to potential layout limitations on mobile devices.
 * @typedef {Object} IShippingCampaign

 *
 * @returns {JSX.Element} The rendered `CampaignTable` component.
 */
export const CampaignTable = () => {
  const { data, isPending } = useGetAllShippingCampaigns();
  const { getText } = useI18n();
  const columns: ColumnDef<IShipppingCampaign>[] = [
    {
      accessorKey: 'shippingCampaignName',
      header: getText('name'),
    },
    {
      accessorKey: 'shippingCampaignDiscountPercentage',
      header: getText('discount'),
    },
    {
      accessorKey: 'shippingCampaignStartDate',
      header: getText('start_date'),
      cell: ({ row }) => new Date(row.original.shippingCampaignStartDate).toLocaleDateString(),
    },
    {
      accessorKey: 'shippingCampaignEndDate',
      header: getText('end_date'),
      cell: ({ row }) => new Date(row.original.shippingCampaignEndDate).toLocaleDateString(),
    },
    {
      accessorKey: 'shippingCampaignActive',
      header: getText('active'),
      cell: ({ row }) => <ToggleCampaignStatus campaign={row.original} />,
    },
    {
      accessorKey: 'edit',
      header: getText('edit'),
      cell: ({ row }) => (
        <Link asChild href={`/(main)/(app)/shipping-campaign/${row.original.shippingCampaignId}`}>
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
  const tableProps = {
    columns,
    data: data || [],
  };
  return (
    <View className="hidden space-y-5 md:flex">
      <View className="flex-row items-center justify-between">
        <H3 className="uppercase">{getText('shipping_campaigns')}</H3>
        <Link href="/shipping-campaign/add" asChild>
          <Button className="flex-row items-center gap-1">
            <Plus className="text-primary-foreground" />
            <Text className="font-semibold uppercase">{getText('add')}</Text>
          </Button>
        </Link>
      </View>
      <DataTable isPending={isPending} {...tableProps} />
    </View>
  );
};
