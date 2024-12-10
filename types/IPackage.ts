import { IPaginatedResponse } from "./IPaginatedResponse";

export type IPackages = {
  packageId: number;
  packageName: string;
  packageImages: null | string;
  packageDescription: string;
  packageThumbnail: null | string;
  sellerId: number;
  sellerName: string;
  sellerImage: string;
  sellerShopAddress: string;
  packagePrice: number;
  packagePriceBeforeTax: number;
  packageItemsCount: number;
  packageWeight: string;
  packageMarkedPriceBeforeTax: number;
  packageSale: null | string;
  items: Items[];
};

export type Items = {
  itemId: string;
  itemName: string;
  itemDescription: string;
  itemImage: string;
  itemPrice: number;
  itemPriceBeforeTax: number;
  itemQuantity: number;
  itemMarkedPrice: number;
  itemMarkedPriceBeforeTax: number;
  itemWeight: number;
  itemWeightString: string;
  itemSale: string;
  itemSlug: string;
};

export interface IAddPackageRequest {
  description: string;
  image: string[];
  items: IAddPackageItem[];
  name: string;
  sellerId: number;
}

export interface IAddPackageItem {
  itemId: string;
  quantity: number;
}
export interface IPackage {
  items: IPackageItem[];
  packageDescription: string;
  packageId: number;
  packageImages: string;
  packageItemsCount: number;
  packageMarkedPrice: number;
  packageName: string;
  packagePrice: number;
  packageSale: string;
  packageThumbnail: string;
  packageWeight: string;
  sellerId: number;
  sellerImage: string;
  sellerName: string;
  sellerShopAddress: string;
  packagePriceBeforeTax: number;
  packageMarkedPriceBeforeTax: number;
}

export interface IPackageItem {
  itemDescription: string;
  itemId: string;
  itemImage: string;
  itemMarkedPrice: number;
  itemName: string;
  itemPrice: number;
  itemPriceBeforeTax: number;
  itemMarkedPriceBeforeTax: number;
  itemQuantity: number;
  itemSale: string;
  itemWeight: number;
  itemWeightString: string;
}

export interface IUpdatePackageRequest {
  description: string;
  image: string[];
  items: IAddPackageItem[];
  name: string;
}

export interface IPackageContent {
  packageDescription: string;
  packageId: number;
  packageImages: string;
  packageItemsCount: number;
  packageMarkedPrice: number;
  packageName: string;
  packagePrice: number;
  packagePriceBeforeTax: number;
  packageMarkedPriceBeforeTax: number;
  packageSale: string;
  packageThumbnail: string;
  packageWeight: string;
  sellerId: number;
  sellerImage: string;
  sellerName: string;
  sellerShopAddress: string;
}

export type IAllPackageResponse = IPaginatedResponse<IPackageContent>;

export type IPackageResponse = IPaginatedResponse<IPackages>;
