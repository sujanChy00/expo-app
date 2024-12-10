export type ICategory = {
  id: number;
  name: string;
  displayOrder: number;
  image: null | string;
  country: Country | null;
  createdAt: number | Date;
  tax: number;
  updatedAt: null;
  languageCode: LanguageCode;
  catDesList: IcatDes[];
  adminCommissionTransactionId: number;
  adminCommissionPrice: number;
  adminCommissionDate: string;
  alcohol: boolean;
  maxQuantityAllowed: number;
  baseCategory: IBaseCategory | null;
  disabled: boolean;
};

type IBaseCategory = {
  id: number;
  name: string;
};
export interface IcatDes {
  name: string;
  languageCode: string;
  createdAt: Date | string;
}
export enum Country {
  NP = "NP",
  Vn = "VN",
}

export enum LanguageCode {
  EnUS = "en_US",
  NeNP = "ne_NP",
  ViVN = "vi_VN",
  jaJP = "ja_JP",
}

export type ICategoryResponse = ICategory[];

export interface IAddCategoryRequest {
  categoryLanguages: CategoryLanguage[];
  category_display_order: number;
  category_image: string;
  country: string;
}

export interface CategoryLanguage {
  categoryName: string;
  languageCode: string;
}
