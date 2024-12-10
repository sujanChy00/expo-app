import { useMutation } from '@tanstack/react-query';

import { addLocalFileToFormData } from '../utils/addLocalFileToFormData';

import { errorToast } from '@/lib/toast';
import { fetcher } from '@/utils/fetcher';

export const useUploadImageAndCall = () => {
  const { mutateAsync: upload, isPending: isUploading } = useMutation({
    mutationFn: async (data: FormData) => {
      return await fetcher<string[]>({
        url: '/image',
        method: 'POST',
        data,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    },
    onError: (error) => {
      errorToast(error?.message || 'Something went wrong while uploading image');
    },
  });
  const uploadImage = async (uris: string[], call: (image: string[]) => Promise<void>) => {
    const formData = new FormData();
    uris.forEach((uri) => addLocalFileToFormData(uri, formData, 'files'));

    const res = await upload(formData);

    if (res?.length > 0) {
      await call(res);
    } else {
      errorToast('Something went wrong while uploading image');
    }
  };

  return { uploadImage, isUploading };
};
