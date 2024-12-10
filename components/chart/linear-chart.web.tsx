import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js';
import React from 'react';
import { Line } from 'react-chartjs-2';

import { useColorScheme } from '@/hooks/use-color-scheme';
import { HomeResponse } from '@/types/Ihome';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export const LinearChart = ({ data }: { data: HomeResponse }) => {
  const { isDarkColorScheme } = useColorScheme();
  return (
    <Line
      options={{
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            grid: {
              color: isDarkColorScheme ? '#18181b' : '#e5e7eb',
            },
          },
          y: {
            ticks: {
              callback: (value) => {
                if (!value || Number(value) == 0) return Math.floor(Number(value)).toString();
                if (Number(value) >= 1000) {
                  return '¥ ' + (Number(value) / 1000).toFixed(1) + 'k';
                } else {
                  return '¥ ' + value;
                }
              },
            },
            grid: {
              color: isDarkColorScheme ? '#18181b' : '#e5e7eb',
            },
          },
        },
      }}
      data={{
        labels: data.weeklySales.map((item) =>
          new Date(item.day as string).toLocaleDateString('en-US', {
            weekday: 'short',
          })
        ),
        datasets: [
          {
            label: 'Weekly Sales',
            data: data.weeklySales.map((item) => item.totalAmount),
            borderColor: '#1E3A8A',
            backgroundColor: '#f59e0b',
            pointRadius: 6,
            pointBorderWidth: 3,
          },
        ],
      }}
    />
  );
};
