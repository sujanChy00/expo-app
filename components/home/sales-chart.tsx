import React from 'react';
import { Platform, View } from 'react-native';

import { LinearChart } from '../chart';
import { Skeleton } from '../ui/skeleton';

import { isNative } from '@/constants/data';
import { HomeResponse } from '@/types/Ihome';

interface Props {
  data?: HomeResponse;
  isPending: boolean;
}

/**
 * @description A React component that renders a sales chart.
 *
 * @typedef {Object} Props
 * @property {HomeResponse} [data] - Data for the sales chart.
 * @property {boolean} isPending - Indicates if data is being loaded.
 *
 * @param {Props} props - Component props.
 * @param {HomeResponse} [props.data] - Data for the sales chart.
 * @param {boolean} props.isPending - Indicates if data is being loaded.
 *
 * @returns {JSX.Element} The rendered SalesChart component.
 */
export const SalesChart = ({ data, isPending }: Props) => {
  if (isPending)
    return (
      <Skeleton
        {...(isNative && {
          style: {
            height: 220,
          },
        })}
        className="my-2 w-full rounded-2xl web:h-[200px] web:md:h-[400px]"
      />
    );

  if (!data || data.weeklySales.length === 0) return null;

  if (Platform.OS === 'web')
    return (
      <View className="h-[50vh]">
        <LinearChart data={data} />
      </View>
    );

  return <LinearChart data={data} />;
};
