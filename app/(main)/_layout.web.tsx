import { Header } from '@/components/layout/header';
import Sidebar from '@/components/layout/sidebar';
import { useUser } from '@/hooks/use-user';
import { useAuthenticated } from '@/hooks/useAuth';
import { useLoading } from '@/providers/auth-provider';
import { Slot } from 'expo-router';
import { ActivityIndicator, View } from 'react-native';

const WebLayout = () => {
  const { loading } = useLoading();
  const { user } = useUser();
  useAuthenticated();

  if (loading || !user)
    return (
      <View className="flex-1 items-center justify-center bg-background">
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  return (
    <div className="overflow-y-auto bg-background pb-10 font-sans antialiased">
      <Header />
      <div className="flex flex-1 bg-background">
        <Sidebar className="fixed left-0 top-16 z-10 hidden min-h-screen lg:flex" />
        <div className="flex min-h-screen w-full bg-background text-foreground md:min-h-[120vh] lg:ml-auto lg:w-[87%]">
          <Slot />
        </div>
      </div>
    </div>
  );
};

export default WebLayout;
