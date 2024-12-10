import { z } from 'zod';

export const ShipOrderSchema = z.object({
  trackingNumber: z
    .number()
    .refine((val) => val.toString().length >= 10 && val.toString().length <= 14, {
      message: 'Tracking no. must be between 10 and 14 digits',
    }),
  trackingUrl: z.string().optional(),
  shippingCompany: z.number().optional(),
});

export type ShipOrderFormValues = z.infer<typeof ShipOrderSchema>;
