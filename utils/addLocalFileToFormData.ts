export const addLocalFileToFormData = (uri: string, formData: FormData, key: string) => {
  const filename = uri.split('/').pop() as string;
  const match = /\.(\w+)$/.exec(filename);
  const type = match ? `image/${match[1]}` : `image`;
  // @ts-ignore
  formData.append(key, { uri, name: filename, type });
};
