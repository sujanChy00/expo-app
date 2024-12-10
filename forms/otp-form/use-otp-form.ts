import { zodResolver } from '@hookform/resolvers/zod';
import { useLocalSearchParams } from 'expo-router';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { useValidateCode } from '@/actions/auth';

const OtpSchema = z.object({
  reset_code: z.string().length(6, { message: 'Invalid OTP' }),
  email: z.string().email(),
});

export type OTPFormValues = z.infer<typeof OtpSchema>;

export const useOtpForm = () => {
  const params = useLocalSearchParams<{ email: string }>();
  const { mutateAsync, isPending } = useValidateCode();
  const form = useForm<OTPFormValues>({
    defaultValues: {
      email: params?.email || '',
      reset_code: '',
    },
    resolver: zodResolver(OtpSchema),
  });

  const verifyCode = form.handleSubmit(async (values) => {
    await mutateAsync({ ...values, reset_code: Number(values.reset_code) });
  });

  return {
    form,
    isPending,
    verifyCode,
  };
};
