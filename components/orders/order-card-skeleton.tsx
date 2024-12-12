import { Card, CardHeader } from '../ui/card';
import { Skeleton } from '../ui/skeleton';

import { useWindow } from '@/hooks/use-window';

/**
 * @description A React component that displays a grid or list of user's orders, fetching data in pages and handling loading and empty states. It adapts the layout based on screen width (single column for small screens, double column for larger screens).
 * @typedef {Object} IOrderData
 * @property {string} transaction_id - Unique identifier for the order.
 * @property {string} transaction_date_timestamp - Timestamp of the order creation.
 * // ... other properties related to order details (e.g., status, items)

 *
 * @param {Object} props - Component props.
 * @returns {JSX.Element} The rendered `AppOrders` component.
 */
export const OrderCardSkeleton = ({ numOfSkeletons = 20 }: { numOfSkeletons?: number }) => {
  const { cardSkeletonStyle } = useWindow();
  return Array.from({ length: numOfSkeletons }).map((_, index) => (
    <Card key={index} className="overflow-hidden shadow-none" style={cardSkeletonStyle}>
      <CardHeader className="flex-row items-center justify-between p-2">
        <Skeleton className="h-2 w-28" />
        <Skeleton className="h-2 w-20" />
      </CardHeader>
      <Skeleton className="h-32 w-full rounded-none" />
    </Card>
  ));
};
