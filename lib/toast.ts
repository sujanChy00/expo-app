import { toast } from 'burnt';
import { ToastOptions } from 'burnt/build/types';

export const errorToast = (title: string, options?: ToastOptions) => {
  toast({
    title,
    preset: 'error',
    haptic: 'error',
    ...options,
  });
};

export const successToast = (title: string, options?: ToastOptions) => {
  toast({
    title,
    preset: 'done',
    haptic: 'success',
    ...options,
  });
};
