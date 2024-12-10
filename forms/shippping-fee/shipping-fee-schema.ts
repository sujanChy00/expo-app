import { z } from 'zod';

export const ShippingFeeSchema = z.object({
  coolShippingFee: z.number().min(1, { message: 'Cool shipping fee is required' }),
  frozenShippingFee: z.number().min(1, { message: 'Frozen shipping fee is required' }),
  shippingFee: z.number().min(1, { message: 'Shipping fee is required' }),
  weight: z.number().min(1, { message: 'Weight is required' }),
  fromAreaCode: z.number().optional(),
  toAreaCode: z.number().optional(),
  feeWithTax: z.number().min(1, { message: 'Fee with tax is required' }),
});

export type ShippingFeeFormValues = z.infer<typeof ShippingFeeSchema>;
