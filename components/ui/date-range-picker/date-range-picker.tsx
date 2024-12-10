import { format, lastDayOfMonth, startOfMonth } from 'date-fns';
import React, { useState } from 'react';
import { Modal, View } from 'react-native';
import Calendar from 'react-native-calendar-range-picker';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button, ButtonProps } from '../button';
import { P } from '../typography';

import { NAV_THEME } from '@/constants/colors';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { cn } from '@/lib/utils';
import { ILanguageTexts } from '@/types/ILanguageTexts';
import { dateOnlyFormatter } from '@/utils/date';

export interface DateRangePickerProps extends ButtonProps {
  startDate?: Date;
  endDate?: Date;
  onChange?: ({ startDate, endDate }: { startDate?: Date; endDate?: Date }) => void;
  containerClassName?: string;
  opened?: boolean;
  placeholder?: ILanguageTexts;
  showOnlyPlaceholder?: boolean;
}

export const DateRangePicker = ({
  containerClassName,
  startDate,
  endDate,
  onChange,
  opened,
  ...props
}: DateRangePickerProps) => {
  const [startDateState, setStartDateState] = useState(
    startDate ? dateOnlyFormatter(startDate) : dateOnlyFormatter(startOfMonth(new Date()))
  );
  const [endDateState, setEndDateState] = useState(
    endDate ? dateOnlyFormatter(endDate) : dateOnlyFormatter(lastDayOfMonth(new Date()))
  );
  const [visible, setVisible] = useState(false);
  const { colorScheme } = useColorScheme();
  return (
    <>
      <Button {...props} variant={props.variant || 'outline'} onPress={() => setVisible(true)}>
        <P>
          {format(new Date(startDateState!), 'LLL dd, y')} - {format(endDateState!, 'LLL dd, y')}
        </P>
      </Button>
      <Modal
        style={{
          flex: 1,
        }}
        visible={visible}
        statusBarTranslucent
        transparent
        animationType="fade">
        <SafeAreaView className={cn('flex-1 bg-black/80', containerClassName)}>
          <View className="flex-1">
            <Calendar
              startDate={startDateState}
              flatListProps={{
                removeClippedSubviews: true,
              }}
              endDate={endDateState}
              onChange={({ startDate, endDate }) => {
                setStartDateState(startDate);
                setEndDateState(endDate);
              }}
              style={{
                monthNameText: {
                  color: NAV_THEME[colorScheme].text,
                },
                dayTextColor: NAV_THEME[colorScheme].text,
                selectedBetweenDayBackgroundTextColor: NAV_THEME[colorScheme].border,
                selectedBetweenDayTextColor: NAV_THEME[colorScheme].text,
                selectedDayBackgroundColor: '#14522d',
                monthOverlayContainer: {},
                monthContainer: {
                  backgroundColor: NAV_THEME[colorScheme].background,
                  flex: 1,
                },
                container: {
                  backgroundColor: NAV_THEME[colorScheme].background,
                },
                weekContainer: {
                  backgroundColor: NAV_THEME[colorScheme].background,
                },
              }}
            />
          </View>
          <View className="flex-row items-center justify-between gap-3 bg-background p-3">
            <Button variant="outline" className="flex-1" onPress={() => setVisible(false)}>
              <P>Cancel</P>
            </Button>
            <Button
              className="flex-1"
              onPress={() => {
                onChange?.({
                  startDate: startDateState ? new Date(startDateState) : undefined,
                  endDate: endDateState ? new Date(endDateState) : undefined,
                });
                setVisible(false);
              }}>
              <P>Apply</P>
            </Button>
          </View>
        </SafeAreaView>
      </Modal>
    </>
  );
};
