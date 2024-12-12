import React, { useState } from 'react';

import { Switch } from '../ui/switch';

import { useUpdateCampaign } from '@/actions/campaign';
import { IShipppingCampaign } from '@/types/IShippingCampaign';

/**
 * 
 * @description A React component that renders a toggle switch to activate or deactivate a shipping campaign. 
 * It fetches the latest campaign data before updating its status through the provided `useUpdateCampaign` 
 * function and handles potential errors by reverting the UI state if the update fails.
 * 
 *  * @example
 * ```jsx
 * <ToggleCampaignStatus
 *   campaign={{
 *     shippingCampaignId: 123,
 *     shippingCampaignName: "Free Shipping",
 *     shippingCampaignActive: true,
 *     // ... other campaign properties
 *   }}
 * />
 * ```
 * @typedef {Object} IShipppingCampaign

 *
 * @param {Object} props - Component props.
 * @property {IShipppingCampaign} props.campaign - Data object containing information about the shipping campaign.
 * @returns {JSX.Element} The rendered `ToggleCampaignStatus` component.
 *
 */
export const ToggleCampaignStatus = ({ campaign }: { campaign: IShipppingCampaign }) => {
  const [active, setActive] = useState(campaign.shippingCampaignActive);
  const { mutateAsync, isPending } = useUpdateCampaign();
  const updateCampaign = async (checked: boolean) => {
    setActive(checked);
    await mutateAsync({
      campaignId: campaign.shippingCampaignId,
      ...campaign,
      shippingCampaignActive: checked,
      shippingCampaignEndDate: new Date(campaign.shippingCampaignEndDate),
      shippingCampaignStartDate: new Date(campaign.shippingCampaignStartDate),
      shippingAreas: campaign.shippingAreas.map((area) => area.shippingAreaId),
    }).catch(() => setActive(!checked));
  };
  return <Switch checked={active} onCheckedChange={updateCampaign} disabled={isPending} />;
};
