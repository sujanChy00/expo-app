import { IShippingArea } from "./IGeneral";

export type IShipppingCampaign = {
  shippingCampaignId: number;
  shippingAreas: IShippingArea[];
  shippingCampaignActive: boolean;
  shippingCampaignDescription: string;
  shippingCampaignDiscountPercentage: number;
  shippingCampaignEndDate: string | Date;
  shippingCampaignGivenBy: string;
  shippingCampaignMinimumOrderAmountThreshold: number;
  shippingCampaignName: string;
  shippingCampaignStartDate: string | Date;
  shippingCampaignType: "ASHA_ALL" | "ASHA_DRY" | "ASHA_COOL" | "ASHA_FROZEN";
  shopId: number;
  shopName: string;
  flatShippingCharge: number;
  flatShippingDiscount: number;
};

export type IGetAllShippingCampaignResponse = IShipppingCampaign[];
