import DateTimePicker, { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import * as React from 'react';

import { Button, ButtonProps } from '../button';
import { P } from '../typography';

type Props = Omit<React.ComponentProps<typeof DateTimePicker>, 'onChange'> & {
  className?: string;
  variant?: ButtonProps['variant'];
  size?: ButtonProps['size'];
  onValueChange?: (date?: Date) => void;
  placeholder?: string;
};

export function DatePicker({
  value,
  onValueChange,
  maximumDate,
  minimumDate,
  className,
  size,
  variant,
}: Props) {
  const [date, setDate] = React.useState<Date>(value || new Date());
  const show = () => {
    DateTimePickerAndroid.open({
      value: date,
      onChange: (v, date) => {
        onValueChange?.(date);
        date && setDate(date);
      },
      mode: 'date',
      minimumDate,
      maximumDate,
    });
  };

  return (
    <Button onPress={show} variant={variant || 'outline'} size={size} className={className}>
      <P>
        {new Intl.DateTimeFormat('en-US', {
          dateStyle: 'medium',
        }).format(value)}
      </P>
    </Button>
  );
}
