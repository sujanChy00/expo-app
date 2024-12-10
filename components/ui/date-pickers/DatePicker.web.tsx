'use client';

import * as React from 'react';

import { Button, ButtonProps } from '../button';
import { Calendar } from '../calendar';
import { Popover, PopoverContent, PopoverTrigger } from '../popover';
import { P } from '../typography';

import { cn } from '@/lib/utils';

export type DatePickerProps = {
  value?: Date;
  onValueChange?: (d?: Date) => void;
  placeHolder?: string;
  minimumDate?: Date;
  maximumDate?: Date;
  format?: string;
} & ButtonProps;

export function DatePicker({
  value,
  onValueChange,
  placeHolder,
  minimumDate,
  maximumDate,
  format = 'PPP',
  ...props
}: DatePickerProps) {
  const [date, setDate] = React.useState(value);
  const toYear = new Date().getFullYear();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          {...props}
          className={cn(
            'flex items-center justify-between px-2',

            props.className
          )}>
          {date ? (
            <P>
              {date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </P>
          ) : (
            <P className={cn(!date ? 'text-muted-foreground' : 'text-foreground')}>
              {placeHolder || 'Pick a date'}
            </P>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0">
        <Calendar
          disabled={{
            before: minimumDate as Date,
            after: maximumDate,
          }}
          mode="single"
          captionLayout="dropdown-buttons"
          selected={date}
          defaultMonth={date}
          onSelect={(e) => {
            onValueChange?.(e);
            if (e) {
              setDate(e);
            }
          }}
          fromYear={1950}
          toYear={toYear + 50}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
