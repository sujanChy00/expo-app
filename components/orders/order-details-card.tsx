import { orderStatusColor } from "@/data/order/get-orders";
import { useColorScheme } from "@/hooks/use-color-scheme";
import useI18n from "@/hooks/useI81n";
import { IOrderProgress, ITransactionById } from "@/types/ITransaction";
import { Smartphone } from "lucide-react-native";
import React from "react";
import { View } from "react-native";
import { CoolBadge } from "../cool-badge";
import { DryBadge } from "../dry-badge";
import { UserAvatar } from "../profile/user-avatar";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Separator } from "../ui/separator";
import { P } from "../ui/typography";

/**
 * @description A React component that displays detailed information about an order, including user details, payment method, order type, item prices, taxes, fees, discounts, shipping cost, and total price. The component adapts the status color based on `orderStatus` and displays badges for order types.
 * @typedef {Object} ITransactionById
 *
 * @param {Object} props - Component props.
 * @property {ITransactionById} props.order - Data object containing information about the order.
 * @returns {JSX.Element} The rendered `OrderDetailsCard` component.
 */
export const OrderDetailsCard = ({ order }: { order: ITransactionById }) => {
  const { getText } = useI18n();
  const statusTextMapping: Record<IOrderProgress, string> = {
    WAITING_FOR_PAYMENT: getText("wait_payment"),
    ORDER_PLACED: getText("order_placed"),
    PENDING_CHANGE: getText("pending_change"),
    SHIPPED: getText("shipped"),
    CANCELLED_BY_ADMIN: getText("admin_cancelled"),
    CANCELLED_BY_CUSTOMER: getText("cancelled"),
    COMPLETED: getText("completed"),
    PAYMENT_FAILED: getText("payment_failed"),
    SELLER_ACKNOWLEDGED: getText("seller_acknowledged"),
  };
  const { isDarkColorScheme } = useColorScheme();

  return (
    <Card className="flex-1 sm:w-auto w-full overflow-hidden shadow-none">
      <CardHeader className="flex-row justify-between items-center p-3">
        <View className="flex-row items-center gap-x-2">
          <UserAvatar
            className="dark:bg-background h-12 w-12"
            alt={order.transactionId.toString()}
            fallBack={order.userDetail.name}
          />
          <View className="gap-y-1">
            <P className="capitalize font-bold">{order.userDetail.name}</P>
            <View className="flex-row items-center gap-x-1">
              <Smartphone
                size={16}
                color={isDarkColorScheme ? "white" : "black"}
              />
              <P className="font-semibold">{order.userDetail.phoneNumber}</P>
            </View>
          </View>
        </View>
        <Card
          className="p-2"
          style={{ backgroundColor: orderStatusColor[order.orderProgress] }}
        >
          <P className="font-semibold text-sm" style={{ color: "white" }}>
            {statusTextMapping[order.orderProgress].toUpperCase()}
          </P>
        </Card>
      </CardHeader>
      <View className="py-2 sm:items-center sm:flex-row px-2 justify-between">
        <P className="text-accent-foreground text-sm">
          TetoTeto Orders (Success): {order.previousOrderStatus.total} (
          {order.previousOrderStatus.success})
        </P>
        <P className="text-accent-foreground text-sm">
          {order.shopDetail.name} (Success):{" "}
          {order.previousOrderStatus.thisShop} (
          {order.previousOrderStatus.thisShopSuccess})
        </P>
      </View>
      <Separator />
      <CardContent className="gap-y-4 p-4">
        <View className="flex-col gap-y-4">
          <View className="flex-row items-center justify-between">
            <View className="justify-items-end gap-1">
              <P className="font-semibold">{getText("order_id")}</P>
              <P className="text-sm ">{order.transactionId}</P>
            </View>
            <View className="items-end gap-2 justify-between">
              <P className="font-semibold">{getText("order_type")}</P>
              {order.transactionType == "dry" ? (
                <DryBadge text={order.transactionType} />
              ) : (
                <CoolBadge text={order.transactionType} />
              )}
            </View>
          </View>
          <View className="flex-row items-center justify-between">
            {order?.expectedDeliveryDate ? (
              <View className="gap-1">
                <P className="font-semibold">
                  {getText("expected_delivery_date")}
                </P>
                <P className="text-sm">{order.expectedDeliveryDate}</P>
              </View>
            ) : (
              <View className="gap-1">
                <P className="font-semibold">{getText("shipping_time")}</P>
                <P className="text-sm ">{order.deliveryTime}</P>
              </View>
            )}
            <View className="items-end gap-1">
              <P className="font-semibold">{getText("payment_method")}</P>
              <P className="text-sm">{order.paymentMethod}</P>
            </View>
          </View>
          <View className="gap-4">
            {!!order.expectedDeliveryDate && (
              <View className="gap-1">
                <P className="font-semibold">{getText("delivery_time")}</P>
                <P className="text-sm ">{order.deliveryTime}</P>
              </View>
            )}
            <View className="gap-1">
              <P className="font-semibold">{getText("address1")}</P>
              <P className="text-sm">
                {order.userDetail.postalCode}, {order.userDetail.prefecture},
                {order.userDetail.city}, {order.userDetail.address1}
              </P>
            </View>
            <View className="gap-1">
              <P className="font-semibold">{getText("address2")}</P>
              <P className="text-sm">{order.userDetail.address2}</P>
            </View>
          </View>
        </View>
      </CardContent>
    </Card>
  );
};
