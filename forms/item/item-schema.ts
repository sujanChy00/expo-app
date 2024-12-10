import { ILanguageCode } from "@/types";
import { z } from "zod";

const ItemListSchema = (lan: ILanguageCode) => {
  return z.object({
    languageCode: z.enum([lan]).default(lan),
    itemDescription: z.string().optional(),
    itemName: z.string().optional(),
    itemTags: z.string().optional(),
  });
};

export const itemFormSchema = z.object({
  stock: z.number().optional(),
  canBeMerged: z.boolean().optional(),
  type: z.enum(["dry", "frozen", "cool"]),
  weight: z.string().min(1, { message: "Weight is required" }).or(z.number()),
  markedPrice: z.number().optional(),
  price: z
    .number({ invalid_type_error: "Price is required" })
    .min(1, { message: "Price is required" }),
  sku: z.string().optional(),
  manufactureDate: z.date({ required_error: "Manufacture date is required" }),
  expiryDate: z.date({ required_error: "Expiry date is required" }),
  categoryId: z.string().min(1, { message: "Category is required" }),
  indianShop: z.string().optional(),
  englishLanguageList: z.object({
    languageCode: z.enum(["en_US"]).default("en_US"),
    itemDescription: z.string().min(1, { message: "Description is required" }),
    itemName: z.string().min(1, { message: "Name is required" }),
    itemTags: z.string().optional(),
  }),
  nepaliLanguageList: ItemListSchema("ne_NP"),
  japaneseLanguageList: ItemListSchema("ja_JP"),
  vientameseLanguageList: ItemListSchema("vi_VN"),
});

export type ItemFormValues = z.infer<typeof itemFormSchema>;
