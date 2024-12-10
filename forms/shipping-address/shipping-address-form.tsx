import { useRouter } from 'expo-router';
import React from 'react';
import { FormProvider } from 'react-hook-form';
import { ActivityIndicator, View } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';

import { useShippingAddressForm } from './use-shipping-address-form';

import { TextInput } from '@/components/form-inputs/text-input';
import { Button } from '@/components/ui/button';
import { P } from '@/components/ui/typography';
import useI18n from '@/hooks/useI81n';
import { cn } from '@/lib/utils';
import { IShippingAddress } from '@/types/ITransaction';

export const ShippingAddressForm = ({
  address,
}: {
  address?: (IShippingAddress & { sellerRequest?: boolean; prefecture: string }) | null;
}) => {
  const router = useRouter();
  const { getText } = useI18n();
  const { form, isPending, onUpdate, gettingAddressInfo } = useShippingAddressForm(address);

  return (
    <FormProvider {...form}>
      <View className={cn('gap-y-4 pt-2')}>
        <TextInput
          control={form.control}
          name="prefecture"
          label={getText('prefecture')}
          readOnly
          className="bg-gray-500"
        />
        <TextInput
          control={form.control}
          name="postalCode"
          placeholder="Enter postal code"
          label={getText('postal_code')}
        />
        <TextInput
          control={form.control}
          name="address1"
          placeholder="Enter address 1"
          label={getText('address1')}
        />
        <TextInput
          control={form.control}
          name="address2"
          placeholder="Enter address 2"
          label={getText('address2')}
        />
        <TextInput
          control={form.control}
          name="city"
          placeholder="Enter city"
          label={getText('city')}
        />
      </View>
      {!gettingAddressInfo && (
        <Animated.View
          entering={FadeIn}
          style={{
            flexDirection: 'row',
            gap: 6,
            justifyContent: 'flex-end',
            alignItems: 'center',
            paddingVertical: 16,
          }}>
          <Button onPress={() => router.back()} disabled={isPending} variant="outline">
            <P className="font-semibold uppercase">{getText('cancel')}</P>
          </Button>
          <Button onPress={onUpdate} disabled={isPending} className="flex-row items-center gap-1">
            {isPending && <ActivityIndicator size="small" color="white" />}
            <P className="font-semibold uppercase text-white">{getText('update')}</P>
          </Button>
        </Animated.View>
      )}
    </FormProvider>
  );
};
