import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

const options = [
  {
    label: 'Active',
    value: 'current',
  },
  {
    label: 'All',
    value: 'all',
  },
];

export const SortShipments = ({ className }: { className?: string }) => {
  const router = useRouter();
  const params = useLocalSearchParams<{
    filter?: string;
  }>();

  const [filterValue, setFilterValue] = useState(params?.filter || 'current');
  const defaultLabel = options.find((option) => option.value === filterValue);
  return (
    <Select
      value={{ label: defaultLabel?.label || '', value: filterValue }}
      onValueChange={(o) => {
        if (o?.value) {
          setFilterValue(o?.value);
          router.setParams({ filter: o.value });
        }
      }}>
      <SelectTrigger className={className}>
        <SelectValue placeholder="Filter: " />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value} label={option.label} />
        ))}
      </SelectContent>
    </Select>
  );
};
