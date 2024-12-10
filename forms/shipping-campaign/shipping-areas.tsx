import React from 'react';

import { useGetAllShippingArea } from '@/api/campaign-api';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Text } from '@/components/ui/text';
import { cn } from '@/lib/utils';

interface Props {
  selectedShippingArea: (id: number) => boolean | undefined;
  onPress: (id: number) => void;
}

export const ShippingAreas = ({ selectedShippingArea, onPress }: Props) => {
  const { data: shippingAreas, isPending } = useGetAllShippingArea();
  if (isPending)
    return Array.from({ length: 10 }).map((_, index) => (
      <Skeleton className="h-10 w-28" key={index} />
    ));

  return shippingAreas?.map((area) => {
    const isSelected = selectedShippingArea(area.shippingAreaId);
    return (
      <Button
        variant="outline"
        key={area?.shippingAreaId}
        className={cn('rounded-lg', isSelected && 'bg-green-800')}
        size="sm"
        onPress={() => onPress(area?.shippingAreaId)}>
        <Text className={cn(isSelected && 'text-white')}>{area?.shippingArea}</Text>
      </Button>
    );
  });
};
