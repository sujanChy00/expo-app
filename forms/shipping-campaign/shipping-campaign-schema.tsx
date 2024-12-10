import { z } from 'zod';

export const ShippingCampaignSchema = z.object({
  shippingCampaignStartDate: z.date({ required_error: 'Start date required' }),
  shippingCampaignEndDate: z.date({ required_error: 'End date required' }),
  shippingCampaignName: z.string().min(1, { message: 'Name is required' }),
  shippingCampaignDescription: z.string().min(1, { message: 'Description is required' }),
  shippingCampaignMinimumOrderAmountThreshold: z.number({
    required_error: 'Threshold AMT. is required',
  }),
  shippingCampaignActive: z.boolean(),
  shippingAreas: z.array(z.number()).optional(),
  shippingCampaignType: z.enum(['ASHA_ALL', 'ASHA_DRY', 'ASHA_FROZEN', 'ASHA_COOL']),
  shippingCampaignDiscountPercentage: z.number().optional(),
  flatShippingDiscount: z.number().optional(),
  flatShippingCharge: z.number().optional(),
  shippingCampaignGivenBy: z.string({ required_error: 'Given by is required' }),
  discountType: z.enum([
    'shippingCampaignDiscountPercentage',
    'flatShippingCharge',
    'flatShippingDiscount',
  ]),
});

export type ShippingCampaignFormValues = z.infer<typeof ShippingCampaignSchema>;
