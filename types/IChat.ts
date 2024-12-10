import { IPaginatedResponse } from "./IPaginatedResponse";

export type IChatParams = {
  page?: number;
  size?: number;
  sort?: string;
  order?: number;
};

export type IMessageInput = {
  image?: string | File;
  text?: string;
  userId: number;
  itemId?: string;
  item?: Partial<ChatItem>;
};

export type IChat = {
  id: number;
  user: INameAndId;
  shop: INameAndId;
  message: string;
  seenAt?: string;
  sender: string;
  createdAt: string;
};

export type INameAndId = {
  id: number;
  name: string;
  slug?: string;
};

export type UnseenCount = {
  unreadCount: number;
  shopId: number;
};

export type IChatMessage = {
  id: number;
  text?: string;
  image?: string;
  user: boolean;
  admin: boolean;
  createdAt: string;
  seenAt?: string;
  deletedAt?: string;
  item?: ChatItem;
};

export type IPaginatedChatResponse = IPaginatedResponse<IChatMessage> & {
  shop: INameAndId;
  user: INameAndId;
  canReply: boolean;
};

export type ChatItem = {
  itemId: string;
  itemName: string;
  itemPriceBeforeTax: number;
  itemMarkedPriceBeforeTax: number;
  itemSale: string;
  itemType: string;
  itemWeight: string;
  itemPhotoUrl?: string;
  shopId: number;
  shopSlug: string;
  shopName: string;
  slug: string;
};
