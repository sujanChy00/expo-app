import React from 'react';

import { Label as UILabel } from '../ui/label';
import { P } from '../ui/typography';

import { cn } from '@/lib/utils';

interface LabelProps {
  id: string;
  label?: string;
  inputRef?: any;
  onPress?: () => void;
  className?: string;
  error?: string;
}

/**
 * @description A React component that renders a label for a form input.
 * @example
 * ```jsx
 * import { Label } from './Label';
 *
 * const inputRef = React.createRef();
 *
 * return (
 *   <div>
 *     <Label id="name-label" label="Your Name:" inputRef={inputRef} />
 *     <input id="name-input" type="text" ref={inputRef} />
 *   </div>
 * );
 * @typedef {Object} LabelProps
 * @property {string} id - The ID of the label element.
 * @property {string} [label] - The text content of the label. If omitted, no label will be rendered.
 * @property {React.RefObject<HTMLInputElement>} inputRef - A reference to the associated input element.
 *
 * @returns {JSX.Element} The rendered label element.
 *
 *
 * ```
 */
export const Label = ({ id, label, inputRef, onPress, className, error }: LabelProps) => {
  if (!label) return null;

  function handleOnLabelPress(inputRef: React.RefObject<any>) {
    if (onPress) {
      onPress();
    }

    if (!inputRef || !inputRef.current) return;
    if (inputRef.current.isFocused && inputRef.current.isFocused()) {
      inputRef.current?.blur();
    } else {
      inputRef.current?.focus();
    }
  }

  return (
    <UILabel
      className={className}
      onPress={() => handleOnLabelPress(inputRef)}
      asChild
      nativeID={id}>
      <P className={cn('font-medium capitalize', error && 'text-destructive')}>{label}</P>
    </UILabel>
  );
};
