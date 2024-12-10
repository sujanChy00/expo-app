export type IProfile = {
  profileDetails: IProfileDetails;
  shopDetails: ISellerShopDetail[];
};

export type IProfileDetails = {
  shopAssistantId: number;
  shopAssistantName: string;
  shopAssistantEmail: string;
  shopAssistantPhoneNumber: string;
  shopAssistantPhotoUrl: string;
  shopAssistantCreated: string;
  shopAssistantPasswordExpired: boolean;
  shopAssistantLanguage: string;
  shopAssistantCountry: string;
};

export type ISellerShopDetail = {
  shopAssistantRole: string;
  shopName: string;
  shopId: number;
  shopAddress: string;
  coolWeightLimit: number;
  dryWeightLimit: number;
  shopAssistantCountry: string;
};

export type IAddressInfo = {
  city: string;
  postcode: string;
  pref: string;
  town: string;
};
