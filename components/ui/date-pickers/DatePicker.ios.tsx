import DateTimePicker from '@react-native-community/datetimepicker';
import React from 'react';

type Props = React.ComponentProps<typeof DateTimePicker> & {
  onValueChange?: (date?: Date) => void;
};

export function DatePicker({ ...props }: Props) {
  const [date, setDate] = React.useState<Date>(props.value || new Date());

  return (
    <DateTimePicker
      {...props}
      value={date}
      onChange={(event, date) => {
        if (date) {
          setDate(date);
          props.onValueChange?.(date);
        }
      }}
    />
  );
}
