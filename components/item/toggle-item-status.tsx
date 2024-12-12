import React, { useState } from 'react';

import { Switch } from '../ui/switch';

import { useToggleItem } from '@/actions/item';

type Props = {
  itemId: string;
  initialValue: boolean;
};

/**
 * @description A React component that renders a toggle switch to enable or disable an item with error handling.
 * @example
 * ```jsx
 * <ToggleItemStatus itemId="123" initialValue={false} />
 * @typedef {Object} Props
 * @property {string} itemId - The ID of the item whose status needs to be toggled (disabled/enabled).
 * @property {boolean} initialValue - The initial disabled state of the item.
 *
 *
 * @param {Props} props - The component props.
 * @returns {JSX.Element} The rendered item toggle switch component.
 *
 *
 * ```
 */
export const ToggleItemStatus = ({ initialValue, itemId }: Props) => {
  const [disabled, setDisabled] = useState(initialValue);
  const { mutateAsync, isPending } = useToggleItem();
  return (
    <Switch
      disabled={isPending}
      checked={disabled}
      onCheckedChange={(checked) => {
        setDisabled(checked);
        mutateAsync(itemId).catch(() => setDisabled(!checked));
      }}
    />
  );
};
