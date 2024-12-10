import { Link } from 'expo-router';
import React from 'react';
import { View } from 'react-native';

import { P } from '@/components/ui/typography';

const HomePage = () => {
  return (
    <View>
      <Link href="/orders">
        <P>Orders</P>
      </Link>
    </View>
  );
};

export default HomePage;
