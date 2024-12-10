type options = {
  onSuccess?: (images: string[], files: File[]) => void;
  onError?: (file: File[]) => void;
};

export const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, config: options) => {
  const files = e.target.files;
  if (files && files.length > 0) {
    const imageFiles = Array.from(files);
    config.onError && config.onError(imageFiles);
    const promises = imageFiles.map((file) => {
      return new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          if (typeof reader.result === 'string') {
            resolve(reader.result);
          } else {
            reject(new Error('Failed to read file'));
          }
        };
        reader.onerror = () => {
          reject(new Error('Failed to read file'));
        };
        reader.readAsDataURL(file);
      });
    });
    Promise.all(promises)
      .then((results) => {
        config.onSuccess && config.onSuccess(results, imageFiles);
      })
      .catch((error) => {
        console.error('Error reading files:', error);
      });
  }
};
