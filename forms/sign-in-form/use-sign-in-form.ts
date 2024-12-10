import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'burnt';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { signIn } from '@/api/user';
import { useAppInit } from '@/hooks/use-auth-init';
import { useUser } from '@/hooks/use-user';
import { useDeviceToken } from '@/providers/auth-provider';

const SignInFormSchema = z.object({
  email: z
    .string({ required_error: 'Email is required' })
    .email({ message: 'Please enter a valid email' }),
  password: z
    .string({
      required_error: 'Password is required',
    })
    .min(1, { message: 'Password is required' }),
});

export type SignInFormValues = z.infer<typeof SignInFormSchema>;

export const useSignInForm = () => {
  const { user } = useUser();
  const { deviceToken } = useDeviceToken();
  const form = useForm<SignInFormValues>({
    defaultValues: { email: '', password: '' },
    resolver: zodResolver(SignInFormSchema),
  });
  const { initApp } = useAppInit();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: signIn,
    onSuccess(data) {
      const messageType = user?.profileDetails?.shopAssistantPasswordExpired ? 'error' : 'done';
      toast({
        title: data.message,
        preset: messageType,
        haptic: user?.profileDetails.shopAssistantPasswordExpired ? 'error' : 'success',
      });
      initApp();
    },
    onError(error) {
      toast({
        title: error.message,
        haptic: 'error',
        preset: 'error',
      });
    },
  });

  const handleSubmit = form.handleSubmit(
    async (values) =>
      await mutateAsync({
        ...values,
        deviceToken: deviceToken || undefined,
      })
  );

  return {
    handleSubmit,
    form,
    isLoading: isPending,
  };
};
