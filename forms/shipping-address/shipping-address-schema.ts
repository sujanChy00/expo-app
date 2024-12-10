import { z } from 'zod';

export const ShippingAddressSchema = z.object({
  address1: z.string().min(1, { message: 'Address 1 is required' }),
  address2: z.string().optional(),
  city: z.string().min(1, { message: 'City is required' }),
  postalCode: z
    .string()
    .min(1, { message: 'Postal Code is required' })
    .max(7, { message: 'Postal Code is too long' }),
  prefecture: z.string(),
});

export type ShippingAddressFormValues = z.infer<typeof ShippingAddressSchema>;
