import { IShopCountry } from "./IGeneral";

export type IShopUser = {
  sellerRole: string;
  sellerId: number;
  sellerApproved: boolean;
  sellerPhone: string;
  sellerName: string;
  sellerEmail: string;
  sellerCreated: string;
};

export type IShopMain = {
  shopId: number;
  shopName: string;
  shopPhoneNumber: null | string;
  shopPhotoUrl: null | string;
  shopAddress: string;
  shopPostalCode: null | string;
  shopCountry?: IShopCountry;
  shopActive: boolean;
  averageRating: number;
  numberOfRatings: number;
  shopRegistrationNumber?: string;
};

export type IShopName = {
  id: number;
  name: string;
};

export interface IShopUpdatePayload {
  shopActive: boolean;
  shopAddress: string;
  shopCommission: number | string;
  shopCountry: string;
  shopIntroduction: string;
  shopName: string;
  shopNumberOfUser: number;
  shopPhoneNumber: string;
  shopPostalCode: string;
  shopPrefectureId: number;
  shopSupportedAreas: (number | string)[];
  shopRegistrationNumber: string;
}
