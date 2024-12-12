import React, { useState } from 'react';
import { View } from 'react-native';

import { MessagesList } from '@/components/messages/message-list';
import { SearchMessage } from '@/components/messages/search-message';

const MessagesScreen = () => {
  const [text, setText] = useState('');
  return (
    <View className="flex-1 bg-background p-3 md:p-6">
      <SearchMessage setText={setText} />
      <MessagesList filterText={text} />
    </View>
  );
};

export default MessagesScreen;
