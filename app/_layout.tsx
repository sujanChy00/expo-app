import { PortalProvider } from '@gorhom/portal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DarkTheme, DefaultTheme, Theme, ThemeProvider } from '@react-navigation/native';
import { PortalHost } from '@rn-primitives/portal';
import { Toaster } from 'burnt/web';
import { SplashScreen, Stack, useRouter } from 'expo-router';
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { useGetUserProfile } from '@/api/profile-api';
import { StackScreen } from '@/components/layout/screen-stack';
import { NAV_THEME } from '@/constants/colors';
import { isNative, isweb } from '@/constants/data';
import useAuthInit from '@/hooks/use-auth-init';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useFonts } from 'expo-font';
import { FontAwesome } from '@expo/vector-icons';
import * as Notifications from 'expo-notifications';

import '../global.css';

import { useLanguageLoader } from '@/hooks/use-language-loader';
import { useUser } from '@/hooks/use-user';
import { setAndroidNavigationBar } from '@/lib/android-navigation-bar';
import { AuthProvider, useDeviceToken, useLoading } from '@/providers/auth-provider';
import { QueryProvider } from '@/providers/query-provider';
import { CheckConnection } from '@/components/check-connection';
import { UpdateApp } from '@/components/update-app';
import { StatusBar } from 'expo-status-bar';
import { registerForPushNotificationsAsync } from '@/api/notification';

const LIGHT_THEME: Theme = {
  ...DefaultTheme,
  colors: NAV_THEME.light,
};
const DARK_THEME: Theme = {
  ...DarkTheme,
  colors: NAV_THEME.dark,
};

export { ErrorBoundary } from 'expo-router';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });
  const { colorScheme, setColorScheme, isDarkColorScheme } = useColorScheme();
  const [isColorSchemeLoaded, setIsColorSchemeLoaded] = React.useState(false);

  React.useEffect(() => {
    if (error) {
      throw error;
    }
  }, [error]);

  React.useEffect(() => {
    (async () => {
      const theme = await AsyncStorage.getItem('theme');
      if (isweb) {
        document.documentElement.classList.add('bg-background');
      }
      if (!theme) {
        AsyncStorage.setItem('theme', colorScheme);
        setIsColorSchemeLoaded(true);
        return;
      }
      const colorTheme = theme === 'dark' ? 'dark' : 'light';
      if (colorTheme !== colorScheme) {
        setColorScheme(colorTheme);
        setAndroidNavigationBar(colorTheme);
        setIsColorSchemeLoaded(true);
        return;
      }
      setAndroidNavigationBar(colorTheme);
      setIsColorSchemeLoaded(true);
    })().finally(() => {
      SplashScreen.hideAsync();
    });
  }, []);

  if (!loaded || !isColorSchemeLoaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider value={isDarkColorScheme ? DARK_THEME : LIGHT_THEME}>
        <PortalProvider>
          <AuthProvider>
            <QueryProvider>
              <Toaster
                toastOptions={{
                  style: {
                    borderRadius: 10,
                  },
                }}
                position="top-center"
                richColors
                theme={colorScheme}
              />
              <StatusBar style={isDarkColorScheme ? 'light' : 'dark'} />

              {isNative && <UpdateApp />}
              <CheckConnection>
                <MainApp />
              </CheckConnection>
            </QueryProvider>
          </AuthProvider>
        </PortalProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}

const MainApp = () => {
  const router = useRouter();
  useAuthInit();
  useGetUserProfile();
  useLanguageLoader();
  const { loading } = useLoading();
  const { user } = useUser();
  const { setDeviceToken } = useDeviceToken();

  const [appOpenedFromNotification, setAppOpenedFromNotification] = React.useState('');

  const notificationListener = React.useRef<Notifications.EventSubscription>();
  const responseListener = React.useRef<Notifications.EventSubscription>();

  React.useEffect(() => {
    notificationListener.current = Notifications.addNotificationReceivedListener(
      (notification) => {}
    );

    responseListener.current = Notifications.addNotificationResponseReceivedListener(
      (response) => {}
    );

    return () => {
      if (notificationListener.current) {
        Notifications.removeNotificationSubscription(notificationListener.current);
      }
      if (responseListener.current) {
        Notifications.removeNotificationSubscription(responseListener.current);
      }
    };
  }, []);

  React.useEffect(() => {
    if (loading) return;
    registerForPushNotificationsAsync(setDeviceToken);
    let isMounted = true;

    function redirect(notification: any) {
      const url =
        notification.request.trigger?.remoteMessage?.data?.url ||
        notification.request.content?.data?.url ||
        notification.request.trigger?.remoteMessage?.data?.deepLink ||
        notification.request.content?.data?.deepLink;
      if (url && appOpenedFromNotification !== url) {
        if (user) {
          router.push(url);
        } else {
          router.navigate({
            pathname: '/auth/signin',
            params: { next: url },
          });
        }
        setAppOpenedFromNotification(url);
      }
    }

    let subscription: Notifications.Subscription | null = null;

    if (isNative) {
      Notifications.getLastNotificationResponseAsync().then((response) => {
        if (!isMounted || !response?.notification) {
          return;
        }
        redirect(response?.notification);
      });

      subscription = Notifications.addNotificationResponseReceivedListener((response) => {
        redirect(response.notification);
      });
    }

    return () => {
      isMounted = false;
      if (subscription) {
        subscription.remove();
      }
    };
  }, [loading]);

  return (
    <>
      <StackScreen>
        <Stack.Screen
          name="(auth)"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="(main)"
          options={{
            headerShown: false,
          }}
        />
      </StackScreen>
      <PortalHost />
    </>
  );
};
