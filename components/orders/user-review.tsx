import { FontAwesome } from '@expo/vector-icons';
import * as Clipboard from 'expo-clipboard';
import React from 'react';
import { Linking, Pressable, View } from 'react-native';

import { ArrowRight } from '../icons/arrow-right';
import { Copy } from '../icons/copy-icon';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { P } from '../ui/typography';
import { OrderDataLayout } from './order-data-layout';

import { successToast } from '@/lib/toast';
import { ITransactionById } from '@/types/ITransaction';

/**
 * @description A React component to display user review and tracking information for an order.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {ITransactionById} props.order - The order containing user review and tracking information.
 * @returns {JSX.Element} The rendered UserReview component.
 */
export const UserReview = ({ order }: { order: ITransactionById }) => {
  const [copied, setCopied] = React.useState(false);
  const copyToClipboard = async (text: string) => {
    await Clipboard.setStringAsync(text);
  };

  const ratings = Array.from({ length: order.userReview.rating }, (_, index) => index);

  return (
    <Card className="p-2">
      <CardContent className="gap-y-5 divide-y divide-border p-1">
        <View className="gap-2">
          {!!order.trackingUrl && (
            <OrderDataLayout title="tracking_url">
              <Pressable
                className="flex-row items-center gap-1"
                onPress={() => Linking.openURL(order.trackingUrl)}>
                <P className="text-blue-600">view</P>
                <ArrowRight size={16} color="#2563eb" />
              </Pressable>
            </OrderDataLayout>
          )}
          {!!order.trackingNumber && (
            <OrderDataLayout title="tracking_number">
              <View className="flex-row items-center gap-1">
                <P className="text-sm font-semibold text-blue-600">{order.trackingNumber}</P>
                <Button
                  size="icon"
                  variant={copied ? 'default' : 'outline'}
                  className="h-8 w-8"
                  onPress={() => {
                    copyToClipboard(order.trackingNumber);
                    setCopied(true);
                    successToast('tracking number copied!');

                    setTimeout(() => {
                      setCopied(false);
                    }, 1000);
                  }}>
                  <Copy size={16} className={copied ? 'text-background' : 'text-foreground'} />
                </Button>
              </View>
            </OrderDataLayout>
          )}
          {ratings.length > 0 && (
            <View className="flex-row items-center gap-1">
              {ratings.map((_, index) => (
                <FontAwesome name="star" color="gold" size={24} key={index} />
              ))}
            </View>
          )}
          {!!order.userReview.review && <P>{order.userReview.review}</P>}
        </View>
      </CardContent>
    </Card>
  );
};
