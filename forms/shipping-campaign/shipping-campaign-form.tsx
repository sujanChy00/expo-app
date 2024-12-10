import { useRouter } from 'expo-router';
import { FormProvider } from 'react-hook-form';
import { ActivityIndicator, Platform, ScrollView, View } from 'react-native';

import { ShippingAreas } from './shipping-areas';
import { useShippingCampaignForm } from './use-shipping-campaign';

import { DateInput } from '@/components/form-inputs/date-input';
import { SelectInput } from '@/components/form-inputs/select-input';
import { SwitchInput } from '@/components/form-inputs/switch-input';
import { TextAreaInput } from '@/components/form-inputs/text-area-input';
import { TextInput } from '@/components/form-inputs/text-input';
import { Button } from '@/components/ui/button';
import { H4, P } from '@/components/ui/typography';
import { discountTypes, itemTypes } from '@/constants/data';
import useI18n from '@/hooks/useI81n';
import { IShipppingCampaign } from '@/types/IShippingCampaign';

/**
 * @description A React component that renders a form for creating or editing a shipping campaign.
 * It fetches data using various hooks and utilizes `useShippingCampaignForm` for form logic,
 * data management, and area selection handling.
 */

export const ShippingCampaignForm = ({ campaign }: { campaign?: IShipppingCampaign }) => {
  const router = useRouter();
  const { getText } = useI18n();
  const { isLoading, handleSubmit, form, toggleAreaSelection, discountType, selectedShippingArea } =
    useShippingCampaignForm(campaign);

  const discountInputLabel = {
    flatShippingDiscount: getText('flat_discount'),
    flatShippingCharge: getText('flat_amount'),
    shippingCampaignDiscountPercentage: getText('discount') + ' %',
  };

  const discountInputPlaceholder = {
    flatShippingDiscount: 'Enter Flat Discount',
    flatShippingCharge: 'Enter Flat Amount',
    shippingCampaignDiscountPercentage: 'Enter Discount %',
  };

  return (
    <ScrollView
      automaticallyAdjustKeyboardInsets
      keyboardDismissMode="on-drag"
      showsVerticalScrollIndicator={false}>
      <FormProvider {...form}>
        <View className="gap-4 pb-5">
          <View className="grid grid-cols-12 items-stretch gap-4 pb-3">
            <TextInput
              control={form.control}
              name="shippingCampaignName"
              label={getText('campaign_name')}
              inputMode="text"
              placeholder="Enter Campaign Name"
              wrapperClassName="xs:col-span-6 col-span-12"
              multiline
            />
            {Platform.OS == 'web' ? (
              <TextInput
                control={form.control}
                name="shippingCampaignDescription"
                label={getText('campaign_description')}
                inputMode="text"
                placeholder="Enter Campaign Description"
                wrapperClassName="xs:col-span-6 col-span-12"
                multiline
              />
            ) : (
              <TextAreaInput
                control={form.control}
                name="shippingCampaignDescription"
                label={getText('campaign_description')}
                inputMode="text"
                placeholder="Enter Campaign Description"
                wrapperClassName="xs:col-span-6 col-span-12"
                multiline
              />
            )}
          </View>
          <View className="native:xs:flex-row native:flex-col items-center gap-2 web:grid web:grid-cols-12">
            <View className="native:flex-row items-center gap-2 web:col-span-12 web:grid web:grid-cols-2 web:md:col-span-8">
              <SelectInput
                placeholder="Item Type"
                control={form.control}
                label={getText('item_type')}
                name="shippingCampaignType"
                options={itemTypes}
                wrapperClassName="flex-1"
              />
              <SelectInput
                control={form.control}
                label={getText('given_by')}
                name="shippingCampaignGivenBy"
                options={[
                  { label: 'Admin', value: 'admin' },
                  { label: 'Seller', value: 'seller' },
                ]}
                placeholder="Seller or Admin"
                wrapperClassName="flex-1"
              />
            </View>
            <TextInput
              placeholder="Enter Minimum Amount Threshold"
              control={form.control}
              name="shippingCampaignMinimumOrderAmountThreshold"
              label={getText('threshold')}
              inputMode="numeric"
              wrapperClassName="flex-1 md:col-span-4 col-span-12 md:w-auto w-full md:flex hidden"
            />
          </View>
          <TextInput
            placeholder="Enter Minimum Amount Threshold"
            control={form.control}
            name="shippingCampaignMinimumOrderAmountThreshold"
            label={getText('threshold')}
            inputMode="numeric"
            wrapperClassName="flex-1 md:hidden flex"
          />
          <View className="flex-row gap-2">
            <SelectInput
              disabled={!!campaign}
              placeholder="Select Discount Type"
              control={form.control}
              label={getText('discount_type')}
              name="discountType"
              options={discountTypes}
              wrapperClassName="flex-1"
            />
            <TextInput
              readOnly={!!campaign}
              className="gap-4"
              control={form.control}
              name={discountType}
              label={discountInputLabel[discountType]}
              inputMode="numeric"
              placeholder={discountInputPlaceholder[discountType]}
              wrapperClassName="flex-1"
            />
          </View>
          <View className="flex-row gap-2">
            <DateInput
              maxDate={new Date()}
              control={form.control}
              name="shippingCampaignStartDate"
              label={getText('start_date')}
              placeholder="Select Start Date"
              wrapperClassName="flex-1"
            />
            <DateInput
              minDate={new Date()}
              control={form.control}
              name="shippingCampaignEndDate"
              label={getText('end_date')}
              placeholder="Select End Date"
              wrapperClassName="flex-1"
            />
          </View>
          <View className="gap-4 pt-3 md:pt-0">
            <H4 className="text-center">{getText('select_shipping_area')}</H4>
            <View className="flex-row flex-wrap justify-start gap-3">
              <ShippingAreas
                onPress={(id) => toggleAreaSelection(id)}
                selectedShippingArea={selectedShippingArea}
              />
            </View>
          </View>
        </View>
        <View className="xs:items-center xs:flex-row native:flex-1 flex-col items-end justify-end gap-3 pb-10 pt-5">
          <SwitchInput
            control={form.control}
            name="shippingCampaignActive"
            label={getText('status') + ': '}
            wrapperClass="flex-row justify-center items-center xs:gap-2 gap-4"
          />
          <View className="xs:pt-0 flex-row items-end justify-end gap-2 pt-3">
            <Button disabled={isLoading} onPress={() => router.back()} variant="destructive">
              <P className="font-semibold" style={{ color: 'white' }}>
                {getText('cancel')}
              </P>
            </Button>
            <Button
              disabled={isLoading}
              onPress={handleSubmit}
              className="flex-row items-center gap-1">
              {isLoading && <ActivityIndicator size="small" color="#fff" />}
              <P className="font-semibold text-white">
                {campaign ? getText('update') : getText('add')}
              </P>
            </Button>
          </View>
        </View>
      </FormProvider>
    </ScrollView>
  );
};
