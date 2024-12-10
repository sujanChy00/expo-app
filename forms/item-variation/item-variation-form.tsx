import { Stack, useRouter } from 'expo-router';
import React from 'react';
import { FormProvider } from 'react-hook-form';
import { ActivityIndicator, View } from 'react-native';

import { UseItemVariationForm } from './use-item-variation-form';

import { TextInput } from '@/components/form-inputs/text-input';
import { Button } from '@/components/ui/button';
import { P } from '@/components/ui/typography';
import useI18n from '@/hooks/useI81n';
import { IItemVaritions } from '@/types';

/**
 * @description A React component that renders a form for creating or editing an item variation, including its name, price, stock, and weight. It uses `UseItemVariationForm` for form logic and data management.
 * @typedef {Object} IItemVaritions - This type is not defined or imported. Please provide the definition or a link to its documentation.
 *
 *
 * @param {Object} props - Component props.
 * @param {IItemVaritions} [props.data] - Optional initial data to populate the form if editing an existing variation.
 * @returns {JSX.Element} The rendered `ItemVariationForm` component.
 */
export const ItemVariationForm = ({ data }: { data?: IItemVaritions }) => {
  const { form, isLoading, handleSubmit } = UseItemVariationForm(data);
  const router = useRouter();
  const { getText } = useI18n();
  return (
    <View className="text-foreground bg-background xs:p-6 flex-1 p-3">
      <Stack.Screen
        options={{
          title: data ? 'Edit Variation' : 'Add Variation',
          headerRight: () => null,
        }}
      />
      <FormProvider {...form}>
        <View className="gap-y-4">
          <TextInput
            control={form.control}
            name="name"
            label={getText('variation_name')}
            placeholder={getText('enter_variation_name')}
          />
          <TextInput
            control={form.control}
            name="price"
            label={getText('variation_price')}
            inputMode="decimal"
            keyboardType="decimal-pad"
            placeholder={getText('enter_variation_price')}
          />
          <TextInput
            control={form.control}
            name="stock"
            label={getText('variation_stock')}
            inputMode="numeric"
            placeholder={getText('enter_variation_stock')}
          />
          <TextInput
            control={form.control}
            name="weight"
            label={getText('variation_weight')}
            inputMode="decimal"
            keyboardType="decimal-pad"
            placeholder={getText('enter_variation_weight')}
          />
        </View>
        <View className="xs:justify-end xs:pt-4 xs:pb-0 flex-row items-center justify-end gap-3 pb-5 pt-4">
          <Button
            className="font-semibold"
            variant="destructive"
            disabled={isLoading}
            onPress={() => router.back()}>
            <P className="font-semibold text-white">{getText('cancel')}</P>
          </Button>
          <Button className="flex-row gap-1 " onPress={handleSubmit}>
            {isLoading && <ActivityIndicator />}
            <P className="font-semibold text-white">
              {data ? getText('update_variation') : getText('add_variation')}
            </P>
          </Button>
        </View>
      </FormProvider>
    </View>
  );
};
