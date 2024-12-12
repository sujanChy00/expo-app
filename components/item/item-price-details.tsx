import React from 'react';
import { View } from 'react-native';

import { P } from '../ui/typography';

import useI18n from '@/hooks/useI81n';
import { ItemDetails } from '@/types';

/**
 * @description A React component that displays various details about an item's price, stock, and category.
 *
 * @example
 * ```jsx
 * <ItemPriceDetails
 *   data={{
 *     itemStock: 10,
 *     itemMarkedPrice: 1200,
 *     itemPriceBeforeTax: 1000,
 *     itemPrice: 1100,
 *     itemCategoryName: "Fruits",
 *   }}
 * />
 * @typedef {Object} ItemDetails
 * @property {number} [itemStock] - The stock level of the item.
 * @property {number} [itemMarkedPrice] - The marked price of the item before tax (if on sale).
 * @property {number} [itemPriceBeforeTax] - The price of the item before tax.
 * @property {number} [itemPrice] - The price of the item (including tax).
 * @property {string} [itemCategoryName] - The name of the item's category.
 *
 *
 * @param {ItemDetails} data - The item details object.
 * @returns {JSX.Element} The rendered item price details component.
 *
 *
 * ```
 */
export const ItemPriceDetails = ({ data }: { data?: ItemDetails }) => {
  const { getText } = useI18n();
  return (
    <View className="flex-1 gap-y-3 p-3">
      <View className="flex-row items-center justify-between">
        <P className="text-sm font-semibold">{getText('item_price_after_tax')}</P>
        <P className="text-sm font-semibold">¥{data?.itemPrice}</P>
      </View>
      <View className="flex-row items-center justify-between">
        <P className="text-sm font-semibold">{getText('item_price_before_tax')}</P>
        <P className="text-sm font-semibold">¥{data?.itemPriceBeforeTax}</P>
      </View>
      <View className="flex-row items-center justify-between">
        <P className="text-sm font-semibold">{getText('marked_price')}</P>
        <P className="text-sm font-semibold">¥{data?.itemMarkedPrice}</P>
      </View>
      <View className="flex-row items-center justify-between">
        <P className="text-sm font-semibold">{getText('stock')}</P>
        <P className="text-sm font-semibold">{data?.itemStock}</P>
      </View>

      <View className="flex-row items-center justify-between">
        <P className="text-sm font-semibold">{getText('category')}</P>
        <P className="text-sm font-semibold">{data?.itemCategoryName}</P>
      </View>
      {data?.itemSKU && (
        <View className="flex-row items-center justify-between">
          <P className="text-sm font-semibold">{getText('sku')}</P>
          <P className="text-sm font-semibold">{data?.itemSKU}</P>
        </View>
      )}
    </View>
  );
};
