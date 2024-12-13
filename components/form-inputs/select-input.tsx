import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import React, { useRef, useState } from 'react';
import { Control, FieldValues, Path } from 'react-hook-form';
import { Platform, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AppBottomSheet } from '../app-bottom-sheet';
import { Check } from '../icons/check';
import { Button } from '../ui/button';
import { FormDescription, FormField, FormItem } from '../ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { P } from '../ui/typography';
import { Label } from './label';

import { cn } from '@/lib/utils';

type SelectInputProps<T extends FieldValues> = {
  name: Path<T>;
  disabled?: boolean;
  label?: string;
  control: Control<T>;
  options: SelectOption[];
  placeholder?: string;
  className?: string;
  onChange?: (value: string | number | boolean) => void;
  wrapperClassName?: string;
  snapPoints?: string[];
};

type SelectOption = {
  label: string;
  value: string | number | boolean;
  disabled?: boolean;
  children?: React.ReactNode;
};

type PlatformSelectProps<T extends FieldValues> = SelectInputProps<T> & {
  fieldValueChange: (value: string) => void;
  fieldValue: string;
  error?: string;
};

/**
 * @description A React component that renders a select input field with customizable options.
 * @example
 * ```jsx
 * import { SelectInput } from './components';
 *
 * const options = [
 *   { value: 'option1', label: 'Option 1' },
 *   { value: 'option2', label: 'Option 2' },
 *   { value: 'option3', label: 'Option 3', disabled: true },
 * ];
 *
 * const MyForm = ({ control }) => {
 *   return (
 *     <Form control={control}>
 *       <SelectInput
 *         name="selectField"
 *         label="Select Option"
 *         control={control}
 *         options={options}
 *         placeholder="Select an option"
 *         onChange={(value) => console.log('Selected value:', value)}
 *       />
 *     </Form>
 *   );
 * };
 * ```
 * @template T Extends FieldValues
 * @typedef {Object} FieldValues - The type of the form values object.
 *
 * @typedef {Object} SelectOption
 * @property {string} label - The text displayed for the option.
 * @property {string | number | boolean} value - The value of the option.
 * @property {boolean} [disabled] - Whether the option is disabled.
 *
 * @typedef {Object} SelectInputProps<T>
 * @property {Path<T>} name - The name of the field in the form values object.
 * @property {string} [label] - The label text for the select input.
 * @property {Control<T>} control - The form control object from React Hook Form.
 * @property {SelectOption[]} options - An array of options for the select input.
 * @property {string} placeholder - The placeholder text displayed when no option is selected.
 * @property {string} [className] - CSS class names for the select input element.
 * @property {(value: string | number | boolean) => void} [onChange] - Callback function triggered when the selected value changes.
 * @property {string} [wrapperClassName] - CSS class names for the wrapper element.
 *
 * @returns {JSX.Element} The rendered select input component.
 *
 *
 */

export const SelectInput = <T extends FieldValues>(props: SelectInputProps<T>) => {
  return (
    <FormField
      control={props.control}
      name={props.name}
      render={({ field, fieldState }) => {
        return (
          <FormItem className={props?.wrapperClassName}>
            {Platform.OS === 'web' ? (
              <WebSelectInput
                {...props}
                fieldValue={field.value}
                fieldValueChange={field.onChange}
                error={fieldState.error?.message}
              />
            ) : (
              <NativeSelectInput
                {...props}
                fieldValue={field.value}
                fieldValueChange={field.onChange}
                error={fieldState.error?.message}
              />
            )}
            {fieldState.error && (
              <FormDescription className="text-red-500">{fieldState.error.message}</FormDescription>
            )}
          </FormItem>
        );
      }}
    />
  );
};

const WebSelectInput = <T extends FieldValues>({
  options,
  disabled,
  label,
  name,
  placeholder,
  className,
  onChange,
  fieldValueChange,
  fieldValue,
  error,
}: PlatformSelectProps<T>) => {
  const ref = React.useRef<View>(null);
  const insets = useSafeAreaInsets();
  const contentInsets = {
    top: insets.top,
    bottom: insets.bottom,
    left: 12,
    right: 12,
  };

  return (
    <>
      <Label
        onPress={() => !disabled && ref?.current?.focus()}
        id={name}
        inputRef={ref}
        label={label}
        key={name}
        error={error}
      />
      <Select
        ref={ref}
        onValueChange={(val) => {
          if (val) {
            val.label = String(
              val.label in options ? options[val.label as keyof typeof options] : val.label
            );
            fieldValueChange(val.value);
            onChange?.(val.value);
          }
        }}
        value={{ label: '', value: fieldValue }}>
        <SelectTrigger disabled={disabled} className={cn('w-full', className)}>
          <SelectValue
            className="native:text-lg text-sm text-white"
            placeholder={placeholder || 'Select an option'}
          />
        </SelectTrigger>
        <SelectContent insets={contentInsets} className="w-full">
          {options.map((option) => (
            <SelectItem
              key={String(option.value)}
              disabled={option.disabled}
              label={option.label}
              value={option.value as string}>
              {option?.children}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </>
  );
};

const NativeSelectInput = <T extends FieldValues>({
  name,
  fieldValueChange,
  options,
  placeholder,
  className,
  disabled,
  snapPoints,
  onChange,
  label,
  fieldValue,
}: PlatformSelectProps<T>) => {
  const [value, setValue] = useState(fieldValue);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const open = () => bottomSheetRef?.current?.snapToIndex(0);
  const close = () => bottomSheetRef?.current?.close();
  const selectedValue = options.find((o) => o.value === value)?.label;
  return (
    <View className={className}>
      <Label id={name} inputRef={null} label={label} onPress={() => !disabled && open()} />
      <Button
        variant="outline"
        disabled={disabled}
        onPress={() => !disabled && open()}
        className={className}>
        <P>{selectedValue || placeholder}</P>
      </Button>
      <AppBottomSheet ref={bottomSheetRef} snapPoints={snapPoints || ['30%', '50%']} index={-1}>
        <BottomSheetScrollView style={{ flex: 1 }}>
          <View className="p-3">
            {options.map((opt) => (
              <TouchableOpacity
                disabled={opt.disabled}
                onPress={() => {
                  setValue(opt.value as string);
                  fieldValueChange(opt.value as string);
                  onChange?.(opt.value as string);
                  close();
                }}
                key={opt.value as string}>
                <View className="flex-row items-center justify-between py-3">
                  <P>{opt.label}</P>
                  {value == opt.value && <Check color="green" />}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </BottomSheetScrollView>
      </AppBottomSheet>
    </View>
  );
};
