import { IItemDescriptionResponse } from '@/types';

export function transFormItemDetails(item?: IItemDescriptionResponse) {
  const itemImages = item?.itemImages.images;
  const itemDetails = item?.itemDetails;
  const itemDescription = item?.itemDescription;
  const canUpdateThumbnail = itemImages && itemImages.length > 1;
  const itemVariations = item?.itemDetails.variations;

  return {
    itemImages,
    itemDescription,
    itemDetails,
    canUpdateThumbnail,
    itemVariations,
  } as const;
}
