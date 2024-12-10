import { useGenerateInvoice } from "@/api/order-api";
import useI18n from "@/hooks/useI81n";
import React from "react";
import { ActivityIndicator, TouchableOpacity, View } from "react-native";
import { ChevronRight } from "../icons/chevron-right";
import { Paperclip } from "../icons/paper-clip";
import { Button } from "../ui/button";
import { Text } from "../ui/text";
import { P } from "../ui/typography";

interface Props {
  orderId: number;
  close?: () => void;
}

/**
 * @description A React component that conditionally renders a button to generate and view an invoice for a specific order.
 * It handles the loading state and displays an appropriate message or opens the invoice URL in a web browser.
 * This component is only available on web platforms (i.e., not rendered on mobile).
 * @typedef {Object} Props
 * @param {Props["orderId"]} orderId - Unique identifier of the order for which to generate an invoice.
 *
 *
 * @returns {JSX.Element} The rendered `Invoice` component, or null if not applicable.
 */
export const Invoice = ({ orderId, close }: Props) => {
  const { isLoading, getInvoice } = useGenerateInvoice(orderId, close);
  const { getText } = useI18n();

  return (
    <>
      <Button
        onPress={getInvoice}
        className="flex-row gap-1 h-9 native:hidden web:md:flex hidden"
        variant={"secondary"}
      >
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <Paperclip size={16} className="text-accent-foreground" />
        )}
        <Text>{getText("view_invoice")}</Text>
      </Button>
      <TouchableOpacity className="py-4 web:md:hidden" onPress={getInvoice}>
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center justify-between gap-2">
            <Paperclip size={18} color={"#313091"} />
            <P className="font-semibold">{getText("view_invoice")}</P>
          </View>
          {isLoading ? (
            <ActivityIndicator size={"small"} />
          ) : (
            <ChevronRight className="text-foreground" />
          )}
        </View>
      </TouchableOpacity>
    </>
  );
};
