import { z } from 'zod';

export const ItemVariationSchema = z.object({
  name: z.string().min(1, { message: 'Name is Required' }),
  price: z.string().min(1, { message: 'Price is Required' }),
  weight: z.string().min(1, { message: 'Weight is Required' }),
  stock: z.number().min(1, { message: 'Stock is Required' }),
});

export type ItemVariationValues = z.infer<typeof ItemVariationSchema>;
