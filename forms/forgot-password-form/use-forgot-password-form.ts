import { zodResolver } from '@hookform/resolvers/zod';
import { useLocalSearchParams } from 'expo-router';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { useSendResetEmail } from '@/actions/auth';

const ForgotPasswordSchema = z.object({
  reset_email: z.string().email(),
});

export type ForgotPasswordFormValues = z.infer<typeof ForgotPasswordSchema>;

export const useForgotPasswordForm = () => {
  const params = useLocalSearchParams<{ email?: string }>();
  const { mutateAsync, isPending } = useSendResetEmail();
  const form = useForm<ForgotPasswordFormValues>({
    defaultValues: { reset_email: params?.email || '' },
    resolver: zodResolver(ForgotPasswordSchema),
  });

  const handleSubmit = form.handleSubmit(async (values) => {
    await mutateAsync(values);
  });

  return {
    form,
    handleSubmit,
    isLoading: isPending,
  };
};
