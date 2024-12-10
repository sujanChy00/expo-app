export type IShopDeliveryTimes = {
  deliveryTimes: IDeliveryTimes[];
  shippingCompanyId: number | null;
  shippingCompanyName: string;
};

export type IDeliveryTimes = {
  deliveryTimeId: number;
  deliveryTimeName: string;
};
