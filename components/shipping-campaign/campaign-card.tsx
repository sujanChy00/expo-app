import { Link } from 'expo-router';
import { Pencil } from 'lucide-react-native';
import React from 'react';
import { View } from 'react-native';

import { Button } from '../ui/button';
import { Card, CardContent, CardFooter } from '../ui/card';
import { Separator } from '../ui/separator';
import { P } from '../ui/typography';
import { ToggleCampaignStatus } from './toggle-campaign-status';

import { useColorScheme } from '@/hooks/use-color-scheme';
import { useWindow } from '@/hooks/use-window';
import useI18n from '@/hooks/useI81n';
import { useSelectedShop } from '@/providers/auth-provider';
import { IShipppingCampaign } from '@/types/IShippingCampaign';
import { truncateString } from '@/utils/tuncate-string';

/**
 * @description A React component that renders a detailed card for a shipping campaign, including its name, discount percentage, start and end date, and an "Edit" button with a pencil icon (only displayed on non-VN shops). The card also includes a toggle to manage the campaign's status.
 * @typedef {Object} IShippingCampaign

 *
 * @param {Object} props - Component props.
 * @property {IShippingCampaign} props.campaign - Data object containing information about the shipping campaign.
 * @returns {JSX.Element} The rendered `CampaignCard` component.
 */
export const CampaignCard = ({ campaign }: { campaign: IShipppingCampaign }) => {
  const { dataCardStyle } = useWindow();
  const { getText } = useI18n();
  const { isDarkColorScheme } = useColorScheme();
  const { selectedShop } = useSelectedShop();

  return (
    <Card className="gap-y-3" style={dataCardStyle}>
      <CardContent className="gap-y-2 p-3">
        <View className="flex-row items-center justify-between">
          <P className="text-sm font-semibold">{getText('campaign_name')}</P>
          <P className="text-sm font-semibold">
            {truncateString(campaign.shippingCampaignName.toUpperCase(), 30)}
          </P>
        </View>
        <View className="flex-row items-center justify-between">
          <P className="text-sm font-semibold">{getText('campaign_discount')}</P>
          <P className="text-sm font-semibold">{campaign.shippingCampaignDiscountPercentage}</P>
        </View>
        <View className="flex-row items-center justify-between">
          <P className="text-sm font-semibold">{getText('start_date')}</P>
          <P className="text-sm font-semibold">
            {(() => {
              const dateString = new Date(campaign.shippingCampaignStartDate).toDateString();
              const words = dateString.split(' ');
              if (words.length > 1) {
                words[0] += ',';
              }
              return words.join(' ');
            })()}
          </P>
        </View>
        <View className="flex-row items-center justify-between">
          <P className="text-sm font-semibold">{getText('end_date')}</P>
          <P className="text-sm font-semibold">
            {(() => {
              const dateString = new Date(campaign.shippingCampaignEndDate).toDateString();
              const words = dateString.split(' ');
              if (words.length > 1) {
                words[0] += ',';
              }
              return words.join(' ');
            })()}
          </P>
        </View>
      </CardContent>
      {selectedShop?.shopAssistantCountry != 'VN' && (
        <>
          <Separator />
          <CardFooter className="flex-row items-center justify-between p-2 pt-0">
            <ToggleCampaignStatus campaign={campaign} />
            <Link href={`/shipping-campaign/${campaign.shippingCampaignId}`} asChild>
              <Button
                variant="outline"
                size="icon"
                className="native:h-12 native:w-12 rounded-full border-dashed web:h-10 web:w-10">
                <Pencil size={20} color={isDarkColorScheme ? 'white' : 'black'} />
              </Button>
            </Link>
          </CardFooter>
        </>
      )}
    </Card>
  );
};
