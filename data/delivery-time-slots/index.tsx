import { IShopDeliveryTimes } from '@/types/IAvailableDeliveries';

export const getDeliveyTimeSlots = (
  isPending: boolean,
  data?: IShopDeliveryTimes[],
  currentTimeSlot?: IShopDeliveryTimes
) => {
  const isDataEmpty = !isPending && (!data || data.length === 0);
  const timeSlots =
    data && data.length > 0
      ? data.filter((dt) => dt.shippingCompanyId != currentTimeSlot?.shippingCompanyId)
      : [];

  return {
    isDataEmpty,
    timeSlots,
  };
};
