export interface HomeResponse {
  shopInfo?: ShopInfo;
  unprocessedCount?: number;
  criticalItemCount?: number;
  totalRevenue?: string;
  totalCommission?: string;
  totalOrderCount?: number;
  recommendedItems: RecommendedItems[];
  weeklySales: ChartResponse[];
}

export interface ShopInfo {
  shopName?: string;
  shopAddress?: string;
  shopId?: number;
  shopTel?: string;
}

export interface RecommendedItems {
  itemId?: string;
  itemPhotoUrl?: string;
  itemName?: string;
  itemType?: string;
  itemPrice?: number;
  beforeTaxPrice?: number;
}

export interface ChartResponse {
  day?: string;
  orders?: number;
  totalAmount?: number;
}

export interface SalesData {
  totalRevenue?: string;
  totalOrderCount?: number;
}
