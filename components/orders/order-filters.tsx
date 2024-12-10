// import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
// import { lastDayOfMonth, startOfMonth } from 'date-fns';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { View } from 'react-native';

// import { AppBottomSheet } from '../app-bottom-sheet';
// import { DateRangePicker } from '../ui/date-range-picker/date-range-picker';

import useI18n from '@/hooks/useI81n';

/**
 *
 * @description A React component that provides filtering options for orders based on status and date range.
 * It uses BottomSheet for status selection and DateRangePicker for selecting date ranges.
 *
 * @component
 * @returns {JSX.Element} The rendered OrderFilters component.
 */
export const OrderFilters = () => {
  const { getText } = useI18n();
  const params = useLocalSearchParams<{
    status?: string;
    startDate?: string;
    endDate?: string;
  }>();
  // const [date, setDate] = useState({
  //   startDate: params?.startDate ? startOfMonth(new Date()) : startOfMonth(new Date()),
  //   endDate: params?.endDate ? lastDayOfMonth(new Date()) : lastDayOfMonth(new Date()),
  // });

  const router = useRouter();

  // const ref = useRef<BottomSheet>(null);

  // const openSheet = () => ref?.current?.snapToIndex(0);
  // const closeSheet = () => ref?.current?.close();

  // const onSelect = (status: string) => {
  //   router.setParams({
  //     status,
  //   });
  //   closeSheet();
  // };

  return (
    <View className="flex-row items-center justify-end gap-6 pb-4">
      {/* <Pressable onPress={openSheet} className="flex-row items-center gap-2 ">
        <P className="font-semibold capitalize">
          {params?.status ? getText(params.status.toLowerCase() as ILanguageTexts) : getText('all')}
        </P>
        <ChevronDown size={20} color="#4b5563" />
      </Pressable> */}
      {/* <AppBottomSheet ref={ref} index={-1} snapPoints={['60%']}>
        <BottomSheetView className="bg-background flex-1 px-4 pt-4">
          {orderSortOptions.map((order) => (
            <TouchableOpacity key={order.value} onPress={() => onSelect(order.value)}>
              <View className="flex-row items-center justify-between px-2 py-3">
                <P className="font-semibold">{getText(order.label)}</P>
                {params?.status == order.value && <Check color="green" />}
              </View>
            </TouchableOpacity>
          ))}
        </BottomSheetView>
        {Platform.OS == 'web' && (
          <View className="px-4 pb-4">
            <Button variant="destructive" onPress={closeSheet}>
              <P className="font-semibold text-white">{getText('close')}</P>
            </Button>
          </View>
        )}
      </AppBottomSheet>
      <DateRangePicker
        startDate={date.startDate}
        endDate={date.endDate}
        variant="ghost"
        onChange={(params) => {
          if (params) {
            setDate({
              startDate: params.startDate as Date,
              endDate: params.endDate as Date,
            });
            router.setParams({
              startDate: dateOnlyFormatter(params.startDate),
              endDate: dateOnlyFormatter(params.endDate as unknown as Date),
            });
          }
        }}
      /> */}
    </View>
  );
};
