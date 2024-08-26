import React from 'react';
import BootstrapHeader from '../../components/users/BootstrapHeader';
import ChatScreen from '../../components/users/ChatScreen';

function ChatPage() {
  return (
    <div className="d-flex flex-column h-100 background-gradient-main">
      <BootstrapHeader />
      <div className="flex-grow-1 d-flex">
        <ChatScreen />
      </div>
    </div>
  );
}

export default ChatPage;
