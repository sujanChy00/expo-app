import React from 'react';
import { Control, FieldValues, Path } from 'react-hook-form';

import { DatePicker } from '../ui/date-pickers/DatePicker';
import { FormDescription, FormField, FormItem, FormLabel } from '../ui/form';

type DateInputProps<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  label?: string | React.ReactNode;
  placeholder?: string;
  wrapperClassName?: string;
  minDate?: Date;
  maxDate?: Date;
  className?: string;
};

/**
 * @description This component renders a DateInput Field with a calendar to be used with react-hook-form 
 * @example
 * <DateInput
 *   name="dateOfBirth"
 *   label="Date of Birth"
 *   control={control}
 * />
 * 
 * @extends {React.Component}
 *
 * @typedef {import("react-hook-form").FieldValues} FieldValues
 * @typedef {import("../ui/button").ButtonProps} ButtonProps
 *
 * @typedef {{
 *   name: Path<T>;
 *   control: Control<T>;
 *   label?: string | React.ReactNode;
 *   placeholder?: string;
 *   value?: Date;
 *   wrapperClassName?: string
 * }} DateInputProps
 *
 * @param {DateInputProps<T>} props - The component props.
 *
 
 */
export const DateInput = <T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  wrapperClassName,
  maxDate,
  minDate,
  className,
}: DateInputProps<T>) => {
  const ref = React.useRef<any>(null);

  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <FormItem className={wrapperClassName}>
          {/* @ts-ignore */}
          {label && <FormLabel>{label}</FormLabel>}
          <DatePicker
            minimumDate={minDate}
            maximumDate={maxDate}
            placeholder={placeholder}
            value={field.value}
            onValueChange={field.onChange}
            className={className}
          />
          {fieldState.error && (
            <FormDescription className="text-red-500">{fieldState.error.message}</FormDescription>
          )}
        </FormItem>
      )}
    />
  );
};
