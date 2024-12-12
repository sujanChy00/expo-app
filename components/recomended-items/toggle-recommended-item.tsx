import React, { useState } from 'react';

import { Switch } from '../ui/switch';

import { useAddRecommendedItems, useRemoveRecommendedItems } from '@/actions/item';

type Props = {
  itemId: string;
  recommended: boolean;
  disabled?: boolean;
};

/**
 *  @description A React component that renders a toggle switch to manage the recommended status of an item. It utilizes the `Switch` component from a UI library (likely) and takes three props:
 *   - `itemId`: Unique identifier of the item.
 *   - `recommended`: Boolean indicating the item's current recommended status.
 *   - `disabled` (optional): Boolean indicating whether the toggle is disabled or not.
 * 
 *  * @example
 * ```jsx
 * <ToggleRecommendedItem
 *   itemId="123"
 *   recommended={true}
 * />
 * ```
 * @typedef {Object} Props
 * @property {string} itemId - Unique identifier of the item.
 * @property {boolean} recommended - Whether the item is currently recommended or not.
 * @property {boolean} disabled - Whether the toggle is disabled or not (optional).

 *
 *
 * When toggled, the component updates the recommended status through the provided `useAddRecommendedItems` and `useRemoveRecommendedItems` functions (likely using an API or database), and handles potential errors by reverting the UI state if the update fails.
 *
 * @param {Props} props - Component props.
 * @returns {JSX.Element} The rendered `ToggleRecommendedItem` component.
 *
 *
 */

export const ToggleRecommendedItem = ({ recommended: initialValue, itemId, disabled }: Props) => {
  const [recommended, setRecommended] = useState(initialValue);
  const { mutateAsync: addtoRecommended, isPending: isPendingAdd } = useAddRecommendedItems();
  const { mutateAsync: removeFromRecommended, isPending } = useRemoveRecommendedItems();

  return (
    <Switch
      disabled={isPending || isPendingAdd || disabled}
      checked={recommended}
      onCheckedChange={(checked) => {
        setRecommended(checked);
        if (recommended) {
          removeFromRecommended({ itemId }).catch(() => setRecommended(!checked));
        } else {
          addtoRecommended({ itemId }).catch(() => setRecommended(!checked));
        }
      }}
    />
  );
};
