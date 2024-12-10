import React from 'react';
import { Control, FieldValues, Path } from 'react-hook-form';
import { TextInput as TI } from 'react-native';

import { FormDescription, FormField, FormItem } from '../ui/form';
import { Textarea } from '../ui/textarea';
import { Label } from './label';

export type TextAreaProps = Omit<React.ComponentProps<typeof Textarea>, 'onChangeText'>;

type TextAreaInputProps<T extends FieldValues> = TextAreaProps & {
  name: Path<T>;
  label?: string;
  control: Control<T>;
  wrapperClassName?: string;
};

/**
 * @description A React component that renders a text area input field with integration with React Hook Form.
 *
 * @example
 * ```jsx
 * import { TextAreaInput } from './components';
 *
 * const MyForm = ({ control }) => {
 *   return (
 *     <Form control={control}>
 *       <TextAreaInput
 *         name="description"
 *         label="Description"
 *         control={control}
 *         placeholder="Enter a detailed description"
 *         maxLength={250}
 *       />
 *     </Form>
 *   );
 * };
 * @typedef {Object} TextAreaProps - The props used by the `Textarea` component, excluding the `onChangeText` prop.
 * @property {...JSX.IntrinsicElements['textarea']>} - Any valid props for the HTML `<textarea>` element.
 *
 * @typedef {Object} TextAreaInputProps<T extends FieldValues> extends TextAreaProps
 * @property {Path<T>} name - The name of the field in the form values object.
 * @property {string} [label] - The label text for the text area input.
 * @property {Control<T>} control - The form control object from React Hook Form.
 * @property {string} [wrapperClassName] - CSS class names for the wrapper element.
 *
 * @returns {JSX.Element} The rendered text area input component.
 *
 *
 * ```
 */
export const TextAreaInput = <T extends FieldValues>({
  control,
  name,
  label,
  wrapperClassName,
  ...props
}: TextAreaInputProps<T>) => {
  const inputref = React.useRef<TI>(null);
  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState }) => {
        return (
          <FormItem className={wrapperClassName}>
            <Label error={fieldState.error?.message} inputRef={inputref} label={label} id={name} />
            <Textarea
              {...props}
              ref={inputref}
              id={name}
              value={field.value}
              autoCapitalize="none"
              onChangeText={field.onChange}
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
