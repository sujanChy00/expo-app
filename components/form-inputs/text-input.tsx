import React from "react";
import { Control, FieldValues, Path } from "react-hook-form";
import { TextInput as TI } from "react-native";
import { FormDescription, FormField, FormItem } from "../ui/form";
import { Input } from "../ui/input";
import { Label } from "./label";

export type InputProps = React.ComponentProps<typeof Input>;

type TextInputProps<T extends FieldValues> = InputProps & {
  name: Path<T>;
  label?: string;
  control: Control<T>;
  placeholder?: string;
  wrapperClassName?: string;
};
/**
 * @description A React component that renders a text input field, integrating with React Hook Form and handling numeric or decimal inputs.
 *
 * @example
 * ```jsx
 * import { TextInput } from './components';
 *
 * const MyForm = ({ control }) => {
 *   return (
 *     <Form control={control}>
 *       <TextInput
 *         name="name"
 *         label="Full Name"
 *         control={control}
 *         placeholder="Enter your full name"
 *       />
 *     </Form>
 *   );
 * };
 * @typedef {Object} TextInputProps<T extends FieldValues> extends InputProps
 * @property {Path<T>} name - The name of the field in the form values object.
 * @property {string} [label] - The label text for the text input field.
 * @property {Control<T>} control - The form control object from React Hook Form.
 * @property {string} [placeholder] - The placeholder text displayed when the input is empty.
 * @property {string} [wrapperClassName] - CSS class names for the wrapper element.
 *
 * @template T Extends FieldValues
 * @returns {JSX.Element} The rendered text input component.
 *
 *
 * ```
 */
export const TextInput = <T extends FieldValues>({
  control,
  name,
  label,
  wrapperClassName,
  ...props
}: TextInputProps<T>) => {
  const inputref = React.useRef<TI>(null);
  const isNumericOrDecimal =
    props.inputMode === "numeric" || props.inputMode === "decimal";

  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState }) => {
        return (
          <FormItem className={wrapperClassName}>
            <Label
              error={fieldState.error?.message}
              inputRef={inputref}
              label={label}
              id={name}
            />
            <Input
              {...props}
              ref={inputref}
              id={name}
              value={String(field.value || "")}
              autoCapitalize={"none"}
              onChangeText={(text) => {
                if (!isNumericOrDecimal && (text == "" || text == "-")) {
                  field.onChange(text);
                  return;
                }
                if (props.inputMode == "decimal") {
                  field.onChange(text);
                  return;
                }
                if (props.inputMode == "numeric") {
                  if (isNaN(Number(text)) || text.length == 0) {
                    field.onChange(0);
                    return;
                  }
                  const value = Number(text);
                  field.onChange(value);
                } else {
                  field.onChange(text);
                }
                props.onChangeText?.(text);
              }}
            />
            {fieldState.error && (
              <FormDescription className="text-red-500">
                {fieldState.error.message}
              </FormDescription>
            )}
          </FormItem>
        );
      }}
    />
  );
};
