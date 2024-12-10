import React, { useState } from 'react';
import { View } from 'react-native';

import { MessagesList } from '@/components/messages/message-list';
import { MessageSearchInput } from '@/components/messages/message-search-input';

const ChatScreen = () => {
  const [text, setText] = useState('');
  return (
    <View className="xs:hidden flex flex-1 gap-6 bg-background p-3">
      <MessageSearchInput setText={setText} />
      <MessagesList filterText={text} />
    </View>
  );
};

export default ChatScreen;
