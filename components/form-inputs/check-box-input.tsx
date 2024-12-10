import React, { useState } from 'react';
import { Control, FieldValues, Path } from 'react-hook-form';

import { Checkbox } from '../ui/checkbox';
import { FormDescription, FormField, FormItem } from '../ui/form';
import { Label } from '../ui/label';

type CheckboxProps<T extends FieldValues> = {
  name: Path<T>;
  label?: string;
  control: Control<T>;
  placeholder?: string;
  wrapperClassName?: string;
  disabled?: boolean;
};

/**
 * @example
 * <CheckboxInput
 *   name="agreeToTerms"
 *   label="I agree to the terms and conditions"
 *   control={control}
 * />
 * @extends {React.Component}
 * @interface CheckboxProps
 * @property {Path<T>} name - The name of the checkbox input field.
 * @property {string} [label] - The label text to display next to the checkbox.
 * @property {Control<T>} control - The controller object for the form field.
 * @property {string} [placeholder] - Placeholder text for the checkbox input (optional).
 * @property {string} [wrapperClassName] - Additional CSS classes to apply to the wrapper element.
 *
 * @template T - The type of the form values.
 */

export const CheckboxInput = <T extends FieldValues>({
  control,
  name,
  label,
  wrapperClassName,
  disabled,
}: CheckboxProps<T>) => {
  const inputref = React.useRef<any>(null);
  const [checked, setChecked] = useState(false);
  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState }) => {
        return (
          <FormItem className={wrapperClassName}>
            <Label
              disabled={disabled}
              onPress={() => {
                !disabled && setChecked(!checked);
                !disabled && field.onChange(!checked);
              }}
              nativeID={name}>
              {label}
            </Label>
            <Checkbox
              ref={inputref}
              disabled={disabled}
              nativeID={name}
              checked={field.value}
              onCheckedChange={(checked) => {
                setChecked(checked);
                field.onChange(checked);
              }}
            />
            {fieldState.error && (
              <FormDescription className="text-red-500">{fieldState.error.message}</FormDescription>
            )}
          </FormItem>
        );
      }}
    />
  );
};
