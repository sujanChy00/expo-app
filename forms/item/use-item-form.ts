import {
  useAddItem,
  useCopyItem,
  useDeleteItemImage,
  useUpdateItem,
} from "@/actions/item";
import useI18n from "@/hooks/useI81n";
import { errorToast } from "@/lib/toast";
import { useSelectedShop } from "@/providers/auth-provider";
import { IItemLanguageList, ILanguageCode } from "@/types";
import { formatDate } from "@/utils/date";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { ItemFormContext } from "./item-form-provider";
import { ItemFormValues, itemFormSchema } from "./item-schema";

export const useItemForm = () => {
  const context = useContext(ItemFormContext);
  const { selectedShop } = useSelectedShop();
  const { getText } = useI18n();
  if (!context) {
    throw new Error("useItemForm must be used within a ItemFormProvider");
  }

  const {
    copy,
    data,
    images,
    isNewImage,
    uploadingPackageImage,
    uploadingItemImage,
  } = context;

  const router = useRouter();
  const { mutateAsync: deleteItemImage, isPending: deletingItemImage } =
    useDeleteItemImage();
  const { itemId } = useLocalSearchParams<{ itemId: string }>();
  const { mutateAsync: updateItem, isPending: updatingItem } = useUpdateItem();
  const { mutateAsync: copyItem, isPending: copyingItem } = useCopyItem();
  const { mutateAsync: addItem, isPending: addingItem } = useAddItem();

  const getItemByLan = (lan: ILanguageCode) => {
    if (!data) return null;
    return data?.itemDescription?.find((item) => item?.language === lan);
  };

  const form = useForm<ItemFormValues>({
    defaultValues: {
      englishLanguageList: {
        languageCode: "en_US",
        itemName: getItemByLan("en_US")?.itemName || "",
        itemDescription: getItemByLan("en_US")?.itemDesc || "",
        itemTags: getItemByLan("en_US")?.itemTags?.join(", ") || "",
      },
      nepaliLanguageList: {
        languageCode: "ne_NP",
        itemName: getItemByLan("ne_NP")?.itemName || "",
        itemDescription: getItemByLan("ne_NP")?.itemDesc || "",
        itemTags: getItemByLan("ne_NP")?.itemTags?.join(", ") || "",
      },
      japaneseLanguageList: {
        languageCode: "ja_JP",
        itemName: getItemByLan("ja_JP")?.itemName || "",
        itemDescription: getItemByLan("ja_JP")?.itemDesc || "",
        itemTags: getItemByLan("ja_JP")?.itemTags?.join(", ") || "",
      },
      vientameseLanguageList: {
        languageCode: "vi_VN",
        itemName: getItemByLan("vi_VN")?.itemName || "",
        itemDescription: getItemByLan("vi_VN")?.itemDesc || "",
        itemTags: getItemByLan("vi_VN")?.itemTags?.join(", ") || "",
      },
      canBeMerged: data ? data?.itemDetails.mergeable : true,
      categoryId: data ? String(data?.itemDetails.itemCategoryId) : "",
      weight: data ? String(data?.itemDetails.itemWeight) : "",
      expiryDate: data
        ? new Date(String(data?.itemDetails.itemExpDate))
        : new Date(),
      manufactureDate: data
        ? new Date(String(data?.itemDetails.itemMfgDate))
        : new Date(),
      markedPrice: data ? Number(data.itemDetails.itemMarkedPrice) : 0,
      price: data ? Number(data.itemDetails.itemPrice) : undefined,
      sku: data?.itemDetails.itemSKU || "",
      stock: data ? Number(data.itemDetails.itemStock) : 0,
      type: data?.itemDetails?.itemType || "cool",
    },
    resolver: zodResolver(itemFormSchema),
  });

  const englishItems = form.watch("englishLanguageList");
  const nepaliItems = form.watch("nepaliLanguageList");
  const japaneseItems = form.watch("japaneseLanguageList");
  const vietnameseItems = form.watch("vientameseLanguageList");
  const itemType = form.watch("type");
  const categoryId = form.watch("categoryId");

  const getDefaultItem = (data: IItemLanguageList, lan: ILanguageCode) => {
    const itemsBody = {
      languageCode: lan,
      itemDescription: data.itemDescription || englishItems.itemDescription,
      itemName: data.itemName || englishItems.itemName,
      itemTags:
        data.itemTags?.length !== 0 ? data.itemTags : englishItems.itemTags,
    };

    return itemsBody;
  };

  const handleSubmit = form.handleSubmit(async (data) => {
    if (data.type == "cool" || data.type == "frozen") {
      if (Number(data.weight) > selectedShop?.coolWeightLimit!) {
        form.setError("weight", {
          message: `item weight limit is ${selectedShop?.coolWeightLimit}`,
        });
        return;
      }
    }
    if (data.type == "dry") {
      if (Number(data.weight) > selectedShop?.dryWeightLimit!) {
        form.setError("weight", {
          message: `item weight limit is ${selectedShop?.dryWeightLimit}`,
        });
        return;
      }
    }
    if (uploadingPackageImage || uploadingItemImage) {
      errorToast(getText("package_image_uploading_message"));
      return;
    }
    if (
      Number(data.markedPrice) > 0 &&
      Number(data.markedPrice) < Number(data.price)
    ) {
      form.setError("markedPrice", {
        message: getText("item_marked_price_less_than_price"),
      });
      return;
    }
    if (Number(data.weight) > 25) {
      form.setError("weight", {
        message: getText("item_weight_error_message"),
      });
      return;
    }
    const body = {
      ...data,
      manufactureDate: formatDate(data.manufactureDate),
      expiryDate: formatDate(data.expiryDate),
      categoryId: Number(data.categoryId),
      weight: Number(data.weight),
      canBeMerged: itemType == "cool" ? false : (data.canBeMerged as boolean),
      markedPrice: Number(data.markedPrice),
      price: Number(data.price),
      stock: Number(data.stock),
    };
    const languageList = [
      englishItems,
      getDefaultItem(nepaliItems as IItemLanguageList, "ne_NP"),
      getDefaultItem(vietnameseItems as IItemLanguageList, "vi_VN"),
      getDefaultItem(japaneseItems as IItemLanguageList, "ja_JP"),
    ];

    const itemImages = images?.map((img) =>
      img.includes("temp") ? img.split("/temp").pop()?.replace("/", "") : img
    );

    if (data && itemId) {
      if (copy) {
        await copyItem({
          itemId: itemId,
          data: {
            ...body,
            images: itemImages as string[],
            newImage: isNewImage,
            languageList,
          },
        });
      } else {
        updateItem({
          itemId,
          body: {
            ...body,
            item_images: itemImages as string[],
            itemLanguageList: [
              englishItems,
              nepaliItems as IItemLanguageList,
              vietnameseItems as IItemLanguageList,
              japaneseItems as IItemLanguageList,
            ],
          },
        }).then(() => router.back());
      }
    } else {
      addItem({
        body: {
          ...body,
          images: itemImages as string[],
          languageList,
        },
      });
    }
  });

  return {
    handleSubmit,
    isLoading: addingItem || updatingItem || copyingItem,
    itemType,
    form,
    categoryId,
    deleteItemImage,
    deletingItemImage,
    ...context,
  };
};

export type ItemFormType = ReturnType<typeof useItemForm>["form"];
