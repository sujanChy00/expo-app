import { useLocalSearchParams, useRouter } from 'expo-router';
import { View } from 'react-native';

import { Skeleton } from '../ui/skeleton';
import { P } from '../ui/typography';

import useI18n from '@/hooks/useI81n';
import { ILanguageTexts } from '@/types/ILanguageTexts';

/**
 *
 * @description A React component that displays filtered results text and allows clearing filters.
 *
 * @component
 * @param {number} orders - Number of orders found.
 * @param {boolean} isPending - Indicates if data is pending/loading.
 * @returns {JSX.Element} The rendered OrderFilteredResultsText component.
 */

export const OrderFilteredResultsText = ({
  orders,
  isPending,
}: {
  orders?: number;
  isPending?: boolean;
}) => {
  const router = useRouter();
  const { getText } = useI18n();
  const params = useLocalSearchParams<{
    status?: string;
    endDate?: string;
    startDate?: string;
  }>();

  if (isPending)
    return (
      <View className="flex-row items-center justify-between pb-2">
        <Skeleton className="h-2 w-32" />
        <Skeleton className="h-5 w-32" />
      </View>
    );
  if (!!params?.endDate || !!params?.startDate || (!!params?.status && params?.status != 'all'))
    return (
      <View className="flex-row justify-between pb-4">
        <View className="left-1 flex-row items-center pb-2">
          <P className="text-sm font-semibold">Found {orders} </P>
          {!!params.status && params.status != 'all' && (
            <P className="text-sm font-semibold uppercase text-destructive">
              {params?.status
                ? getText(params?.status.toLowerCase() as ILanguageTexts)
                : params?.status}{' '}
            </P>
          )}
          <P className="text-sm font-semibold">{getText('orders').toLowerCase()}</P>
        </View>
        <P
          onPress={() =>
            router.setParams({
              status: 'all',
              endDate: '',
              startDate: '',
            })
          }
          className="right-3 font-semibold">
          {getText('clear_filters')} X
        </P>
      </View>
    );
};
