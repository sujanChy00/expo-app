import { useRouter } from 'expo-router';
import { FormProvider } from 'react-hook-form';
import { ActivityIndicator, View } from 'react-native';

import { useShippingFeeForm } from './use-shipping-fee-form';

import { TextInput } from '@/components/form-inputs/text-input';
import { Button } from '@/components/ui/button';
import { P } from '@/components/ui/typography';
import useI18n from '@/hooks/useI81n';
import { IshippingFee } from '@/types/IshippingFee';

export const ShippingFeeForm = ({ shippingFee }: { shippingFee?: IshippingFee }) => {
  const router = useRouter();

  const { isLoading, handleSubmit, form } = useShippingFeeForm(shippingFee);
  const { getText } = useI18n();
  return (
    <View className="bg-background flex-1">
      <FormProvider {...form}>
        <View className="native:gap-4 pb-6 web:gap-4">
          <TextInput
            control={form.control}
            name="coolShippingFee"
            label={getText('cool_shipping_fee')}
            inputMode="numeric"
            placeholder="Enter cool shipping fee"
          />
          <TextInput
            control={form.control}
            name="shippingFee"
            label={getText('shipping_fees')}
            inputMode="numeric"
            placeholder="Enter shipping fee"
          />
          <TextInput
            control={form.control}
            name="frozenShippingFee"
            label={getText('frozen_shipping_fee')}
            inputMode="numeric"
            placeholder="Enter frozen shipping fee"
          />
          <TextInput
            readOnly
            control={form.control}
            name="weight"
            label={getText('weight')}
            inputMode="numeric"
            placeholder="Enter weight"
            className="bg-gray-500"
          />
        </View>
      </FormProvider>
      <View className="flex-row items-center justify-end gap-2 pt-8 web:fixed web:bottom-4 web:right-4 web:sm:static">
        <Button disabled={isLoading} onPress={() => router.back()} variant="destructive">
          <P className="font-semibold text-white">{getText('cancel')}</P>
        </Button>
        <Button onPress={handleSubmit} disabled={isLoading} className="flex-row items-center gap-1">
          {isLoading && <ActivityIndicator size="small" />}
          <P className="font-semibold text-white">{getText('save')}</P>
        </Button>
      </View>
    </View>
  );
};
