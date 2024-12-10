import { IPaginatedResponse } from "./IPaginatedResponse";

export type ITransactionResponse = {
  totalPages: number;
  totalElements: number;
  pageNumber: number;
  size: number;
  last: boolean;
  content: ITransactionContent[];
};

export type IOrderStatus =
  | "WAIT_PAYMENT"
  | "WAIT_REVIEW"
  | "Processed"
  | "DONE"
  | "CANCELLED"
  | "ADMIN_CANCELLED"
  | "WAIT_SHIPPING"
  | "NOT_CONFIRMED"
  | "all";

export type ITransactionType = "dry" | "frozen" | "cool";

export type ITransactionContent = {
  extraPrice: number;
  itemCount: number;
  itemsTotalPrice: number;
  orderDateTimestamp: string;
  orderDiscountPrice: number;
  orderId: number;
  // orderStatus: string;
  originalShippingPrice: number;
  paymentMethod: string;
  redeemedPoints: number;
  shippingPrice: number;
  totalPrice: number;
  totalTax: number;
  transactionType: string;
  userName: string;
  orderProgress: IOrderProgress;
};
export type ISaveInvoiceParams = {
  invoiceNo: string;
  invoiceTotalTransactionAmount: number;
  invoiceTransactionDate: string;
  invoiceTransactionId: number;
};

export type ITransactionItems = {
  item_name: string;
  item_quantity: number;
  item_price: number;
  item_thumbnail: string;
  item_total_price: number;
};

export type IOrderProgress =
  | "WAITING_FOR_PAYMENT"
  | "PENDING_CHANGE"
  | "ORDER_PLACED"
  | "SELLER_ACKNOWLEDGED"
  | "SHIPPED"
  | "COMPLETED"
  | "PAYMENT_FAILED"
  | "CANCELLED_BY_CUSTOMER"
  | "CANCELLED_BY_ADMIN";

export type ITransactionById = {
  transactionId: number;
  expectedDeliveryDate: string | null;
  updateAddressRequest: IUpdateAddressRequest | null;
  transactionDate: string;
  transactionDateTimestamp: string;
  itemTotal: number;
  totalPrice: number;
  transactionStatus: string;
  extraPrice: number;
  discountAmount: number;
  orderProgress: IOrderProgress;
  redeemedPoints: number;
  shippingPrice: number;
  originalShippingPrice: number;
  trackingNumber: string;
  trackingUrl: string;
  paymentMethod: string;
  transactionType: string;
  deliveryTime: string;
  userDetail: IUserDetail;
  beforeTaxItemTotal: number;
  orderStatus: IOrderStatus;
  taxInfo: ITaxInfo[];
  userReview: {
    rating: number;
    review: string;
  };
  items: ITransactionByIdItems[];
  shopDetail: ITransactionByIdShopDetail;
  canComment?: boolean;
  totalWeight: string;
  previousOrderStatus: IPreviousOrderSummary;
};

export interface IPreviousOrderSummary {
  total: number;
  thisShop: number;
  success: number;
  thisShopSuccess: number;
}
export type IUpdateAddressRequest = IShippingAddress & {
  prefecture: {
    id: number;
    name: string;
  };
  sellerRequest: boolean;
};

export type IShippingAddress = {
  address1: string;
  address2: string;
  city: string;
  postalCode: string;
};

type ITaxInfo = {
  taxPercentage: number;
  itemCount: number;
  totalTax: number;
  itemTotal: number;
  itemIds: string[];
};

export type IUserDetail = IShippingAddress & {
  id: number;
  name: string;
  email: string;
  phoneNumber: string;
  prefecture: string;
  prefectureId: number;
};

export type ITransactionByIdItems = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  totalPrice: number;
  thumbnailImage: string;
  weight: number;
  stock: number;
  priceBeforeTax: number;
  totalPriceBeforeTax: number;
  beforeTaxItemTotal: number;
};

export type ITransactionByIdShopDetail = {
  id: number;
  name: string;
  phoneNumber: string;
  postalCode: string;
};

export type IInvoiceResponse = {
  invoiceNo: string;
  registrationNo: string;
  qrLink: string;
};

export type IOrderComment = {
  orderCommentId: number;
  orderCommentText?: string;
  orderCommentImage?: string;
  orderCommentOrderId: number;
  orderCommentIsUser: boolean;
  orderCommentCreatedAt: string;
  orderCommentSeen: boolean;
  orderCommentByAdmin: boolean;
  itemId?: string;
};

export type OrderTrackingResponse = {
  currentStatus: string;
  deliveredAt: string | null;
  details: OrderTrackingDetails[] | null;
  lastUpdate: string | null;
  orderId: number;
  trackingNumber: string;
  updatedAt: string | null;
  userFullName: string;
  shippingCompany: string | null;
};

export type OrderTrackingDetails = {
  date: string;
  location: string | null;
  status: string;
};

export type TransactionRespone = IPaginatedResponse<ITransactionContent>;
