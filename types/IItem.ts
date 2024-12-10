import { IPaginatedResponse } from "./IPaginatedResponse";

export type ILanguageCode = "vi_VN" | "ne_NP" | "en_US" | "ja_JP";

export type IItem = {
  item_id: string;
  item_name: string;
  item_price: number;
  item_marked_price: number;
  item_stock: number;
  category_name: string;
  item_delivery_time: string;
  thumbnail_image_url: null | string;
  recommended: boolean;
  item_price_before_tax: number;
  item_marked_price_before_tax: number;
  variations: IItemVaritions[];
  item_disabled: boolean;
};

export type IStockItem = {
  id: string;
  name: string;
  sharedItems: string[];
  stock: number;
  thumbnailImage: string;
};

export type IItemVaritions = {
  name: string;
  price: number;
  stock: number;
  weight: string;
  beforeTaxPrice: number;
};

export type IRecommendedItem = {
  itemId: string;
  itemName: string;
  itemPrice: number;
  itemMarkedPrice: number;
  itemSale: string;
  itemThumbnailImageUrl: string;
  shopName: string;
  itemType: string;
  shopId: number;
  itemPriceBeforeTax: number;
  itemMarkedPriceBeforeTax: number;
  itemDisabled: boolean;
};
export type ILowStockItem = {
  itemId: string;
  itemName: string;
  thumbnailImage: string;
  itemStock: number;
  itemExpiryDate: string;
  itemDisabled: boolean;
  itemExpiryDateString: string;
  variations: IItemVaritions[];
};

export interface IItemDescriptionResponse {
  itemDetails: ItemDetails;
  itemDescription: ItemDescription[];
  itemLikesCount: number;
  itemCommentsCount: number;
  itemImages: AddImagesResponse;
}

export type IAddItemComment = {
  comment: string;
  items_id: string;
};
export interface ItemDescription {
  itemName: string;
  itemShippingTime: string;
  itemTags?: string[];
  itemDesc: string;
  language: ILanguageCode;
  complete: boolean;
}

export interface AddImagesResponse {
  images: string[];
  thumbnailImage: string;
}

export interface ItemDetails {
  itemId: string;
  itemExpDate: Date;
  itemMfgDate: Date;
  itemPrice: number;
  itemMarkedPrice: number;
  itemSKU: string;
  itemStock: number;
  itemWeight: number;
  itemType: IItemType;
  itemCategoryId: number;
  mergeable: boolean;
  itemCategoryName: string;
  itemPriceBeforeTax: number;
  itemMarkedPriceBeforeTax: number;
  variations: IItemVaritions[];
  itemDisabled: boolean;
  itemExpDateString: string;
  itemMfgDateString: string;
}

export type IItemType = "cool" | "frozen" | "dry";

export interface IPaginatedParams {
  page?: number;
  size?: number;
  sort?: string;
  order?: number;
  q?: string | null;
  search?: string;
  ItemName?: string | null;
  catId?: number | null;
  sortBy?: string;
  orderId?: string | null;
  from?: string;
  filter?: string;
  to?: string;
}

export type IItemAddRequest = {
  body: IItemAddBody;
};
export type IItemAddBody = {
  languageList: IItemLanguageList[];
  expiryDate: string | Date;
  manufactureDate: string | Date;
  images: string[];
  canBeMerged: boolean;
  markedPrice: number;
  categoryId: number;
  price: number;
  sku?: string;
  stock: number;
  type: string;
  weight: number;
  indianShop?: string;
};

export type IItemLanguageList = {
  itemName: string;
  itemDescription: string;
  itemTags?: string;
  languageCode: ILanguageCode;
};

export type IItemUpdateRequest = {
  itemId: string;
  body: IItemUpdateBody;
};

export type IItemUpdateBody = {
  itemLanguageList: IItemLanguageList[];
  canBeMerged: boolean;
  expiryDate: string | Date;
  manufactureDate: string | Date;
  item_images: string[];
  markedPrice?: number;
  categoryId: number;
  price: number;
  sku?: string;
  stock: number;
  type: string;
  weight: number;
};

export type IItemLowStockResponse = IPaginatedResponse<ILowStockItem>;
export type IItemResponse = IPaginatedResponse<IItem>;
export type IItemStockResponse = IPaginatedResponse<IStockItem>;
