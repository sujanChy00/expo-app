import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { View } from 'react-native';

import { ChevronDown } from '../icons/chevron-down';
import { Filter } from '../icons/filter-icon';
import { DateRangePicker } from '../ui/date-range-picker';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { P } from '../ui/typography';

import { orderSortOptions } from '@/constants/data';
import useI18n from '@/hooks/useI81n';
import { purifyObject } from '@/lib/purify-object';
import { dateOnlyFormatter } from '@/utils/date';

/**
 * @description A React component that renders a dropdown menu for selecting the order status used for sorting orders in a table. It displays "Sort by:" text, a filter icon, and a dropdown with available order status options. Clicking on the dropdown or the current selection toggles its visibility.

 *
 * @param {Props} props - Component props.
 * @returns {JSX.Element} The rendered `SortOrderTable` component.
 */

export const SortOrderTable = () => {
  const { getText } = useI18n();
  const params = useLocalSearchParams<{
    startDate?: string;
    endDate?: string;
    query?: string;
    status?: string;
    size?: string;
    page?: string;
  }>();

  const startDate = purifyObject(params)?.startDate ? new Date(params.startDate!) : undefined;
  const endDate = purifyObject(params)?.endDate ? new Date(params.endDate!) : undefined;

  const [date, setDate] = useState({
    startDate,
    endDate,
  });

  const [status, setStatus] = useState(params?.status || 'order_placed');
  const router = useRouter();
  return (
    <View className="flex-row items-center gap-4">
      <View className="flex-row items-center gap-2">
        <View className="flex-row items-center gap-1">
          <Filter size={16} className="text-gray-600" />
          <P className="text-sm text-gray-600">Filter by:</P>
        </View>
        <Select
          value={{
            label: '',
            value: status == 'all' ? status : status.toUpperCase(),
          }}
          onValueChange={(text) => {
            if (text) {
              setStatus(text?.value || '');
              router.setParams({
                status: text?.value,
                page: '1',
              });
            }
          }}>
          <SelectTrigger className="h-auto gap-2 border-none p-0 shadow-none web:focus:ring-0 web:focus:ring-transparent">
            <SelectValue placeholder="status" />
          </SelectTrigger>
          <SelectContent>
            {orderSortOptions.map((order) => (
              <SelectItem key={order.value} value={order.value} label={getText(order.label)} />
            ))}
          </SelectContent>
        </Select>
      </View>
      <View className="flex-row items-center gap-1">
        <DateRangePicker
          showOnlyPlaceholder
          className="h-auto border-none px-0 py-0 capitalize hover:!bg-transparent"
          startDate={date.startDate}
          placeholder="date"
          endDate={date.endDate}
          onChange={(d) => {
            if (d) {
              setDate({
                startDate: d.startDate,
                endDate: d.endDate,
              });
              if (d.endDate) {
                router.setParams({
                  startDate: dateOnlyFormatter(d.startDate as unknown as Date),
                  endDate: dateOnlyFormatter(d.endDate as unknown as Date),
                });
              }
            }
          }}
        />
        <ChevronDown size={16} aria-hidden className="text-foreground opacity-50" />
      </View>
    </View>
  );
};
