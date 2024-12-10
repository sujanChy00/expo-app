import { zodResolver } from '@hookform/resolvers/zod';
import { useLocalSearchParams } from 'expo-router';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { useResetPassword } from '@/actions/auth';

const UpdatePasswordSchema = z
  .object({
    newPassword: z.string().min(6, {
      message: 'Password should be greater than 6 characters',
    }),
    confirmNewPassword: z.string().min(1, { message: 'Confirm password is required' }),
    email: z.string().email(),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Passwords don't match",
    path: ['confirmNewPassword'],
  });

type UpdatePasswordFormValues = z.infer<typeof UpdatePasswordSchema>;

export const useUpdatePasswordForm = () => {
  const params = useLocalSearchParams<{ email: string; otp: string }>();
  const { mutateAsync, isPending } = useResetPassword();

  const form = useForm<UpdatePasswordFormValues>({
    defaultValues: {
      newPassword: '',
      email: params?.email || '',
      confirmNewPassword: '',
    },
    resolver: zodResolver(UpdatePasswordSchema),
  });

  const updatePassword = form.handleSubmit(async (values) => {
    await mutateAsync({
      code: params.otp!,
      newPassword: values.newPassword,
      email: values.email,
    });
  });

  return {
    form,
    isPending,
    updatePassword,
  };
};
