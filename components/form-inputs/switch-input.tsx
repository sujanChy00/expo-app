import React from 'react';
import { Control, FieldValues, Path } from 'react-hook-form';

import { FormDescription, FormField, FormItem } from '../ui/form';
import { Switch } from '../ui/switch';
import { Label } from './label';

import { cn } from '@/lib/utils';

type SwitchInputProps<T extends FieldValues> = {
  name: Path<T>;
  label?: string;
  control: Control<T>;
  onCheckedChange?: (checked: boolean) => void;
  className?: string;
  wrapperClass?: string;
  disabled?: boolean;
};

/**
 * @description A React component that renders a switch input field.
 * @example
 * ```jsx
 * import { SwitchInput } from './components';
 *
 * const MyForm = ({ control }) => {
 *   return (
 *     <Form control={control}>
 *       <SwitchInput
 *         name="isAgreed"
 *         label="I agree to the terms and conditions"
 *         control={control}
 *         onCheckedChange={(checked) => console.log('Is agreed:', checked)}
 *       />
 *     </Form>
 *   );
 * };
 * ```
 * @template T Extends FieldValues
 * @typedef {Object} FieldValues - The type of the form values object.
 *
 * @typedef {Object} SwitchInputProps<T>
 * @property {Path<T>} name - The name of the field in the form values object.
 * @property {string} [label] - The label text for the switch input.
 * @property {Control<T>} control - The form control object from React Hook Form.
 * @property {(checked: boolean) => void} [onCheckedChange] - Optional callback function triggered when the checked state changes.
 * @property {string} [className] - CSS class names for the switch input element.
 *
 * @returns {JSX.Element} The rendered switch input component.
 *
 *
 */
export const SwitchInput = <T extends FieldValues>({
  control,
  name,
  label,
  className,
  wrapperClass,
  onCheckedChange,
  disabled,
}: SwitchInputProps<T>) => {
  const [checked, setChecked] = React.useState(false);
  const inputRef = React.useRef<any>(null);
  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState }) => {
        return (
          <FormItem className={cn('flex-row items-center gap-2', wrapperClass)}>
            <Label
              className="web:pt-2"
              onPress={() => {
                if (disabled) return;
                setChecked(!checked);
                field.onChange(!checked);
              }}
              id={name}
              inputRef={inputRef}
              label={label}
              key={name}
            />
            <Switch
              className={className}
              id={name}
              disabled={disabled}
              checked={field.value}
              onCheckedChange={(checked) => {
                onCheckedChange?.(checked);
                field.onChange(checked);
                setChecked(checked);
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
