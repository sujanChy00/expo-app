import { Eye, EyeOff } from 'lucide-react-native';
import React from 'react';
import { Control, FieldValues, Path } from 'react-hook-form';
import { TextInput, View } from 'react-native';

import { Button } from '../ui/button';
import { FormDescription, FormField, FormItem } from '../ui/form';
import { Input } from '../ui/input';
import { Label } from './label';
import { InputProps } from './text-input';

import { useBool } from '@/hooks/use-bool';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { cn } from '@/lib/utils';

type PasswordInputProps<T extends FieldValues> = InputProps & {
  name: Path<T>;
  label?: string;
  placeholder?: string;
  control: Control<T>;
};

/**
 * @description A React component that renders a password input field with visibility toggle.
 *
 * @template T Extends FieldValues
 * @typedef {Object} FieldValues - The type of the form values object.
 *
 * @typedef {Object} InputProps - Common properties for form inputs.
 * @property {string} [className] - CSS class names for the input element.
 * @property {string} [placeholder] - Placeholder text for the input element.
 * (Additional properties for your specific Input component)
 *
 * @typedef {Object} PasswordInputProps<T> extends InputProps
 * @property {Path<T>} name - The name of the field in the form values object.
 * @property {string} [label] - The label text for the password input.
 * @property {Control<T>} control - The form control object from React Hook Form.
 *
 * @returns {JSX.Element} The rendered password input component.
 */

export const PasswordInput = <T extends FieldValues>({
  name,
  control,
  label,
  className,
  ...props
}: PasswordInputProps<T>) => {
  const { isDarkColorScheme } = useColorScheme();
  const [showPassword, togglePasswordVisibility] = useBool(false);
  const inputref = React.useRef<TextInput>(null);
  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState }) => {
        return (
          <FormItem>
            <Label inputRef={inputref} label={label} id={name} />
            <View className="relative">
              <Input
                {...props}
                ref={inputref}
                id={name}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                onChangeText={field.onChange}
                className={cn('pr-8', className)}
              />
              <Button
                variant="link"
                className="absolute right-0 top-1/2 -translate-y-1/2 border-none px-2 decoration-transparent"
                onPress={() => togglePasswordVisibility()}>
                {showPassword ? (
                  <EyeOff color={isDarkColorScheme ? '#fff' : '#000'} size={20} />
                ) : (
                  <Eye color={isDarkColorScheme ? '#fff' : '#000'} size={20} />
                )}
              </Button>
            </View>
            {fieldState.error && (
              <FormDescription className="text-red-500">{fieldState.error.message}</FormDescription>
            )}
          </FormItem>
        );
      }}
    />
  );
};
