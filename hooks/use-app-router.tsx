import { useRouter } from 'expo-router';
import { Platform } from 'react-native';

export const useAppRouter = () => {
  const router = useRouter();

  function back(backOnWeb?: boolean) {
    if (Platform.OS === 'web' && !backOnWeb) return;
    router.back();
  }

  return {
    ...router,
    back,
  };
};
