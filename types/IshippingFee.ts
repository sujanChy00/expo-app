export type IshippingFee = {
  fromAreaCode: number;
  sellerShippingId: number;
  shippingAreaList: IshippingAreaList[];
  sellerShippingFrozenShippingFee: number;
  sellerCoolShippingFee: number;
  sellerShippingFeeWithTax: number;
  sellerShippingWeight: number;
  sellerShippingFromArea: string;
  sellerShippingFromAreaCode: number;
  sellerShippingFee: number;
  sellerShippingToAreaCode: number;
  sellerShippingToArea: string;
};

export type IShippingCompany = {
  id: string;
  name: string;
  enabled: boolean;
};

export type IshippingAreaList = {
  id: number;
  area: string;
  latitude: number;
  longitude: number;
  active: boolean;
};
