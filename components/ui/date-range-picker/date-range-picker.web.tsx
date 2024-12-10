import { format } from 'date-fns';
import React from 'react';
import { DateRange } from 'react-day-picker';
import { View } from 'react-native';

import { CalendarIcon } from '../../icons/calendar-icon';
import { Button } from '../button';
import { Calendar } from '../calendar';
import { Popover, PopoverContent, PopoverTrigger } from '../popover';
import { P } from '../typography';
import { DateRangePickerProps } from './date-range-picker';

import useI18n from '@/hooks/useI81n';
import { cn } from '@/lib/utils';

export const DateRangePicker = ({
  containerClassName,
  startDate,
  endDate,
  onChange,
  opened,
  variant,
  className,
  placeholder,
  showOnlyPlaceholder,
  ...props
}: DateRangePickerProps) => {
  const { getText } = useI18n();
  const toYear = new Date().getFullYear();
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: startDate ? startDate : undefined,
    to: endDate ? endDate : undefined,
  });

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button {...props} id="date" variant={variant || 'outline'} className={className}>
          {!showOnlyPlaceholder ? (
            <>
              {!!date?.from && !!date.to ? (
                <View className="flex-row items-center gap-1">
                  <View className="flex flex-row items-center gap-1">
                    <CalendarIcon className="text-foreground" size={16} />
                    <P> {format(date.from, 'LLL dd, y')}</P>
                  </View>
                  <P> - </P>
                  <View className="flex flex-row items-center gap-1">
                    <CalendarIcon className="text-foreground" size={16} />
                    <P>{format(date.to, 'LLL dd, y')}</P>
                  </View>
                </View>
              ) : (
                <View className="flex-row items-center gap-1">
                  <CalendarIcon className="text-foreground" size={16} />
                  <P className={cn('font-semibold', className)}>
                    {placeholder || getText(placeholder || 'select_date')}
                  </P>
                </View>
              )}
            </>
          ) : (
            <View className="flex-row items-center gap-1">
              <CalendarIcon className="text-foreground" size={16} />
              <P className={cn('font-semibold', className)}>
                {placeholder || getText(placeholder || 'select_date')}
              </P>
            </View>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className={cn('w-max p-0', containerClassName)}>
        <Calendar
          captionLayout="dropdown-buttons"
          initialFocus
          mode="range"
          defaultMonth={date?.from}
          selected={date}
          numberOfMonths={2}
          onSelect={(date) => {
            setDate(date);
            if (date) {
              onChange?.({
                startDate: date.from,
                endDate: date.to,
              });
            }
          }}
          fromYear={1950}
          toYear={toYear + 50}
        />
      </PopoverContent>
    </Popover>
  );
};
