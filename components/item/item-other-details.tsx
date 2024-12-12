import React from 'react';
import { View } from 'react-native';

import { CoolBadge } from '../cool-badge';
import { DryBadge } from '../dry-badge';
import { P } from '../ui/typography';
import { ItemCoolSwitch } from './item-cool-switch';
import { ToggleItemStatus } from './toggle-item-status';

import useI18n from '@/hooks/useI81n';
import { IItemDescriptionResponse, ItemDetails } from '@/types';

/**
 * @description A React component that displays various details about an item, including weight, type, and options for cool cart and disabled status.
 * @example
 * ```jsx
 * <ItemOtherDetails
 *   data={{
 *     itemWeight: 1000,
 *     itemType: "dry",
 *     mergeable: true,
 *     itemDisabled: false,
 *   }}
 * />
 * @typedef {Object} ItemDetails
 * @property {number} [itemWeight] - The weight of the item.
 * @property {string} [itemType] - The type of the item (e.g., "dry", "cool").
 * @property {boolean} [mergeable] - Whether the item can be sent in a cool cart.
 * @property {boolean} [itemDisabled] - Whether the item is disabled.
 *
 *
 * @param {ItemDetails} data - The item details object.
 * @returns {JSX.Element} The rendered item other details component.
 *
 *
 * ```
 */
export const ItemOtherDetails = ({ data }: { data: IItemDescriptionResponse }) => {
  const { getText } = useI18n();
  return (
    <View className="flex-1 gap-y-3 p-3">
      <View className="flex-row items-center justify-between">
        <P className="text-sm font-semibold">{getText('weight')}</P>
        <P className="text-sm font-semibold">{data?.itemDetails.itemWeight}</P>
      </View>
      <View className="flex-row items-center justify-between">
        <P className="text-sm font-semibold">{getText('item_type')}</P>
        {data?.itemDetails.itemType === 'dry' ? (
          <DryBadge text={data?.itemDetails?.itemType} />
        ) : (
          <CoolBadge text={data?.itemDetails.itemType} />
        )}
      </View>
      <View className="flex-row items-center justify-between">
        <P className="text-sm font-semibold">{getText('manufacture_date')}</P>
        <P className="text-sm font-semibold">{data?.itemDetails?.itemMfgDateString}</P>
      </View>
      <View className="flex-row items-center justify-between">
        <P className="text-sm font-semibold">{getText('exp_date')}</P>
        <P className="text-sm font-semibold">{data?.itemDetails?.itemExpDateString}</P>
      </View>
      <ItemCoolSwitch data={data} />
      <View className="flex-row items-center justify-between">
        <P className="text-sm font-semibold">{getText('disabled')}</P>
        <ToggleItemStatus
          initialValue={data.itemDetails?.itemDisabled}
          itemId={data.itemDetails?.itemId}
        />
      </View>
    </View>
  );
};
