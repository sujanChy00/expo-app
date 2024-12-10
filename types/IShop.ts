import { ISellerShopDetail } from "./IProfile";

export type IshopDetails = {
  shopId: number;
  shopName: string;
  shopPhoneNumber: string;
  shopIntroduction: string;
  shopPhotoUrl: string;
  shopPrefectureId: number;
  prefecture: string;
  shopAddress: string;
  shopPostalCode: string;
  shopCommission: IShopCommision;
  shopNumberOfUser: 3;
  shopCountry: string;
  shopFacebookUrl: string;
  shopTiktokUrl: string;
  shopActive: true;
  numberOfTransactions: number;
  shopInfo: string;
  shopOnTest: false;
  shopSupportedAreas: ISupportedShopAreas[];
  currentShopUserCount: number;
  sellerRole: string;
  shopDisabledReason: null;
  shopRegistrationNumber?: string;
  orderAmount: number | null;
  dryWeightLimit: number;
  coolWeightLimit: number;
  lowStockThreshold: number;
  expiryThreshold: number;
};

export type IShop = ISellerShopDetail;

export type IShopCommision = {
  id: number;
  name: string;
  fee: number;
  type: string;
  description: string;
  createdAt: string;
  updated_At: string;
  active: boolean;
};

export type ISupportedShopAreas = {
  id: number;
  area: string;
  latitude: number;
  longitude: number;
  active: boolean;
};

export interface IShopAddRequest {
  shopName: string;
  shopIntroduction: string;
  shopPhoneNumber: string;
  shopAddress: string;
  shopPostalCode: string;
  shopCommission: ShopCommission;
  shopCountry: string;
  shopSupportedAreas: number[];
  shopPrefectureId: number;
  shippingCompany: string;
  shopRegistrationNumber: string;
}
export interface ShopCommission {
  id: number;
}
