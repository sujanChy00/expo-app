import { useMutation } from '@tanstack/react-query';

import { fetcher } from '@/utils/fetcher';

/**
 * @description A custom hook that handles uploading multiple images using a multipart form data request. It utilizes `useMutation` from a mutation library (likely `react-query`) to send a POST request and returns an array of uploaded image URLs on success.
 * @typedef {File} File - An object representing a file in the user's file system.
 * @typedef {string[]} IUploadedImages - An array of strings representing the URLs of the uploaded images.
 *
 *
 * @param {File[]} files - An array of files to be uploaded.
 *
 * @returns {MutationFunction<IUploadedImages, any, any>} A mutation function that can be used to upload multiple images.
 */
export const useUpalodPackageImage = () => {
  return useMutation({
    mutationFn: async (args: File[]) => {
      const formData = new FormData();
      args.forEach((file, index) => {
        formData.append('files', file, `file${index}.${file.name.split('.').pop()}`);
      });

      return await fetcher<string[]>({
        url: '/image',
        method: 'POST',
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    },
  });
};
