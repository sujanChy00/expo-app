import React, { useState } from 'react';
import { Control, FieldValues, Path } from 'react-hook-form';
import { Pressable, View } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

import { FormField, FormItem } from '../ui/form';
import { P } from '../ui/typography';
import { Label } from './label';

interface RadioOption {
  label: string;
  value: string;
}

type RadioGroupProps<T extends FieldValues> = {
  name: Path<T>;
  label?: string;
  control: Control<T>;
  placeholder?: string;
  wrapperClassName?: string;
  options: RadioOption[];
  onChange?: (e: string | undefined) => void;
  value?: string;
};

export const RadioGroupInput = <T extends FieldValues>({
  wrapperClassName,
  onChange,
  ...props
}: RadioGroupProps<T>) => {
  const [value, setValue] = useState<string | undefined>(props?.value as string);
  return (
    <FormField
      control={props.control}
      name={props.name}
      render={({ field, fieldState }) => {
        const handleOnChange = (text?: string) => {
          if (value == text) {
            field.onChange(undefined);
            setValue(undefined);
          } else {
            field.onChange(text);
            setValue(text);
          }
        };
        return (
          <FormItem className={wrapperClassName}>
            <Label
              id={props.name}
              inputRef={field.ref}
              label={props.label}
              className="web:mt-2.5"
            />
            <View className="flex-row flex-wrap items-center gap-4">
              {props.options.map((op: RadioOption) => (
                <Pressable
                  key={op.value}
                  onPress={() => {
                    handleOnChange(op.value);
                    onChange && onChange(op.value);
                  }}>
                  <View className="flex-row items-center gap-2">
                    <View
                      style={{ height: 20, width: 20 }}
                      className="items-center justify-center rounded-full border border-primary">
                      {op.value == value && (
                        <Animated.View
                          entering={FadeIn}
                          exiting={FadeOut}
                          style={{
                            height: 15,
                            width: 15,
                            borderRadius: 100,
                            backgroundColor: '#14522d',
                          }}
                        />
                      )}
                    </View>
                    <P className="font-semibold">{op.label}</P>
                  </View>
                </Pressable>
              ))}
            </View>
          </FormItem>
        );
      }}
    />
  );
};
