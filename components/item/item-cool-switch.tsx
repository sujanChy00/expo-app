import React, { useEffect, useState } from 'react';
import { View } from 'react-native';

import { Switch } from '../ui/switch';
import { P } from '../ui/typography';

import { useUpdateItem } from '@/actions/item';
import useI18n from '@/hooks/useI81n';
import {
  IItemDescriptionResponse,
  IItemLanguageList,
  ItemDescription,
  ItemDetails,
} from '@/types/IItem';

interface ItemCoolSwitchProps {
  data: ItemDetails;
  description?: ItemDescription[];
}

/**
 * @fileoverview A React component that renders a switch for toggling the "mergeable" state of an item.
 *
 * @typedef {Object} ItemCoolSwitchProps
 * @property {ItemDetails} data - Details of the item.
 * @property {ItemDescription[]} [description] - List of item descriptions in various languages.
 *
 * @param {ItemCoolSwitchProps} props - Component props.
 * @param {ItemDetails} props.data - Details of the item.
 * @param {ItemDescription[]} [props.description] - List of item descriptions in various languages.
 *
 * @returns {JSX.Element} The rendered ItemCoolSwitch component.
 */
export const ItemCoolSwitch = ({ data }: { data: IItemDescriptionResponse }) => {
  const { getText } = useI18n();
  const { mutateAsync, isPending } = useUpdateItem();
  const [mergeable, setMergeable] = useState(data?.itemDetails.mergeable);

  useEffect(() => {
    setMergeable(data?.itemDetails.mergeable);
  }, [data]);

  const handleUpdate = (e: boolean) => {
    setMergeable(e);
    mutateAsync({
      body: {
        canBeMerged: e,
        categoryId: data.itemDetails.itemCategoryId,
        expiryDate: data.itemDetails.itemExpDate,
        item_images: data.itemImages.images,
        manufactureDate: data.itemDetails.itemMfgDate,
        price: data.itemDetails.itemPrice,
        sku: data.itemDetails.itemSKU,
        stock: data.itemDetails.itemStock,
        type: data.itemDetails.itemType,
        weight: data.itemDetails.itemWeight,
        markedPrice: data.itemDetails.itemMarkedPrice,
        itemLanguageList: data.itemDescription?.map((item) => ({
          itemName: item.itemName,
          itemDescription: item.itemDesc,
          languageCode: item.language,
          itemTags: item.itemTags?.join(','),
        })) as IItemLanguageList[],
      },
      itemId: data.itemDetails.itemId,
    }).catch(() => setMergeable(data.itemDetails.mergeable));
  };

  const disabled = isPending || data.itemDetails.itemType == 'cool';

  return (
    <View className="flex-row items-center justify-between">
      <P className="text-sm font-semibold">{getText('can_be_sent_in_cool_cart')}</P>
      <Switch checked={mergeable} disabled={disabled} onCheckedChange={handleUpdate} />
    </View>
  );
};
