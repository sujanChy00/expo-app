import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { Check } from 'lucide-react-native';
import React, { useEffect, useRef } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Platform, TouchableOpacity, View, ViewProps } from 'react-native';

import { AppBottomSheet } from '@/components/app-bottom-sheet';
import { SelectInput } from '@/components/form-inputs/select-input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { P } from '@/components/ui/typography';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useUser } from '@/hooks/use-user';
import useI18n from '@/hooks/useI81n';
import { cn } from '@/lib/utils';
import { useSelectedShop } from '@/providers/auth-provider';
import { truncateString } from '@/utils/tuncate-string';

export const ShopSelector = ({
  className,
  style,
}: {
  className?: string;
  style?: ViewProps['style'];
}) => {
  const { user } = useUser();
  const { isDarkColorScheme } = useColorScheme();
  const { selectedShop, setSelectedShop } = useSelectedShop();
  const bottomSheetRef = useRef<BottomSheet>(null);
  const open = () => bottomSheetRef?.current?.snapToIndex(0);
  const close = () => bottomSheetRef?.current?.close();
  const { getText } = useI18n();

  const form = useForm<{ shopId: number | undefined }>({
    defaultValues: {
      shopId: selectedShop?.shopId,
    },
  });
  const shopLists = user
    ? user?.shopDetails.map((shop) => ({
        label: shop.shopName,
        value: shop.shopId,
      }))
    : [];

  useEffect(() => {
    form.setValue('shopId', selectedShop?.shopId);
  }, [selectedShop]);

  if (Platform.OS === 'web')
    return (
      <FormProvider {...form}>
        <SelectInput
          className={cn('web:border-none web:bg-transparent web:focus:ring-0', className)}
          control={form.control}
          name="shopId"
          options={shopLists}
          placeholder="Select Shop"
          onChange={(shopId) => {
            const currentShop = user?.shopDetails.find((shop) => shop.shopId == shopId);
            currentShop && setSelectedShop(currentShop);
          }}
        />
      </FormProvider>
    );

  return (
    <Card
      style={[
        {
          backgroundColor: isDarkColorScheme ? '#171717' : '#f3f4f6',
        },
        style,
      ]}
      className={cn('flex-row items-center justify-between gap-2 p-3', className)}>
      <P>{truncateString(selectedShop?.shopName, 30)}</P>
      <Button onPress={open} className="rounded-full" variant="tertiary">
        <P className="text-primary-foreground">{getText('select_shop')}</P>
      </Button>
      <AppBottomSheet ref={bottomSheetRef} index={-1} snapPoints={['50%', '75%', '90%']}>
        <BottomSheetScrollView style={{ flex: 1 }}>
          <View style={{ paddingHorizontal: 10, paddingVertical: 15 }}>
            {shopLists.map((shop) => (
              <TouchableOpacity
                className="py-3"
                key={shop.value}
                onPress={() => {
                  const currentShop = user?.shopDetails.find((s) => s.shopId == shop.value);
                  currentShop && setSelectedShop(currentShop);
                  close();
                }}>
                <View className="flex-row items-center justify-between">
                  <P>{shop.label}</P>
                  {selectedShop?.shopId == shop.value && <Check color="green" />}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </BottomSheetScrollView>
      </AppBottomSheet>
    </Card>
  );
};
