import { useRouter } from 'expo-router';
import { FormProvider } from 'react-hook-form';
import { ActivityIndicator, View } from 'react-native';

import { useShippingOrderForm } from './use-ship-order-form';

import { useGetAllShippingCompany } from '@/api/shipping-fee-api';
import { RadioGroupInput } from '@/components/form-inputs/radio-group-input';
import { TextInput } from '@/components/form-inputs/text-input';
import { Button } from '@/components/ui/button';
import { H3, P } from '@/components/ui/typography';
import useI18n from '@/hooks/useI81n';
import { cn } from '@/lib/utils';
import { ITransactionById } from '@/types/ITransaction';

type Props = {
  data: ITransactionById;
  close?: () => void;
  goBack?: boolean;
  className?: string;
};

/**
 * @description A React component that renders a form for shipping an order, including selecting a shipping company and providing a tracking number (or URL if no company is selected). It utilizes the `useShippingOrderForm` hook for form logic and data management.
 * @typedef {Object} Props - This type is not defined or imported. Please provide the definition or a link to its documentation.
 *
 *
 * @param {Object} props - Component props.
 * @param {Object} props.data - Order data to be shipped.
 * @param {() => void} props.close - Callback function to close the form after successful submission.
 * @param {() => void} props.goBack - Optional callback function to go back to the previous screen instead of closing the form.
 * @returns {JSX.Element} The rendered `ShipOrderForm` component.
 */
export const ShipOrderForm = ({ data, close, goBack, className }: Props) => {
  const { data: ShippingCompanies } = useGetAllShippingCompany();
  const { back } = useRouter();
  const { getText } = useI18n();

  const options = ShippingCompanies
    ? [...ShippingCompanies, { id: 0 as unknown as string, name: getText('others') }].map((s) => ({
        label: s.name,
        value: s.id,
      }))
    : [];
  const { isPending, handleSubmit, form, shippingCompany } = useShippingOrderForm(data, close);
  return (
    <FormProvider {...form}>
      <View className={cn('gap-y-4', className)}>
        <H3>{getText('select_shipping_company')}</H3>
        <RadioGroupInput
          control={form.control}
          name="shippingCompany"
          options={options}
          value={String(shippingCompany)}
        />
        <TextInput
          maxLength={14}
          control={form.control}
          name="trackingNumber"
          inputMode="numeric"
          keyboardType="numeric"
          label={getText('tracking_number')}
          placeholder={getText('enter_tracking_number')}
        />
        {shippingCompany == 0 && (
          <TextInput
            control={form.control}
            name="trackingUrl"
            label={getText('tracking_url')}
            placeholder={getText('enter_tracking_url')}
          />
        )}
        <View className="flex-row justify-end gap-2 pt-5">
          <Button
            onPress={() => {
              if (goBack) back();
              else close && close();
            }}
            variant="destructive">
            <P className="font-semibold text-white">{getText('cancel')}</P>
          </Button>
          <Button onPress={handleSubmit} className="flex-row gap-1">
            {isPending && <ActivityIndicator size="small" color="#fff" />}
            <P className="font-semibold text-white">{getText('submit')}</P>
          </Button>
        </View>
      </View>
    </FormProvider>
  );
};
