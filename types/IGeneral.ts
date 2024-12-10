export interface PreferredCountry {
  id: number;
  name: string;
  code: string;
  status: boolean;
  value: string;
  createdAt: number;
  updatedAt: number;
}

export interface IShippingArea {
  shippingAreaId: number;
  shippingArea: string;
  shippingPrefectures: unknown[];
  shippingActive: boolean;
}
export interface IGeneralResponse {
  status: string;
  message: string;
  error?: {
    [key in string]: any;
  };
  data?: {
    [key in string]: any;
  };
}

export enum IShopCountry {
  IN = "IN",
  NP = "NP",
  VN = "VN",
  PK = "PK",
}
