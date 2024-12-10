import { z } from 'zod';

export const ShopSchema = z.object({
  shopAddress: z.string().min(1, { message: 'Shop address is required' }),
  shopName: z.string().min(1, { message: 'Shop name is required' }),
  shopPhoneNumber: z.string().min(1, { message: 'Shop phone number is required' }),
  shopPostalCode: z.string().min(1, { message: 'Shop postal code is required' }),
  orderAmount: z.number({ invalid_type_error: 'Order amount is required' }),
  shopIntroduction: z.string().optional(),
  shopRegistrationNumber: z.string().optional(),
  shopFacebookUrl: z.string().optional(),
  shopTiktokUrl: z.string().optional(),
  lowStockThreshold: z.number({
    invalid_type_error: 'Threshold is required',
  }),
  expiryThreshold: z.number({
    invalid_type_error: 'Threshold is required',
  }),
});

export type ShopFormValues = z.infer<typeof ShopSchema>;
