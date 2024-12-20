import AppBack from '@/components/app-back';
import useI18n from '@/hooks/useI81n';
import { Stack } from 'expo-router';
import { WebView } from 'react-native-webview';

const TermsAndConditions = () => {
  const { getText } = useI18n();

  return (
    <>
      <Stack.Screen
        options={{
          title: getText('terms_condition'),
          headerBackVisible: false,
          headerLeft: () => {
            return <AppBack />;
          },
        }}
      />
      <WebView
        style={{ flex: 1, backgroundColor: '#fff' }}
        source={{
          uri: 'https://about.tetoteto.co.jp/terms-and-conditions/',
        }}
      />
    </>
  );
};

export default TermsAndConditions;
