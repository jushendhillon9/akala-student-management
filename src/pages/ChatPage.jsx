import { useState } from 'react';
import ThreadList from '../components/ThreadList';
import ConversationView from '../components/ConversationView';

function ChatPage() {
  const [selectedThread, setSelectedThread] = useState(null);

  return (
    <div className="flex flex-col md:flex-row p-4 h-[calc(100vh-64px)]">
      <ThreadList onSelectThread={setSelectedThread} />
      <ConversationView selectedThread={selectedThread} />
    </div>
  );
}

export default ChatPage;