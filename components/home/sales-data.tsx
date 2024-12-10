import { lastDayOfMonth, startOfMonth } from 'date-fns';
import { useState } from 'react';
import { View } from 'react-native';

import { Card } from '../ui/card';
import { DateRangePicker } from '../ui/date-range-picker';
import { Separator } from '../ui/separator';
import { Skeleton } from '../ui/skeleton';
import { P } from '../ui/typography';

import { useGetSalesData } from '@/api/home-api';
import useI18n from '@/hooks/useI81n';
import { useRefreshOnFocus } from '@/hooks/useRefreshOnFocus';
import { dateOnlyFormatter } from '@/utils/date';

/**
 * @description A React component that displays sales data and allows users to choose a date range.
 * @example
 * ```jsx
 * <SalesData />
 * @returns {JSX.Element} The rendered sales data component.
 *

 * ```
 */
export const SalesData = () => {
  const { getText } = useI18n();

  const [date, setDate] = useState({
    startDate: startOfMonth(new Date()),
    endDate: lastDayOfMonth(new Date()),
  });

  const { data, isPending, refetch } = useGetSalesData({
    from: dateOnlyFormatter(date.startDate) as string,
    to: dateOnlyFormatter(date.endDate) as string,
  });

  useRefreshOnFocus(refetch);

  return (
    <View className="xs:flex-row xs:gap-0 native:flex-1 flex-col-reverse items-center justify-between gap-2 pt-2">
      <Card className="xs:px-3 xs:flex-[0.7] xs:w-auto w-full flex-1 flex-row items-center justify-between gap-10 px-2 py-3 md:flex-[0.5]">
        <View className="xs:flex-[0.5] flex-1 items-center gap-2">
          {isPending ? (
            <Skeleton className="h-3 w-full" />
          ) : (
            <P className="text-center text-sm font-semibold" style={{ fontSize: 15 }}>
              {data?.totalOrderCount || 0}
            </P>
          )}
          <P className="text-center text-sm font-semibold" style={{ fontSize: 13 }}>
            {getText('total_orders')}
          </P>
        </View>
        <Separator orientation="vertical" className="min-h-12 flex-shrink-0" />
        <View className="xs:flex-[0.5] flex-1 items-center gap-2">
          {isPending ? (
            <Skeleton className="h-3 w-full" />
          ) : (
            <P className="text-center text-sm font-semibold" style={{ fontSize: 15 }}>
              ¥{data?.totalRevenue || 0}
            </P>
          )}
          <P className="text-center text-sm font-semibold" style={{ fontSize: 13 }}>
            {getText('total_revenue')}
          </P>
        </View>
      </Card>
      <View className="xs:py-0 ml-auto py-2">
        <DateRangePicker
          variant="ghost"
          startDate={date.startDate}
          endDate={date.endDate}
          onChange={(d) => {
            if (d) {
              setDate({
                endDate: d.endDate as Date,
                startDate: d.startDate as Date,
              });
            }
          }}
        />
      </View>
    </View>
  );
};
