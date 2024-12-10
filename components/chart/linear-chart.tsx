import React from 'react';
import { Alert, useWindowDimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

import { HomeResponse } from '@/types/Ihome';
export const LinearChart = ({ data }: { data: HomeResponse }) => {
  const { width } = useWindowDimensions();
  return (
    <LineChart
      onDataPointClick={(data) => {
        const totalAmount = data.value;
        Alert.alert(`Total Amount: ${'¥' + totalAmount}`);
      }}
      data={{
        labels: data.weeklySales.map((item) => item.day as string),
        datasets: [
          {
            data: data.weeklySales.map((item) => item.totalAmount as number),
          },
        ],
        legend: ['Weekly Sales'],
      }}
      width={width - 20}
      height={220}
      yAxisLabel="¥"
      chartConfig={{
        backgroundColor: '#166534',
        backgroundGradientFrom: '#172554',
        backgroundGradientTo: '#1e40af',
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        style: {
          borderRadius: 16,
        },
        propsForDots: {
          r: '6',
          strokeWidth: '2',
          stroke: '#fff',
          fill: '#16a34a',
        },
      }}
      bezier
      style={{
        marginVertical: 8,
        borderRadius: 16,
      }}
      formatXLabel={(value) =>
        new Date(value as string).toLocaleDateString('en-US', {
          weekday: 'short',
        })
      }
      formatYLabel={(value) => {
        if (!value || Number(value) == 0) return Math.floor(Number(value)).toString();
        if (Number(value) >= 1000) {
          return (Number(value) / 1000).toFixed(1) + 'k';
        } else {
          return value;
        }
      }}
    />
  );
};
