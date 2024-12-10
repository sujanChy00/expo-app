import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { ShippingCampaignFormValues, ShippingCampaignSchema } from './shipping-campaign-schema';

import { useAddCampaign, useUpdateCampaign } from '@/actions/campaign';
import useI18n from '@/hooks/useI81n';
import { errorToast } from '@/lib/toast';
import { IShipppingCampaign } from '@/types/IShippingCampaign';

/**
 * @description A custom hook that manages form data, validation, submission, and area selection for creating or editing
 * a shipping campaign. It utilizes various hooks for data persistence and toast notifications.
 * @typedef {Object} ShippingCampaignFormValues - This type is not defined or imported. Please provide the definition or a link to its documentation.
 *
 * @typedef {Object} IShipppingCampaign - This type is not defined or imported. Please provide the definition or a link to its documentation.
 *
 *
 * @param {IShipppingCampaign} [shippingCampaign] - Optional shipping campaign data used for pre-filling the form when editing.
 * @returns {ShippingCampaignFormHook} An object containing functions and state for managing the shipping campaign form.
 */

export const useShippingCampaignForm = (shippingCampaign?: IShipppingCampaign) => {
  const { getText } = useI18n();
  const initialDiscountType = shippingCampaign
    ? shippingCampaign.flatShippingCharge !== 0
      ? 'flatShippingCharge'
      : shippingCampaign.flatShippingDiscount !== 0
        ? 'flatShippingDiscount'
        : 'shippingCampaignDiscountPercentage'
    : '';

  const discountTypeError = {
    shippingCampaignDiscountPercentage: getText('campaign_discount_percentage_error'),
    flatShippingCharge: getText('campaign_shipping_charge_error'),
    flatShippingDiscount: getText('campaign_discount_error'),
  };

  const { mutateAsync: Update, isPending: isLoading } = useUpdateCampaign();
  const { mutateAsync: Add, isPending } = useAddCampaign();
  const form = useForm<ShippingCampaignFormValues>({
    defaultValues: {
      flatShippingCharge: shippingCampaign?.flatShippingCharge,
      flatShippingDiscount: shippingCampaign?.flatShippingDiscount,
      shippingAreas: shippingCampaign?.shippingAreas.map((i) => i.shippingAreaId) || [],
      shippingCampaignActive: shippingCampaign?.shippingCampaignActive || false,
      shippingCampaignDescription: shippingCampaign?.shippingCampaignDescription || '',
      shippingCampaignDiscountPercentage: shippingCampaign?.shippingCampaignDiscountPercentage || 0,
      shippingCampaignEndDate: shippingCampaign
        ? new Date(shippingCampaign?.shippingCampaignEndDate)
        : undefined,
      shippingCampaignStartDate: shippingCampaign
        ? new Date(shippingCampaign?.shippingCampaignStartDate)
        : undefined,
      shippingCampaignGivenBy: shippingCampaign?.shippingCampaignGivenBy,
      shippingCampaignMinimumOrderAmountThreshold:
        shippingCampaign?.shippingCampaignMinimumOrderAmountThreshold,
      shippingCampaignName: shippingCampaign?.shippingCampaignName || '',
      shippingCampaignType: shippingCampaign?.shippingCampaignType || 'ASHA_ALL',
      discountType: initialDiscountType || 'shippingCampaignDiscountPercentage',
    },
    resolver: zodResolver(ShippingCampaignSchema),
  });
  const shippingAreas = form.watch('shippingAreas');
  const discountType = form.watch('discountType');

  const handleSubmit = form.handleSubmit((values) => {
    const { discountType, ...body } = values;
    const data = {
      ...body,
      flatShippingCharge:
        discountType === 'flatShippingCharge' ? values.flatShippingCharge : undefined,
      flatShippingDiscount:
        discountType === 'flatShippingDiscount' ? values.flatShippingDiscount : undefined,
      shippingCampaignDiscountPercentage:
        discountType === 'shippingCampaignDiscountPercentage'
          ? values.shippingCampaignDiscountPercentage
          : undefined,
    };

    if (!shippingCampaign) {
      if (!values[discountType]) {
        form.setError(discountType, {
          message: discountTypeError[discountType],
        });
        return;
      }

      if (shippingAreas?.length === 0) {
        errorToast('Please select atleast one area');

        return;
      }
    }

    if (!shippingCampaign) {
      Add(body).then(() => form.reset());
    } else {
      Update({
        campaignId: shippingCampaign.shippingCampaignId as number,
        ...data,
      });
    }
  });

  const toggleAreaSelection = (area: number) => {
    const isSelected = shippingAreas?.includes(area);
    let newAreas: number[] = [];
    if (isSelected) {
      newAreas = shippingAreas ? shippingAreas?.filter((a) => a != area) : [];
      form.setValue('shippingAreas', newAreas);
    } else {
      newAreas = shippingAreas ? [...shippingAreas, area] : [];
    }
    form.setValue('shippingAreas', newAreas);
  };

  const selectedShippingArea = (area: number) => shippingAreas?.includes(area);

  return {
    handleSubmit,
    isLoading: isPending || isLoading,
    form,
    discountType,
    toggleAreaSelection,
    selectedShippingArea,
  };
};
