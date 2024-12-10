/**
 * @description A React component that renders a form for editing a shop's details. It fetches data using `useGetShopDetails`, utilizes `useShopForm` for form logic and data management, and allows updating the shop information.
 *
 * @returns {JSX.Element} The rendered `ShopForm` component.
 */

import { useRouter } from 'expo-router';
import { FormProvider } from 'react-hook-form';
import { ActivityIndicator, ScrollView, View } from 'react-native';

import { useShopForm } from './use-shop-form';

import { TextAreaInput } from '@/components/form-inputs/text-area-input';
import { TextInput } from '@/components/form-inputs/text-input';
// import { ProfileImagePicker } from '@/components/profile/profile-image-picker';
import { Button } from '@/components/ui/button';
import { P } from '@/components/ui/typography';
import useI18n from '@/hooks/useI81n';
import { IshopDetails } from '@/types/IShop';

export const ShopForm = ({ shop }: { shop?: IshopDetails }) => {
  const router = useRouter();
  const { form, isLoading, changingshopImage, handleUpdateShop, updateShopImage } =
    useShopForm(shop);
  const { getText } = useI18n();
  return (
    <ScrollView
      automaticallyAdjustKeyboardInsets
      showsVerticalScrollIndicator={false}
      keyboardDismissMode="on-drag"
      className="bg-background web:flex-1 ">
      <FormProvider {...form}>
        {/* <ProfileImagePicker
          alt={shop?.shopName || 'shop name'}
          image={shop?.shopPhotoUrl}
          isLoading={changingshopImage}
          onUpload={updateShopImage}
        /> */}
        <View className="gap-y-4 pb-4 pt-8">
          <View className="flex-col justify-between gap-4 md:flex-row">
            <TextInput
              label={getText('shop_name')}
              control={form.control}
              name="shopName"
              wrapperClassName="sm:flex-1"
              placeholder="Enter shop name"
            />
            <TextInput
              wrapperClassName="md:flex-1"
              label={getText('phone_number')}
              control={form.control}
              name="shopPhoneNumber"
              placeholder="Enter phone no."
            />
            <TextInput
              label={getText('shop_address')}
              control={form.control}
              name="shopAddress"
              multiline
              wrapperClassName="md:flex-1"
              placeholder="Enter shop address"
            />
          </View>
          <TextAreaInput
            label={getText('promotional_message')}
            control={form.control}
            name="shopIntroduction"
            placeholder="About your shop"
          />
          <View className="flex-1 flex-col justify-between gap-4 md:flex-row">
            <TextInput
              label={getText('shop_registration_number')}
              control={form.control}
              name="shopRegistrationNumber"
              wrapperClassName="md:flex-1"
              placeholder="Enter registrations no."
              readOnly
            />
            <TextInput
              label={getText('minimum_order_amount')}
              wrapperClassName="md:flex-1"
              control={form.control}
              name="orderAmount"
              placeholder="Enter order amount"
              inputMode="numeric"
            />
          </View>
          <View className="flex-1 flex-col justify-between gap-4 md:flex-row">
            <TextInput
              label={getText('low_stock_threshold')}
              wrapperClassName="sm:flex-1"
              control={form.control}
              name="lowStockThreshold"
              placeholder="Enter low stock threshold amount"
              inputMode="numeric"
            />
            <TextInput
              label={getText('expiry_threshold')}
              wrapperClassName="md:flex-1"
              control={form.control}
              name="expiryThreshold"
              placeholder="Enter expiry threshold"
              inputMode="numeric"
            />
          </View>
          <View className="flex-1 flex-col justify-between gap-4 md:flex-row">
            <TextInput
              wrapperClassName="md:flex-1"
              label="Facebook URL"
              control={form.control}
              name="shopFacebookUrl"
              placeholder="Enter facebook link"
              inputMode="url"
              multiline
            />
            <TextInput
              wrapperClassName="sm:flex-1"
              label="Tiktok URL"
              control={form.control}
              name="shopTiktokUrl"
              placeholder="Enter tiktok link"
              inputMode="url"
            />
          </View>
        </View>
        <View className="flex-row items-center justify-end gap-2">
          <Button
            variant="destructive"
            disabled={changingshopImage || isLoading}
            onPress={() => router.back()}>
            <P className="font-semibold text-white">{getText('cancel')}</P>
          </Button>
          <Button
            onPress={handleUpdateShop}
            disabled={changingshopImage || isLoading}
            className="flex-row gap-1">
            {isLoading && <ActivityIndicator size="small" color="#fff" />}
            <P className="font-semibold text-white">{getText('update')}</P>
          </Button>
        </View>
      </FormProvider>
    </ScrollView>
  );
};
