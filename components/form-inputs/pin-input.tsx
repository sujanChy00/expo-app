import React from 'react';
import { Control, FieldValues, Path } from 'react-hook-form';

import { FormDescription, FormField, FormItem } from '../ui/form';
import { OTPInput } from '../ui/otp-input';
import { P } from '../ui/typography';

type PinInputProps<T extends FieldValues> = {
  name: Path<T>;
  label?: string;
  control: Control<T>;
  descrition?: string;
  length?: number;
};
/**
 * @description A React component that renders a PIN (Personal Identification Number) input field.
 *
 * @template T Extends FieldValues
 * @typedef {Object} FieldValues - The type of the form values object.
 *
 * @typedef {Object} PinInputProps<T>
 * @property {Control<T>} control - The form control object from React Hook Form.
 * @property {Path<T>} name - The name of the field in the form values object.
 * @property {string} [label] - The label text for the PIN input.
 * @property {string} [descrition] - Optional description text displayed below the PIN input.
 * (Additional properties for your specific PinEntry component)
 *
 * @returns {JSX.Element} The rendered PIN input component.
 */
export const PinInput = <T extends FieldValues>({
  control,
  name,
  label,
  descrition,
  ...props
}: PinInputProps<T>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState }) => {
        return (
          <FormItem>
            {!!label && <P className="cursor-default text-sm font-medium">{label}</P>}
            <OTPInput {...props} value={field.value} onValueChange={field.onChange} />
            {!!descrition && <FormDescription>{descrition}</FormDescription>}
            {fieldState.error && (
              <FormDescription className="text-red-500">{fieldState.error.message}</FormDescription>
            )}
          </FormItem>
        );
      }}
    />
  );
};
