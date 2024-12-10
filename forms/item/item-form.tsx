import { useRouter } from 'expo-router';
import { FormProvider } from 'react-hook-form';
import { ActivityIndicator, Platform, View } from 'react-native';

import { ItemFormValues } from './item-schema';
import { ItemFormType } from './use-item-form';

import { useGetAllCategories } from '@/api/categories-api';
import { DateInput } from '@/components/form-inputs/date-input';
import { RadioGroupInput } from '@/components/form-inputs/radio-group-input';
import { SelectInput } from '@/components/form-inputs/select-input';
import { SwitchInput } from '@/components/form-inputs/switch-input';
import { TextAreaInput } from '@/components/form-inputs/text-area-input';
import { TextInput } from '@/components/form-inputs/text-input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { P } from '@/components/ui/typography';
import { itemTypeOptions } from '@/constants/data';
import useI18n from '@/hooks/useI81n';
import { cn } from '@/lib/utils';
import { useSelectedShop } from '@/providers/auth-provider';
import { IItemDescriptionResponse } from '@/types';
import { generateClassName } from '@/utils/get-styles';

interface ItemFormProps {
  form: ItemFormType;
  categoryId: string;
  handleSubmit: (values: any) => void;
  isLoading: boolean;
  data?: IItemDescriptionResponse;
  copy?: boolean;
  editMode?: boolean;
  name: string;
  itemType: string;
}

export const ItemForm = ({
  form,
  categoryId,
  handleSubmit,
  isLoading,
  data,
  copy,
  name,
  itemType,
  editMode,
}: ItemFormProps) => {
  const { isNepaliShop, isSastoSulavSelected } = useSelectedShop();
  const disabled = itemType == 'cool';
  const { getText } = useI18n();
  const router = useRouter();
  const { data: categories } = useGetAllCategories();
  const categoriesOptions = categories
    ? categories.map((category) => ({
        label: `${category?.name} (${category?.tax || 0}% tax)`,
        value: String(category?.id),
      }))
    : [];

  const selectedCategory = categories?.find((cat) => cat.id.toString() == categoryId);
  return (
    <FormProvider {...form}>
      <View className="gap-4">
        <View className="grid grid-cols-12 items-stretch gap-4 md:gap-6">
          <TextInput
            label={getText('item_name')}
            control={form.control}
            name={`${name}.itemName` as keyof ItemFormValues}
            placeholder={getText('enter_item_name')}
            wrapperClassName="xs:col-span-6 col-span-12"
          />
          {Platform.OS != 'web' ? (
            <TextAreaInput
              label={getText('item_tags')}
              control={form.control}
              multiline
              name={`${name}.itemTags` as keyof ItemFormValues}
              placeholder={getText('enter_item_tags')}
              className="overflow-hidden"
              wrapperClassName="xs:col-span-6 col-span-12"
            />
          ) : (
            <TextInput
              label={getText('item_tags')}
              control={form.control}
              multiline
              name={`${name}.itemTags` as keyof ItemFormValues}
              placeholder={getText('enter_item_tags')}
              className="overflow-hidden"
              wrapperClassName="xs:col-span-6 col-span-12"
            />
          )}
        </View>
        <TextAreaInput
          label={getText('item_description')}
          control={form.control}
          name={`${name}.itemDescription` as keyof ItemFormValues}
          placeholder={getText('enter_item_description')}
        />
      </View>
      <View className="gap-4">
        <View className="flex-row gap-2">
          <TextInput
            label={getText('selling_price')}
            control={form.control}
            name="price"
            placeholder={getText('enter_selling_price')}
            inputMode="numeric"
            wrapperClassName="flex-1"
          />
          <TextInput
            label={getText('marked_price')}
            control={form.control}
            name="markedPrice"
            placeholder={getText('enter_marked_price')}
            inputMode="numeric"
            wrapperClassName="flex-1"
          />
        </View>
        <View
          className={cn(
            'items-center gap-2',
            generateClassName('grid grid-cols-12', 'flex-col md:flex-row')
          )}>
          <View
            className={cn(
              'items-center gap-2',
              generateClassName('xs:col-span-8 col-span-12 grid grid-cols-2', 'flex-row')
            )}>
            <TextInput
              label={getText('item_weight')}
              control={form.control}
              name="weight"
              placeholder={getText('enter_item_weight')}
              inputMode="decimal"
              wrapperClassName="flex-1"
            />
            <TextInput
              label={getText('item_stock')}
              control={form.control}
              name="stock"
              placeholder="Enter Item Stock"
              inputMode="numeric"
              wrapperClassName="flex-1"
            />
          </View>
          <TextInput
            label={getText('sku')}
            control={form.control}
            name="sku"
            placeholder={getText('enter_sku')}
            wrapperClassName="flex-1 xs:col-span-4 col-span-12 xs:w-auto w-full"
          />
        </View>
        <View className="flex-1 flex-row items-center gap-2">
          <SelectInput
            label={getText('item_type')}
            onChange={(e) => {
              if (e == 'cool') {
                form.setValue('canBeMerged', true);
              }
            }}
            control={form.control}
            name="type"
            placeholder="Select Item Type"
            options={itemTypeOptions}
            wrapperClassName="flex-1"
            className="flex-1"
          />
          <View className="relative flex-1">
            {selectedCategory && (
              <View
                className={cn(
                  'absolute right-2 z-10 flex-row items-center gap-1 ',
                  generateClassName('top-2', 'top-5')
                )}>
                {!!selectedCategory.maxQuantityAllowed && (
                  <Badge>
                    <P className="text-xs text-white">
                      {getText('max_quantity')}
                      {selectedCategory?.maxQuantityAllowed}
                    </P>
                  </Badge>
                )}
                {selectedCategory.alcohol && (
                  <Badge variant="destructive">
                    <P className="text-xs text-white">{getText('alcohol')}</P>
                  </Badge>
                )}
              </View>
            )}
            <SelectInput
              snapPoints={['50%', '70%', '90%']}
              label={getText('category')}
              wrapperClassName="flex-1"
              className="flex-1"
              control={form.control}
              name="categoryId"
              placeholder={getText('select_category')}
              options={categoriesOptions}
            />
          </View>
        </View>
        <View className="flex flex-row gap-2">
          <DateInput
            label={getText('manufacture_date')}
            control={form.control}
            name="manufactureDate"
            placeholder="Manufacture Date"
            maxDate={new Date()}
            wrapperClassName="flex-1"
          />
          <DateInput
            label={getText('expiry_date')}
            control={form.control}
            name="expiryDate"
            placeholder="Expiry Date"
            minDate={new Date()}
            wrapperClassName="flex-1"
          />
        </View>
      </View>
      <View className="gap-4">
        {!editMode && isSastoSulavSelected && (
          <View className="pt-8">
            <RadioGroupInput
              value="false"
              wrapperClassName="flex-row items-center gap-3 justify-end"
              label={
                isNepaliShop
                  ? `${getText('add_to_nepal_shop')}:`
                  : `${getText('add_to_indian_shop')}:`
              }
              control={form.control}
              name="indianShop"
              options={[
                {
                  label: getText('yes'),
                  value: 'true',
                },
                {
                  label: getText('no'),
                  value: 'false',
                },
              ]}
            />
          </View>
        )}
        <SwitchInput
          disabled={disabled}
          control={form.control}
          name="canBeMerged"
          label={getText('can_be_sent_in_cool_cart')}
          wrapperClass="flex-1 flex-row justify-end items-center gap-4"
        />
      </View>
      <View className="flex-row items-center justify-end gap-2 pt-4">
        <Button
          disabled={isLoading}
          onPress={() => {
            router.back();
          }}
          variant="destructive">
          <P className="font-semibold" style={{ color: 'white' }}>
            {getText('cancel')}
          </P>
        </Button>
        <Button disabled={isLoading} onPress={handleSubmit} className="flex-row items-center gap-1">
          {isLoading && <ActivityIndicator size="small" />}
          <P className="font-semibold text-white">
            {copy ? getText('copy') : data ? getText('update') : getText('add')}
          </P>
        </Button>
      </View>
    </FormProvider>
  );
};
