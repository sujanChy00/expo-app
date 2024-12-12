import { Link, Stack } from 'expo-router';
import { Image, View } from 'react-native';

import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { H4 } from '@/components/ui/typography';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops!', headerBackTitle: 'back' }} />
      <View className="flex-1 justify-center gap-y-6 bg-background px-8 pb-4 text-foreground xs:items-center">
        <View className="flex-1 items-center justify-center gap-4 xs:flex-auto">
          <Image
            source={require('@/assets/images/sorry.png')}
            style={{ height: 180, width: 180 }}
            resizeMode="contain"
          />
          <H4>Looks like this page does't exists</H4>
          <Link href="/" asChild className="mt-6">
            <Button variant="destructive">
              <Text>Go Back to home page</Text>
            </Button>
          </Link>
        </View>
      </View>
    </>
  );
}
